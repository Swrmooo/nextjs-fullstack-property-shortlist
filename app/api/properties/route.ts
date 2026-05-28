import { NextResponse } from "next/server";
import { getPropertiesWithFavorites } from "./store.mjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") ?? "user-1";

  const data = await getPropertiesWithFavorites(userId);
  return NextResponse.json(data);
}
