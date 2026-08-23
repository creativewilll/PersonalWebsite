import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  canonical?: string;
  robots?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function MetaTags({ 
  title, 
  description, 
  image = "https://williamspurlock.com/og/default-1200x630.webp",
  url = "https://williamspurlock.com",
  type = "website",
  canonical,
  robots = "index, follow, max-image-preview:large",
  imageWidth = 1200,
  imageHeight = 630,
  imageAlt = "Will Spurlock",
  publishedTime,
  modifiedTime,
  author,
}: MetaTagsProps) {
  const fullTitle = `${title} | Will Spurlock`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content="#6d28d9" />
      <link rel="canonical" href={canonical || url} />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="alternate" type="application/rss+xml" title="Will Spurlock" href="https://williamspurlock.com/feed.xml" />
      <link rel="alternate" type="text/plain" title="llms.txt" href="https://williamspurlock.com/llms.txt" />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Will Spurlock" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@creativewill02" />
      <meta name="twitter:creator" content="@creativewill02" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
