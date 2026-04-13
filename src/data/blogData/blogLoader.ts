import { BlogPost } from '../../types';

/**
 * Blog Loader — Markdown-first blog system
 *
 * Uses Vite's import.meta.glob to discover all .md files under content/blog/,
 * parses frontmatter manually (no gray-matter / no Node.js Buffer dependency),
 * and transforms them into BlogPost objects.
 *
 * New workflow: drop a .md file in content/blog/YYYY/MM/, restart dev server or
 * rebuild, and it appears on the site automatically.
 */

// --- Vite glob import: eagerly loads all markdown files as raw strings ---
const markdownModules = import.meta.glob('/content/blog/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

// --- Helpers ---

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
    // Skip empty lines
    if (line.trim() === '') continue;

    // Array item: "  - value"
    const arrayItemMatch = line.match(/^\s+-\s+"?(.+?)"?\s*$/);
    if (arrayItemMatch && currentArray) {
      currentArray.push(arrayItemMatch[1].replace(/^["']|["']$/g, ''));
      continue;
    }

    // If we were building an array and hit a non-array line, finalize it
    if (currentArray && currentKey) {
      data[currentKey] = currentArray;
      currentArray = null;
      currentKey = '';
    }

    // Key-value: "key: value" or "key: \"value\""
    const kvMatch = line.match(/^(\w[\w\s]*?):\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1].trim();
      let value: string | boolean | number = kvMatch[2].trim();

      // If value is empty, this could be the start of an array
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

      // Remove surrounding quotes
      value = value.replace(/^["']|["']$/g, '');

      // Parse booleans
      if (value === 'true') {
        data[key] = true;
      } else if (value === 'false') {
        data[key] = false;
      }
      // Parse numbers
      else if (/^\d+$/.test(value)) {
        data[key] = parseInt(value, 10);
      }
      // String
      else {
        data[key] = value;
      }
    }
  }

  // Finalize any trailing array
  if (currentArray && currentKey) {
    data[currentKey] = currentArray;
  }

  return { data, content };
}

/** Deterministic ID from file path so IDs are stable across rebuilds */
function generateId(filePath: string): string {
  let hash = 0;
  for (let i = 0; i < filePath.length; i++) {
    const char = filePath.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

/** Derive slug from filename: "/content/blog/2024/02/my-post.md" → "my-post" */
function slugFromPath(filePath: string): string {
  const filename = filePath.split('/').pop() || '';
  return filename.replace(/\.md$/, '');
}

/** Calculate reading time from word count */
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Default author object */
const DEFAULT_AUTHOR = {
  id: '1',
  name: 'William Spurlock',
  avatar: '/images/profile.jpg',
  bio: 'AI and automation expert',
  title: 'AI Solutions Architect',
  social: {
    twitter: 'https://twitter.com/williamspurlock',
    linkedin: 'https://linkedin.com/in/williamspurlock',
  },
};

/** Default cover image for posts that don't specify one */
const DEFAULT_COVER_IMAGE = '/images/Automated-Hiring-Pipeline.jpg';

// --- Core parser ---

function parseMarkdownFile(filePath: string, raw: string): BlogPost | null {
  try {
    const { data, content } = parseFrontmatter(raw);

    // Skip template files
    if (filePath.endsWith('template.md')) return null;

    const slug = data.slug || slugFromPath(filePath);
    const title = data.title || 'Untitled Post';
    const excerpt = data.excerpt || content.substring(0, 160).replace(/[#*_\n]/g, '').trim();
    const coverImage = data.coverImage || DEFAULT_COVER_IMAGE;
    const publishedAt = data.date
      ? new Date(data.date).toISOString()
      : new Date().toISOString();
    const updatedAt = data.lastModified
      ? new Date(data.lastModified).toISOString()
      : undefined;
    const readingTime = data.readingTime || calculateReadingTime(content);
    // Helper to ensure a value is always an array
    const toArray = (val: any): string[] => {
      if (Array.isArray(val)) return val;
      if (typeof val === 'string' && val.length > 0) return [val];
      return [];
    };

    const categories = toArray(data.categories);
    const tags = toArray(data.tags);
    const featured = data.featured ?? false;
    const draft = data.draft ?? false;
    const id = generateId(filePath);

    // Build SEO metadata
    const seo = {
      title: data.seoTitle || `${title} | William Spurlock`,
      description: data.seoDescription || excerpt,
      keywords: toArray(data.seoKeywords).length > 0 ? toArray(data.seoKeywords) : [...categories, ...tags],
      ogImage: coverImage,
      publishedTime: publishedAt,
      modifiedTime: updatedAt || publishedAt,
      section: categories[0] || 'Blog',
      authors: ['William Spurlock'],
      canonicalUrl: `https://williamspurlock.com/blog/${slug}`,
    };

    // Build table of contents from headings
    const tableOfContents = content
      .split('\n')
      .filter((line: string) => /^#{2,4}\s/.test(line))
      .map((line: string) => {
        const match = line.match(/^(#{2,4})\s+(.+)$/);
        if (!match) return null;
        const level = match[1].length;
        const headingTitle = match[2];
        const headingSlug = headingTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        return { level, title: headingTitle, slug: headingSlug };
      })
      .filter((item: any): item is { level: number; title: string; slug: string } => item !== null);

    return {
      id,
      slug,
      title,
      excerpt,
      content,
      coverImage,
      publishedAt,
      updatedAt,
      readingTime,
      featured,
      draft,
      categories,
      tags,
      author: DEFAULT_AUTHOR,
      seo,
      tableOfContents,
      relatedPosts: [],
      metadata: {
        views: 0,
        likes: 0,
        shares: 0,
        comments: 0,
      },
    };
  } catch (error) {
    console.error(`Error parsing blog post at ${filePath}:`, error);
    return null;
  }
}

// --- Build the post collection ---

function loadAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [filePath, raw] of Object.entries(markdownModules)) {
    const post = parseMarkdownFile(filePath, raw);
    if (post && !post.draft) {
      posts.push(post);
    }
  }

  // Sort newest first
  posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return posts;
}

/** All published blog posts, sorted by date descending */
export const blogData: BlogPost[] = loadAllPosts();
