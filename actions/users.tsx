'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUser(userid: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userid, // Replace with the actual user ID you want to fetch
      },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}
