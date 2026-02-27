import Link from "next/link";
import type { Category } from "@/lib/mock-data";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/browse?cat=${category.id}`}
      className="group relative overflow-hidden rounded-xl aspect-[4/3] card-hover"
    >
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent transition-colors group-hover:from-charcoal/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <h3 className="font-heading text-base sm:text-lg font-semibold text-white">
          {category.name}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-white/70">
          {category.count.toLocaleString()} listings
        </p>
      </div>
    </Link>
  );
}
