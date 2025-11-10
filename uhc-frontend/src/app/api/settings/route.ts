// src/app/api/settings/route.ts
import { NextRequest, NextResponse } from "next/server";

type Settings = {
  gatewayUrl: string;
  subscriptionKey: string;
};

// Ephemeral in-memory store for this dev server process.
// (In prod you’d persist this elsewhere.)
let SETTINGS_MEM: Settings | null = null;

export const dynamic = "force-dynamic";

/** GET /api/settings -> current settings (mask key) */
export async function GET() {
  const gw = SETTINGS_MEM?.gatewayUrl ?? process.env.APIM_GATEWAY_URL ?? "";
  const keyRaw =
    SETTINGS_MEM?.subscriptionKey ?? process.env.APIM_SUBSCRIPTION_KEY ?? "";
  const masked =
    keyRaw.length >= 6 ? `${keyRaw.slice(0, 3)}***${keyRaw.slice(-3)}` : "";

  return NextResponse.json({
    gatewayUrl: gw,
    subscriptionKey: masked,
  } as Settings);
}

/** POST /api/settings -> save new settings (body: { gatewayUrl, subscriptionKey }) */
export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Settings>;
  const gatewayUrl = (body.gatewayUrl ?? "").toString().trim();
  const subscriptionKey = (body.subscriptionKey ?? "").toString().trim();

  if (!gatewayUrl || !/^https?:\/\//i.test(gatewayUrl)) {
    return NextResponse.json(
      { error: "gatewayUrl must be an absolute URL" },
      { status: 400 }
    );
  }
  if (!subscriptionKey) {
    return NextResponse.json(
      { error: "subscriptionKey is required" },
      { status: 400 }
    );
  }

  SETTINGS_MEM = { gatewayUrl, subscriptionKey };
  return NextResponse.json({ ok: true });
}