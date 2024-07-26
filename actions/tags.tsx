import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchTags() {
  return prisma.tag.findMany(); // Adjust according to your schema
}

export async function createTag(name: string) {
  return prisma.tag.create({
    data: { name },
  });
}
