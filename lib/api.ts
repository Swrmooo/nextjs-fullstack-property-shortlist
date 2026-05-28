import type { PropertiesResponse } from "./types";

export async function fetchProperties(userId: string): Promise<PropertiesResponse> {
  const response = await fetch(`/api/properties?userId=${encodeURIComponent(userId)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  return response.json() as Promise<PropertiesResponse>;
}

export async function favoriteProperty(userId: string, propertyId: string): Promise<string[]> {
  const response = await fetch("/api/properties/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, propertyId }),
  });

  if (!response.ok) {
    throw new Error("Failed to favorite property");
  }

  const data = (await response.json()) as { favorites: string[] };
  return data.favorites;
}

export async function unfavoriteProperty(userId: string, propertyId: string): Promise<string[]> {
  const response = await fetch("/api/properties/favorites", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, propertyId }),
  });

  if (!response.ok) {
    throw new Error("Failed to unfavorite property");
  }

  const data = (await response.json()) as { favorites: string[] };
  return data.favorites;
}
