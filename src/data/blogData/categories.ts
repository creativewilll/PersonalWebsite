import { BlogPost } from '../../types';

// Canonical blog categories — the 6-bucket taxonomy (May 2026 revamp)
export const INITIAL_CATEGORIES = [
  'AI Models & Frontier News',
  'AI Agents & Automation',
  'AI Coding & Dev Tools',
  'Growth & Operations',
  'Web Design & Digital Craft',
  'AI Policy & Safety',
];

// Migration map: old → new category names.
// Used at load time so legacy markdown frontmatter auto-resolves.
export const CATEGORY_MIGRATION_MAP: Record<string, string> = {
  'AI Models and News':               'AI Models & Frontier News',
  'AI Industry News':                 'AI Models & Frontier News',
  'AI':                               'AI Models & Frontier News',
  'AI Agents and Automations':        'AI Agents & Automation',
  'Automations':                      'AI Agents & Automation',
  'Development Tools':                'AI Coding & Dev Tools',
  'AI Coding Tools':                  'AI Coding & Dev Tools',
  'Studio and Business':              'Growth & Operations',
  'Growth and Operations':            'Growth & Operations',
  'AI Business and Strategy':         'Growth & Operations',
  'Web Design and Digital Experiences': 'Web Design & Digital Craft',
  'AI Safety and Policy':             'AI Policy & Safety',
  'AI Regulation and Policy':         'AI Policy & Safety',
  'AI Prompting':                     'AI Agents & Automation',
  'AI Tools':                         'AI Agents & Automation',
  'My Experiences':                   'Growth & Operations',
};

// Normalise a single category string through the migration map
export const migrateCategory = (category: string): string => {
  return CATEGORY_MIGRATION_MAP[category] || category;
};

// Normalise an array of categories and deduplicate
export const migrateCategories = (categories: string[]): string[] => {
  const migrated = new Set(categories.map(migrateCategory));
  return Array.from(migrated);
};

// Function to get all unique categories from posts
export const getAllCategories = (posts: BlogPost[]): string[] => {
  const categories = new Set<string>();
  
  // Add initial categories
  INITIAL_CATEGORIES.forEach(category => categories.add(category));
  
  // Add categories from posts (migrated)
  posts.forEach(post => {
    migrateCategories(post.categories).forEach(category => categories.add(category));
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
  
  // Count posts in each category (migrated)
  posts.forEach(post => {
    migrateCategories(post.categories).forEach(category => {
      const currentCount = categoryCounts.get(category) || 0;
      categoryCounts.set(category, currentCount + 1);
    });
  });
  
  return Array.from(categoryCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .filter(({ count }) => count > 0) // Only show categories that have posts
    .sort((a, b) => b.count - a.count);
};

// Function to get the most relevant categories for a post
export const getRelevantCategories = (post: BlogPost, allCategories: string[]): string[] => {
  // If post already has categories, use those (migrated)
  if (post.categories.length > 0) {
    return migrateCategories(post.categories);
  }
  
  // Otherwise, try to determine relevant categories based on content
  const content = post.content.toLowerCase();
  const title = post.title.toLowerCase();
  
  return allCategories.filter(category => {
    const categoryLower = category.toLowerCase();
    return content.includes(categoryLower) || title.includes(categoryLower);
  });
}; 