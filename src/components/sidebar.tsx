'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, FileText, Menu, X, BookOpen, Search, Home, Tag, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface Doc {
  slug: string;
  title: string;
  category: string;
}

interface Category {
  name: string;
  docs: Doc[];
}

interface SidebarProps {
  categories: Category[];
}

function SidebarContent({ categories }: SidebarProps) {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    () => new Set(categories.map(c => c.name))
  );

  const toggleCategory = (name: string) => {
    const newOpen = new Set(openCategories);
    if (newOpen.has(name)) {
      newOpen.delete(name);
    } else {
      newOpen.add(name);
    }
    setOpenCategories(newOpen);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-zinc-100 dark:text-zinc-900" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm leading-tight">
              I.P.A.R.A
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              知识库
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-1">
          {/* Home Link */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
              pathname === '/'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200'
            )}
          >
            <Home className="w-4 h-4" />
            首页
          </Link>

          {/* Search Link */}
          <Link
            href="/search"
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
              pathname === '/search'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200'
            )}
          >
            <Search className="w-4 h-4" />
            搜索
          </Link>

          <div className="pt-4">
            <div className="px-3 mb-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              文档分类
            </div>

            {categories.map((category) => (
              <Collapsible
                key={category.name}
                open={openCategories.has(category.name)}
                onOpenChange={() => toggleCategory(category.name)}
              >
                <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-md transition-colors [&[data-state=open]>svg]:rotate-90">
                  <span className="font-medium">{category.name}</span>
                  <ChevronRight className="w-4 h-4 transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-3 mt-1 space-y-1 border-l border-zinc-200 dark:border-zinc-700 pl-3">
                    {category.docs.map((doc) => {
                      const docPath = `/docs/${doc.slug}`;
                      const isActive = pathname === docPath;

                      return (
                        <Link
                          key={doc.slug}
                          href={docPath}
                          className={cn(
                            'flex items-start gap-2 px-3 py-1.5 rounded-md text-sm transition-colors',
                            isActive
                              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium'
                              : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-700 dark:hover:text-zinc-300'
                          )}
                        >
                          <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{doc.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <Tag className="w-3 h-3" />
          <span>射频工程知识库</span>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ categories }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800"
          >
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <SidebarContent categories={categories} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <SidebarContent categories={categories} />
      </aside>
    </>
  );
}
