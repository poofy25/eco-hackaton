<<<<<<< Updated upstream
export const availableMaterialTypes = [
    "Beton", "Cărămidă", "Metal", "Lemn", "Sticlă", "Plastic", "Asfalt", "Piatră", "Gips-carton"
];
export const availableUnits = ["tone", "m³", "kg", "m²"];
export const availableConditions = ["Nou", "Bun", "Acceptabil", "Rău", "Recuperat"];

=======
// ── Types ──
>>>>>>> Stashed changes
export type QuickEstimateInput = {
    buildingType: string;
    area: number;
    floors: number;
    year: number;
};

export type QuickEstimateResult = {
    totalValue: number;
    co2Saved: number;
    wasteDiverted: number;
    materials: {
        materialType: string;
        quantity: number;
        unit: string;
        recoverabilityPercent: number;
        estimatedValue: number;
    }[];
};

export type DetailedMaterialInput = {
    materialType: string;
    quantity: number;
    unit: string;
    condition: string;
};

export type DetailedEstimateResult = {
    totalValue: number;
    co2Saved: number;
    wasteDiverted: number;
    materials: {
        materialType: string;
        quantity: number;
        unit: string;
        condition: string;
        recoverabilityPercent: number;
        estimatedValue: number;
    }[];
};

<<<<<<< Updated upstream
=======
// ── Constants ──
export const availableMaterialTypes = [
    "Beton",
    "Oțel",
    "Cherestea",
    "Cărămidă",
    "Sticlă",
    "Plastice",
    "Aluminiu",
    "Cupru",
    "Plumb",
] as const;

export const availableUnits = ["tone", "m³", "bucată", "m²"] as const;

export const availableConditions = ["Nou", "Bun", "Acceptabil", "Uzurat"] as const;

// ── Material value estimates (MDL per unit) ──
const materialValuePerTon: Record<string, number> = {
    Beton: 800,
    Oțel: 12000,
    Cherestea: 4500,
    Cărămidă: 2500,
    Sticlă: 1500,
    Plastice: 3000,
    Aluminiu: 18000,
    Cupru: 45000,
    Plumb: 22000,
};

const conditionMultiplier: Record<string, number> = {
    Nou: 1.0,
    Bun: 0.85,
    Acceptabil: 0.6,
    Uzurat: 0.4,
};

// ── Formatting ──
>>>>>>> Stashed changes
export function formatMDL(value: number): string {
    return new Intl.NumberFormat("ro-MD", {
        style: "currency",
        currency: "MDL",
<<<<<<< Updated upstream
        maximumFractionDigits: 0
    }).format(value);
}

export function formatCO2(value: number): string {
    return `${value.toLocaleString("ro-MD")} kg`;
}

export function calculateQuickEstimate(input: QuickEstimateInput): QuickEstimateResult {
    // Estimarea se bazează pe suprafață și tipul clădirii
    const density = 1.15; // tone per m2 per floor (generos)
    const totalWeight = input.area * input.floors * density;

    // Distribuție aproximativă de materiale pentru diverse clădiri
    const materialsBase = [
        { type: "Beton", share: 0.65, valPerTon: 450 },
        { type: "Cărămidă", share: 0.15, valPerTon: 800 },
        { type: "Metal", share: 0.08, valPerTon: 3500 },
        { type: "Lemn", share: 0.05, valPerTon: 1200 },
        { type: "Materiale diverse", share: 0.07, valPerTon: 200 }
    ];

    const resultMaterials = materialsBase.map(m => {
        const qty = totalWeight * m.share;
        const recoverability = Math.floor(70 + Math.random() * 20); // 70-90%
        const val = qty * m.valPerTon * (recoverability / 100);
        return {
            materialType: m.type,
            quantity: Math.round(qty),
            unit: "tone",
            recoverabilityPercent: recoverability,
            estimatedValue: Math.round(val)
        };
    });

    const totalValue = resultMaterials.reduce((acc, curr) => acc + curr.estimatedValue, 0);
    const co2SavedKg = Math.round(totalWeight * 780); // 780kg CO2 economisit per tonă recuperată

    return {
        totalValue,
        co2Saved: co2SavedKg,
        wasteDiverted: totalWeight * 0.88,
        materials: resultMaterials
    };
}

