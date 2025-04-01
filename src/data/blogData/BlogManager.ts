import { BlogPost } from '../../types';
import { blogData } from './blogData';

export class BlogManager {
  private blogPosts: BlogPost[];

  constructor() {
    console.log("BlogManager initializing");
    try {
      // Make a deep copy to prevent mutation and ensure proper formatting
      this.blogPosts = JSON.parse(JSON.stringify(blogData)) as BlogPost[];
      
      // Sort posts by published date (most recent first)
      this.blogPosts.sort((a, b) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
      
      console.log(`BlogManager initialized with ${this.blogPosts.length} posts`);
      
      // Log a sample post to verify data structure
      if (this.blogPosts.length > 0) {
        console.log("Sample post structure:", JSON.stringify(this.blogPosts[0], null, 2));
      } else {
        console.warn("No blog posts available in blog data");
      }
    } catch (error) {
      console.error("Error initializing BlogManager:", error);
      this.blogPosts = [];
    }
  }

  // Get all blog posts
  getAllBlogPosts(): BlogPost[] {
    console.log(`Returning ${this.blogPosts.length} blog posts`);
    return this.blogPosts;
  }

  // Get a specific blog post by slug
  getBlogPostBySlug(slug: string): BlogPost | undefined {
    try {
      const post = this.blogPosts.find((post) => post.slug === slug);
      console.log(`Fetched post by slug '${slug}':`, post ? `Found: ${post.title}` : "Not found");
      return post;
    } catch (error) {
      console.error(`Error getting blog post by slug '${slug}':`, error);
      return undefined;
    }
  }

  // Get featured blog posts
  getFeaturedBlogPosts(): BlogPost[] {
    try {
      const featuredPosts = this.blogPosts.filter((post) => post.featured);
      console.log(`Found ${featuredPosts.length} featured posts`);
      return featuredPosts;
    } catch (error) {
      console.error("Error getting featured posts:", error);
      return [];
    }
  }

  // Get blog posts by category
  getBlogPostsByCategory(category: string): BlogPost[] {
    try {
      // Normalize the category for case-insensitive comparison
      const normalizedCategory = category.toLowerCase();
      
      const posts = this.blogPosts.filter((post) => 
        post.categories.some(cat => cat.toLowerCase() === normalizedCategory)
      );
      
      console.log(`Found ${posts.length} posts for category '${category}'`);
      return posts;
    } catch (error) {
      console.error(`Error getting posts for category '${category}':`, error);
      return [];
    }
  }

  // Get blog posts by tag
  getBlogPostsByTag(tag: string): BlogPost[] {
    try {
      // Normalize the tag for case-insensitive comparison
      const normalizedTag = tag.toLowerCase();
      
      const posts = this.blogPosts.filter((post) => 
        post.tags.some(t => t.toLowerCase() === normalizedTag)
      );
      
      console.log(`Found ${posts.length} posts for tag '${tag}'`);
      return posts;
    } catch (error) {
      console.error(`Error getting posts for tag '${tag}':`, error);
      return [];
    }
  }
  
  // Get related blog posts
  getRelatedBlogPosts(post: BlogPost, limit: number = 3): BlogPost[] {
    try {
      // Don't recommend the same post
      const otherPosts = this.blogPosts.filter(p => p.id !== post.id);
      
      // Score each post based on shared categories and tags
      const scoredPosts = otherPosts.map(otherPost => {
        let score = 0;
        
        // Score based on shared categories
        post.categories.forEach(category => {
          if (otherPost.categories.includes(category)) {
            score += 2; // Categories are weighted higher
          }
        });
        
        // Score based on shared tags
        post.tags.forEach(tag => {
          if (otherPost.tags.includes(tag)) {
            score += 1;
          }
        });
        
        return { post: otherPost, score };
      });
      
      // Sort by score (highest first)
      scoredPosts.sort((a, b) => b.score - a.score);
      
      // Take the top scoring posts up to the limit
      const relatedPosts = scoredPosts.slice(0, limit).map(item => item.post);
      console.log(`Found ${relatedPosts.length} related posts for "${post.title}"`);
      
      return relatedPosts;
    } catch (error) {
      console.error(`Error getting related posts for "${post.title}":`, error);
      return [];
    }
  }

  // Get the most recent blog posts
  getRecentBlogPosts(limit: number = 5): BlogPost[] {
    return this.getAllBlogPosts().slice(0, limit);
  }

  // Get all categories with post counts
  getAllCategories(): { name: string; count: number }[] {
    const categoryCounts: Record<string, number> = {};
    
    this.blogPosts.forEach(post => {
      if (post.categories && Array.isArray(post.categories)) {
        post.categories.forEach(category => {
          if (categoryCounts[category]) {
            categoryCounts[category]++;
          } else {
            categoryCounts[category] = 1;
          }
        });
      }
    });
    
    return Object.entries(categoryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }

  // Get all tags with post counts
  getAllTags(): { name: string; count: number }[] {
    const tagCounts: Record<string, number> = {};
    
    this.blogPosts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => {
          if (tagCounts[tag]) {
            tagCounts[tag]++;
          } else {
            tagCounts[tag] = 1;
          }
        });
      }
    });
    
    return Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }
} 