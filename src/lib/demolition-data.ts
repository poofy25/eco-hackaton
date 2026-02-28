export type BuildingType =
    | 'residential-apartment'
    | 'residential-house'
    | 'commercial-office'
    | 'commercial-retail'
    | 'industrial-warehouse'
    | 'industrial-factory'
    | 'public-school'
    | 'public-hospital';

export const buildingTypeLabels: Record<BuildingType, string> = {
    'residential-apartment': 'Apartamente',
    'residential-house': 'Casă individuală',
    'commercial-office': 'Birouri',
    'commercial-retail': 'Spații comerciale',
    'industrial-warehouse': 'Depozit',
    'industrial-factory': 'Fabrică',
    'public-school': 'Școală',
    'public-hospital': 'Spital'
};

export type DemolitionAnnouncement = {
    id: string;
    title: string;
    description: string;
    city: string;
    address: string;
    coordinates: { lat: number; lng: number };
    buildingType: BuildingType;
    floors: number;
    areaSqM: number;
    totalArea: number;
    buildingYear: number;
    status: 'planned' | 'in-progress' | 'completed';
    startDate: string;
    endDate: string;
    contractor: {
        name: string;
        company: string;
        avatar: string;
    };
    estimatedYield: {
        totalValue: number;
        totalTonnage: number;
        topMaterials: string[];
    };
    estimatedMaterials: {
        materialType: string;
        recoverabilityPercent: number;
        estimatedValue: number;
    }[];
    image: string;
};

export const statusLabels: Record<string, string> = {
    'planned': 'Planificată',
    'in-progress': 'În Desfășurare',
    'completed': 'Finalizată'
};

export const moldovanCities = [
    "Chișinău", "Bălți", "Tiraspol", "Bender", "Rîbnița", "Cahul", "Ungheni",
    "Soroca", "Orhei", "Comrat", "Călărași", "Strășeni", "Ialoveni", "Hîncești"
];

