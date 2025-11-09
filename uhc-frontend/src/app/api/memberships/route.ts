import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.APIM_BASE_URL;
  const key = process.env.APIM_SUBSCRIPTION_KEY;

  if (!base || !key) {
    return NextResponse.json(
      { error: "Missing APIM_BASE_URL or APIM_SUBSCRIPTION_KEY" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${base}/v1/memberships`, {
      headers: { "Ocp-Apim-Subscription-Key": key },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
