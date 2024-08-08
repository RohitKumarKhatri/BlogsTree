'use client';
import { getAuthErrorMessage } from '@/lib/errorHandler';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

function SignIn({ isModalOpen }: { isModalOpen: boolean }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState('');
  const searchParamsError = searchParams.get('error');
  if (searchParamsError) {
    setError(searchParamsError);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      isModalOpen ? router.back() : router.push('/');
    }
  };

  return (
    <div
      className="mx-auto text-slate-900 dark:text-white bg-white
    dark:bg-gray-800 px-8 pb-8 pt-2 rounded-lg w-full md:w-[500px] min-w-sm">
      <div className="w-full">
        <p className="mx-auto text-2xl font-bold text-center p-8">
          Login to BlogsTree.
        </p>
      </div>
      {error && (
        <div className="w-full">
          <p className="mx-auto text-lg font-semibold text-center p-8 text-red-400">
            {getAuthErrorMessage(error)}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex flex-col space-y-4 items-center justify-between mb-6">
          <div className="text-sm">
            <Link
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </Link>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium bg-green-500 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Sign in
          </button>
        </div>
      </form>
      <div className="mt-6">
        <button
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4"
          onClick={() => signIn('facebook')}>
          <FaFacebook className="mr-2" /> Login with Facebook
        </button>
        <button
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={() => signIn('google')}>
          <FaGoogle className="mr-2" /> Login with Google
        </button>
      </div>
      <div className="text-sm">
        <p className="text-xl text-center p-8">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-green-600 hover:text-green-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInFormWrapper({
  isModalOpen,
}: {
  isModalOpen: boolean;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn isModalOpen={isModalOpen} />
    </Suspense>
  );
}
