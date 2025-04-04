# Blog Post Management

This directory contains all blog posts for williamspurlock.com. Follow these instructions to add or update blog posts.

## Directory Structure

```
content/blog/
├── README.md           # This file
├── template.md         # Template for new blog posts
└── your-post-slug.md   # Your blog post files
```

## Adding a New Blog Post

1. Create a new markdown file in this directory with your post's slug as the filename (e.g., `my-new-post.md`).
2. Copy the contents of `template.md` into your new file.
3. Update the frontmatter (the section between `---` at the top) with your post's metadata:
   - `title`: Your post's title
   - `slug`: URL-friendly version of your title (e.g., "my-new-post")
   - `date`: Publication date (YYYY-MM-DD)
   - `lastModified`: Last update date (optional)
   - `categories`: Array of categories (choose from existing or create new)
   - `tags`: Array of relevant tags
   - `featured`: Whether to feature the post (boolean)
   - `draft`: Set to true while working on the post
   - `excerpt`: Short summary for previews
   - `coverImage`: Path to your cover image
   - `seo`: SEO metadata

4. Add your cover image to `/public/images/blog/your-post-slug/cover.jpg`
5. Write your post content using Markdown formatting

## Heading Structure

Use the following heading structure for automatic table of contents generation:

```markdown
## Main Section (H2)
Content here...

### Sub-Section (H3)
More content...

#### Detailed Point (H4)
Even more content...
```

The table of contents will be automatically generated from H2, H3, and H4 headings.

## Categories

Current categories include:
- AI Agents and Automations
- AI Tools
- My Experiences
- AI Prompting

Feel free to create new categories, but try to keep them consistent with existing ones.

## Images

1. Create a directory for your post's images: `/public/images/blog/your-post-slug/`
2. Add your images there
3. Reference them in your post using: `/images/blog/your-post-slug/image-name.jpg`

## Publishing Process

1. Write your post with `draft: true`
2. Preview it on the development server
3. When ready to publish:
   - Set `draft: false`
   - Update the `date` field
   - Commit and push your changes

The blog processor will automatically:
- Generate table of contents
- Calculate reading time
- Create SEO metadata
- Update the blog data file

## Development Commands

```bash
# Install dependencies
npm install

# Process blog posts
npm run process-blog

# Start development server
npm run dev
```

## Best Practices

1. **URLs**: Use descriptive, SEO-friendly slugs
2. **Images**: Optimize images before adding them
3. **Categories**: Use existing categories when possible
4. **Content**: 
   - Start with a strong introduction
   - Use clear headings
   - Include examples and code snippets
   - End with a conclusion or call-to-action
5. **SEO**:
   - Write compelling meta descriptions
   - Use relevant keywords
   - Provide alt text for images

## Troubleshooting

If you encounter issues:

1. Check the frontmatter syntax
2. Verify image paths
3. Ensure all required fields are present
4. Run `npm run process-blog` to see error messages

For more help, check the error messages in the console or contact the development team. 