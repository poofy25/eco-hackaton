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
    { name: "Caparol", logo: "caparol.png" }, { name: "Nanomarket", logo: "nanomarket.png" },
    { name: "Supraten", logo: "supraten.png" }, { name: "Bauconstruct", logo: "bauconstruct.png" },
    { name: "Profmet", logo: "profmet.png" }, { name: "Bicomplex", logo: "bicomplex.png" },
    { name: "Domic.md", logo: "domic.png" }, { name: "Dansicons", logo: "dansicons.png" },
    { name: "Exfactor", logo: "exfactor.png" }, { name: "Reconscivil", logo: "reconscivil.png" },
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
            <div className="relative mx-auto max-w-7xl h-full bg-white flex flex-col items-start px-8 pt-8 pb-0">
                {/* Stats + Heading */}
                <div className="w-full text-left relative z-10 flex flex-col items-start mb-3">
                    {/* HEADLINE + DESCRIPTION */}
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold text-mercury-900 leading-[1.1] mb-2 tracking-tight">
                        Găsește Materiale Nefolosite.
                    </h1>
                    <p className="text-sm sm:text-base text-mercury-500 max-w-xl mb-5">
                        Piața materialelor de construcție surplus, conectând constructori și antreprenori.
                    </p>

                    {/* STATS PILL */}
                    <div className="inline-flex items-center gap-2 bg-mercury-900 text-white px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide">
                        <span className="relative flex h-2 w-2 flex-shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full bg-[#FED601] opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 bg-yellow-sea-600"></span>
                        </span>
                        <span>
                            <AnimatedCounter end={41452} /> Tone de Deșeuri Reutilizate
                        </span>
                    </div>
                </div>

                {/* CATEGORY GRID — full width */}
                <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                    {categories.map((cat) => {
                        const Icon = iconMap[cat.icon];
                        return (
                            <Link
                                key={cat.id}
                                href={`/browse?cat=${cat.id}`}
                                className="flex items-center gap-3 p-3 sm:p-4 border border-mercury-200 bg-white hover:bg-mercury-50 transition-colors group text-left"
                            >
                                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-mercury-50">
                                    {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-mercury-500 group-hover:text-mercury-900 transition-colors" strokeWidth={1.5} />}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-semibold text-mercury-900 truncate">
                                        {cat.name}
                                    </p>
                                    <p className="text-[11px] sm:text-xs text-mercury-500">
                                        {cat.count.toLocaleString()} anunțuri
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* PROVIDER LOGO SLIDER */}
                <div className="w-full overflow-hidden mt-12 relative">
                    <div className="flex items-center gap-12 animate-marquee whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
                        {[...providerLogos, ...providerLogos].map((company, i) => (
                            <img
                                key={`${company.name}-${i}`}
                                src={`/logos/${company.logo}`}
                                alt={company.name}
                                className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all select-none"
                                onError={(e) => {
                                    // Fallback to text if image fails to load
                                    e.currentTarget.style.display = 'none';
                                    const span = document.createElement('span');
                                    span.className = "text-sm md:text-base font-bold text-mercury-500 whitespace-nowrap uppercase tracking-wider select-none";
                                    span.innerText = company.name;
                                    e.currentTarget.parentNode?.insertBefore(span, e.currentTarget.nextSibling);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
