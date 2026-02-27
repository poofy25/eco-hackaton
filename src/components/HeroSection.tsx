"use client";

import Link from "next/link";
import {
  TreePine,
  Construction,
  Blocks,
  Zap,
  Droplets,
  Wrench,
  Home,
  LayoutGrid,
} from "lucide-react";

const categoryPills = [
  { name: "Lumber", icon: TreePine, href: "/browse?cat=lumber" },
  { name: "Steel", icon: Construction, href: "/browse?cat=steel" },
  { name: "Concrete", icon: Blocks, href: "/browse?cat=concrete" },
  { name: "Fixtures", icon: Wrench, href: "/browse?cat=fixtures" },
  { name: "Electrical", icon: Zap, href: "/browse?cat=electrical" },
  { name: "Plumbing", icon: Droplets, href: "/browse?cat=plumbing" },
  { name: "Roofing", icon: Home, href: "/browse?cat=roofing" },
  { name: "Tile & Stone", icon: LayoutGrid, href: "/browse?cat=tile" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-sand py-16 sm:py-24">
      {/* Topographic background pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="h-full w-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="topo" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#1B4332" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="#1B4332" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="#1B4332" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="20" fill="none" stroke="#1B4332" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-[1.1]">
            Give Materials a{" "}
            <span className="font-serif italic text-forest">Second Life.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-stone max-w-2xl mx-auto leading-relaxed">
            The marketplace for surplus construction materials. Buy for less.
            Sell what&apos;s left. Save the planet in the process.
          </p>
        </div>

        {/* Category pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {categoryPills.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="btn-magnetic flex items-center gap-2 rounded-full bg-chalk px-4 py-2.5 text-sm font-medium text-charcoal shadow-warm hover:shadow-warm-md hover:bg-white transition-all"
              >
                <Icon className="h-4 w-4 text-sage" strokeWidth={1.5} />
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
