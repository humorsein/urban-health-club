import React from "react";
import { fetchFromAPIM } from "@/lib/api";

type Checkin = {
  id: string;
  memberId: string;
  location: string;
  time: string;
};

export default async function CheckinsPage() {
  let data: Checkin[] = [];
  try {
    data = await fetchFromAPIM("/v1/checkins");
  } catch (e: any) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Check-ins</h1>
        <div className="text-red-600">
          Failed to load check-ins: {e.message}
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Check-ins</h1>
      <div className="overflow-x-auto rounded border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Member</th>
              <th className="px-3 py-2 text-left">Location</th>
              <th className="px-3 py-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="px-3 py-2">{c.id}</td>
                  <td className="px-3 py-2">{c.memberId}</td>
                  <td className="px-3 py-2">{c.location}</td>
                  <td className="px-3 py-2">
                    {new Date(c.time).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-3 py-4 text-gray-500" colSpan={4}>
                  No check-ins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}