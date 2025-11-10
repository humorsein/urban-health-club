'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <button
        className="rounded-md border px-3 py-1.5 text-sm text-gray-500 dark:text-gray-300"
        disabled
      >
        Checking…
      </button>
    );
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn('auth0')}
        className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Sign in
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-300">
        {session.user?.name ?? 'Signed in'}
      </span>
      <button
        onClick={() => signOut()}
        className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        Sign out
      </button>
    </div>
  );
}
