import fs from 'fs';
import path from 'path';

export interface Doc {
  slug: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  date?: string;
  source?: string;
}

export interface Category {
  name: string;
  docs: Doc[];
}

const contentDirectory = path.join(process.cwd(), '..');

// Simple frontmatter parser
function parseFrontmatter(content: string) {
  const lines = content.split('\n');
  const frontmatter: Record<string, any> = {};
  let contentStart = 0;

  if (lines[0] === '---') {
    let i = 1;
    while (i < lines.length && lines[i] !== '---') {
      const line = lines[i];
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        // Handle arrays in format [#tag1, #tag2]
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1);
          frontmatter[key] = value.split(',').map(v => v.trim()).filter(Boolean);
        } else {
          frontmatter[key] = value;
        }
      }
      i++;
    }
    contentStart = i + 1;
  }

  return {
    frontmatter,
    content: lines.slice(contentStart).join('\n').trim(),
  };
}

export function getAllDocs(): Doc[] {
  const docs: Doc[] = [];

  function scanDir(dir: string, category: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !file.startsWith('.') && file !== 'knowledge-base') {
        scanDir(filePath, file);
      } else if (file.endsWith('.md') && !file.startsWith('_')) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { frontmatter, content } = parseFrontmatter(fileContent);

        const slug = file.replace(/\.md$/, '').replace(/-v\d+\.\d+-\d{8}$/, '');

        // Extract title from content (first h1) or frontmatter
        let title = frontmatter.title;
        if (!title) {
          const titleMatch = content.match(/^#\s+(.+)$/m);
          title = titleMatch ? titleMatch[1] : slug;
        }

        docs.push({
          slug: `${category}/${slug}`,
          title,
          content,
          category,
          tags: frontmatter.tags || [],
          date: frontmatter.date,
          source: frontmatter.source,
        });
      }
    }
  }

  scanDir(contentDirectory, '射频工程');

  return docs.sort((a, b) => a.title.localeCompare(b.title));
}

export function getDocBySlug(slug: string): Doc | null {
  const docs = getAllDocs();
  return docs.find(doc => doc.slug === slug) || null;
}

export function getAllCategories(): Category[] {
  const docs = getAllDocs();
  const categoriesMap = new Map<string, Doc[]>();

  for (const doc of docs) {
    if (!categoriesMap.has(doc.category)) {
      categoriesMap.set(doc.category, []);
    }
    categoriesMap.get(doc.category)!.push(doc);
  }

  return Array.from(categoriesMap.entries()).map(([name, docs]) => ({
    name,
    docs: docs.sort((a, b) => a.title.localeCompare(b.title)),
  }));
}
