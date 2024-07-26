'use client';
import { AppSession } from '@/types/Session';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import GetStartedButton from '../html/GetStartedButton';
import SearchBox from './SearchBox';

export default function NavBarMenuItems() {
  const { data: session, status } = useSession() as AppSession;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  if (status === 'loading') {
    // You can return a loading spinner or null
    return null;
  }

  return (
    <div className="flex space-x-4 md:space-x-6 lg:space-x-14 items-center justify-end font-semibold">
      <div className="hidden sm:block flex-grow mx-4 items-center">
        <SearchBox />
      </div>
      <Link href="/stories" className="hidden md:block">
        Stories
      </Link>
      <Link href="/membership" className="hidden md:block">
        Membership
      </Link>
      {session ? (
        <>
          <Link href="/write" className="hidden md:block">
            Write
          </Link>
          <div className="relative" ref={dropdownRef}>
            <div className="w-8 h-8 cursor-pointer" onClick={toggleDropdown}>
              <Image
                src={session.user.image}
                alt="Profile"
                layout="fill"
                className="rounded-full"
              />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                <Link
                  href="/settings"
                  onClick={toggleDropdown}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <Link
                  href="/profile"
                  onClick={toggleDropdown}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <button
                  onClick={() => {
                    toggleDropdown();
                    signOut();
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link href="/signin" className="hidden md:block text-nowrap">
            Sign In
          </Link>
          <GetStartedButton />
        </>
      )}
    </div>
  );
}
