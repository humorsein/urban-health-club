"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center rounded-full border border-gray-300 bg-white px-3 text-sm hover:bg-gray-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="mr-2 inline-block h-6 w-6 overflow-hidden rounded-full bg-gray-200" />
        <span className="font-medium">Account</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
        >
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-50"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm hover:bg-gray-50"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
          <div className="my-1 h-px bg-gray-100" />
          <button
            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              // TODO: hook up sign-out
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}