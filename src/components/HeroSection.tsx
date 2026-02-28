"use client";

import Link from "next/link";
import {
    TreePine, Construction, Blocks, Zap, Droplets, Wrench,
    Home, LayoutGrid, Thermometer, Paintbrush,
    DoorOpen, Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { categories } from "@/lib/mock-data";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    TreePine, Construction, Blocks, Zap, Droplets, Wrench,
    Home, LayoutGrid, Thermometer, Paintbrush, DoorOpen, Truck,
};

const providerLogos = [
    "Caparol", "Knauf", "Ceresit", "Weber", "Baumit",
    "Rigips", "Tytan", "Mapei", "Sika", "Henkel",
];

function AnimatedCounter({ end, prefix = "", suffix = "", decimals = 0 }: { end: number; prefix?: string; suffix?: string; decimals?: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const duration = 2000;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);

            setCount(end * easeProgress);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end]);

    const formatted = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString("ro-MD");
    return <>{prefix}{formatted}{suffix}</>;
}

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-transparent">
            <div className="relative mx-auto max-w-7xl h-full bg-white flex flex-col items-center px-6 lg:px-16 pt-20 pb-8">
                {/* Narrow centered content: Stats + Heading */}
                <div className="mx-auto w-full max-w-4xl text-center relative z-10 flex flex-col items-center">
                    {/* STATS PILL */}
                    <div className="mb-4 inline-flex items-center gap-3 py-2 text-xs font-medium text-stone">
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eco opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-eco"></span>
                            </span>
                        </div>
                        <span className="flex items-center gap-2 divide-x divide-stone-200 text-[11px] sm:text-xs hidden sm:flex">
                            <span className="pl-2 pr-2"><strong><AnimatedCounter end={12450} /></strong> tone salvate</span>
                            <span className="px-2"><strong><AnimatedCounter end={57.6} suffix="M" decimals={1} /></strong> MDL economisite</span>
                            <span className="pl-2"><strong><AnimatedCounter end={4800} suffix="+" /></strong> vânzători activi</span>
                        </span>
                        <span className="flex sm:hidden items-center gap-2 divide-x divide-stone-200 text-[11px]">
                            <span className="pr-1"><strong><AnimatedCounter end={12450} /></strong> tone</span>
                            <span className="px-1"><strong><AnimatedCounter end={57.6} suffix="M" decimals={1} /></strong> MDL</span>
                            <span className="pl-1"><strong><AnimatedCounter end={4800} suffix="+" /></strong> vânzători</span>
                        </span>
                    </div>

                    {/* HEADLINE + DESCRIPTION */}
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal leading-[1.1] mb-1 tracking-tight">
                        Găsește Materiale Nefolosite.
                    </h1>
                    <p className="text-sm sm:text-base text-stone max-w-xl mx-auto">
                        Piața materialelor de construcție surplus, conectând constructori și antreprenori.
                    </p>
                </div>

                {/* CATEGORY GRID — full width */}
                <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
                    {categories.map((cat) => {
                        const Icon = iconMap[cat.icon];
                        return (
                            <Link
                                key={cat.id}
                                href={`/browse?cat=${cat.id}`}
                                className="flex items-center gap-3 p-3 sm:p-4 border border-stone-200 rounded-xl bg-white hover:bg-sand transition-colors group text-left"
                            >
                                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 border border-stone-200 rounded-xl bg-sand">
                                    {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-stone group-hover:text-charcoal transition-colors" strokeWidth={1.5} />}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-semibold text-charcoal truncate">
                                        {cat.name}
                                    </p>
                                    <p className="text-[11px] sm:text-xs text-stone">
                                        {cat.count.toLocaleString()} anunțuri
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* PROVIDER LOGO SLIDER */}
                <div className="w-full overflow-hidden mt-6 relative">
                    <div className="flex animate-marquee whitespace-nowrap">
                        {[...providerLogos, ...providerLogos].map((name, i) => (
                            <span
                                key={`${name}-${i}`}
                                className="mx-6 text-sm font-semibold text-stone/30 whitespace-nowrap select-none"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
