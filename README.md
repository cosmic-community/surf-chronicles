<!-- README_START -->
# LFG Cosmic

A modern surf blog platform showcasing destinations, gear reviews, and techniques. Built with Next.js and powered by Cosmic CMS, featuring beautiful surf photography and expert insights from professional surfers and photographers.

![Surf Chronicles](https://imgix.cosmicjs.com/172a62e0-5633-11f0-a051-23c10f41277a-photo-1544551763-46a013bb70d5-1751343782940.jpg?w=1200&h=400&fit=crop&auto=format,compress)

## Features

- 🏄 **Comprehensive Surf Content** - Posts covering destinations, gear reviews, and techniques
- 👥 **Author Profiles** - Detailed author pages with surf experience and social links  
- 🏷️ **Category System** - Organized content by destinations, gear reviews, and techniques
- 🎨 **Modern Design** - Clean, responsive design with Tailwind CSS
- 📱 **Mobile Optimized** - Fully responsive across all devices
- ⚡ **Fast Performance** - Built with Next.js 15 and React Server Components
- 🖼️ **Optimized Images** - imgix integration for fast, responsive images
- 🔍 **SEO Friendly** - Proper meta tags and structured data

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=test-blog-production)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a travel surf blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Set apiEnvironment: "staging" to cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **React** - Component-based UI library
- **Bun** - Fast package manager and runtime

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd surf-chronicles
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. **Run the development server**
   ```bash
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching All Posts
```typescript
import { cosmic } from '@/lib/cosmic'

const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Single Post
```typescript
const post = await cosmic.objects
  .findOne({ type: 'posts', slug: 'post-slug' })
  .depth(1)
```

### Fetching Posts by Category
```typescript
const posts = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': categoryId 
  })
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with [Cosmic](https://www.cosmicjs.com) as a headless CMS. The content structure includes:

### Object Types
- **Posts** - Main blog content with title, content, featured images, and metadata
- **Authors** - Writer profiles with bios, photos, and surf experience
- **Categories** - Content organization with descriptions and colors

### Content Features
- Rich markdown content with embedded media
- Object relationships between posts, authors, and categories
- Custom metafields for surf-specific data (locations, wave conditions, seasons)
- File uploads for featured images and author photos
- Select dropdown fields for wave conditions and seasons

For more information about Cosmic CMS, visit the [documentation](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/your-repo)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-repo)

1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Environment Variables for Production

Set these environment variables in your hosting platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

<!-- README_END -->