export const demolitionAnnouncements: DemolitionAnnouncement[] = [
    {
        id: "dem-1",
        title: "Demolare Complex Industrial Textile",
        description: "Demolarea și dezafectarea unei foste fabrici de textile. Structură principală din cărămidă și grinzi metalice. Materiale valoroase: otel și lemn.",
        city: "Chișinău",
        address: "str. Uzinelor 15, sec. Ciocana",
        coordinates: { lat: 47.0197, lng: 28.8967 },
        buildingType: "industrial-factory",
        floors: 3,
        areaSqM: 4500,
        totalArea: 4500,
        buildingYear: 1978,
        status: "planned",
        startDate: "2026-04-10",
        endDate: "2026-06-25",
        contractor: {
            name: "Ion Popescu",
            company: "Exfactor Grup",
            avatar: "https://i.pravatar.cc/150?u=1"
        },
        estimatedYield: {
            totalValue: 850000,
            totalTonnage: 3200,
            topMaterials: ["Cărămidă", "Metal", "Lemn"]
        },
        estimatedMaterials: [
            { materialType: "Cărămidă", recoverabilityPercent: 85, estimatedValue: 300000 },
            { materialType: "Metal", recoverabilityPercent: 90, estimatedValue: 400000 },
            { materialType: "Lemn", recoverabilityPercent: 60, estimatedValue: 150000 }
        ],
        image: "https://images.unsplash.com/photo-1590496884323-289524e9ecba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "dem-2",
        title: "Reamenajare Clădire Rezidențială",
        description: "Demolare clădire rezidențială cu 4 etaje aflată în stare de avariere. Elemente de finisaj recuperabile în proporție de 40%.",
        city: "Bălți",
        address: "str. Ștefan cel Mare 85",
        coordinates: { lat: 47.7615, lng: 27.9289 },
        buildingType: "residential-apartment",
        floors: 4,
        areaSqM: 1200,
        totalArea: 1200,
        buildingYear: 1965,
        status: "in-progress",
        startDate: "2026-02-15",
        endDate: "2026-03-30",
        contractor: {
            name: "Vasile Rusu",
            company: "Dansicons",
            avatar: "https://i.pravatar.cc/150?u=2"
        },
        estimatedYield: {
            totalValue: 125000,
            totalTonnage: 850,
            topMaterials: ["Beton", "Cărămidă", "Sticlă"]
        },
        estimatedMaterials: [
            { materialType: "Beton", recoverabilityPercent: 70, estimatedValue: 50000 },
            { materialType: "Cărămidă", recoverabilityPercent: 60, estimatedValue: 40000 },
            { materialType: "Sticlă", recoverabilityPercent: 40, estimatedValue: 35000 }
        ],
        image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "dem-3",
        title: "Dezafectare Depozit Logistic",
        description: "Demolare depozit logistic pentru eliberarea terenului și construcția unui parc nou. Structură metalică complet recuperabilă și panouri sandwich.",
        city: "Chișinău",
        address: "șos. Muncești 801",
        coordinates: { lat: 46.9745, lng: 28.9113 },
        buildingType: "industrial-warehouse",
        floors: 1,
        areaSqM: 6000,
        totalArea: 6000,
        buildingYear: 1995,
        status: "completed",
        startDate: "2025-10-01",
        endDate: "2025-11-20",
        contractor: {
            name: "Mihai Botea",
            company: "Bauconstruct",
            avatar: "https://i.pravatar.cc/150?u=3"
        },
        estimatedYield: {
            totalValue: 1200000,
            totalTonnage: 1500,
            topMaterials: ["Metal", "Panouri Sandwich", "Beton"]
        },
        estimatedMaterials: [
            { materialType: "Metal", recoverabilityPercent: 95, estimatedValue: 800000 },
            { materialType: "Panouri Sandwich", recoverabilityPercent: 80, estimatedValue: 300000 },
            { materialType: "Beton", recoverabilityPercent: 60, estimatedValue: 100000 }
        ],
        image: "https://images.unsplash.com/photo-1506815340636-6169991278f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "dem-4",
        title: "Demolare Școală Abandonată",
        description: "Demolarea unei școli vechi abandonate. Materiale de bază: cărămidă solidă, planșee din lemn masiv și piatră.",
        city: "Orhei",
        address: "str. Vasile Lupu 14",
        coordinates: { lat: 47.3820, lng: 28.8239 },
        buildingType: "public-school",
        floors: 2,
        areaSqM: 2500,
        totalArea: 2500,
        buildingYear: 1950,
        status: "planned",
        startDate: "2026-05-05",
        endDate: "2026-07-15",
        contractor: {
            name: "Andrei Ciobanu",
            company: "Reconscivil",
            avatar: "https://i.pravatar.cc/150?u=4"
        },
        estimatedYield: {
            totalValue: 350000,
            totalTonnage: 1800,
            topMaterials: ["Cărămidă", "Lemn Masiv", "Piatră decorativă"]
        },
        estimatedMaterials: [
            { materialType: "Cărămidă", recoverabilityPercent: 75, estimatedValue: 150000 },
            { materialType: "Lemn Masiv", recoverabilityPercent: 60, estimatedValue: 100000 },
            { materialType: "Piatră", recoverabilityPercent: 80, estimatedValue: 100000 }
        ],
        image: "https://images.unsplash.com/photo-1541888081688-66d482c3f81e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

export function getAllAnnouncementsStats() {
    let totalValue = 0;
    let totalTonnage = 0;

    demolitionAnnouncements.forEach(a => {
        totalValue += a.estimatedYield.totalValue;
        totalTonnage += a.estimatedYield.totalTonnage;
    });

    return {
        total: demolitionAnnouncements.length,
        totalValue,
        totalTonnage
    };
}

export function getTotalEstimatedValue(announcement: DemolitionAnnouncement): number {
    return announcement.estimatedYield.totalValue;
}
