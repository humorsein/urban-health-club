"use client";
import { useEffect, useState } from "react";

type Booking = {
  id: string;
  memberId: string;
  classId: string;
  startsAt: string;
  status: string;
};

export default function BookingsPage() {
  const [data, setData] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then(setData)
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
        Bookings
      </h1>
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
      <pre style={{ background: "#f5f5f5", padding: 12, borderRadius: 8 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
