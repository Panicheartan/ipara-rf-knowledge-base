'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, FileText, ArrowLeft, X, Tag, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Doc {
  slug: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  date?: string;
}

interface SearchClientProps {
  docs: Doc[];
}

export default function SearchClient({ docs }: SearchClientProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);

    return docs
      .map((doc) => {
        let score = 0;

        for (const term of searchTerms) {
          if (doc.title.toLowerCase().includes(term)) score += 10;
          if (doc.tags?.some((tag) => tag.toLowerCase().includes(term))) score += 5;
          if (doc.content.toLowerCase().includes(term)) score += 1;
        }

        return { doc, score };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((result) => result.doc);
  }, [query, docs]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <Input
                autoFocus
                type="text"
                placeholder="搜索文档、标签、内容..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-6 text-base bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 rounded-xl"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!query.trim() ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              开始搜索
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              输入关键词搜索文档标题、标签或内容
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              未找到相关文档
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              尝试使用其他关键词或检查拼写
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              找到 {results.length} 个相关结果
            </div>
            {results.map((doc) => (
              <Link key={doc.slug} href={`/docs/${doc.slug}`}>
                <Card className="hover:shadow-md transition-shadow border-zinc-200 dark:border-zinc-800 mb-4">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                          {doc.title}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">
                          {doc.content.slice(0, 200).replace(/[#*`]/g, '')}...
                        </p>
                        <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
                          <span>{doc.category}</span>
                          {doc.date && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {doc.date}
                              </span>
                            </>
                          )}
                          {doc.tags && doc.tags.length > 0 && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                {doc.tags.slice(0, 3).map((t) => t.replace('#', '')).join(', ')}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
