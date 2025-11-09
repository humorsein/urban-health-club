// src/app/bookings/page.tsx
import React from "react";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

type Booking = {
  id: string;
  memberId: string;
  classId: string;
  startsAt: string;
  status: string;
};

async function getBookings(): Promise<Booking[]> {
  const h = await headers(); // <-- await is required now
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";

  const base =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (host ? `${proto}://${host}` : "http://localhost:3000");

  const res = await fetch(`${base}/api/bookings`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load bookings: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export default async function BookingsPage() {
  try {
    const data = await getBookings();

    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Bookings</h1>
        <div className="overflow-x-auto rounded border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Member</th>
                <th className="px-3 py-2 text-left">Class</th>
                <th className="px-3 py-2 text-left">Starts</th>
                <th className="px-3 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="px-3 py-2">{b.id}</td>
                    <td className="px-3 py-2">{b.memberId}</td>
                    <td className="px-3 py-2">{b.classId}</td>
                    <td className="px-3 py-2">
                      {new Date(b.startsAt).toLocaleString()}
                    </td>
                    <td className="px-3 py-2">{b.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-3 py-4 text-gray-500" colSpan={5}>
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    );
  } catch (e: any) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Bookings</h1>
        <div className="text-red-600">
          Failed to load bookings: {e.message}
        </div>
      </main>
    );
  }
}