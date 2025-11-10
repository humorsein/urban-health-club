"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/bookings", label: "Bookings" },
  { href: "/memberships", label: "Memberships" },
  { href: "/checkins", label: "Check-ins" },
];

function DesktopNav() {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex items-center gap-5">
      {NAV.map((n) => {
        const active = pathname.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            className={
              "font-medium transition-colors " +
              (active ? "text-blue-700" : "text-gray-700 hover:text-blue-600")
            }
            aria-current={active ? "page" : undefined}
          >
            {n.label}
          </Link>
        );
      })}
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div
        className={
          "fixed inset-0 bg-black/40 transition-opacity md:hidden " +
          (open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
        }
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={
          "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl md:hidden " +
          "transform transition-transform duration-200 ease-out " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between px-5 h-14 border-b">
          <span className="font-semibold text-blue-700">Urban Health Club</span>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100"
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <nav className="p-3">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={onClose}
                className={
                  "block rounded-lg px-4 py-3 mb-1 text-sm font-medium " +
                  (active ? "bg-blue-50 text-blue-700" : "text-gray-800 hover:bg-gray-50")
                }
                aria-current={active ? "page" : undefined}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-4 text-xs text-gray-400">connected to Azure APIM 🟢</div>
      </aside>
    </>
  );
}

export function AuthButtons() {
  return (
    <div className="flex gap-2">
      <button onClick={() => signIn("auth0")} className="px-3 py-1 border rounded">Sign in</button>
      <button onClick={() => signOut()} className="px-3 py-1 border rounded">Sign out</button>
    </div>
  );
}

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="md:hidden p-2 rounded hover:bg-gray-100"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <Link
            href="/"
            className="text-base sm:text-lg font-semibold text-blue-600 hover:text-blue-700"
          >
            Urban Health Club
          </Link>

          <DesktopNav />
        </div>

        <div className="hidden sm:block text-sm text-gray-400">connected to Azure APIM 🟢</div>
      </nav>

      <MobileMenu open={open} onClose={close} />
    </>
  );
}