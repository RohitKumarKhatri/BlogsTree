'use client';
import { AppSession } from '@/types/Session';
import { useSession } from 'next-auth/react';
import LoginAndSignup from './LoginAndSignup';
import ProfileButton from './ProfileButton';

export default function NavBarSessionButtons() {
  const { data: session, status } = useSession() as AppSession;

  if (status === 'loading') {
    // You can return a loading spinner or null
    return null;
  }

  return session ? <ProfileButton /> : <LoginAndSignup />;
}
