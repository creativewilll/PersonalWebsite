#!/usr/bin/env node

// Add type declaration for slugify
declare module 'slugify' {
  function slugify(str: string, options?: { lower?: boolean; strict?: boolean; remove?: RegExp }): string;
  export default slugify;
}

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import inquirer from 'inquirer';
import type { QuestionCollection } from 'inquirer';
import slugify from 'slugify';
import { BlogPostSchema, createBlogPost } from '../src/types/BlogPost';

const execAsync = promisify(exec);
const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const TEMPLATE_PATH = path.join(process.cwd(), 'src/templates/blog-post.mdx');

interface PostAnswers {
  title: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  featured: boolean;
  series: boolean;
  seriesTitle?: string;
  seriesOrder?: number;
}

const categories = [
  'AI',
  'Workflow Automation',
  'Business Technology',
  'Future of Work',
  'Automation',
  'Productivity',
  'Business Ethics',
  'Technology Management'
];

async function createNewBlogPost() {
  try {
    // Ensure directories exist
    if (!fs.existsSync(BLOG_DIR)) {
      fs.mkdirSync(BLOG_DIR, { recursive: true });
    }

    // Get post information
    const questions: QuestionCollection<PostAnswers> = [
      {
        type: 'input',
        name: 'title',
        message: 'Enter the post title:',
        validate: (input: string) => input.length > 0 || 'Title is required',
      },
      {
        type: 'input',
        name: 'excerpt',
        message: 'Enter a brief excerpt (1-2 sentences):',
        validate: (input: string) => 
          (input.length > 0 && input.length <= 280) || 
          'Excerpt must be between 1 and 280 characters',
      },
      {
        type: 'checkbox',
        name: 'categories',
        message: 'Select categories:',
        choices: categories,
        validate: (input: string[]) => 
          input.length > 0 || 'Select at least one category',
      },
      {
        type: 'input',
        name: 'tags',
        message: 'Enter tags (comma-separated):',
        filter: (input: string) => input.split(',').map(tag => tag.trim()),
      },
      {
        type: 'confirm',
        name: 'featured',
        message: 'Is this a featured post?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'series',
        message: 'Is this part of a series?',
        default: false,
      },
      {
        type: 'input',
        name: 'seriesTitle',
        message: 'Enter the series title:',
        when: (answers) => answers.series,
        validate: (input: string) => input.length > 0 || 'Series title is required',
      },
      {
        type: 'number',
        name: 'seriesOrder',
        message: 'Enter the order in the series:',
        when: (answers) => answers.series,
        validate: (input: number) => input > 0 || 'Order must be greater than 0',
      },
    ];

    const answers = await inquirer.prompt<PostAnswers>(questions);

    // Generate slug from title
    const slug = slugify(answers.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });

    // Create post directory
    const postDir = path.join(BLOG_DIR, slug);
    fs.mkdirSync(postDir, { recursive: true });

    // Create images directory
    const imagesDir = path.join(postDir, 'images');
    fs.mkdirSync(imagesDir, { recursive: true });

    // Read template
    const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

    // Replace template variables
    const postContent = template
      .replace('Your Post Title Here', answers.title)
      .replace('A compelling summary of your post in 1-2 sentences that will appear in previews and social shares.', answers.excerpt)
      .replace('/images/your-cover-image.jpg', `/blog/${slug}/images/cover.jpg`)
      .replace('"AI",\n  - "Workflow Automation"', answers.categories.map(cat => `"${cat}"`).join(',\n  - '))
      .replace('"artificial intelligence",\n  - "automation",\n  - "business technology",\n  - "productivity"', answers.tags.map(tag => `"${tag}"`).join(',\n  - '))
      .replace('featured: false', `featured: ${answers.featured}`);

    // Write the post file
    const postPath = path.join(postDir, 'index.mdx');
    fs.writeFileSync(postPath, postContent);

    // Create a placeholder cover image
    fs.copyFileSync(
      path.join(process.cwd(), 'public/images/default-blog-cover.jpg'),
      path.join(imagesDir, 'cover.jpg')
    );

    // Open in VS Code
    await execAsync(`code ${postPath}`);

    console.log(`
✨ Blog post created successfully!

Location: ${postPath}
Images Directory: ${imagesDir}

Next steps:
1. Add a cover image to ${imagesDir}/cover.jpg
2. Write your content
3. Update the metadata as needed
4. Set draft: false when ready to publish

To preview: npm run dev
To publish: git add . && git commit -m "Add ${slug}" && git push
    `);

  } catch (error) {
    console.error('Error creating blog post:', error);
    process.exit(1);
  }
}

createNewBlogPost(); 