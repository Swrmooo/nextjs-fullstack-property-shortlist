"use client";

import { useEffect, useMemo, useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { UserSelector } from "@/components/UserSelector";
import { fetchProperties, favoriteProperty, unfavoriteProperty } from "@/lib/api";
import type { Property } from "@/lib/types";

export default function Home() {
  const [userId, setUserId] = useState("user-1");
  const [properties, setProperties] = useState<Property[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyPropertyId, setBusyPropertyId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProperties(userId);
        if (!mounted) return;
        setProperties(data.properties);
        setFavoriteIds(data.favorites);
      } catch {
        if (!mounted) return;
        setError("Unable to load properties right now.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      mounted = false;
    };
  }, [userId]);

  const favoriteCount = useMemo(() => favoriteIds.length, [favoriteIds]);

  async function onToggleFavorite(propertyId: string, isFavorite: boolean) {
    setBusyPropertyId(propertyId);
    setError(null);

    try {
      const updatedFavorites = isFavorite
        ? await unfavoriteProperty(userId, propertyId)
        : await favoriteProperty(userId, propertyId);

      setFavoriteIds(updatedFavorites);
    } catch {
      setError("Unable to update favorite status.");
    } finally {
      setBusyPropertyId(null);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-zinc-900">Property Shortlist</h1>
          <p className="text-zinc-600">Select a user and save favorite properties to backend storage.</p>
          <div className="flex flex-wrap items-center gap-3">
            <UserSelector value={userId} onChange={setUserId} />
            <span className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-200">
              Favorites: {favoriteCount}
            </span>
          </div>
        </header>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
        ) : null}

        {loading ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-6 text-zinc-600">Loading properties...</div>
        ) : (
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favoriteIds.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                busy={busyPropertyId === property.id}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
