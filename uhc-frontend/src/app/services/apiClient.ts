export async function fetchFromAPIM<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_APIM_URL || "https://api.urbanhealth.club/v1";

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Ocp-Apim-Subscription-Key":
        process.env.NEXT_PUBLIC_APIM_SUB_KEY || "eecd6df2535941c0817af32ecadbc794",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }

  return res.json();
}