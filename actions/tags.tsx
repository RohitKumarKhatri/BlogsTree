'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch paginated tags
export async function fetchTags(page: number, limit: number) {
  const skip = (page - 1) * limit;
  const tags = await prisma.tag.findMany({
    skip,
    take: limit,
  });
  const totalTags = await prisma.tag.count();
  const totalPages = Math.ceil(totalTags / limit);

  return {
    tags,
    totalTags,
    totalPages,
    currentPage: page,
  };
}

// Create a new tag
export async function createTag(name: string) {
  return prisma.tag.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

export async function fetchByName(name: string) {
  return prisma.tag.findUnique({
    where: { name },
  });
}

export async function fetchTagIncludesStringAndIgnoreCase(name: string) {
  return prisma.tag.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });
}

async function linkTagsWithBlog(blogId: string, tagNames: string[]) {
  // Start a transaction
  await prisma.$transaction(async (prisma) => {
    // Process each tag
    for (const tagName of tagNames) {
      // Check if the tag exists
      let tag = await prisma.tag.findUnique({
        where: { name: tagName },
      });

      // If the tag does not exist, create it
      if (!tag) {
        tag = await prisma.tag.create({
          data: { name: tagName },
        });
      }

      // Create the BlogTag association
      await prisma.blogTag.create({
        data: {
          blogId,
          tagId: tag.id,
        },
      });
    }
  });
}

export async function fetchTrendingTags() {
  // This is a simple example, you might want to use more complex logic to get trending tags
  return await prisma.tag.findMany({
    orderBy: {
      blogs: {
        _count: 'desc',
      },
    },
    take: 10,
  });
}
