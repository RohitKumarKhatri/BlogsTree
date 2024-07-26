import { Session } from 'next-auth';

export type SessionData = Session & {
  user: {
    id: string;
    image: string;
  };
};

export type AppSession = {
  data: SessionData | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
};
