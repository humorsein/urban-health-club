import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile • Urban Health Club",
};

export default async function ProfilePage() {
  // TODO: Replace with real user profile (e.g., from your auth provider)
  const user = {
    name: "UHC Member",
    email: "member@example.com",
    memberId: "m-001",
    plan: "basic",
    status: "active",
  };

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-200" />
          <div>
            <div className="text-lg font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-gray-500">Member ID</dt>
            <dd className="text-sm font-medium">{user.memberId}</dd>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-gray-500">Plan</dt>
            <dd className="text-sm font-medium">{user.plan}</dd>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-gray-500">Status</dt>
            <dd className="text-sm font-medium">{user.status}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}