'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

export default function SignUpForm() {
  return (
    <div className="mx-auto text-slate-900 dark:text-white bg-white dark:bg-gray-800 px-8 pb-8 pt-2 rounded-lg w-full md:w-[500px] min-w-sm">
      <div className="w-full">
        <p className="mx-auto text-2xl font-bold text-center p-8">
          Join BlogsTree.
        </h1>
      </div>

      <div className="mt-6 ">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 mb-4">
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
