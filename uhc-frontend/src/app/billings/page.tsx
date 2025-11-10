// src/app/billings/page.tsx
import React from "react";
import { fetchFromAPIM } from "@/lib/api";

type Invoice = {
  id: string;
  memberId: string;
  amount: number;
  currency: string;
  status: "open" | "paid" | "failed" | string;
  issuedAt?: string;
};

async function getBillings(): Promise<Invoice[]> {
  // server-side fetch through APIM
  return fetchFromAPIM<Invoice[]>("/v1/billings");
}

export default async function BillingsPage() {
  let data: Invoice[] = [];
  let error: string | null = null;

  try {
    data = await getBillings();
    if (!Array.isArray(data)) throw new Error("API did not return a list");
  } catch (e: any) {
    error = e?.message ?? "Failed to load billings";
  }

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Billings</h1>
        <form
          action={async (formData: FormData) => {
            "use server";
            const payload = {
              memberId: formData.get("memberId") || "m-003",
              amount: Number(formData.get("amount") || 59),
              currency: "EUR",
            };
            // POST via APIM
            await fetchFromAPIM("/v1/billings", {
              method: "POST",
              body: JSON.stringify(payload),
              headers: { "Content-Type": "application/json" },
              // small timeout to avoid long hangs
              next: { revalidate: 0 },
            });
          }}
        >
          <div className="flex gap-2">
            <input
              name="memberId"
              placeholder="memberId (m-003)"
              className="border rounded px-2 py-1 text-sm"
            />
            <input
              name="amount"
              type="number"
              step="0.01"
              placeholder="Amount (59)"
              className="border rounded px-2 py-1 text-sm w-32"
            />
            <button
              className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
              type="submit"
            >
              Create mock invoice
            </button>
          </div>
        </form>
      </div>

      {error ? (
        <div className="rounded border border-red-300 bg-red-50 text-red-700 p-3">
          Failed to load billings: {error}
        </div>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Member</th>
                <th className="px-3 py-2 text-right">Amount</th>
                <th className="px-3 py-2 text-left">Currency</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Issued</th>
              </tr>
            </thead>
            <tbody>
              {data.map((inv) => (
                <tr key={inv.id} className="border-t">
                  <td className="px-3 py-2">{inv.id}</td>
                  <td className="px-3 py-2">{inv.memberId}</td>
                  <td className="px-3 py-2 text-right">
                    {inv.amount?.toFixed?.(2) ?? inv.amount}
                  </td>
                  <td className="px-3 py-2">{inv.currency}</td>
                  <td className="px-3 py-2">
                    <span
                      className={
                        "rounded px-2 py-0.5 text-xs " +
                        (inv.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : inv.status === "open"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700")
                      }
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {inv.issuedAt ? new Date(inv.issuedAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td className="px-3 py-6 text-center text-gray-500" colSpan={6}>
                    No invoices found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}