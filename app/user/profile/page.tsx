'use client';
import { getUser } from '@/server-actions/users';
import { AppSession } from '@/types/Session';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import Spinner from '@/components/Spinner';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession() as AppSession;
  useEffect(() => {
    if (session?.user?.id) {
      // Check if session and session.user.id are defined
      const loadUser = async () => {
        const userData = await getUser(session.user.id);
        setUser(userData);
      };

      loadUser();
    }
  }, [session?.user?.id]); // Depend on session.user.id

  if (!user) {
    return <Spinner />;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 rounded-lg shadow-md">
      <p className="text-3xl font-bold mb-4">Profile</p>
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name:
          </label>
          <div id="name" className="mt-1 text-gray-900">
            {user.name}
          </div>
        </div>
        <div>
          <label htmlFor="username" className="block font-medium text-gray-700">
            Username:
          </label>
          <div className="mt-1 text-gray-900">{user.username}</div>
        </div>
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email:
          </label>
          <div className="mt-1 text-gray-900">{user.email}</div>
        </div>
        <div>
          <label
            htmlFor="emailVerified"
            className="block font-medium text-gray-700">
            Email Verified:
          </label>
          <div className="mt-1 text-gray-900">
            {user.emailVerified ? 'Yes' : 'No'}
          </div>
        </div>
        <div>
          <label
            htmlFor="followersCount"
            className="block font-medium text-gray-700">
            Followers Count:
          </label>
          <div className="mt-1 text-gray-900">{user.followersCount}</div>
        </div>
        <div>
          <label
            htmlFor="profileImage"
            className="block font-medium text-gray-700">
            Profile Image:
          </label>
          <div className="mt-1">
            {user.image ? (
              <Image
                src={user.image}
                alt="Profile"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full"
              />
            ) : (
              <span className="text-gray-500">No image available</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
