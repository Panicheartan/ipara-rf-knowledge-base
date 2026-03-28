'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={cn('prose prose-zinc dark:prose-invert max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          // Custom heading styles with anchor links
          h1: ({ children, ...props }) => (
            <h1
              className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-8 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mt-8 mb-4"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mt-6 mb-3"
              {...props}
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4
              className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 mt-5 mb-2"
              {...props}
            >
              {children}
            </h4>
          ),
          // Paragraph
          p: ({ children, ...props }) => (
            <p className="text-zinc-600 dark:text-zinc-400 leading-7 mb-4" {...props}>
              {children}
            </p>
          ),
          // Lists
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside space-y-1 mb-4 text-zinc-600 dark:text-zinc-400" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside space-y-1 mb-4 text-zinc-600 dark:text-zinc-400" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="leading-7" {...props}>
              {children}
            </li>
          ),
          // Code blocks
          pre: ({ children, ...props }) => (
            <pre
              className="bg-zinc-900 dark:bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono"
              {...props}
            >
              {children}
            </pre>
          ),
          code: ({ children, className, ...props }) => {
            const isInline = !className;
            return isInline ? (
              <code
                className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // Tables
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table
                className="w-full border-collapse border border-zinc-200 dark:border-zinc-700 text-sm"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-zinc-50 dark:bg-zinc-800" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th
              className="border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-left font-semibold text-zinc-700 dark:text-zinc-300"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-zinc-600 dark:text-zinc-400"
              {...props}
            >
              {children}
            </td>
          ),
          // Blockquotes
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 italic text-zinc-600 dark:text-zinc-400 mb-4"
              {...props}
            >
              {children}
            </blockquote>
          ),
          // Links
          a: ({ children, ...props }) => (
            <a
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-blue-300 dark:decoration-blue-600 underline-offset-2"
              {...props}
            >
              {children}
            </a>
          ),
          // Horizontal rule
          hr: ({ ...props }) => (
            <hr className="border-zinc-200 dark:border-zinc-800 my-8" {...props} />
          ),
          // Strong and emphasis
          strong: ({ children, ...props }) => (
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200" {...props}>
              {children}
            </strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
