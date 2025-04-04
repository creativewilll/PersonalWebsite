import { BlogPost } from '../../types';

// Initial categories
export const INITIAL_CATEGORIES = [
  'AI Agents and Automations',
  'AI Tools',
  'My Experiences',
  'AI Prompting'
];

// Function to get all unique categories from posts
export const getAllCategories = (posts: BlogPost[]): string[] => {
  const categories = new Set<string>();
  
  // Add initial categories
  INITIAL_CATEGORIES.forEach(category => categories.add(category));
  
  // Add categories from posts
  posts.forEach(post => {
    post.categories.forEach(category => categories.add(category));
  });
  
  return Array.from(categories);
};

// Function to check if we need to update categories (every 10 posts)
export const shouldUpdateCategories = (posts: BlogPost[]): boolean => {
  return posts.length % 10 === 0;
};

// Function to get categories with post counts
export const getCategoriesWithCounts = (posts: BlogPost[]): Array<{ name: string; count: number }> => {
  const categoryCounts = new Map<string, number>();
  
  // Initialize with initial categories
  INITIAL_CATEGORIES.forEach(category => {
    categoryCounts.set(category, 0);
  });
  
  // Count posts in each category
  posts.forEach(post => {
    post.categories.forEach(category => {
      const currentCount = categoryCounts.get(category) || 0;
      categoryCounts.set(category, currentCount + 1);
    });
  });
  
  return Array.from(categoryCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

// Function to get the most relevant categories for a post
export const getRelevantCategories = (post: BlogPost, allCategories: string[]): string[] => {
  // If post already has categories, use those
  if (post.categories.length > 0) {
    return post.categories;
  }
  
  // Otherwise, try to determine relevant categories based on content
  const content = post.content.toLowerCase();
  const title = post.title.toLowerCase();
  
  return allCategories.filter(category => {
    const categoryLower = category.toLowerCase();
    return content.includes(categoryLower) || title.includes(categoryLower);
  });
}; 