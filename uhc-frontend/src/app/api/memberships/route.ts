import { NextResponse } from "next/server";
import { apimGet } from "../_lib/apim";

export async function GET() {
  try {
    const data = await apimGet("/v1/memberships");
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
