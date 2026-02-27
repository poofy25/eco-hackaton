export function formatPrice(price: number, isFree: boolean = false): string {
  if (isFree) return "FREE";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatDistance(miles: number): string {
  if (miles < 1) return `${(miles * 5280).toFixed(0)} ft`;
  return `${miles.toFixed(1)} mi`;
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`;
  return n.toLocaleString();
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getDiscountPercent(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function getConditionColor(condition: string): string {
  switch (condition) {
    case "New Surplus":
      return "bg-eco-green/10 text-eco-green";
    case "Lightly Used":
      return "bg-sage/10 text-sage";
    case "As-Is":
      return "bg-terracotta/10 text-terracotta";
    case "Salvage":
      return "bg-stone/10 text-stone";
    default:
      return "bg-stone/10 text-stone";
  }
}

export function estimateImpact(listing: { category: string; quantity: number }): {
  wasteKg: number;
  co2Kg: number;
} {
  const categoryWeights: Record<string, number> = {
    lumber: 2.5,
    steel: 8.0,
    concrete: 12.0,
    tile: 3.0,
    electrical: 0.5,
    plumbing: 1.5,
    fixtures: 0.8,
    roofing: 4.0,
    insulation: 1.0,
    paint: 4.5,
    doors: 25.0,
    equipment: 50.0,
  };
  const weight = categoryWeights[listing.category] || 2.0;
  const wasteKg = Math.round(listing.quantity * weight);
  const co2Kg = Math.round(wasteKg * 0.75);
  return { wasteKg, co2Kg };
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
