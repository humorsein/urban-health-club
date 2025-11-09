"use client";
import React from "react";

type SettingsModel = {
  theme: "light" | "dark";
  notifications: boolean;
  currency: "EUR" | "USD";
};

export default function SettingsPage() {
  const [model, setModel] = React.useState<SettingsModel>({
    theme: "light",
    notifications: true,
    currency: "EUR",
  });
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/settings", { cache: "no-store" });
        if (r.ok) {
          const data = await r.json();
          setModel((m) => ({ ...m, ...data }));
        }
      } catch {
        /* ignore */
      }
    })();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const r = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(model),
      });
      if (!r.ok) throw new Error(await r.text());
      setMessage("✅ Settings saved successfully.");
    } catch (err: any) {
      setMessage(`❌ ${err?.message || "Save failed."}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-50">
        Settings
      </h1>

      <form
        onSubmit={onSubmit}
        className="space-y-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <label className="font-medium text-gray-800 dark:text-gray-100">
            Theme
          </label>
          <select
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={model.theme}
            onChange={(e) =>
              setModel((m) => ({
                ...m,
                theme: e.target.value as SettingsModel["theme"],
              }))
            }
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="font-medium text-gray-800 dark:text-gray-100">
            Notifications
          </label>
          <input
            type="checkbox"
            checked={model.notifications}
            onChange={(e) =>
              setModel((m) => ({ ...m, notifications: e.target.checked }))
            }
            className="h-5 w-5 accent-blue-600"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="font-medium text-gray-800 dark:text-gray-100">
            Default Currency
          </label>
          <select
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={model.currency}
            onChange={(e) =>
              setModel((m) => ({
                ...m,
                currency: e.target.value as SettingsModel["currency"],
              }))
            }
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>

        {message && (
          <p
            className={`text-sm ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
        This form calls <code>/api/settings</code> → APIM <code>/v1/settings</code>.
      </p>
    </main>
  );
}