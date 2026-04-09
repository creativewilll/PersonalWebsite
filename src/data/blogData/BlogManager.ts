import { BlogPost } from '../../types';
import { blogData } from './blogLoader';

export class BlogManager {
  private blogPosts: BlogPost[];

  constructor() {
    // Initialize blog posts from the markdown loader (already sorted by date)
    this.blogPosts = [...blogData];
  }

  // Get all blog posts
  getAllBlogPosts(): BlogPost[] {
    return this.blogPosts;
  }

  // Get a specific blog post by slug
  getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this.blogPosts.find((post) => post.slug === slug);
  }

  // Get featured blog posts
  getFeaturedBlogPosts(): BlogPost[] {
    return this.blogPosts.filter((post) => post.featured);
  }

  // Get recent blog posts
  getRecentBlogPosts(limit: number = 5): BlogPost[] {
    return this.blogPosts.slice(0, limit);
  }

  // Get blog posts by category
  getBlogPostsByCategory(category: string): BlogPost[] {
    const normalizedCategory = category.toLowerCase();
    return this.blogPosts.filter((post) =>
      post.categories.some(c => c.toLowerCase() === normalizedCategory)
    );
  }

  // Get related blog posts based on categories
  getRelatedBlogPosts(post: BlogPost, limit: number = 3): BlogPost[] {
    const otherPosts = this.blogPosts.filter(p => p.id !== post.id);

    const scoredPosts = otherPosts.map(otherPost => {
      let score = 0;
      post.categories.forEach(category => {
        if (otherPost.categories.includes(category)) {
          score += 2;
        }
      });
      return { post: otherPost, score };
    });

    scoredPosts.sort((a, b) => b.score - a.score);
    return scoredPosts.slice(0, limit).map(item => item.post);
  }

  // Get all categories with post counts
  getAllCategories(): { name: string; count: number }[] {
    const categoryCounts: Record<string, number> = {};

    this.blogPosts.forEach(post => {
      if (post.categories && Array.isArray(post.categories)) {
        post.categories.forEach(category => {
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
      }
    });

    return Object.entries(categoryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }
}