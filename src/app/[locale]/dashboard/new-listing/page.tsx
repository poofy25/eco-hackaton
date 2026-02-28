"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Upload, X, Plus, Leaf, FileSpreadsheet, ClipboardPaste, Table2,
} from "lucide-react";
import { categories } from "@/lib/mock-data";
import { useToast } from "@/components/Toast";
import { cn } from "@/lib/utils";

const conditions = ["Surplus Nou", "Ușor Utilizat", "În Starea Actuală", "Recuperat"];

interface BulkItem {
    title: string;
    category: string;
    quantity: string;
    price: string;
    condition: string;
}

const emptyBulkItem = (): BulkItem => ({
    title: "",
    category: "",
    quantity: "1",
    price: "",
    condition: "Surplus Nou",
});

export default function NewListingPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [addMode, setAddMode] = useState<"individual" | "bulk">("individual");
    const [pricingMode, setPricingMode] = useState<"sell" | "free">("sell");
    const [locationOpen, setLocationOpen] = useState(false);
    const [bulkItems, setBulkItems] = useState<BulkItem[]>([emptyBulkItem(), emptyBulkItem(), emptyBulkItem()]);

    const addBulkItem = () => setBulkItems([...bulkItems, emptyBulkItem()]);
    const removeBulkItem = (index: number) => {
        if (bulkItems.length > 1) setBulkItems(bulkItems.filter((_, i) => i !== index));
    };
    const updateBulkItem = (index: number, field: keyof BulkItem, value: string) => {
        const updated = [...bulkItems];
        updated[index] = { ...updated[index], [field]: value };
        setBulkItems(updated);
    };
    const filledBulkCount = bulkItems.filter((i) => i.title.trim()).length;

    const handlePublish = () => { showToast("Anunțul a fost publicat cu succes!"); router.push("/dashboard/listings"); };
    const handleBulkPublish = () => { showToast(`${filledBulkCount} anunțuri publicate cu succes!`); router.push("/dashboard/listings"); };
    const handleDraft = () => { showToast("Salvat ca ciornă."); };

    return (
        <div className="max-w-3xl">
            <h1 className="font-heading text-2xl font-bold text-mercury-900 mb-2">Adaugă Anunț</h1>
            <p className="text-sm text-mercury-500 mb-6">Listează materialele tale surplus rapid și simplu.</p>

            {/* MODE SELECTOR */}
            <div className="flex gap-3 mb-8">
                <button onClick={() => setAddMode("individual")} className={cn("flex-1 py-3 text-sm font-semibold transition-colors ", addMode === "individual" ? "-900 bg-mercury-900 text-white" : "-500-200 text-mercury-500 hover:bg-mercury-50")}>Produs Individual</button>
                <button onClick={() => setAddMode("bulk")} className={cn("flex-1 py-3 text-sm font-semibold transition-colors ", addMode === "bulk" ? "-900 bg-mercury-900 text-white" : "-500-200 text-mercury-500 hover:bg-mercury-50")}>Import în Masă</button>
            </div>

            {addMode === "individual" && (
                <>
                    <section className="mb-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-mercury-500 uppercase tracking-wider">Titlu *</label>
                                <input type="text" placeholder="ex. Cherestea Brad 5×15 cm, Vopsea Caparol 10L" className="mt-1.5 w-full -500-200 bg-white px-4 py-2.5 text-sm placeholder:text-mercury-500 focus:outline-none focus:-900" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-mercury-500 uppercase tracking-wider">Categorie *</label>
                                    <select className="mt-1.5 w-full -500-200 bg-white px-4 py-2.5 text-sm text-mercury-900 focus:outline-none focus:-900">
                                        <option value="">Selectează</option>
                                        {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-mercury-500 uppercase tracking-wider">Stare</label>
                                    <select defaultValue="Surplus Nou" className="mt-1.5 w-full -500-200 bg-white px-4 py-2.5 text-sm text-mercury-900 focus:outline-none focus:-900">
                                        {conditions.map((c) => (<option key={c} value={c}>{c}</option>))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-6">
                        <div className="flex gap-3 mb-4">
                            <button onClick={() => setPricingMode("sell")} className={cn("flex-1 py-2.5 text-sm font-semibold transition-colors", pricingMode === "sell" ? "-900 bg-mercury-900/5 text-mercury-900" : "-500-200 text-mercury-500 hover:bg-mercury-50")}>Vinde</button>
                            <button onClick={() => setPricingMode("free")} className={cn("flex-1 py-2.5 text-sm font-semibold transition-colors", pricingMode === "free" ? "bg-eco/5 text-eco" : "-500-200 text-mercury-500 hover:bg-mercury-50")}>Oferă Gratuit</button>
                        </div>
                        {pricingMode === "free" && (
                            <div className="bg-eco/5 /15 p-3 flex items-center gap-2 mb-4">
                                <Leaf className="h-4 w-4 text-eco shrink-0" strokeWidth={1.5} />
                                <p className="text-xs text-mercury-900">Anunțurile gratuite primesc <span className="font-semibold">de 3× mai multă vizibilitate</span>!</p>
                            </div>
                        )}
                        <div className="grid grid-cols-3 gap-4">
                            <div><label className="text-xs font-medium text-mercury-500 uppercase tracking-wider">Cantitate *</label><input type="number" placeholder="50" className="mt-1.5 w-full -500-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:-900" /></div>
                            <div><label className="text-xs font-medium text-mercury-500 uppercase tracking-wider">Unitate</label><input type="text" placeholder="buc, m², kg" className="mt-1.5 w-full -500-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:-900" /></div>
                            {pricingMode === "sell" && (<div><label className="text-xs font-medium text-mercury-500 uppercase tracking-wider">Preț (MDL)</label><input type="number" step="0.01" placeholder="0,00" className="mt-1.5 w-full -500-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:-900" /></div>)}
                        </div>
                    </section>

                    <section className="mb-6">
                        <label className="text-xs font-medium text-mercury-500 uppercase tracking-wider">Descriere <span className="text-mercury-500/50 normal-case">(opțional)</span></label>
                        <textarea rows={2} placeholder="Adaugă detalii suplimentare..." className="mt-1.5 w-full -500-200 bg-white px-4 py-2.5 text-sm placeholder:text-mercury-500 focus:outline-none focus:-900 resize-none" />
                    </section>

                    <section className="mb-6">
                        <label className="text-xs font-medium text-mercury-500 uppercase tracking-wider mb-2 block">Fotografii <span className="text-mercury-500/50 normal-case">(opțional)</span></label>
                        <label className="flex cursor-pointer items-center justify-center gap-2 -500-200 bg-mercury-50 py-4 hover:bg-white hover:-900 transition-colors">
                            <Upload className="h-4 w-4 text-mercury-500" strokeWidth={1.5} />
                            <span className="text-sm text-mercury-500">Adaugă fotografii</span>
                            <input type="file" multiple accept="image/*" className="hidden" />
                        </label>
                    </section>

                    <section className="mb-6 -500-200 p-4">
                        <div className="flex items-center justify-between">
                            <div><p className="text-xs font-medium text-mercury-500 uppercase tracking-wider">Locație & Livrare</p><p className="text-sm text-mercury-900 mt-1">Chișinău, MD-2001 · Ridicare disponibilă</p></div>
                            <button onClick={() => setLocationOpen(!locationOpen)} className="text-xs font-semibold text-mercury-900 hover:underline">{locationOpen ? "Ascunde" : "Modifică"}</button>
                        </div>
                        {locationOpen && (
                            <div className="mt-4 space-y-3">
                                <input type="text" defaultValue="Chișinău, MD-2001" className="w-full -500-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:-900" />
                                <div className="space-y-2">
                                    {["Ridicare disponibilă", "Livrare disponibilă", "Expediere disponibilă"].map((option) => (
                                        <label key={option} className="flex items-center gap-2.5 cursor-pointer">
                                            <input type="checkbox" defaultChecked={option === "Ridicare disponibilă"} className="-500-200 text-mercury-900 focus:h-4 w-4" />
                                            <span className="text-sm text-mercury-900">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    <p className="text-xs text-mercury-500/50 mb-6">Specificațiile tehnice se generează automat în funcție de categorie.</p>

                    <div className="flex gap-3 pb-8">
                        <button onClick={handleDraft} className="flex items-center gap-2 -500-200 px-5 py-3 text-sm font-medium text-mercury-500 hover:bg-mercury-50 transition-colors ">Salvează ca Ciornă</button>
                        <button onClick={handlePublish} className="flex-1 bg-mercury-900 text-white py-3 -900 text-sm font-semibold hover:opacity-90 transition-colors ">Publică Anunțul</button>
                    </div>
                </>
            )}

            {addMode === "bulk" && (
                <>
                    <section className="mb-6">
                        <div className="flex items-center gap-2 mb-3"><FileSpreadsheet className="h-4 w-4 text-mercury-900" strokeWidth={1.5} /><h2 className="font-heading text-base font-semibold text-mercury-900">Încarcă Fișier</h2></div>
                        <label className="flex cursor-pointer flex-col items-center justify-center -500-200 bg-mercury-50 p-8 hover:bg-white hover:-900 transition-colors">
                            <Upload className="h-8 w-8 text-mercury-500 mb-2" strokeWidth={1.5} />
                            <span className="text-sm font-semibold text-mercury-900">Trage fișierul aici sau click pentru a selecta</span>
                            <span className="text-xs text-mercury-500 mt-1">CSV, Excel (.xlsx) sau JSON</span>
                            <input type="file" accept=".csv,.xlsx,.xls,.json" className="hidden" />
                        </label>
                    </section>

                    <section className="mb-6">
                        <div className="flex items-center gap-2 mb-3"><ClipboardPaste className="h-4 w-4 text-mercury-900" strokeWidth={1.5} /><h2 className="font-heading text-base font-semibold text-mercury-900">Lipește din Tabel</h2></div>
                        <p className="text-xs text-mercury-500 mb-2">Copiază rândurile din Excel sau Google Sheets.</p>
                        <textarea rows={4} placeholder={"Cherestea Brad 5×15\tCherestea & Lemn\t50\t85\tSurplus Nou"} className="w-full -500-200 bg-white px-4 py-3 text-sm font-data placeholder:text-mercury-500 focus:outline-none focus:-900 resize-none" />
                    </section>

                    <section className="mb-6">
                        <div className="flex items-center gap-2 mb-3"><Table2 className="h-4 w-4 text-mercury-900" strokeWidth={1.5} /><h2 className="font-heading text-base font-semibold text-mercury-900">Adăugare Rapidă</h2></div>
                        <div className="-500-200 overflow-x-auto">
                            <div className="grid grid-cols-[1fr_130px_70px_90px_130px_36px] gap-0 bg-mercury-50 -500-200">
                                <div className="px-3 py-2 text-[10px] font-bold text-mercury-500 uppercase tracking-wider -500-200">Titlu</div>
                                <div className="px-3 py-2 text-[10px] font-bold text-mercury-500 uppercase tracking-wider -500-200">Categorie</div>
                                <div className="px-3 py-2 text-[10px] font-bold text-mercury-500 uppercase tracking-wider -500-200">Cant.</div>
                                <div className="px-3 py-2 text-[10px] font-bold text-mercury-500 uppercase tracking-wider -500-200">Preț</div>
                                <div className="px-3 py-2 text-[10px] font-bold text-mercury-500 uppercase tracking-wider -500-200">Stare</div>
                                <div className="px-3 py-2"></div>
                            </div>
                            {bulkItems.map((item, index) => (
                                <div key={index} className="grid grid-cols-[1fr_130px_70px_90px_130px_36px] gap-0 -500-200 last:-0">
                                    <input type="text" value={item.title} onChange={(e) => updateBulkItem(index, "title", e.target.value)} placeholder="Titlu produs" className="px-3 py-2.5 -500-200 text-sm focus:outline-none focus:bg-mercury-50 placeholder:text-mercury-500" />
                                    <select value={item.category} onChange={(e) => updateBulkItem(index, "category", e.target.value)} className="px-2 py-2.5 -500-200 text-xs focus:outline-none bg-transparent"><option value="">—</option>{categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}</select>
                                    <input type="number" value={item.quantity} onChange={(e) => updateBulkItem(index, "quantity", e.target.value)} className="px-3 py-2.5 -500-200 text-sm focus:outline-none focus:bg-mercury-50" />
                                    <input type="number" value={item.price} onChange={(e) => updateBulkItem(index, "price", e.target.value)} placeholder="MDL" className="px-3 py-2.5 -500-200 text-sm focus:outline-none focus:bg-mercury-50 placeholder:text-mercury-500" />
                                    <select value={item.condition} onChange={(e) => updateBulkItem(index, "condition", e.target.value)} className="px-2 py-2.5 -500-200 text-xs focus:outline-none bg-transparent">{conditions.map((c) => (<option key={c} value={c}>{c}</option>))}</select>
                                    <button onClick={() => removeBulkItem(index)} className="flex items-center justify-center text-mercury-500 hover:text-mercury-900 transition-colors"><X className="h-4 w-4" strokeWidth={1.5} /></button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addBulkItem} className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-mercury-900 hover:opacity-70 transition-colors"><Plus className="h-3.5 w-3.5" strokeWidth={1.5} /> Adaugă rând</button>
                    </section>

                    <section className="mb-6 -500-200 p-4">
                        <p className="text-xs font-medium text-mercury-500 uppercase tracking-wider">Locație pentru toate produsele</p>
                        <input type="text" defaultValue="Chișinău, MD-2001" className="mt-2 w-full -500-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:-900" />
                    </section>

                    <div className="flex gap-3 pb-8">
                        <button onClick={handleDraft} className="flex items-center gap-2 -500-200 px-5 py-3 text-sm font-medium text-mercury-500 hover:bg-mercury-50 transition-colors ">Salvează ca Ciornă</button>
                        <button onClick={handleBulkPublish} className="flex-1 bg-mercury-900 text-white py-3 -900 text-sm font-semibold hover:opacity-90 transition-colors ">Publică Toate ({filledBulkCount} {filledBulkCount === 1 ? "anunț" : "anunțuri"})</button>
                    </div>
                </>
            )}
        </div>
    );
}
