// src/lib/api.ts
type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

export async function fetchFromAPIM<T = any>(
  path: string,
  opts: FetchOptions = {}
): Promise<T> {
  const base =
    process.env.APIM_GATEWAY_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "http://localhost:3000";

  const url = `${base}${path}`;
  const res = await fetch(url, {
    method: opts.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": process.env.APIM_SUBSCRIPTION_KEY ?? "",
      ...(opts.headers ?? {}),
    },
    ...(opts.body ? { body: JSON.stringify(opts.body) } : {}),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `APIM request failed: ${res.status} ${res.statusText} ${text}`.trim()
    );
  }

  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    try {
      return (await res.json()) as T;
    } catch {
      return (await res.text()) as unknown as T;
    }
  }
  return (await res.json()) as T;
}
