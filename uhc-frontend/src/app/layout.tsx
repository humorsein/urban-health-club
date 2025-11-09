import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';
import Providers from '@/components/Providers';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Urban Health Club Platform',
  description: 'Azure APIM-connected frontend for UHC microservices',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Providers>
          {/* Navigation Bar */}
          <header className="bg-white border-b border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-800">
            <nav className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="text-lg font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Urban Health Club
                </Link>
                <div className="flex gap-5">
                  <Link href="/bookings" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
                    Bookings
                  </Link>
                  <Link href="/memberships" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
                    Memberships
                  </Link>
                  <Link href="/checkins" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
                    Check-ins
                  </Link>
                  <Link href="/settings" className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
                    Settings
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <ThemeToggle />
                <span className="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium
                   bg-gray-50 text-gray-600 border-gray-200
                   dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700
                   whitespace-nowrap">
                  connected to Azure APIM 🟢
                </span>
              </div>
            </nav>
          </header>

          {/* Page Content */}
          <main className="mx-auto max-w-7xl p-6">{children}</main>

          {/* Footer */}
          <footer className="border-t border-gray-200 mt-10 py-4 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
            © {new Date().getFullYear()} Urban Health Club. All rights reserved.
          </footer>
        </Providers>
      </body>
    </html>
  );
}