export function calculateDetailedEstimate(inputs: DetailedMaterialInput[]): DetailedEstimateResult {
    const materials = inputs.map(input => {
        const recoverability = input.condition === "Nou" ? 95 :
            input.condition === "Bun" ? 85 :
                input.condition === "Acceptabil" ? 65 :
                    input.condition === "Recuperat" ? 90 : 30;

        const pricePerUnit = input.materialType === "Metal" ? 4000 :
            input.materialType === "Lemn" ? 1500 :
                input.materialType === "Cărămidă" ? 900 : 500;

        const val = input.quantity * pricePerUnit * (recoverability / 100);
        return {
            ...input,
            recoverabilityPercent: recoverability,
            estimatedValue: Math.round(val)
        };
    });

    const totalValue = materials.reduce((acc, curr) => acc + curr.estimatedValue, 0);
    const wasteDiverted = materials.reduce((acc, curr) => acc + (curr.unit === "tone" ? curr.quantity : curr.quantity / 1000), 0) * 1000;
    const co2Saved = Math.round(wasteDiverted * 0.75);
=======
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatCO2(kg: number): string {
    if (kg >= 1000) return `${(kg / 1000).toFixed(1)} t CO₂`;
    return `${Math.round(kg)} kg CO₂`;
}

// ── Quick estimate: building type + area → materials breakdown ──
const buildingTypeMaterialMix: Record<
    string,
    { material: string; kgPerSqm: number; recoverability: number }[]
> = {
    "residential-apartment": [
        { material: "Beton", kgPerSqm: 180, recoverability: 65 },
        { material: "Oțel", kgPerSqm: 25, recoverability: 90 },
        { material: "Cherestea", kgPerSqm: 15, recoverability: 75 },
        { material: "Cărămidă", kgPerSqm: 80, recoverability: 70 },
    ],
    "residential-house": [
        { material: "Cherestea", kgPerSqm: 120, recoverability: 80 },
        { material: "Cărămidă", kgPerSqm: 150, recoverability: 70 },
        { material: "Beton", kgPerSqm: 50, recoverability: 60 },
        { material: "Oțel", kgPerSqm: 8, recoverability: 95 },
    ],
    "commercial-office": [
        { material: "Beton", kgPerSqm: 220, recoverability: 60 },
        { material: "Oțel", kgPerSqm: 45, recoverability: 92 },
        { material: "Sticlă", kgPerSqm: 35, recoverability: 85 },
        { material: "Aluminiu", kgPerSqm: 12, recoverability: 95 },
    ],
    "commercial-retail": [
        { material: "Beton", kgPerSqm: 200, recoverability: 62 },
        { material: "Oțel", kgPerSqm: 35, recoverability: 90 },
        { material: "Sticlă", kgPerSqm: 40, recoverability: 88 },
    ],
    "industrial-warehouse": [
        { material: "Oțel", kgPerSqm: 80, recoverability: 92 },
        { material: "Beton", kgPerSqm: 120, recoverability: 55 },
    ],
    "industrial-factory": [
        { material: "Oțel", kgPerSqm: 100, recoverability: 90 },
        { material: "Beton", kgPerSqm: 150, recoverability: 50 },
        { material: "Cupru", kgPerSqm: 2, recoverability: 98 },
    ],
    "public-school": [
        { material: "Beton", kgPerSqm: 190, recoverability: 63 },
        { material: "Cărămidă", kgPerSqm: 60, recoverability: 72 },
        { material: "Oțel", kgPerSqm: 20, recoverability: 88 },
    ],
    "public-hospital": [
        { material: "Beton", kgPerSqm: 210, recoverability: 61 },
        { material: "Oțel", kgPerSqm: 30, recoverability: 91 },
        { material: "Sticlă", kgPerSqm: 25, recoverability: 86 },
    ],
};

export function calculateQuickEstimate(input: QuickEstimateInput): QuickEstimateResult {
    const mix = buildingTypeMaterialMix[input.buildingType];
    if (!mix || input.area <= 0) {
        return {
            totalValue: 0,
            co2Saved: 0,
            wasteDiverted: 0,
            materials: [],
        };
    }

    const totalArea = input.area * input.floors;
    const yearFactor = input.year < 1980 ? 0.9 : input.year < 2000 ? 0.95 : 1.0;

    const materials = mix.map((m) => {
        const quantityKg = m.kgPerSqm * totalArea * yearFactor;
        const quantityT = quantityKg / 1000;
        const valuePerTon = materialValuePerTon[m.material] ?? 5000;
        const estimatedValue = Math.round(
            quantityT * valuePerTon * (m.recoverability / 100)
        );

        return {
            materialType: m.material,
            quantity: parseFloat(quantityT.toFixed(1)),
            unit: "t",
            recoverabilityPercent: m.recoverability,
            estimatedValue,
        };
    });

    const totalValue = materials.reduce((sum, m) => sum + m.estimatedValue, 0);
    const wasteDiverted = materials.reduce(
        (sum, m) => sum + m.quantity * 1000 * (m.recoverabilityPercent / 100),
        0
    );
    const co2Saved = Math.round(wasteDiverted * 0.5); // ~0.5 kg CO2 per kg diverted
>>>>>>> Stashed changes

    return {
        totalValue,
        co2Saved,
<<<<<<< Updated upstream
        wasteDiverted, // kg conform rezultatului din calculator
        materials
=======
        wasteDiverted,
        materials,
    };
}

export function calculateDetailedEstimate(
    inputs: DetailedMaterialInput[]
): DetailedEstimateResult {
    const materials = inputs
        .filter((i) => i.materialType && i.quantity > 0)
        .map((input) => {
            const valuePerTon = materialValuePerTon[input.materialType] ?? 5000;
            const condMult = conditionMultiplier[input.condition] ?? 0.7;
            let quantityTon = input.quantity;
            if (input.unit === "m³") quantityTon *= 2.4; // rough density
            if (input.unit === "bucată") quantityTon *= 0.05; // rough
            if (input.unit === "m²") quantityTon *= 0.02; // rough
            const recoverability =
                input.condition === "Nou"
                    ? 90
                    : input.condition === "Bun"
                      ? 75
                      : input.condition === "Acceptabil"
                        ? 55
                        : 35;
            const estimatedValue = Math.round(
                quantityTon * valuePerTon * condMult * (recoverability / 100)
            );

            return {
                materialType: input.materialType,
                quantity: input.quantity,
                unit: input.unit,
                condition: input.condition,
                recoverabilityPercent: recoverability,
                estimatedValue,
            };
        });

    const totalValue = materials.reduce((sum, m) => sum + m.estimatedValue, 0);
    const wasteDiverted = materials.reduce((sum, m) => {
        let q = m.quantity;
        if (m.unit === "m³") q *= 2400;
        else if (m.unit === "tone") q *= 1000;
        else if (m.unit === "bucată") q *= 50;
        else if (m.unit === "m²") q *= 20;
        return sum + q * (m.recoverabilityPercent / 100);
    }, 0);
    const co2Saved = Math.round(wasteDiverted * 0.5);

    return {
        totalValue,
        co2Saved,
        wasteDiverted,
        materials,
>>>>>>> Stashed changes
    };
}
