import React from "react";
import { fetchFromAPIM } from "@/lib/api";

type Membership = {
  id: string;
  plan: string;
  status: string;
};

export default async function MembershipsPage() {
  let data: Membership[] = [];
  try {
    data = await fetchFromAPIM("/v1/memberships");
  } catch (e: any) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Memberships</h1>
        <div className="text-red-600">
          Failed to load memberships: {e.message}
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Memberships</h1>
      <div className="overflow-x-auto rounded border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Plan</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((m) => (
                <tr key={m.id} className="border-t">
                  <td className="px-3 py-2">{m.id}</td>
                  <td className="px-3 py-2">{m.plan}</td>
                  <td className="px-3 py-2">{m.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-3 py-4 text-gray-500" colSpan={3}>
                  No memberships found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}