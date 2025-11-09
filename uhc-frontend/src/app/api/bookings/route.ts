// src/app/api/bookings/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.APIM_GATEWAY_URL!;
  const key  = process.env.APIM_SUBSCRIPTION_KEY!;
  const url  = `${base}/v1/bookings`;

  const resp = await fetch(url, {
    headers: { "Ocp-Apim-Subscription-Key": key },
    // avoid caching while developing
    cache: "no-store",
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    return NextResponse.json(
      { error: `Upstream ${resp.status}: ${text}` },
      { status: 502 }
    );
  }

  const data = await resp.json();
  return NextResponse.json(data);
}