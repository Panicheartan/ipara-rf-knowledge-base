'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  category: string;
  title: string;
}

export function Breadcrumb({ category, title }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">首页</span>
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-zinc-600 dark:text-zinc-300">{category}</span>
      <ChevronRight className="w-4 h-4" />
      <span className="text-zinc-900 dark:text-zinc-100 font-medium truncate max-w-[200px] sm:max-w-xs">
        {title}
      </span>
    </nav>
  );
}
