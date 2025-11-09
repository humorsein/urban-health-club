'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = (resolvedTheme ?? theme) === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm
                 bg-white text-gray-800 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-100
                 dark:border-gray-700 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {isDark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}