"use client";

import { useState } from "react";
import {
    Calculator, Square, Circle, Triangle, Pentagon,
    Paintbrush, Grid3X3, Box, Wallpaper,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CalculatorType = "area" | "paint" | "tile" | "concrete" | "wallpaper";

type Shape = "rectangle" | "circle" | "triangle" | "trapezoid";

const calculatorTabs: { id: CalculatorType; label: string; icon: React.ElementType }[] = [
    { id: "area", label: "Suprafață", icon: Square },
    { id: "paint", label: "Vopsea", icon: Paintbrush },
    { id: "tile", label: "Gresie", icon: Grid3X3 },
    { id: "concrete", label: "Beton", icon: Box },
    { id: "wallpaper", label: "Tapet", icon: Wallpaper },
];

const shapeOptions: { id: Shape; label: string; icon: React.ElementType }[] = [
    { id: "rectangle", label: "Dreptunghi", icon: Square },
    { id: "circle", label: "Cerc", icon: Circle },
    { id: "triangle", label: "Triunghi", icon: Triangle },
    { id: "trapezoid", label: "Trapez", icon: Pentagon },
];

const ACCENT = "#1A1A1A";
const ACCENT_LIGHT = "#1A1A1A20";
const DIM_COLOR = "#6B7280";

function InputField({
    label,
    value,
    onChange,
    unit,
    placeholder = "0",
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    unit: string;
    placeholder?: string;
}) {
    return (
        <div>
            <label className="block text-xs font-semibold text-stone uppercase tracking-wider mb-1.5">
                {label}
            </label>
            <div className="flex border border-stone-200 bg-white rounded-lg">
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 px-3 py-2.5 text-sm font-semibold text-charcoal bg-transparent focus:outline-none rounded-lg"
                    min="0"
                    step="any"
                />
                <span className="flex items-center px-3 border-l border-stone-200 bg-sand text-xs font-semibold text-stone rounded-lg">
                    {unit}
                </span>
            </div>
        </div>
    );
}

function ResultCard({ label, value, unit }: { label: string; value: string; unit: string }) {
    return (
        <div className="border border-stone-200 bg-sand p-4 rounded-xl">
            <p className="text-xs font-semibold text-stone uppercase tracking-wider mb-1">{label}</p>
            <p className="text-2xl font-bold text-charcoal">
                {value} <span className="text-sm font-semibold text-stone">{unit}</span>
            </p>
        </div>
    );
}

// ─── SVG Diagrams ────────────────────────────────────────────────────

function DimensionLine({ x1, y1, x2, y2, label, offset = 12, side = "bottom" }: {
    x1: number; y1: number; x2: number; y2: number;
    label: string; offset?: number; side?: "bottom" | "top" | "left" | "right";
}) {
    const isHorizontal = side === "bottom" || side === "top";
    const ox = side === "left" ? -offset : side === "right" ? offset : 0;
    const oy = side === "bottom" ? offset : side === "top" ? -offset : 0;
    const mx = (x1 + x2) / 2 + ox;
    const my = (y1 + y2) / 2 + oy;
    const lx1 = x1 + ox;
    const ly1 = y1 + oy;
    const lx2 = x2 + ox;
    const ly2 = y2 + oy;
    const tickSize = 4;

    return (
        <g>
            {/* main line */}
            <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke={DIM_COLOR} strokeWidth={1} />
            {/* tick marks */}
            {isHorizontal ? (
                <>
                    <line x1={lx1} y1={ly1 - tickSize} x2={lx1} y2={ly1 + tickSize} stroke={DIM_COLOR} strokeWidth={1} />
                    <line x1={lx2} y1={ly2 - tickSize} x2={lx2} y2={ly2 + tickSize} stroke={DIM_COLOR} strokeWidth={1} />
                </>
            ) : (
                <>
                    <line x1={lx1 - tickSize} y1={ly1} x2={lx1 + tickSize} y2={ly1} stroke={DIM_COLOR} strokeWidth={1} />
                    <line x1={lx2 - tickSize} y1={ly2} x2={lx2 + tickSize} y2={ly2} stroke={DIM_COLOR} strokeWidth={1} />
                </>
            )}
            {/* extension lines */}
            {isHorizontal ? (
                <>
                    <line x1={x1} y1={y1} x2={lx1} y2={ly1 + (side === "bottom" ? 2 : -2)} stroke={DIM_COLOR} strokeWidth={0.5} strokeDasharray="2,2" />
                    <line x1={x2} y1={y2} x2={lx2} y2={ly2 + (side === "bottom" ? 2 : -2)} stroke={DIM_COLOR} strokeWidth={0.5} strokeDasharray="2,2" />
                </>
            ) : (
                <>
                    <line x1={x1} y1={y1} x2={lx1 + (side === "right" ? 2 : -2)} y2={ly1} stroke={DIM_COLOR} strokeWidth={0.5} strokeDasharray="2,2" />
                    <line x1={x2} y1={y2} x2={lx2 + (side === "right" ? 2 : -2)} y2={ly2} stroke={DIM_COLOR} strokeWidth={0.5} strokeDasharray="2,2" />
                </>
            )}
            {/* label */}
            <text
                x={mx}
                y={my + (isHorizontal ? 4 : 0)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={600}
                fontFamily="monospace"
                fill={ACCENT}
            >
                {label}
            </text>
        </g>
    );
}

function AreaSvgRectangle({ length, width }: { length: number; width: number }) {
    const maxW = 200;
    const maxH = 120;
    const ratio = length && width ? Math.min(maxW / length, maxH / width) : 1;
    const rw = length ? length * ratio : maxW * 0.7;
    const rh = width ? width * ratio : maxH * 0.7;
    const cx = 150;
    const cy = 85;
    const x = cx - rw / 2;
    const y = cy - rh / 2;

    return (
        <svg viewBox="0 0 300 190" className="w-full h-auto max-h-48">
            {/* hatched fill */}
            <defs>
                <pattern id="hatch-rect" patternUnits="userSpaceOnUse" width={8} height={8} patternTransform="rotate(45)">
                    <line x1={0} y1={0} x2={0} y2={8} stroke={ACCENT} strokeWidth={0.7} strokeOpacity={0.2} />
                </pattern>
            </defs>
            <rect x={x} y={y} width={rw} height={rh} fill={ACCENT_LIGHT} stroke={ACCENT} strokeWidth={2} />
            <rect x={x} y={y} width={rw} height={rh} fill="url(#hatch-rect)" />
            <DimensionLine x1={x} y1={y + rh} x2={x + rw} y2={y + rh} label={length ? `${length} m` : "L"} offset={18} side="bottom" />
            <DimensionLine x1={x + rw} y1={y} x2={x + rw} y2={y + rh} label={width ? `${width} m` : "l"} offset={18} side="right" />
        </svg>
    );
}

function AreaSvgCircle({ radius }: { radius: number }) {
    const maxR = 65;
    const r = radius ? Math.min(radius * 20, maxR) : maxR * 0.7;
    const cx = 150;
    const cy = 90;

    return (
        <svg viewBox="0 0 300 190" className="w-full h-auto max-h-48">
            <defs>
                <pattern id="hatch-circ" patternUnits="userSpaceOnUse" width={8} height={8} patternTransform="rotate(45)">
                    <line x1={0} y1={0} x2={0} y2={8} stroke={ACCENT} strokeWidth={0.7} strokeOpacity={0.2} />
                </pattern>
            </defs>
            <circle cx={cx} cy={cy} r={r} fill={ACCENT_LIGHT} stroke={ACCENT} strokeWidth={2} />
            <circle cx={cx} cy={cy} r={r} fill="url(#hatch-circ)" />
            {/* radius line */}
            <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke={ACCENT} strokeWidth={1.5} strokeDasharray="4,3" />
            <circle cx={cx} cy={cy} r={2.5} fill={ACCENT} />
            <text x={cx + r / 2} y={cy - 8} textAnchor="middle" fontSize={11} fontWeight={600} fontFamily="monospace" fill={ACCENT}>
                {radius ? `${radius} m` : "r"}
            </text>
        </svg>
    );
}

function AreaSvgTriangle({ base, height }: { base: number; height: number }) {
    const maxW = 200;
    const maxH = 130;
    const ratio = base && height ? Math.min(maxW / base, maxH / height) : 1;
    const bw = base ? base * ratio : maxW * 0.7;
    const bh = height ? height * ratio : maxH * 0.7;
    const cx = 150;
    const bot = 155;
    const x1 = cx - bw / 2;
    const x2 = cx + bw / 2;
    const top = bot - bh;

    return (
        <svg viewBox="0 0 300 190" className="w-full h-auto max-h-48">
            <defs>
                <pattern id="hatch-tri" patternUnits="userSpaceOnUse" width={8} height={8} patternTransform="rotate(45)">
                    <line x1={0} y1={0} x2={0} y2={8} stroke={ACCENT} strokeWidth={0.7} strokeOpacity={0.2} />
                </pattern>
            </defs>
            <polygon points={`${x1},${bot} ${x2},${bot} ${cx},${top}`} fill={ACCENT_LIGHT} stroke={ACCENT} strokeWidth={2} />
            <polygon points={`${x1},${bot} ${x2},${bot} ${cx},${top}`} fill="url(#hatch-tri)" />
            {/* height dashed */}
            <line x1={cx} y1={bot} x2={cx} y2={top} stroke={DIM_COLOR} strokeWidth={1} strokeDasharray="4,3" />
            <DimensionLine x1={x1} y1={bot} x2={x2} y2={bot} label={base ? `${base} m` : "b"} offset={18} side="bottom" />
            <text x={cx + 8} y={(bot + top) / 2} fontSize={11} fontWeight={600} fontFamily="monospace" fill={ACCENT} dominantBaseline="middle">
                {height ? `${height} m` : "h"}
            </text>
        </svg>
    );
}

function AreaSvgTrapezoid({ base, topBase, height }: { base: number; topBase: number; height: number }) {
    const maxW = 220;
    const maxH = 120;
    const effBase = base || 6;
    const effTop = topBase || 4;
    const effH = height || 4;
    const ratio = Math.min(maxW / effBase, maxH / effH);
    const bw = effBase * ratio;
    const tw = effTop * ratio;
    const bh = effH * ratio;
    const cx = 150;
    const bot = 150;
    const top = bot - bh;

    return (
        <svg viewBox="0 0 300 190" className="w-full h-auto max-h-48">
            <defs>
                <pattern id="hatch-trap" patternUnits="userSpaceOnUse" width={8} height={8} patternTransform="rotate(45)">
                    <line x1={0} y1={0} x2={0} y2={8} stroke={ACCENT} strokeWidth={0.7} strokeOpacity={0.2} />
                </pattern>
            </defs>
            <polygon
                points={`${cx - bw / 2},${bot} ${cx + bw / 2},${bot} ${cx + tw / 2},${top} ${cx - tw / 2},${top}`}
                fill={ACCENT_LIGHT} stroke={ACCENT} strokeWidth={2}
            />
            <polygon
                points={`${cx - bw / 2},${bot} ${cx + bw / 2},${bot} ${cx + tw / 2},${top} ${cx - tw / 2},${top}`}
                fill="url(#hatch-trap)"
            />
            {/* height dashed */}
            <line x1={cx} y1={bot} x2={cx} y2={top} stroke={DIM_COLOR} strokeWidth={1} strokeDasharray="4,3" />
            <DimensionLine x1={cx - bw / 2} y1={bot} x2={cx + bw / 2} y2={bot} label={base ? `${base} m` : "B"} offset={18} side="bottom" />
            <DimensionLine x1={cx - tw / 2} y1={top} x2={cx + tw / 2} y2={top} label={topBase ? `${topBase} m` : "b"} offset={18} side="top" />
            <text x={cx + 8} y={(bot + top) / 2} fontSize={11} fontWeight={600} fontFamily="monospace" fill={ACCENT} dominantBaseline="middle">
                {height ? `${height} m` : "h"}
            </text>
        </svg>
    );
}

function PaintSvg({ roomLength, roomWidth, roomHeight, doors, windows }: {
    roomLength: number; roomWidth: number; roomHeight: number; doors: number; windows: number;
}) {
    // Isometric room
    const iso = (x: number, y: number, z: number) => ({
        x: 150 + (x - y) * 0.85,
        y: 130 - z * 0.9 + (x + y) * 0.42,
    });
    const rl = roomLength || 4;
    const rw = roomWidth || 3;
    const rh = roomHeight || 2.5;
    const scale = Math.min(30 / Math.max(rl, rw, rh), 20);
    const sl = rl * scale;
    const sw = rw * scale;
    const sh = rh * scale;

    const floor = [iso(0, 0, 0), iso(sl, 0, 0), iso(sl, sw, 0), iso(0, sw, 0)];
    const wallL = [iso(0, 0, 0), iso(0, sw, 0), iso(0, sw, sh), iso(0, 0, sh)];
    const wallR = [iso(0, sw, 0), iso(sl, sw, 0), iso(sl, sw, sh), iso(0, sw, sh)];

    const pts = (arr: { x: number; y: number }[]) => arr.map((p) => `${p.x},${p.y}`).join(" ");

    // Door on left wall
    const dw = Math.min(sw * 0.3, 18);
    const dh = sh * 0.75;
    const doorStart = sw * 0.15;
    const door = [
        iso(0, doorStart * scale / sw * rw, 0),
        iso(0, (doorStart + dw) * scale / sw * rw, 0),
        iso(0, (doorStart + dw) * scale / sw * rw, dh / scale * rh),
        iso(0, doorStart * scale / sw * rw, dh / scale * rh),
    ];

    // Window on right wall
    const winW = Math.min(sl * 0.25, 18);
    const winH = sh * 0.35;
    const winBot = sh * 0.3;
    const winStart = sl * 0.35;
    const win = [
        iso(winStart * scale / sl * rl, sw, winBot / scale * rh),
        iso((winStart + winW) * scale / sl * rl, sw, winBot / scale * rh),
        iso((winStart + winW) * scale / sl * rl, sw, (winBot + winH) / scale * rh),
        iso(winStart * scale / sl * rl, sw, (winBot + winH) / scale * rh),
    ];

    return (
        <svg viewBox="0 0 300 190" className="w-full h-auto max-h-48">
            {/* floor */}
            <polygon points={pts(floor)} fill="#f0ece4" stroke="#ccc" strokeWidth={1} />
            {/* left wall */}
            <polygon points={pts(wallL)} fill={ACCENT_LIGHT} stroke={ACCENT} strokeWidth={1.5} />
            {/* right wall */}
            <polygon points={pts(wallR)} fill={`${ACCENT}15`} stroke={ACCENT} strokeWidth={1.5} />
            {/* wall hatching */}
            <defs>
                <pattern id="hatch-wall" patternUnits="userSpaceOnUse" width={6} height={6} patternTransform="rotate(60)">
                    <line x1={0} y1={0} x2={0} y2={6} stroke={ACCENT} strokeWidth={0.5} strokeOpacity={0.15} />
                </pattern>
            </defs>
            <polygon points={pts(wallL)} fill="url(#hatch-wall)" />
            <polygon points={pts(wallR)} fill="url(#hatch-wall)" />
            {/* door */}
            {doors > 0 && <polygon points={pts(door)} fill="#f5f2eb" stroke={DIM_COLOR} strokeWidth={1} />}
            {/* window */}
            {windows > 0 && (
                <>
                    <polygon points={pts(win)} fill="#dbeafe" stroke={DIM_COLOR} strokeWidth={1} />
                    {/* cross */}
                    <line x1={win[0].x} y1={win[0].y} x2={win[2].x} y2={win[2].y} stroke={DIM_COLOR} strokeWidth={0.5} />
                    <line x1={win[1].x} y1={win[1].y} x2={win[3].x} y2={win[3].y} stroke={DIM_COLOR} strokeWidth={0.5} />
                </>
            )}
            {/* dimension labels */}
            <text x={floor[0].x - 8} y={floor[0].y + 14} fontSize={10} fontWeight={600} fontFamily="monospace" fill={ACCENT} textAnchor="end">
                {roomLength ? `${roomLength}m` : "L"}
            </text>
            <text x={floor[1].x + 8} y={floor[1].y + 14} fontSize={10} fontWeight={600} fontFamily="monospace" fill={ACCENT} textAnchor="start">
                {roomWidth ? `${roomWidth}m` : "l"}
            </text>
            <text x={wallL[3].x - 10} y={(wallL[0].y + wallL[3].y) / 2} fontSize={10} fontWeight={600} fontFamily="monospace" fill={ACCENT} textAnchor="end">
                {roomHeight ? `${roomHeight}m` : "h"}
            </text>
        </svg>
    );
}

function TileSvg({ areaLength, areaWidth, tileLength, tileWidth }: {
    areaLength: number; areaWidth: number; tileLength: number; tileWidth: number;
}) {
    const al = areaLength || 4;
    const aw = areaWidth || 3;
    const maxW = 240;
    const maxH = 150;
    const scale = Math.min(maxW / al, maxH / aw);
    const rw = al * scale;
    const rh = aw * scale;
    const ox = (300 - rw) / 2;
    const oy = (180 - rh) / 2;

    // tile grid
    const tlM = (tileLength || 60) / 100; // cm->m
    const twM = (tileWidth || 60) / 100;
    const cols = tlM > 0 ? Math.ceil(al / tlM) : 0;
    const rows = twM > 0 ? Math.ceil(aw / twM) : 0;
    const tilePxW = tlM * scale;
    const tilePxH = twM * scale;

    const tiles = [];
    for (let r = 0; r < Math.min(rows, 30); r++) {
        for (let c = 0; c < Math.min(cols, 30); c++) {
            const tx = ox + c * tilePxW;
            const ty = oy + r * tilePxH;
            const tw2 = Math.min(tilePxW, ox + rw - tx);
            const th2 = Math.min(tilePxH, oy + rh - ty);
            if (tw2 > 0 && th2 > 0) {
                tiles.push(
                    <rect key={`${r}-${c}`} x={tx + 0.5} y={ty + 0.5} width={tw2 - 1} height={th2 - 1}
                        fill={(r + c) % 2 === 0 ? ACCENT_LIGHT : `${ACCENT}10`} rx={0} />
                );
            }
        }
    }

    return (
        <svg viewBox="0 0 300 190" className="w-full h-auto max-h-48">
            {/* area outline */}
            <rect x={ox} y={oy} width={rw} height={rh} fill="none" stroke={ACCENT} strokeWidth={2} />
            {/* tiles */}
            {tiles}
            {/* grid lines */}
            {Array.from({ length: Math.min(cols, 30) + 1 }).map((_, i) => {
                const x = Math.min(ox + i * tilePxW, ox + rw);
                return <line key={`v${i}`} x1={x} y1={oy} x2={x} y2={oy + rh} stroke={ACCENT} strokeWidth={0.5} strokeOpacity={0.4} />;
            })}
            {Array.from({ length: Math.min(rows, 30) + 1 }).map((_, i) => {
                const y = Math.min(oy + i * tilePxH, oy + rh);
                return <line key={`h${i}`} x1={ox} y1={y} x2={ox + rw} y2={y} stroke={ACCENT} strokeWidth={0.5} strokeOpacity={0.4} />;
            })}
            {/* dimensions */}
            <DimensionLine x1={ox} y1={oy + rh} x2={ox + rw} y2={oy + rh} label={areaLength ? `${areaLength} m` : "L"} offset={16} side="bottom" />
            <DimensionLine x1={ox + rw} y1={oy} x2={ox + rw} y2={oy + rh} label={areaWidth ? `${areaWidth} m` : "l"} offset={16} side="right" />
            {/* single tile callout */}
            {tilePxW > 12 && tilePxH > 12 && (
                <text x={ox + tilePxW / 2} y={oy + tilePxH / 2 + 3} textAnchor="middle" fontSize={8} fontWeight={600} fontFamily="monospace" fill={ACCENT}>
                    {tileLength}×{tileWidth}
                </text>
            )}
        </svg>
    );
}

function ConcreteSvg({ length, width, depth }: { length: number; width: number; depth: number }) {
    // 3D slab — simple isometric
    const l = length || 3;
    const w = width || 2;
    const d = depth || 0.15;
    const maxDim = Math.max(l, w, d * 5);
    const scale = 120 / maxDim;
    const sl = l * scale;
    const sw = w * scale;
    const sd = Math.max(d * scale * 5, 8); // exaggerate depth for visibility

    const iso = (x: number, y: number, z: number) => ({
        x: 150 + (x - y) * 0.82,
        y: 120 - z + (x + y) * 0.4,
    });

    const top = [iso(0, 0, sd), iso(sl, 0, sd), iso(sl, sw, sd), iso(0, sw, sd)];
    const front = [iso(0, sw, sd), iso(sl, sw, sd), iso(sl, sw, 0), iso(0, sw, 0)];
    const side = [iso(sl, 0, sd), iso(sl, sw, sd), iso(sl, sw, 0), iso(sl, 0, 0)];

    const pts = (arr: { x: number; y: number }[]) => arr.map((p) => `${p.x},${p.y}`).join(" ");

    return (
        <svg viewBox="0 0 300 190" className="w-full h-auto max-h-48">
            <defs>
                <pattern id="dots-concrete" patternUnits="userSpaceOnUse" width={6} height={6}>
                    <circle cx={3} cy={3} r={0.6} fill={ACCENT} fillOpacity={0.3} />
                </pattern>
            </defs>
            {/* top face */}
            <polygon points={pts(top)} fill={ACCENT_LIGHT} stroke={ACCENT} strokeWidth={1.5} />
            <polygon points={pts(top)} fill="url(#dots-concrete)" />
            {/* front face */}
            <polygon points={pts(front)} fill={`${ACCENT}18`} stroke={ACCENT} strokeWidth={1.5} />
            {/* side face */}
            <polygon points={pts(side)} fill={`${ACCENT}10`} stroke={ACCENT} strokeWidth={1.5} />
            {/* dimensions */}
            <text x={(top[0].x + top[1].x) / 2} y={top[0].y - 8} textAnchor="middle" fontSize={10} fontWeight={600} fontFamily="monospace" fill={ACCENT}>
                {length ? `${length} m` : "L"}
            </text>
            <text x={top[2].x + 14} y={(top[1].y + top[2].y) / 2} textAnchor="start" fontSize={10} fontWeight={600} fontFamily="monospace" fill={ACCENT}>
                {width ? `${width} m` : "l"}
            </text>
            <text x={front[2].x + 10} y={(front[1].y + front[2].y) / 2} textAnchor="start" fontSize={10} fontWeight={600} fontFamily="monospace" fill={ACCENT}>
                {depth ? `${depth} m` : "d"}
            </text>
        </svg>
    );
}

function WallpaperSvg({ roomLength, roomWidth, roomHeight, strips, rolls }: {
    roomLength: number; roomWidth: number; roomHeight: number; strips: number; rolls: number;
}) {
    // Unfolded walls view
    const rl = roomLength || 4;
    const rw = roomWidth || 3;
    const rh = roomHeight || 2.5;
    const perimeter = 2 * (rl + rw);
    const maxW = 270;
    const maxH = 100;
    const scaleX = maxW / perimeter;
    const scaleY = maxH / rh;
    const pw = perimeter * scaleX;
    const ph = rh * scaleY;
    const ox = (300 - pw) / 2;
    const oy = 30;

    // Wall segments
    const walls = [
        { label: "L", w: rl * scaleX },
        { label: "l", w: rw * scaleX },
        { label: "L", w: rl * scaleX },
        { label: "l", w: rw * scaleX },
    ];

    // Strip lines
    const stripW = strips > 0 ? pw / strips : 20;
    const stripLines = [];
    for (let i = 1; i < Math.min(strips, 50); i++) {
        stripLines.push(
            <line key={i} x1={ox + i * stripW} y1={oy} x2={ox + i * stripW} y2={oy + ph}
                stroke={ACCENT} strokeWidth={0.5} strokeOpacity={0.4} strokeDasharray="3,3" />
        );
    }

    let wallX = ox;

    return (
        <svg viewBox="0 0 300 190" className="w-full h-auto max-h-48">
            <defs>
                <pattern id="stripe-wp" patternUnits="userSpaceOnUse" width={4} height={4}>
                    <line x1={0} y1={0} x2={4} y2={4} stroke={ACCENT} strokeWidth={0.4} strokeOpacity={0.15} />
                </pattern>
            </defs>
            {/* walls */}
            {walls.map((wall, i) => {
                const x = wallX;
                wallX += wall.w;
                return (
                    <g key={i}>
                        <rect x={x} y={oy} width={wall.w} height={ph}
                            fill={i % 2 === 0 ? ACCENT_LIGHT : `${ACCENT}10`}
                            stroke={ACCENT} strokeWidth={1.5} />
                        <rect x={x} y={oy} width={wall.w} height={ph} fill="url(#stripe-wp)" />
                        <text x={x + wall.w / 2} y={oy + ph + 14} textAnchor="middle" fontSize={9} fontWeight={600} fontFamily="monospace" fill={ACCENT}>
                            {wall.label === "L" ? (roomLength ? `${roomLength}m` : "L") : (roomWidth ? `${roomWidth}m` : "l")}
                        </text>
                    </g>
                );
            })}
            {/* strip lines */}
            {stripLines}
            {/* height label */}
            <text x={ox - 8} y={oy + ph / 2} textAnchor="end" fontSize={10} fontWeight={600} fontFamily="monospace" fill={ACCENT} dominantBaseline="middle">
                {roomHeight ? `${roomHeight}m` : "h"}
            </text>
            {/* info */}
            <text x={150} y={oy + ph + 32} textAnchor="middle" fontSize={10} fontWeight={600} fontFamily="sans-serif" fill={DIM_COLOR}>
                {strips > 0 ? `${strips} fâșii` : ""}{strips > 0 && rolls > 0 ? " · " : ""}{rolls > 0 ? `${rolls} role` : ""}
            </text>
        </svg>
    );
}

// ─── Area Calculator ────────────────────────────────────────────────

function AreaCalculator() {
    const [shape, setShape] = useState<Shape>("rectangle");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [radius, setRadius] = useState("");
    const [base, setBase] = useState("");
    const [height, setHeight] = useState("");
    const [topBase, setTopBase] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [waste, setWaste] = useState("10");
    const [costPerSqm, setCostPerSqm] = useState("");

    const calcArea = (): number => {
        switch (shape) {
            case "rectangle":
                return (parseFloat(length) || 0) * (parseFloat(width) || 0);
            case "circle":
                return Math.PI * Math.pow(parseFloat(radius) || 0, 2);
            case "triangle":
                return 0.5 * (parseFloat(base) || 0) * (parseFloat(height) || 0);
            case "trapezoid":
                return 0.5 * ((parseFloat(base) || 0) + (parseFloat(topBase) || 0)) * (parseFloat(height) || 0);
            default:
                return 0;
        }
    };

    const area = calcArea();
    const qty = Math.max(1, parseInt(quantity) || 1);
    const wastePercent = parseFloat(waste) || 0;
    const totalArea = area * qty;
    const totalWithWaste = totalArea * (1 + wastePercent / 100);
    const cost = (parseFloat(costPerSqm) || 0) * totalWithWaste;

    return (
        <div className="space-y-6">
            {/* Shape selector */}
            <div>
                <p className="text-xs font-semibold text-stone uppercase tracking-wider mb-2">Formă</p>
                <div className="flex flex-wrap gap-2">
                    {shapeOptions.map((s) => {
                        const Icon = s.icon;
                        const active = shape === s.id;
                        return (
                            <button
                                key={s.id}
                                onClick={() => setShape(s.id)}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 text-xs font-semibold border transition-colors rounded-lg",
                                    active
                                        ? "bg-forest text-white border-forest"
                                        : "bg-white text-charcoal border-stone-200 hover:border-charcoal"
                                )}
                            >
                                <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                                {s.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* SVG Diagram */}
            <div className="border border-stone-200 bg-[#FAFAFA] p-2 rounded-xl">
                {shape === "rectangle" && <AreaSvgRectangle length={parseFloat(length) || 0} width={parseFloat(width) || 0} />}
                {shape === "circle" && <AreaSvgCircle radius={parseFloat(radius) || 0} />}
                {shape === "triangle" && <AreaSvgTriangle base={parseFloat(base) || 0} height={parseFloat(height) || 0} />}
                {shape === "trapezoid" && <AreaSvgTrapezoid base={parseFloat(base) || 0} topBase={parseFloat(topBase) || 0} height={parseFloat(height) || 0} />}
            </div>

            {/* Dimension inputs */}
            <div className="grid grid-cols-2 gap-4">
                {shape === "rectangle" && (
                    <>
                        <InputField label="Lungime" value={length} onChange={setLength} unit="m" />
                        <InputField label="Lățime" value={width} onChange={setWidth} unit="m" />
                    </>
                )}
                {shape === "circle" && (
                    <InputField label="Rază" value={radius} onChange={setRadius} unit="m" />
                )}
                {shape === "triangle" && (
                    <>
                        <InputField label="Baza" value={base} onChange={setBase} unit="m" />
                        <InputField label="Înălțime" value={height} onChange={setHeight} unit="m" />
                    </>
                )}
                {shape === "trapezoid" && (
                    <>
                        <InputField label="Baza mare" value={base} onChange={setBase} unit="m" />
                        <InputField label="Baza mică" value={topBase} onChange={setTopBase} unit="m" />
                        <InputField label="Înălțime" value={height} onChange={setHeight} unit="m" />
                    </>
                )}
            </div>

            {/* Optional fields */}
            <div className="grid grid-cols-3 gap-4">
                <InputField label="Cantitate" value={quantity} onChange={setQuantity} unit="buc" placeholder="1" />
                <InputField label="Risipă" value={waste} onChange={setWaste} unit="%" placeholder="10" />
                <InputField label="Cost / m²" value={costPerSqm} onChange={setCostPerSqm} unit="MDL" placeholder="0" />
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Suprafața" value={area.toFixed(2)} unit="m²" />
                <ResultCard label="Total (× cantitate)" value={totalArea.toFixed(2)} unit="m²" />
                <ResultCard label="Cu risipă" value={totalWithWaste.toFixed(2)} unit="m²" />
                {cost > 0 && (
                    <ResultCard label="Cost estimat" value={cost.toFixed(2)} unit="MDL" />
                )}
            </div>
        </div>
    );
}

// ─── Paint Calculator ────────────────────────────────────────────────

function PaintCalculator() {
    const [roomLength, setRoomLength] = useState("");
    const [roomWidth, setRoomWidth] = useState("");
    const [roomHeight, setRoomHeight] = useState("");
    const [doors, setDoors] = useState("1");
    const [windows, setWindows] = useState("2");
    const [coats, setCoats] = useState("2");
    const [coverage, setCoverage] = useState("10");

    const rl = parseFloat(roomLength) || 0;
    const rw = parseFloat(roomWidth) || 0;
    const rh = parseFloat(roomHeight) || 0;
    const numDoors = parseInt(doors) || 0;
    const numWindows = parseInt(windows) || 0;
    const numCoats = Math.max(1, parseInt(coats) || 1);
    const coveragePerLiter = parseFloat(coverage) || 10;

    const wallArea = 2 * (rl + rw) * rh;
    const doorArea = numDoors * 1.9;
    const windowArea = numWindows * 1.5;
    const paintableArea = Math.max(0, wallArea - doorArea - windowArea);
    const totalArea = paintableArea * numCoats;
    const litersNeeded = totalArea / coveragePerLiter;

    return (
        <div className="space-y-6">
            {/* SVG Diagram */}
            <div className="border border-stone-200 bg-[#FAFAFA] p-2 rounded-xl">
                <PaintSvg roomLength={rl} roomWidth={rw} roomHeight={rh} doors={numDoors} windows={numWindows} />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <InputField label="Lungime cameră" value={roomLength} onChange={setRoomLength} unit="m" />
                <InputField label="Lățime cameră" value={roomWidth} onChange={setRoomWidth} unit="m" />
                <InputField label="Înălțime" value={roomHeight} onChange={setRoomHeight} unit="m" />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <InputField label="Uși" value={doors} onChange={setDoors} unit="buc" />
                <InputField label="Ferestre" value={windows} onChange={setWindows} unit="buc" />
                <InputField label="Straturi" value={coats} onChange={setCoats} unit="×" />
            </div>
            <InputField label="Acoperire vopsea" value={coverage} onChange={setCoverage} unit="m²/L" placeholder="10" />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Suprafață pereți" value={wallArea.toFixed(1)} unit="m²" />
                <ResultCard label="Suprafață de vopsit" value={paintableArea.toFixed(1)} unit="m²" />
                <ResultCard label="Vopsea necesară" value={litersNeeded.toFixed(1)} unit="litri" />
            </div>
        </div>
    );
}

// ─── Tile Calculator ────────────────────────────────────────────────

function TileCalculator() {
    const [areaLength, setAreaLength] = useState("");
    const [areaWidth, setAreaWidth] = useState("");
    const [tileLength, setTileLength] = useState("60");
    const [tileWidth, setTileWidth] = useState("60");
    const [gap, setGap] = useState("3");
    const [waste, setWaste] = useState("10");
    const [tilePrice, setTilePrice] = useState("");

    const al = parseFloat(areaLength) || 0;
    const aw = parseFloat(areaWidth) || 0;
    const tl = (parseFloat(tileLength) || 0) / 100;
    const tw = (parseFloat(tileWidth) || 0) / 100;
    const gapM = (parseFloat(gap) || 0) / 1000;
    const wastePercent = parseFloat(waste) || 0;
    const price = parseFloat(tilePrice) || 0;

    const totalArea = al * aw;
    const tileWithGap = (tl + gapM) * (tw + gapM);
    const tilesNeeded = tileWithGap > 0 ? Math.ceil(totalArea / tileWithGap) : 0;
    const tilesWithWaste = Math.ceil(tilesNeeded * (1 + wastePercent / 100));
    const totalCost = tilesWithWaste * price;

    return (
        <div className="space-y-6">
            {/* SVG Diagram */}
            <div className="border border-stone-200 bg-[#FAFAFA] p-2 rounded-xl">
                <TileSvg areaLength={al} areaWidth={aw} tileLength={parseFloat(tileLength) || 60} tileWidth={parseFloat(tileWidth) || 60} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <InputField label="Lungime zonă" value={areaLength} onChange={setAreaLength} unit="m" />
                <InputField label="Lățime zonă" value={areaWidth} onChange={setAreaWidth} unit="m" />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <InputField label="Lungime placă" value={tileLength} onChange={setTileLength} unit="cm" />
                <InputField label="Lățime placă" value={tileWidth} onChange={setTileWidth} unit="cm" />
                <InputField label="Rost" value={gap} onChange={setGap} unit="mm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Risipă" value={waste} onChange={setWaste} unit="%" />
                <InputField label="Preț / bucată" value={tilePrice} onChange={setTilePrice} unit="MDL" placeholder="0" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Suprafața totală" value={totalArea.toFixed(2)} unit="m²" />
                <ResultCard label="Plăci necesare" value={tilesNeeded.toString()} unit="buc" />
                <ResultCard label="Cu risipă" value={tilesWithWaste.toString()} unit="buc" />
                {totalCost > 0 && (
                    <ResultCard label="Cost estimat" value={totalCost.toFixed(2)} unit="MDL" />
                )}
            </div>
        </div>
    );
}

// ─── Concrete Calculator ────────────────────────────────────────────

function ConcreteCalculator() {
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [depth, setDepth] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [pricePerCubic, setPricePerCubic] = useState("");

    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const d = parseFloat(depth) || 0;
    const qty = Math.max(1, parseInt(quantity) || 1);
    const price = parseFloat(pricePerCubic) || 0;

    const volume = l * w * d;
    const totalVolume = volume * qty;
    const weightTonnes = totalVolume * 2.4;
    const totalCost = totalVolume * price;

    return (
        <div className="space-y-6">
            {/* SVG Diagram */}
            <div className="border border-stone-200 bg-[#FAFAFA] p-2 rounded-xl">
                <ConcreteSvg length={l} width={w} depth={d} />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <InputField label="Lungime" value={length} onChange={setLength} unit="m" />
                <InputField label="Lățime" value={width} onChange={setWidth} unit="m" />
                <InputField label="Adâncime" value={depth} onChange={setDepth} unit="m" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Cantitate" value={quantity} onChange={setQuantity} unit="buc" />
                <InputField label="Preț / m³" value={pricePerCubic} onChange={setPricePerCubic} unit="MDL" placeholder="0" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Volum" value={volume.toFixed(2)} unit="m³" />
                <ResultCard label="Total" value={totalVolume.toFixed(2)} unit="m³" />
                <ResultCard label="Greutate est." value={weightTonnes.toFixed(2)} unit="tone" />
                {totalCost > 0 && (
                    <ResultCard label="Cost estimat" value={totalCost.toFixed(2)} unit="MDL" />
                )}
            </div>
        </div>
    );
}

// ─── Wallpaper Calculator ───────────────────────────────────────────

function WallpaperCalculator() {
    const [roomLength, setRoomLength] = useState("");
    const [roomWidth, setRoomWidth] = useState("");
    const [roomHeight, setRoomHeight] = useState("");
    const [rollWidth, setRollWidth] = useState("53");
    const [rollLength, setRollLength] = useState("10");
    const [doors, setDoors] = useState("1");
    const [windows, setWindows] = useState("2");
    const [rollPrice, setRollPrice] = useState("");

    const rl = parseFloat(roomLength) || 0;
    const rw = parseFloat(roomWidth) || 0;
    const rh = parseFloat(roomHeight) || 0;
    const rwCm = (parseFloat(rollWidth) || 53) / 100;
    const rlM = parseFloat(rollLength) || 10;
    const numDoors = parseInt(doors) || 0;
    const numWindows = parseInt(windows) || 0;
    const price = parseFloat(rollPrice) || 0;

    const perimeter = 2 * (rl + rw);
    const doorWidth = numDoors * 0.9;
    const windowWidth = numWindows * 1.2;
    const effectivePerimeter = Math.max(0, perimeter - doorWidth - windowWidth);

    const stripsNeeded = rwCm > 0 ? Math.ceil(effectivePerimeter / rwCm) : 0;
    const stripsPerRoll = rlM > 0 && rh > 0 ? Math.floor(rlM / rh) : 0;
    const rollsNeeded = stripsPerRoll > 0 ? Math.ceil(stripsNeeded / stripsPerRoll) : 0;
    const totalCost = rollsNeeded * price;

    return (
        <div className="space-y-6">
            {/* SVG Diagram */}
            <div className="border border-stone-200 bg-[#FAFAFA] p-2 rounded-xl">
                <WallpaperSvg roomLength={rl} roomWidth={rw} roomHeight={rh} strips={stripsNeeded} rolls={rollsNeeded} />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <InputField label="Lungime cameră" value={roomLength} onChange={setRoomLength} unit="m" />
                <InputField label="Lățime cameră" value={roomWidth} onChange={setRoomWidth} unit="m" />
                <InputField label="Înălțime" value={roomHeight} onChange={setRoomHeight} unit="m" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Lățime rolă" value={rollWidth} onChange={setRollWidth} unit="cm" />
                <InputField label="Lungime rolă" value={rollLength} onChange={setRollLength} unit="m" />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <InputField label="Uși" value={doors} onChange={setDoors} unit="buc" />
                <InputField label="Ferestre" value={windows} onChange={setWindows} unit="buc" />
                <InputField label="Preț / rolă" value={rollPrice} onChange={setRollPrice} unit="MDL" placeholder="0" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Perimetru efect." value={effectivePerimeter.toFixed(1)} unit="m" />
                <ResultCard label="Fâșii necesare" value={stripsNeeded.toString()} unit="buc" />
                <ResultCard label="Role necesare" value={rollsNeeded.toString()} unit="role" />
                {totalCost > 0 && (
                    <ResultCard label="Cost estimat" value={totalCost.toFixed(2)} unit="MDL" />
                )}
            </div>
        </div>
    );
}

// ─── Main Page ──────────────────────────────────────────────────────

export default function DashboardCalculatorsPage() {
    const [activeCalc, setActiveCalc] = useState<CalculatorType>("area");

    return (
        <div className="py-6">
            <div className="mx-auto max-w-4xl px-4 lg:px-6">
                {/* Calculator type tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {calculatorTabs.map((tab) => {
                        const Icon = tab.icon;
                        const active = activeCalc === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveCalc(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border transition-colors rounded-lg",
                                    active
                                        ? "bg-forest text-white border-forest"
                                        : "bg-white text-charcoal border-stone-200 hover:border-charcoal"
                                )}
                            >
                                <Icon className="h-4 w-4" strokeWidth={1.5} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Calculator body */}
                <div className="border border-stone-200 bg-white p-6 rounded-xl">
                    <h2 className="font-heading font-bold text-base uppercase tracking-tight mb-6">
                        {calculatorTabs.find((t) => t.id === activeCalc)?.label}
                    </h2>

                    {activeCalc === "area" && <AreaCalculator />}
                    {activeCalc === "paint" && <PaintCalculator />}
                    {activeCalc === "tile" && <TileCalculator />}
                    {activeCalc === "concrete" && <ConcreteCalculator />}
                    {activeCalc === "wallpaper" && <WallpaperCalculator />}
                </div>

                {/* Info note */}
                <p className="mt-4 text-xs text-stone-400 text-center">
                    Rezultatele sunt estimative. Consultați un specialist pentru calcule precise.
                </p>
            </div>
        </div>
    );
}
