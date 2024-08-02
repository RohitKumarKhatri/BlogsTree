'use client';
import { AppSession } from '@/types/Session';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SearchBox from './SearchBox';

export default function NavBarMenuItems() {
  const { data: session, status } = useSession() as AppSession;

  if (status === 'loading') {
    // You can return a loading spinner or null
    return null;
  }

  return (
    <div className="flex space-x-4 md:space-x-6 lg:space-x-14 items-center justify-end font-semibold">
      <div className="hidden sm:block flex-grow mx-4 items-center">
        <SearchBox />
      </div>
      <Link href="/blog/list" className="hidden lg:block">
        Stories
      </Link>
      <Link href="/membership" className="hidden md:block">
        Membership
      </Link>
      {session && (
        <Link href="/blog/write" className="hidden md:block">
          Write
        </Link>
      )}
    </div>
  );
}
