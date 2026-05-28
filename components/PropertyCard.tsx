import Image from "next/image";
import type { Property } from "@/lib/types";

type PropertyCardProps = {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (propertyId: string, isFavorite: boolean) => Promise<void>;
  busy: boolean;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

export function PropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
  busy,
}: PropertyCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="relative h-44 w-full">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">{property.title}</h2>
          <p className="text-sm text-zinc-600">{property.location}</p>
        </div>

        <p className="text-sm text-zinc-700">{property.description}</p>
        <p className="text-base font-semibold text-zinc-900">{currency.format(property.price)}</p>

        <button
          type="button"
          disabled={busy}
          onClick={() => onToggleFavorite(property.id, isFavorite)}
          className="w-full rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isFavorite ? "Unfavorite" : "Add to favorites"}
        </button>
      </div>
    </article>
  );
}
