"use client";

import { useState } from "react";

export default function SettingsForm() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    // TODO: POST to your backend/APIM
    alert("Settings saved (mock).");
  }

  return (
    <form onSubmit={onSave} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">Notifications</legend>

        <label className="flex items-center gap-3">
          <input type="checkbox" checked={push} onChange={(e) => setPush(e.target.checked)} className="h-4 w-4" />
          <span className="text-sm">Push notifications</span>
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" checked={email} onChange={(e) => setEmail(e.target.checked)} className="h-4 w-4" />
          <span className="text-sm">Email notifications</span>
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" checked={sms} onChange={(e) => setSms(e.target.checked)} className="h-4 w-4" />
          <span className="text-sm">SMS notifications</span>
        </label>
      </fieldset>

      <div className="flex justify-end">
        <button type="submit" className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          Save changes
        </button>
      </div>
    </form>
  );
}