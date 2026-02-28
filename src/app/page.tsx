"use client";

import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ListingCard from "@/components/ListingCard";
import ScrollReveal from "@/components/ScrollReveal";
import { listings } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
    const featuredListings = listings.slice(0, 8);

    return (
        <>
            <HeroSection />

            <section className="bg-transparent">
                <div className="mx-auto max-w-7xl bg-white px-4 sm:px-8 pb-12 sm:pb-16 pt-12 lg:pt-12">
                    <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredListings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </ScrollReveal>

                    <div className="mt-12 flex justify-center">
                        <Link href="/browse" className="flex items-center gap-2 text-sm font-bold uppercase -300 bg-[#FAF9F6] px-6 py-3 hover:bg-[#FED601] transition-colors">
                            Vezi Toate Materialele <ArrowRight className="h-4 w-4" strokeWidth={2} />
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="bg-transparent">
                <div className="mx-auto max-w-7xl bg-white px-4 sm:px-8 py-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-mercury-600">
                            &copy; 2026 Salvio. Toate drepturile rezervate.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
