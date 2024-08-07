'use server';
import prisma from '@/lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const schema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid Email',
  }),
  password: z.string({
    invalid_type_error: 'Invalid Password',
  }),
  name: z.string({
    invalid_type_error: 'Invalid Name',
  }),
});

export async function signupUser(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const emails = prevState.formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return { message: 'User created successfully' };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      // Unique constraint failed
      return { errors: { email: ['Email is already in use'] } };
    } else {
      // Other errors
      return { errors: { general: ['An unexpected error occurred'] } };
    }
  }
}
