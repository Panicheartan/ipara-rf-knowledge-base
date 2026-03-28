import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDocBySlug, getAllCategories, getAllDocs } from '@/lib/docs';
import { Sidebar } from '@/components/sidebar';
import { MarkdownContent } from '@/components/markdown-content';
import { Breadcrumb } from '@/components/breadcrumb';
import { TableOfContents } from '@/components/table-of-contents';
import { Separator } from '@/components/ui/separator';
import { Calendar, Tag, BookOpen } from 'lucide-react';

interface DocPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug.join('/'));

  if (!doc) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${doc.title} | I.P.A.R.A 知识库`,
    description: doc.content.slice(0, 160).replace(/[#*`]/g, ''),
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug.join('/'));
  const categories = getAllCategories();

  if (!doc) {
    notFound();
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar categories={categories} />

      <main className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            {/* Breadcrumb */}
            <Breadcrumb category={doc.category} title={doc.title} />

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                <BookOpen className="w-4 h-4" />
                <span>{doc.category}</span>
                {doc.date && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-600">•</span>
                    <Calendar className="w-3 h-3" />
                    <span>{doc.date}</span>
                  </>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                {doc.title}
              </h1>

              {doc.tags && doc.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {doc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    >
                      <Tag className="w-3 h-3" />
                      {tag.replace('#', '')}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <Separator className="mb-8" />

            {/* Article Content */}
            <article>
              <MarkdownContent content={doc.content} />
            </article>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
                I.P.A.R.A 射频工程知识库 • 仅供学习研究使用
              </p>
            </footer>
          </div>
        </div>

        {/* Table of Contents - Desktop */}
        <aside className="hidden xl:block w-64 sticky top-0 h-screen border-l border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="p-6">
            <TableOfContents content={doc.content} />
          </div>
        </aside>
      </main>
    </div>
  );
}
