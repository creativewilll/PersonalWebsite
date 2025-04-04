import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { BlogPost, BlogPostSchema } from '../src/types';
import { generateSEOMetadata } from '../src/types/BlogPost';
import { v4 as uuidv4 } from 'uuid';

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content/blog');
const BLOG_DATA_FILE = path.join(process.cwd(), 'src/data/blogData/blogData.ts');
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public/images/blog');

interface FrontMatter {
  title: string;
  slug: string;
  date: string;
  lastModified?: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
    title?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
  readingTime: number;
  categories: string[];
  tags: string[];
  featured?: boolean;
  draft?: boolean;
  excerpt: string;
  coverImage: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function processMarkdownFile(filePath: string): BlogPost {
  // Read and parse the markdown file
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent) as { data: FrontMatter; content: string };

  // Generate a unique ID if not provided
  const id = uuidv4();

  // Calculate reading time if not provided
  const readingTime = data.readingTime || calculateReadingTime(content);

  // Process the markdown content to extract table of contents
  const tableOfContents = content
    .split('\n')
    .filter(line => /^#{2,4}\s/.test(line))
    .map(line => {
      const match = line.match(/^(#{2,4})\s+(.+)$/);
      if (!match) return null;
      const level = match[1].length;
      const title = match[2];
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return { level, title, slug };
    })
    .filter((item): item is { level: number; title: string; slug: string } => item !== null);

  // Create the blog post object
  const seoMetadata = data.seo ? {
    title: data.seo.title || `${data.title} | William Spurlock`,
    description: data.seo.description || data.excerpt,
    keywords: data.seo.keywords || [...data.categories],
    ogImage: data.seo.ogImage || data.coverImage,
    publishedTime: data.date,
    modifiedTime: data.lastModified || data.date,
    section: data.categories[0] || 'Blog',
    authors: [data.author.name],
    canonicalUrl: `https://williamspurlock.com/blog/${data.slug}`
  } : generateSEOMetadata({
    id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content,
    coverImage: data.coverImage,
    publishedAt: data.date,
    readingTime,
    featured: false,
    draft: true,
    categories: data.categories,
    tags: data.tags,
    author: {
      id: '1',
      name: data.author.name,
      avatar: data.author.avatar,
      bio: 'AI and automation expert',
      title: 'AI Solutions Architect',
      social: {
        twitter: 'https://twitter.com/williamspurlock',
        linkedin: 'https://linkedin.com/in/williamspurlock'
      }
    },
    seo: {} as any,
    tableOfContents: [],
    relatedPosts: [],
    metadata: {
      views: 0,
      likes: 0,
      shares: 0,
      comments: 0
    }
  });

  const blogPost: BlogPost = {
    id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content,
    coverImage: data.coverImage,
    publishedAt: data.date,
    updatedAt: data.lastModified,
    readingTime,
    featured: data.featured ?? false,
    draft: data.draft ?? true,
    categories: data.categories,
    tags: data.tags,
    author: {
      id: '1', // Assuming you're the only author
      name: data.author.name,
      avatar: data.author.avatar,
      bio: data.author.bio || 'AI and automation expert',
      title: data.author.title || 'AI Solutions Architect',
      social: data.author.social || {
        twitter: 'https://twitter.com/williamspurlock',
        linkedin: 'https://linkedin.com/in/williamspurlock'
      }
    },
    seo: seoMetadata,
    tableOfContents,
    relatedPosts: [], // This will be populated later
    metadata: {
      views: 0,
      likes: 0,
      shares: 0,
      comments: 0
    }
  };

  return BlogPostSchema.parse(blogPost);
}

function updateBlogData(newPosts: BlogPost[]): void {
  // Read existing blog data
  const blogDataContent = fs.readFileSync(BLOG_DATA_FILE, 'utf-8');
  
  // Extract existing posts
  const match = blogDataContent.match(/export const blogData: BlogPost\[\] = (\[[\s\S]*?\]);/);
  if (!match) {
    throw new Error('Could not find blogData array in file');
  }
  
  const existingPosts: BlogPost[] = eval(match[1]);
  
  // Merge posts, removing duplicates by slug
  const allPosts = [
    ...newPosts,
    ...existingPosts.filter(existing => 
      !newPosts.some(newPost => newPost.slug === existing.slug)
    )
  ];
  
  // Sort posts by date
  allPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  // Generate the new file content
  const newFileContent = `import { BlogPost } from '../../types';

// Direct export of blog posts data
export const blogData: BlogPost[] = ${JSON.stringify(allPosts, null, 2)};
`;
  
  // Write the updated file
  fs.writeFileSync(BLOG_DATA_FILE, newFileContent);
}

function processAllPosts(): void {
  // Ensure directories exist
  fs.mkdirSync(BLOG_CONTENT_DIR, { recursive: true });
  fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });

  // Get all markdown files
  const posts = fs.readdirSync(BLOG_CONTENT_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(BLOG_CONTENT_DIR, file);
      try {
        return processMarkdownFile(filePath);
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
        return null;
      }
    })
    .filter((post): post is BlogPost => post !== null);

  // Update blog data
  updateBlogData(posts);
}

// Run the processor
processAllPosts(); 