const GATEWAY = process.env.APIM_GATEWAY_URL!;
const KEY = process.env.APIM_SUBSCRIPTION_KEY!;

if (!GATEWAY || !KEY) {
  throw new Error("Missing APIM env: APIM_GATEWAY_URL or APIM_SUBSCRIPTION_KEY");
}

/** Calls Azure APIM with the subscription key, returns JSON. */
export async function apimGet(path: string) {
  const url = new URL(path, GATEWAY).toString();
  const res = await fetch(url, {
    headers: {
      "Ocp-Apim-Subscription-Key": KEY,
      "Accept": "application/json",
    },
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`APIM ${res.status} ${res.statusText} for ${url}\n${text}`);
  }
  return res.json();
}
