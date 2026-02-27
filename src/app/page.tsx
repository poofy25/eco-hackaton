"use client";

import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ImpactTicker from "@/components/ImpactTicker";
import ListingCard from "@/components/ListingCard";
import CategoryCard from "@/components/CategoryCard";
import HowItWorks from "@/components/HowItWorks";
import SocialProof from "@/components/SocialProof";
import MissionStrip from "@/components/MissionStrip";
import ScrollReveal from "@/components/ScrollReveal";
import { listings, categories } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const featuredListings = listings.slice(0, 8);
  const displayCategories = categories.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Impact Ticker */}
      <ImpactTicker />

      {/* Featured Listings */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal">
                Just Listed
              </h2>
              <Link
                href="/browse"
                className="flex items-center gap-1 text-sm font-medium text-forest hover:text-forest-light transition-colors"
              >
                View All
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-12 sm:py-16 bg-chalk">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <ScrollReveal>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal text-center mb-10">
              Browse by Category
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {displayCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works */}
      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>

      {/* Social Proof */}
      <ScrollReveal>
        <SocialProof />
      </ScrollReveal>

      {/* Mission Strip */}
      <ScrollReveal>
        <MissionStrip />
      </ScrollReveal>

      {/* Footer */}
      <footer className="bg-sand py-10 border-t border-stone/10">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-stone">
              &copy; 2026 Salvio. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-stone">
              <Link href="#" className="hover:text-charcoal transition-colors">About</Link>
              <Link href="#" className="hover:text-charcoal transition-colors">Terms</Link>
              <Link href="#" className="hover:text-charcoal transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-charcoal transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
