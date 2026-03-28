import Link from 'next/link';
import { getAllCategories, getAllDocs } from '@/lib/docs';
import { BookOpen, FileText, ArrowRight, Search, Tag, Calendar, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function HomePage() {
  const categories = getAllCategories();
  const docs = getAllDocs();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-zinc-100 dark:text-zinc-900" />
            </div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              I.P.A.R.A 知识库
            </span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              射频工程
              <span className="block text-zinc-400 dark:text-zinc-600">技术知识库</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              系统化整理飞行器通信、天线设计、MIMO系统、链路预算等
              射频工程核心技术文档，为研发提供理论支撑。
            </p>

            {/* Search Box */}
            <div className="max-w-xl mx-auto">
              <Link href="/search">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-hover:text-zinc-500 transition-colors" />
                  <Input
                    readOnly
                    placeholder="搜索文档..."
                    className="w-full pl-12 pr-4 py-6 text-base bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors cursor-pointer"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-xs text-zinc-400">
                    <kbd className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">Ctrl</kbd>
                    <span>+</span>
                    <kbd className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">K</kbd>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{docs.length}</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">技术文档</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{categories.length}</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">知识分类</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">100+</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">技术标签</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">∞</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">持续更新</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Layers className="w-6 h-6" />
            知识分类
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group hover:shadow-lg transition-shadow border-zinc-200 dark:border-zinc-800"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="text-zinc-900 dark:text-zinc-100">{category.name}</span>
                  <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
                    {category.docs.length} 篇
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.docs.slice(0, 5).map((doc) => (
                    <li key={doc.slug}>
                      <Link
                        href={`/docs/${doc.slug}`}
                        className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors group/item"
                      >
                        <FileText className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-400 group-hover/item:text-zinc-600 dark:group-hover/item:text-zinc-300" />
                        <span className="line-clamp-1">{doc.title}</span>
                      </Link>
                    </li>
                  ))}
                  {category.docs.length > 5 && (
                    <li className="text-sm text-zinc-400 dark:text-zinc-500 italic">
                      还有 {category.docs.length - 5} 篇文档...
                    </li>
                  )}
                </ul>
                <Link href={`/docs/${category.docs[0]?.slug || ''}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 w-full group/btn text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  >
                    查看全部
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Docs Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            最新文档
          </h2>
        </div>

        <div className="grid gap-4">
          {docs
            .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
            .slice(0, 6)
            .map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="group flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {doc.category} • {doc.date || '未知日期'}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors" />
              </Link>
            ))}
        </div>
      </section>

      {/* Tags Cloud Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 flex items-center gap-2">
          <Tag className="w-6 h-6" />
          热门标签
        </h2>
        <div className="flex flex-wrap gap-2">
          {Array.from(
            new Set(docs.flatMap((doc) => doc.tags || []))
          )
            .slice(0, 30)
            .map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                {tag.replace('#', '')}
              </span>
            ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-zinc-400" />
              <span className="text-zinc-600 dark:text-zinc-400">
                I.P.A.R.A 射频工程知识库
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              仅供学习研究使用 • 持续更新完善
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
