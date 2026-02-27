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

            <section className="bg-transparent border-b border-black-300">
                <div className="mx-auto max-w-7xl bg-white border-x border-black-300 px-4 sm:px-8 pb-12 sm:pb-16 pt-12 lg:pt-16">
                    <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredListings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </ScrollReveal>

                    <div className="mt-12 flex justify-center">
                        <Link href="/browse" className="flex items-center gap-2 text-sm font-bold uppercase border border-black-300 bg-[#FAF9F6] px-6 py-3 hover:bg-[#FED601] transition-colors">
                            View All Materials <ArrowRight className="h-4 w-4" strokeWidth={2} />
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="bg-transparent border-b border-black-300">
                <div className="mx-auto max-w-7xl bg-white border-x border-black-300 px-4 sm:px-8 py-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm font-bold text-black-900">
                            &copy; 2026 Salvio. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm font-bold uppercase text-black-900">
                            <Link href="#" className="hover:underline transition-all">About</Link>
                            <Link href="#" className="hover:underline transition-all">Terms</Link>
                            <Link href="#" className="hover:underline transition-all">Privacy</Link>
                            <Link href="#" className="hover:underline transition-all">Contact</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
