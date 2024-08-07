'use client';
import { getAuthErrorMessage } from '@/lib/errorHandler';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

export default function SignUpForm() {
  const router = useRouter();
  const [showEmailSignup, setShowEmailSignup] = useState(false);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError('');

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setPending(false);

      if (response.ok) {
        window.location.href = '/signin';
      } else {
        setError(result.error);
      }
    } catch (error) {
      setPending(false);
      setError('An unexpected error occurred');
    }
  };

  return showEmailSignup ? (
    <div>
      <div
        className="mx-auto text-slate-900 dark:text-white bg-white
    dark:bg-gray-800 px-8 pb-8 pt-2 rounded-lg w-full md:w-[500px] min-w-sm">
        <div className="w-full">
          <p className="mx-auto text-2xl font-bold text-center p-8">
            Signup to BlogsTree.
          </p>
        </div>
        {error && (
          <div className="w-full">
            <p className="mx-auto text-lg font-semibold text-center p-8 text-red-400">
              {getAuthErrorMessage(error)}
            </p>
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
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
              name="password"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={pending}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium bg-green-500 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Signup
            </button>
          </div>
          <div className="flex flex-col space-y-4 items-center justify-between mb-6">
            <p className="text-xl text-center p-8">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="text-green-600 hover:text-green-800">
                Sign in
              </Link>
            </p>
            <div className="text-sm">
              <button
                onClick={() => setShowEmailSignup(false)}
                className="font-medium text-blue-600 hover:text-blue-500">
                Use Other Signup Options
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="mx-auto text-slate-900 dark:text-white bg-white dark:bg-gray-800 px-8 pb-8 pt-2 rounded-lg w-full md:w-[500px] min-w-sm">
      <div className="w-full">
        <p className="mx-auto text-2xl font-bold text-center p-8">
          Join BlogsTree.
        </p>
      </div>

      <div className="mt-6 ">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 mb-4"
          onClick={() => setShowEmailSignup(true)}>
          <AiOutlineMail className="mr-2 mt-1" /> Sign up with Email
        </button>
        <button
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4"
          onClick={() => signIn('facebook')}>
          <FaFacebook className="mr-2" /> Signup with Facebook
        </button>
        <button
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={() => signIn('google')}>
          <FaGoogle className="mr-2" /> Signup with Google
        </button>

        <p className="text-xl text-center p-8">
          Already have an account?{' '}
          <Link href="/signin" className="text-green-600 hover:text-green-800">
            Sign in
          </Link>
        </p>
        <p className="p-8 text-center text-gray-500">
          Click “Sign up” to agree to BlogsTree’s Terms of Service and
          acknowledge that BlogsTree’s Privacy Policy applies to you.
        </p>
      </div>
    </div>
  );
}
