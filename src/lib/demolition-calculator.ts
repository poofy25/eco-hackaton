export const availableMaterialTypes = [
    "Beton", "Cărămidă", "Metal", "Lemn", "Sticlă", "Plastic", "Asfalt", "Piatră", "Gips-carton"
];
export const availableUnits = ["tone", "m³", "kg", "m²"];
export const availableConditions = ["Nou", "Bun", "Acceptabil", "Rău", "Recuperat"];

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

export function formatMDL(value: number): string {
    return new Intl.NumberFormat("ro-MD", {
        style: "currency",
        currency: "MDL",
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

    return {
        totalValue,
        co2Saved,
        wasteDiverted, // kg conform rezultatului din calculator
        materials
    };
}
