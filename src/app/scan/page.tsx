"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import Link from "next/link";
import { ScanBarcode, ArrowLeft, Search, RotateCcw, ShoppingBag, Keyboard, Link2 } from "lucide-react";
import { findListingsBySku, findListingsByPartialSku, findListingsByUrl } from "@/lib/sku-lookup";
import type { Listing } from "@/lib/mock-data";
import ListingCard from "@/components/ListingCard";

const BarcodeScanner = lazy(() => import("@/components/BarcodeScanner"));

type ScanState = "scanning" | "results" | "no-results" | "manual";

export default function ScanPage() {
    const [state, setState] = useState<ScanState>("scanning");
    const [scannedCode, setScannedCode] = useState("");
    const [results, setResults] = useState<Listing[]>([]);
    const [manualInput, setManualInput] = useState("");

    const handleScanSuccess = useCallback((code: string) => {
        setScannedCode(code);
        let found = findListingsBySku(code);
        if (found.length === 0) {
            found = findListingsByPartialSku(code);
        }
        setResults(found);
        setState(found.length > 0 ? "results" : "no-results");
    }, []);

    const handleManualSearch = () => {
        const code = manualInput.trim();
        if (!code) return;
        setScannedCode(code);
        let found: Listing[];
        if (code.startsWith("http")) {
            found = findListingsByUrl(code);
        } else {
            found = findListingsBySku(code);
            if (found.length === 0) {
                found = findListingsByPartialSku(code);
            }
        }
        setResults(found);
        setState(found.length > 0 ? "results" : "no-results");
    };

    const handleReset = () => {
        setState("scanning");
        setScannedCode("");
        setResults([]);
        setManualInput("");
    };

    return (
        <main className="min-h-screen bg-sand pt-16 pb-24">
            {/* Header */}
            <div className="border-b border-stone-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 lg:px-6">
                    <div className="flex items-center gap-3 h-14">
                        <Link href="/" className="flex h-9 w-9 items-center justify-center border border-stone-200 hover:bg-forest hover:text-white transition-colors rounded-lg">
                            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                        </Link>
                        <div className="flex items-center gap-2">
                            <ScanBarcode className="h-5 w-5" strokeWidth={1.5} />
                            <h1 className="font-heading font-bold text-lg uppercase tracking-tight">Scanner SKU</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-2xl px-4 lg:px-6 py-6">
                {/* SCANNING STATE */}
                {state === "scanning" && (
                    <div className="space-y-4">
                        <div className="relative rounded-xl overflow-hidden">
                            <div className="absolute inset-0 z-20 pointer-events-none">
                                <div className="absolute top-4 left-4 w-10 h-10 border-t-3 border-l-3 border-forest rounded-tl-xl" />
                                <div className="absolute top-4 right-4 w-10 h-10 border-t-3 border-r-3 border-forest rounded-tr-xl" />
                                <div className="absolute bottom-4 left-4 w-10 h-10 border-b-3 border-l-3 border-forest rounded-bl-xl" />
                                <div className="absolute bottom-4 right-4 w-10 h-10 border-b-3 border-r-3 border-forest rounded-br-xl" />
                            </div>
                            <div className="absolute inset-x-6 z-20 pointer-events-none scan-line" />
                            <Suspense fallback={
                                <div className="flex items-center justify-center h-80 bg-black rounded-xl">
                                    <div className="h-8 w-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
                                </div>
                            }>
                                <BarcodeScanner onScanSuccess={handleScanSuccess} />
                            </Suspense>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="font-heading font-semibold text-sm text-charcoal uppercase tracking-wider">
                                Îndreptați camera spre codul de bare
                            </p>
                            <p className="text-xs text-stone">
                                Scanați codul de bare sau QR al produsului pentru a-l găsi pe Salvio
                            </p>
                        </div>
                        <button
                            onClick={() => setState("manual")}
                            className="w-full flex items-center justify-center gap-2 py-3 border border-stone-200 bg-white hover:bg-forest hover:text-white transition-colors font-semibold text-sm uppercase tracking-wider rounded-lg"
                        >
                            <Keyboard className="h-4 w-4" strokeWidth={1.5} />
                            Introduceți codul manual
                        </button>
                    </div>
                )}

                {/* RESULTS STATE */}
                {state === "results" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="bg-charcoal text-white rounded-lg px-3 py-1 font-bold text-sm uppercase tracking-wider">
                                    SKU: {scannedCode}
                                </span>
                                <span className="text-sm text-stone">
                                    {results.length} {results.length === 1 ? "rezultat" : "rezultate"}
                                </span>
                            </div>
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-stone-200 hover:bg-forest hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider rounded-lg"
                            >
                                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                                Scanează din nou
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {results.map((listing) => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                    </div>
                )}

                {/* NO RESULTS STATE */}
                {state === "no-results" && (
                    <div className="flex flex-col items-center justify-center py-16 space-y-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-stone-200">
                            <Search className="h-10 w-10 text-stone" strokeWidth={1} />
                        </div>
                        <div className="text-center space-y-2">
                            <p className="font-heading font-bold text-lg uppercase tracking-tight">
                                Niciun rezultat
                            </p>
                            <p className="text-sm text-stone max-w-xs">
                                Codul <span className="font-bold text-charcoal">{scannedCode}</span> nu a fost găsit în catalog. Încercați alt cod sau răsfoiți manual.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-2 px-5 py-3 bg-charcoal text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-colors rounded-lg"
                            >
                                <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
                                Scanează din nou
                            </button>
                            <Link
                                href="/browse"
                                className="flex items-center gap-2 px-5 py-3 border border-stone-200 font-bold text-sm uppercase tracking-wider hover:bg-forest hover:text-white transition-colors rounded-lg"
                            >
                                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                                Răsfoiește tot
                            </Link>
                        </div>
                    </div>
                )}

                {/* MANUAL STATE */}
                {state === "manual" && (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <Keyboard className="h-8 w-8 mx-auto text-stone" strokeWidth={1.5} />
                            <p className="font-heading font-bold text-lg uppercase tracking-tight">
                                Introducere manuală
                            </p>
                            <p className="text-sm text-stone">
                                Tastați codul SKU sau inserați link-ul produsului
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <div className="flex items-center gap-2 flex-1 border border-stone-200 rounded-lg bg-white px-4">
                                    <Keyboard className="h-4 w-4 text-stone shrink-0" strokeWidth={1.5} />
                                    <input
                                        type="text"
                                        value={manualInput}
                                        onChange={(e) => setManualInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleManualSearch()}
                                        placeholder="SKU sau link: 900160 / https://caparolshop.md/..."
                                        className="flex-1 py-3 bg-transparent text-sm font-semibold placeholder:text-stone focus:outline-none"
                                        autoFocus
                                    />
                                </div>
                                <button
                                    onClick={handleManualSearch}
                                    className="px-6 py-3 bg-charcoal text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-colors rounded-lg"
                                >
                                    <Search className="h-4 w-4" strokeWidth={1.5} />
                                </button>
                            </div>
                            {manualInput.startsWith("http") && (
                                <div className="flex items-center gap-2 text-xs text-stone">
                                    <Link2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                                    <span>Se va căuta după URL-ul produsului</span>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleReset}
                            className="w-full flex items-center justify-center gap-2 py-3 border border-stone-200 bg-white hover:bg-forest hover:text-white transition-colors font-semibold text-sm uppercase tracking-wider rounded-lg"
                        >
                            <ScanBarcode className="h-4 w-4" strokeWidth={1.5} />
                            Înapoi la scanner
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
