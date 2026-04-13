import { Project, SEO } from '../../types';

// Project Loader — Markdown-first project system
// Scans content/projects/ for .md files and merges them with existing metadata.

const markdownModules = import.meta.glob('/content/projects/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

/** Parse YAML-like frontmatter without gray-matter (browser-safe) */
function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = raw.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: raw };
  }

  const yamlBlock = match[1];
  const content = match[2];
  const data: Record<string, any> = {};

  let currentKey = '';
  let currentArray: string[] | null = null;

  for (const line of yamlBlock.split('\n')) {
    if (line.trim() === '') continue;

    const arrayItemMatch = line.match(/^\s+-\s+"?(.+?)"?\s*$/);
    if (arrayItemMatch && currentArray) {
      currentArray.push(arrayItemMatch[1].replace(/^["']|["']$/g, ''));
      continue;
    }

    if (currentArray && currentKey) {
      data[currentKey] = currentArray;
      currentArray = null;
      currentKey = '';
    }

    const kvMatch = line.match(/^(\w[\w\s]*?):\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1].trim();
      let value: string | boolean | number = kvMatch[2].trim();

      if (value === '') {
        currentKey = key;
        currentArray = [];
        continue;
      }

      // Check for inline JSON array syntax first: ["item1", "item2"]
      const inlineArrayMatch = kvMatch[2].trim().match(/^\[(.*)\]$/);
      if (inlineArrayMatch) {
        data[key] = inlineArrayMatch[1]
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, ''))
          .filter(item => item.length > 0);
        continue;
      }

      value = value.replace(/^["']|["']$/g, '');

      if (value === 'true') {
        data[key] = true;
      } else if (value === 'false') {
        data[key] = false;
      } else if (/^\d+$/.test(value)) {
        data[key] = parseInt(value, 10);
      } else {
        data[key] = value;
      }
    }
  }

  if (currentArray && currentKey) {
    data[currentKey] = currentArray;
  }

  return { data, content };
}

function generateId(filePath: string): string {
  let hash = 0;
  for (let i = 0; i < filePath.length; i++) {
    const char = filePath.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function slugFromPath(filePath: string): string {
  const filename = filePath.split('/').pop() || '';
  return filename.replace(/\.md$/, '');
}

function parseProjectFile(filePath: string, raw: string): Partial<Project> & { slug: string } | null {
  try {
    const { data, content } = parseFrontmatter(raw);
    if (filePath.endsWith('template.md')) return null;

    const slug = data.slug || slugFromPath(filePath);

    // Helper to ensure a value is always an array
    const toArray = (val: any): string[] => {
      if (Array.isArray(val)) return val;
      if (typeof val === 'string' && val.length > 0) return [val];
      return [];
    };

    const tags = toArray(data.tags);
    const features = toArray(data.features);
    
    // Construct SEO
    const seo: SEO = {
      title: data.seoTitle || `${data.title || slug} | William Spurlock`,
      description: data.seoDescription || data.description || '',
      keywords: toArray(data.seoKeywords).length > 0 ? toArray(data.seoKeywords) : tags,
      ogImage: data.image || '/images/default-project.jpg',
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
      section: 'Projects',
      authors: ['William Spurlock'],
      canonicalUrl: `https://williamspurlock.com/projects/${slug}`,
    };

    return {
      id: generateId(filePath),
      slug,
      title: data.title,
      description: data.description,
      image: data.image,
      type: data.type,
      features,
      timeline: data.timeline || '',
      featured: data.featured === true,
      priority: data.priority || 999,
      content,
      seo,
      tags,
      relatedProjects: data.relatedProjects || [],
      quickViewEnabled: data.quickViewEnabled !== false,
    };
  } catch (error) {
    console.error(`Error parsing project at ${filePath}:`, error);
    return null;
  }
}

export function loadAllProjectsFromMarkdown(): Project[] {
  const projects: Project[] = [];

  for (const [filePath, raw] of Object.entries(markdownModules)) {
    const projectPartial = parseProjectFile(filePath, raw);
    if (projectPartial) {
      // @ts-ignore - Partial to full conversion assuming minimum metadata exists
      projects.push(projectPartial as Project);
    }
  }

  return projects;
}

export const projectMarkdownData: Project[] = loadAllProjectsFromMarkdown();
