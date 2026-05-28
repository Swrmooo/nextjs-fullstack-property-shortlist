import { NextResponse } from "next/server";
import { addFavorite, getFavorites, removeFavorite } from "../store.mjs";

type FavoritePayload = {
  userId?: string;
  propertyId?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "Missing userId" }, { status: 400 });
  }

  const favorites = await getFavorites(userId);
  return NextResponse.json({ favorites });
}

export async function POST(request: Request) {
  const body = (await request.json()) as FavoritePayload;

  if (!body.userId || !body.propertyId) {
    return NextResponse.json(
      { message: "Missing userId or propertyId" },
      { status: 400 }
    );
  }

  try {
    const favorites = await addFavorite(body.userId, body.propertyId);
    return NextResponse.json({ favorites });
  } catch {
    return NextResponse.json({ message: "Property not found" }, { status: 404 });
  }
}

export async function DELETE(request: Request) {
  const body = (await request.json()) as FavoritePayload;

  if (!body.userId || !body.propertyId) {
    return NextResponse.json(
      { message: "Missing userId or propertyId" },
      { status: 400 }
    );
  }

  const favorites = await removeFavorite(body.userId, body.propertyId);
  return NextResponse.json({ favorites });
}
