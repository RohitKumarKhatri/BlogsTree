'use server';

import { Blog } from '@prisma/client';
import prisma from '@/lib/prisma';

export type BlogData = Omit<Blog, 'id'>;
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
