"use client";

import Link from "next/link";
import { TreePine, Construction, Blocks, Zap, Droplets, Wrench, Home, LayoutGrid, Search } from "lucide-react";
import { useEffect, useState } from "react";

function AnimatedCounter({ end, prefix = "", suffix = "", decimals = 0 }: { end: number, prefix?: string, suffix?: string, decimals?: number }) {
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

const categoryPills = [
    { name: "Cherestea", icon: TreePine, href: "/browse?cat=lumber" },
    { name: "Oțel", icon: Construction, href: "/browse?cat=steel" },
    { name: "Beton", icon: Blocks, href: "/browse?cat=concrete" },
    { name: "Feronerie", icon: Wrench, href: "/browse?cat=fixtures" },
    { name: "Electrice", icon: Zap, href: "/browse?cat=electrical" },
    { name: "Sanitare", icon: Droplets, href: "/browse?cat=plumbing" },
    { name: "Acoperiș", icon: Home, href: "/browse?cat=roofing" },
    { name: "Gresie", icon: LayoutGrid, href: "/browse?cat=tile" },
];

const placeholders = [
    "Caută...",
    'Cherestea...',
    'Oțel...',
    'Beton...'
];

export default function HeroSection() {
    const [searchValue, setSearchValue] = useState("");
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden bg-transparent">
            <div className="relative mx-auto max-w-7xl h-full border-x border-black-300 bg-white min-h-[50vh] flex flex-col items-center justify-center px-8 lg:px-16 pt-16 pb-4 border-b-0">
                <div className="mx-auto w-full max-w-2xl text-center relative z-10 pt-16 flex flex-col items-center">

                    {/* Claude-style Stats Pill */}
                    <div className="mb-6 inline-flex items-center gap-3 py-2 text-xs font-medium text-black-500">
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
                            </span>
                        </div>
                        <span className="flex items-center gap-2 divide-x divide-black-300 text-[11px] sm:text-xs hidden sm:flex">
                            <span className="pl-2 pr-2"><strong><AnimatedCounter end={12450} /></strong> tone salvate</span>
                            <span className="px-2"><strong><AnimatedCounter end={57.6} suffix="M" decimals={1} /></strong> MDL economisite</span>
                            <span className="pl-2"><strong><AnimatedCounter end={4800} suffix="+" /></strong> vânzători activi</span>
                        </span>
                        <span className="flex sm:hidden items-center gap-2 divide-x divide-black-300 text-[11px]">
                            <span className="pr-1"><strong><AnimatedCounter end={12450} /></strong> tone</span>
                            <span className="px-1"><strong><AnimatedCounter end={57.6} suffix="M" decimals={1} /></strong> MDL</span>
                            <span className="pl-1"><strong><AnimatedCounter end={4800} suffix="+" /></strong> vânzători</span>
                        </span>
                    </div>

                    <h1 className="font-heading text-2xl sm:text-3xl font-bold text-black-900 leading-[1.1] mb-1 tracking-tight">
                        Găsește Materiale Nefolosite.
                    </h1>

                    <p className="text-sm sm:text-base text-black-500 mb-8 max-w-xl mx-auto">
                        Piața materialelor de construcție surplus, conectând constructori și antreprenori.
                    </p>

                    {/* Claude-style huge search input */}
                    <div className="relative w-full max-w-2xl mx-auto group mb-0">
                        {/* Animated Placeholder Overlay */}
                        {!searchValue && (
                            <div className="absolute left-6 top-0 bottom-0 pointer-events-none flex items-center overflow-hidden w-[calc(100%-5rem)]">
                                <div className="relative w-full h-[1.5em]">
                                    {placeholders.map((text, i) => {
                                        const isActive = i === placeholderIndex;
                                        const isPrev = i === (placeholderIndex - 1 + placeholders.length) % placeholders.length;

                                        let yOffset = "translate-y-full";
                                        let opacity = "opacity-0";
                                        let zIndex = 0;
                                        if (isActive) {
                                            yOffset = "translate-y-0";
                                            opacity = "opacity-100";
                                            zIndex = 10;
                                        } else if (isPrev) {
                                            yOffset = "-translate-y-full";
                                            opacity = "opacity-0";
                                        }

                                        return (
                                            <span
                                                key={i}
                                                className={`absolute left-0 top-0 transition-all duration-500 ease-in-out text-black-500 text-base ${yOffset} ${opacity}`}
                                                style={{ zIndex }}
                                            >
                                                {text}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full border border-black-300 bg-[#FAF9F6] py-4 pl-6 pr-16 text-base text-black-900 focus:outline-none focus:ring-0 focus:border-black-500 focus:bg-white transition-colors"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FED601] text-black-900 border border-black-900 h-10 w-10 flex items-center justify-center hover:bg-black-900 hover:text-[#FED601] transition-colors">
                            <Search className="h-5 w-5" strokeWidth={2} />
                        </button>
                    </div>
                    {/* Category pills */}
                    <div className="w-full flex flex-wrap justify-center gap-2 mt-4 z-10">
                        {categoryPills.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <Link
                                    key={cat.name}
                                    href={cat.href}
                                    className="flex items-center gap-1.5 bg-white border border-black-300 px-3 py-1.5 text-xs font-medium text-black-900 hover:bg-[#FAF9F6] transition-colors group"
                                >
                                    <Icon className="h-3.5 w-3.5 text-black-500 group-hover:text-black-900 transition-colors" strokeWidth={2} />
                                    {cat.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
