"use client";

import { useState, useMemo, useCallback } from "react";
import {
    calculateQuickEstimate,
    calculateDetailedEstimate,
    formatMDL,
    formatCO2,
    availableMaterialTypes,
    availableUnits,
    availableConditions,
    type QuickEstimateInput,
    type QuickEstimateResult,
    type DetailedMaterialInput,
    type DetailedEstimateResult,
} from "@/lib/demolition-calculator";
import { buildingTypeLabels, type BuildingType } from "@/lib/demolition-data";
import { cn } from "@/lib/utils";
import {
    Building2,
    Home,
    Landmark,
    Store,
    Warehouse,
    Factory,
    GraduationCap,
    Cross,
    Calculator,
    Plus,
    X,
    Leaf,
    TrendingUp,
    Trash2,
    ArrowRight,
} from "lucide-react";

// ── Icon mapping for building types ──
const buildingIcons: Record<BuildingType, React.ElementType> = {
    'residential-apartment': Building2,
    'residential-house': Home,
    'commercial-office': Landmark,
    'commercial-retail': Store,
    'industrial-warehouse': Warehouse,
    'industrial-factory': Factory,
    'public-school': GraduationCap,
    'public-hospital': Cross,
};

type TabMode = "quick" | "detailed";

export default function DemolitionCalculator() {
    const [activeTab, setActiveTab] = useState<TabMode>("quick");

    // ── Quick estimate state ──
    const [quickInput, setQuickInput] = useState<QuickEstimateInput>({
        buildingType: "",
        area: 0,
        floors: 1,
        year: 2000,
    });
    const [quickResult, setQuickResult] = useState<QuickEstimateResult | null>(null);

    // ── Detailed estimate state ──
    const [detailedInputs, setDetailedInputs] = useState<DetailedMaterialInput[]>([
        { materialType: "", quantity: 0, unit: "tone", condition: "Bun" },
    ]);
    const [detailedResult, setDetailedResult] = useState<DetailedEstimateResult | null>(null);

    // ── Quick estimate handlers ──
    const handleQuickCalculate = useCallback(() => {
        if (!quickInput.buildingType || quickInput.area <= 0) return;
        const result = calculateQuickEstimate(quickInput);
        setQuickResult(result);
    }, [quickInput]);

    const selectBuildingType = useCallback((type: BuildingType) => {
        setQuickInput((prev) => ({ ...prev, buildingType: type }));
        setQuickResult(null);
    }, []);

    // ── Detailed estimate handlers ──
    const addDetailedRow = useCallback(() => {
        setDetailedInputs((prev) => [
            ...prev,
            { materialType: "", quantity: 0, unit: "tone", condition: "Bun" },
        ]);
    }, []);

    const removeDetailedRow = useCallback((index: number) => {
        setDetailedInputs((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const updateDetailedRow = useCallback(
        (index: number, field: keyof DetailedMaterialInput, value: string | number) => {
            setDetailedInputs((prev) =>
                prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
            );
        },
        []
    );

    const handleDetailedCalculate = useCallback(() => {
        const validInputs = detailedInputs.filter((i) => i.materialType && i.quantity > 0);
        if (validInputs.length === 0) return;
        const result = calculateDetailedEstimate(validInputs);
        setDetailedResult(result);
    }, [detailedInputs]);

    // ── Building type entries for the grid ──
    const buildingTypes = useMemo(
        () =>
            (Object.entries(buildingTypeLabels) as [BuildingType, string][]).map(([key, label]) => ({
                key,
                label,
                Icon: buildingIcons[key],
            })),
        []
    );

    return (
        <div className="space-y-5">
            {/* Tab Headers */}
            <div className="flex rounded-lg bg-sand p-1 gap-1">
                <button
                    onClick={() => {
                        setActiveTab("quick");
                        setDetailedResult(null);
                    }}
                    className={cn(
                        "flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
                        activeTab === "quick"
                            ? "bg-forest text-white"
                            : "text-stone hover:text-charcoal hover:bg-chalk/60"
                    )}
                >
                    <span className="flex items-center justify-center gap-2">
                        <Calculator className="h-4 w-4" strokeWidth={1.5} />
                        Estimare Rapidă
                    </span>
                </button>
                <button
                    onClick={() => {
                        setActiveTab("detailed");
                        setQuickResult(null);
                    }}
                    className={cn(
                        "flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
                        activeTab === "detailed"
                            ? "bg-forest text-white"
                            : "text-stone hover:text-charcoal hover:bg-chalk/60"
                    )}
                >
                    <span className="flex items-center justify-center gap-2">
                        <TrendingUp className="h-4 w-4" strokeWidth={1.5} />
                        Detaliat pe Componente
                    </span>
                </button>
            </div>

            {/* ── Quick Estimate Tab ── */}
            {activeTab === "quick" && (
                <div className="space-y-5">
                    {/* Building type selector grid */}
                    <div>
                        <label className="block text-xs font-semibold text-stone uppercase tracking-wide mb-2">
                            Tipul clădirii
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {buildingTypes.map(({ key, label, Icon }) => (
                                <button
                                    key={key}
                                    onClick={() => selectBuildingType(key)}
                                    className={cn(
                                        "flex flex-col items-center gap-2 rounded-xl border p-3 transition-all text-center",
                                        quickInput.buildingType === key
                                            ? "border-forest bg-forest/5 ring-1 ring-forest text-forest"
                                            : "border-stone/20 bg-chalk text-stone hover:border-stone hover:bg-stone/5"
                                    )}
                                >
                                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                                    <span className="text-[11px] font-semibold leading-tight">
                                        {label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input fields */}
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-[11px] font-semibold text-stone uppercase tracking-wide mb-1.5">
                                Suprafață (m²)
                            </label>
                            <input
                                type="number"
                                min={1}
                                value={quickInput.area || ""}
                                onChange={(e) =>
                                    setQuickInput((prev) => ({
                                        ...prev,
                                        area: parseFloat(e.target.value) || 0,
                                    }))
                                }
                                placeholder="ex: 2000"
                                className="w-full rounded-lg border border-stone/20 bg-chalk px-3 py-2 text-sm text-charcoal placeholder:text-stone/40 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-semibold text-stone uppercase tracking-wide mb-1.5">
                                Etaje
                            </label>
                            <input
                                type="number"
                                min={1}
                                max={30}
                                value={quickInput.floors}
                                onChange={(e) =>
                                    setQuickInput((prev) => ({
                                        ...prev,
                                        floors: parseInt(e.target.value) || 1,
                                    }))
                                }
                                className="w-full rounded-lg border border-stone/20 bg-chalk px-3 py-2 text-sm text-charcoal focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-semibold text-stone uppercase tracking-wide mb-1.5">
                                Anul construcției
                            </label>
                            <input
                                type="number"
                                min={1900}
                                max={2026}
                                value={quickInput.year}
                                onChange={(e) =>
                                    setQuickInput((prev) => ({
                                        ...prev,
                                        year: parseInt(e.target.value) || 2000,
                                    }))
                                }
                                className="w-full rounded-lg border border-stone/20 bg-chalk px-3 py-2 text-sm text-charcoal focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest transition-colors"
                            />
                        </div>
                    </div>

                    {/* Calculate button */}
                    <button
                        onClick={handleQuickCalculate}
                        disabled={!quickInput.buildingType || quickInput.area <= 0}
                        className="btn-magnetic w-full rounded-lg bg-forest px-4 py-3 text-sm font-semibold text-white hover:bg-forest/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                        <Calculator className="h-4 w-4" strokeWidth={1.5} />
                        Calculează Estimarea
                    </button>

                    {/* Quick Results */}
                    {quickResult && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {/* Summary cards */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="rounded-xl bg-forest/5 border border-forest/10 p-3 text-center">
                                    <p className="text-[10px] font-semibold text-stone uppercase tracking-wide mb-1">
                                        Valoare totală
                                    </p>
                                    <p className="font-data text-sm font-bold text-forest">
                                        {formatMDL(quickResult.totalValue)}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-eco/5 border border-eco/10 p-3 text-center">
                                    <p className="text-[10px] font-semibold text-stone uppercase tracking-wide mb-1">
                                        CO₂ economisit
                                    </p>
                                    <p className="font-data text-sm font-bold text-eco">
                                        {formatCO2(quickResult.co2Saved)}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-sage/5 border border-sage/10 p-3 text-center">
                                    <p className="text-[10px] font-semibold text-stone uppercase tracking-wide mb-1">
                                        Recuperabil
                                    </p>
                                    <p className="font-data text-sm font-bold text-sage">
                                        {quickResult.wasteDiverted.toFixed(1)} t
                                    </p>
                                </div>
                            </div>

                            {/* Materials table */}
                            <div className="rounded-xl border border-stone/20 overflow-hidden">
                                <table className="w-full text-[12px]">
                                    <thead>
                                        <tr className="bg-sand/80">
                                            <th className="px-3 py-2 text-left font-semibold text-stone">
                                                Material
                                            </th>
                                            <th className="px-3 py-2 text-right font-semibold text-stone">
                                                Cantitate
                                            </th>
                                            <th className="px-3 py-2 text-right font-semibold text-stone">
                                                Recup.
                                            </th>
                                            <th className="px-3 py-2 text-right font-semibold text-stone">
                                                Valoare
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone/10">
                                        {quickResult.materials.map((m, idx) => (
                                            <tr
                                                key={idx}
                                                className="hover:bg-sand/40 transition-colors"
                                            >
                                                <td className="px-3 py-2 font-medium text-charcoal">
                                                    {m.materialType}
                                                </td>
                                                <td className="px-3 py-2 text-right font-data text-stone">
                                                    {m.quantity} {m.unit}
                                                </td>
                                                <td className="px-3 py-2 text-right">
                                                    <span
                                                        className={cn(
                                                            "font-data font-semibold",
                                                            m.recoverabilityPercent >= 75
                                                                ? "text-eco"
                                                                : m.recoverabilityPercent >= 50
                                                                  ? "text-stone"
                                                                  : "text-red-500"
                                                        )}
                                                    >
                                                        {m.recoverabilityPercent}%
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-right font-data font-semibold text-charcoal">
                                                    {formatMDL(m.estimatedValue)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* CTA */}
                            <button className="btn-magnetic btn-cta w-full rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-charcoal hover:opacity-90 transition-colors flex items-center justify-center gap-2">
                                Listează pe Salvio
                                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── Detailed Tab ── */}
            {activeTab === "detailed" && (
                <div className="space-y-5">
                    <p className="text-xs text-stone">
                        Adăugați materialele individual pentru o estimare mai precisă a valorii de recuperare.
                    </p>

                    {/* Component rows */}
                    <div className="space-y-3">
                        {detailedInputs.map((input, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-stone/20 bg-chalk p-3 space-y-2"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[11px] font-semibold text-stone">
                                        Componenta {index + 1}
                                    </span>
                                    {detailedInputs.length > 1 && (
                                        <button
                                            onClick={() => removeDetailedRow(index)}
                                            className="rounded-lg p-1 text-stone hover:text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {/* Material type */}
                                    <div className="col-span-2 sm:col-span-1">
                                        <select
                                            value={input.materialType}
                                            onChange={(e) =>
                                                updateDetailedRow(index, "materialType", e.target.value)
                                            }
                                            className="w-full rounded-lg border border-stone/20 bg-chalk px-2.5 py-2 text-[12px] text-charcoal focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest transition-colors"
                                        >
                                            <option value="">Selectați materialul</option>
                                            {availableMaterialTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* Condition */}
                                    <div className="col-span-2 sm:col-span-1">
                                        <select
                                            value={input.condition}
                                            onChange={(e) =>
                                                updateDetailedRow(index, "condition", e.target.value)
                                            }
                                            className="w-full rounded-lg border border-stone/20 bg-chalk px-2.5 py-2 text-[12px] text-charcoal focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest transition-colors"
                                        >
                                            {availableConditions.map((cond) => (
                                                <option key={cond} value={cond}>
                                                    {cond}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* Quantity */}
                                    <div>
                                        <input
                                            type="number"
                                            min={0}
                                            step="0.1"
                                            value={input.quantity || ""}
                                            onChange={(e) =>
                                                updateDetailedRow(
                                                    index,
                                                    "quantity",
                                                    parseFloat(e.target.value) || 0
                                                )
                                            }
                                            placeholder="Cantitate"
                                            className="w-full rounded-lg border border-stone/20 bg-chalk px-2.5 py-2 text-[12px] text-charcoal placeholder:text-stone/40 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest transition-colors"
                                        />
                                    </div>
                                    {/* Unit */}
                                    <div>
                                        <select
                                            value={input.unit}
                                            onChange={(e) =>
                                                updateDetailedRow(index, "unit", e.target.value)
                                            }
                                            className="w-full rounded-lg border border-stone/20 bg-chalk px-2.5 py-2 text-[12px] text-charcoal focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest transition-colors"
                                        >
                                            {availableUnits.map((unit) => (
                                                <option key={unit} value={unit}>
                                                    {unit}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add row button */}
                    <button
                        onClick={addDetailedRow}
                        className="btn-magnetic flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-stone/30 bg-sand/50 py-2.5 text-xs font-semibold text-stone hover:border-forest hover:text-forest hover:bg-forest/5 transition-colors"
                    >
                        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        Adaugă componentă
                    </button>

                    {/* Calculate button */}
                    <button
                        onClick={handleDetailedCalculate}
                        disabled={!detailedInputs.some((i) => i.materialType && i.quantity > 0)}
                        className="btn-magnetic w-full rounded-lg bg-forest px-4 py-3 text-sm font-semibold text-white hover:bg-forest/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                        <Calculator className="h-4 w-4" strokeWidth={1.5} />
                        Calculează Valoarea
                    </button>

                    {/* Detailed Results */}
                    {detailedResult && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {/* Summary cards */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="rounded-xl bg-forest/5 border border-forest/10 p-3 text-center">
                                    <div className="flex items-center justify-center mb-1.5">
                                        <TrendingUp className="h-4 w-4 text-forest" strokeWidth={1.5} />
                                    </div>
                                    <p className="text-[10px] font-semibold text-stone uppercase tracking-wide mb-0.5">
                                        Valoare totală
                                    </p>
                                    <p className="font-data text-sm font-bold text-forest">
                                        {formatMDL(detailedResult.totalValue)}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-eco/5 border border-eco/10 p-3 text-center">
                                    <div className="flex items-center justify-center mb-1.5">
                                        <Leaf className="h-4 w-4 text-eco" strokeWidth={1.5} />
                                    </div>
                                    <p className="text-[10px] font-semibold text-stone uppercase tracking-wide mb-0.5">
                                        CO₂ economisit
                                    </p>
                                    <p className="font-data text-sm font-bold text-eco">
                                        {formatCO2(detailedResult.co2Saved)}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-sage/5 border border-sage/10 p-3 text-center">
                                    <div className="flex items-center justify-center mb-1.5">
                                        <Trash2 className="h-4 w-4 text-sage" strokeWidth={1.5} />
                                    </div>
                                    <p className="text-[10px] font-semibold text-stone uppercase tracking-wide mb-0.5">
                                        Deșeuri deviate
                                    </p>
                                    <p className="font-data text-sm font-bold text-sage">
                                        {(detailedResult.wasteDiverted / 1000).toFixed(1)} t
                                    </p>
                                </div>
                            </div>

                            {/* Materials table */}
                            <div className="rounded-xl border border-stone/20 overflow-hidden">
                                <table className="w-full text-[12px]">
                                    <thead>
                                        <tr className="bg-sand/80">
                                            <th className="px-3 py-2 text-left font-semibold text-stone">
                                                Material
                                            </th>
                                            <th className="px-3 py-2 text-right font-semibold text-stone">
                                                Cantitate
                                            </th>
                                            <th className="px-3 py-2 text-right font-semibold text-stone">
                                                Stare
                                            </th>
                                            <th className="px-3 py-2 text-right font-semibold text-stone">
                                                Valoare
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone/10">
                                        {detailedResult.materials.map((m, idx) => (
                                            <tr
                                                key={idx}
                                                className="hover:bg-sand/40 transition-colors"
                                            >
                                                <td className="px-3 py-2 font-medium text-charcoal">
                                                    {m.materialType}
                                                </td>
                                                <td className="px-3 py-2 text-right font-data text-stone">
                                                    {m.quantity} {m.unit}
                                                </td>
                                                <td className="px-3 py-2 text-right">
                                                    <span
                                                        className={cn(
                                                            "rounded-full px-2 py-0.5 text-[10px] font-bold",
                                                            m.condition === "Nou"
                                                                ? "bg-eco/10 text-eco"
                                                                : m.condition === "Bun"
                                                                  ? "bg-stone/10 text-stone"
                                                                  : m.condition === "Acceptabil"
                                                                    ? "bg-amber-100 text-amber-700"
                                                                    : "bg-stone/10 text-stone"
                                                        )}
                                                    >
                                                        {m.condition} ({m.recoverabilityPercent}%)
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-right font-data font-semibold text-charcoal">
                                                    {formatMDL(m.estimatedValue)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* CTA */}
                            <button className="btn-magnetic btn-cta w-full rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-charcoal hover:opacity-90 transition-colors flex items-center justify-center gap-2">
                                Listează pe Salvio
                                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
