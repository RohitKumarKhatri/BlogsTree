'use server';

import { Blog } from '@prisma/client';
import prisma from '@/lib/prisma';

export type BlogData = Omit<Blog, 'id'>;

export type BlogWithTags = BlogData & { tags?: { name: string }[] };
export async function save(blog: BlogData) {
  console.log(blog);

  try {
    const result = await prisma.blog.create({
      data: blog,
    });
    return result;
  } catch (error) {
    console.error('Failed to save blog:', error);
  }
}

export async function saveWithTags(blogWithTags: BlogWithTags) {
  // Start a transaction
  const result = await prisma.$transaction(async (prisma) => {
    // Create the blog
    const blog = await prisma.blog.create({
      data: {
        title: blogWithTags.title,
        body: blogWithTags.body,
        authorId: blogWithTags.authorId,
      },
    });

    // Process each tag
    for (const tagName of blogWithTags.tags ?? []) {
      // Check if the tag exists
      let tag = await prisma.tag.findUnique({
        where: { name: tagName.name },
      });

      // If the tag does not exist, create it
      if (!tag) {
        tag = await prisma.tag.create({
          data: { name: tagName.name.toLowerCase() },
        });
      }

      // Create the BlogTag association
      await prisma.blogTag.create({
        data: {
          blogId: blog.id,
          tagId: tag.id,
        },
      });
    }

    return blog;
  });

  return result;
}

export async function fetchBlogById(id: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    });
    return blog;
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return null;
  }
}

export async function likeBlog(id: string) {
  try {
    await prisma.blog.update({
      where: {
        id,
      },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.error('Error liking blog:', error);
  }
}

export async function commentOnBlog(id: string, comment: string) {
  try {
    await prisma.blog.update({
      where: {
        id,
      },
      data: {
        commentsCount: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.error('Error commenting on blog:', error);
  }
}

export async function fetchBlogs(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const blogs = await prisma.blog.findMany({
    skip,
    take: limit,
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const totalBlogs = await prisma.blog.count();

  return {
    blogs,
    totalBlogs,
    page,
    limit,
  };
}
