'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  await prisma.$transaction(async (prisma) => {
    for (const tagName of tagNames) {
      let tag = await prisma.tag.findUnique({
        where: { name: tagName },
      });

      if (!tag) {
        tag = await prisma.tag.create({
          data: { name: tagName },
        });
      }

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
  return await prisma.tag.findMany({
    orderBy: {
      blogs: {
        _count: 'desc',
      },
    },
    take: 10,
  });
}
