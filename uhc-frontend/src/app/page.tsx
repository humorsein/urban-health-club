import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Urban Health Club Frontend</h1>
      <p className="text-gray-700">Choose a service to test:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><Link href="/bookings" className="text-blue-600 hover:underline">Bookings</Link></li>
        <li><Link href="/memberships" className="text-blue-600 hover:underline">Memberships</Link></li>
        <li><Link href="/checkins" className="text-blue-600 hover:underline">Check-ins</Link></li>
      </ul>
    </main>
  );
}