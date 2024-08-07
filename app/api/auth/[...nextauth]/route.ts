import { authOptions } from '@/lib/authOptions';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    };
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
