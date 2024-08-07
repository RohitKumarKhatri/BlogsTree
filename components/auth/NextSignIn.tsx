'use client';

import { signIn, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';

const NextSignIn = () => {
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    const setTheProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setTheProviders();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <p className="text-2xl font-semibold mb-4 text-center">Sign In</p>
        <div className="space-y-4">
          {providers &&
            Object.values(providers).map((provider: any) => (
              <div key={provider.name}>
                <button
                  onClick={() => signIn(provider.id)}
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NextSignIn;
