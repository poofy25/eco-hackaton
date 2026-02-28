"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, MapPin, Heart, Share2, Flag, ChevronRight, Phone, Mail, Truck, PackageCheck, Leaf, BadgeCheck, Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ImageGallery from "@/components/ImageGallery";
import ListingCard from "@/components/ListingCard";
import { listings } from "@/lib/mock-data";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/components/Toast";
import { formatPrice, formatDistance, getConditionColor, getDiscountPercent, estimateImpact,
} from "@/lib/utils"; export default function ListingPage({ params }: { params: Promise<{ id: string }> }) { const { id } = use(params); const router = useRouter(); const { addItem } = useCart();
    const { showToast } = useToast();
    const t = useTranslations("listing");
    const [quantity, setQuantity] = useState(1);
    const [contactOpen, setContactOpen] = useState(false);
    const listing = listings.find((l) => l.id === id); if (!listing) { return ( <div className="mx-auto max-w-7xl px-4 py-24 text-center"> <h1 className="font-heading text-2xl font-bold text-mercury-900"> Anunțul nu a fost găsit </h1> <p className="mt-2 text-mercury-500"> Acest anunț poate fi fost eliminat sau nu există. </p> <Link href="/browse" className="mt-6 inline-block bg-mercury-900 px-6 py-2.5 text-sm font-medium text-white" > Caută Materiale </Link> </div> ); } const impact = estimateImpact(listing); const discountPercent = !listing.isFree && listing.originalPrice ? getDiscountPercent(listing.price, listing.originalPrice) : 0; const sellerListings = listings .filter((l) => l.seller.id === listing.seller.id && l.id !== listing.id) .slice(0, 4); const similarListings = listings .filter((l) => l.category === listing.category && l.id !== listing.id) .slice(0, 4); const handleAddToCart = () => { addItem(listing, quantity); showToast(`${quantity} ${listing.unit} adăugat(e) în coș`); };
    const handleSave = () => { showToast(t("toastSaved")); };
    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(typeof window !== "undefined" ? window.location.href : "");
            showToast(t("toastShared"));
        } catch {
            showToast(t("toastShared"));
        }
    };
    const handleReport = () => { showToast(t("toastReported")); }; return ( <div className="mx-auto max-w-7xl px-4 lg:px-6 py-6"> {/* Breadcrumb */} <nav className="flex items-center gap-1.5 text-sm text-mercury-500 mb-6"> <Link href="/" className="hover:text-mercury-900 transition-colors">Acasă</Link> <ChevronRight className="h-3 w-3" strokeWidth={1.5} /> <Link href="/browse" className="hover:text-mercury-900 transition-colors">Caută</Link> <ChevronRight className="h-3 w-3" strokeWidth={1.5} /> <span className="text-mercury-900 font-medium line-clamp-1">{listing.title}</span> </nav> {/* Two-Column Layout */} <div className="flex flex-col lg:flex-row gap-8"> {/* Left — Image Gallery (60%) */} <div className="lg:w-[60%]"> <ImageGallery images={listing.images} alt={listing.title} /> </div> {/* Right — Info Panel (40%) */} <div className="lg:w-[40%]"> <div className="lg:sticky lg:top-20"> {/* Seller */} <div className="flex items-center gap-3 mb-4"> <img src={listing.seller.avatar} alt={listing.seller.name} className="h-10 w-10 object-cover" /> <div> <div className="flex items-center gap-1.5"> <span className="text-sm font-semibold text-mercury-900"> {listing.seller.name} </span> {listing.seller.verified && ( <BadgeCheck className="h-4 w-4 text-mercury-900" strokeWidth={1.5} /> )} </div> <div className="flex items-center gap-2 text-xs text-mercury-500"> <div className="flex items-center gap-0.5"> <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> <span className="font-medium text-mercury-900">{listing.seller.rating}</span> <span>({listing.seller.reviewCount})</span> </div> <span>·</span> <span>Membru din {listing.seller.memberSince}</span> </div> </div> </div> {/* Title + Condition */} <h1 className="font-heading text-xl sm:text-2xl font-bold text-mercury-900 leading-tight"> {listing.title} </h1> <div className="mt-2"> <span className={`inline-block px-3 py-1 text-xs font-medium ${getConditionColor(listing.condition)}`}> {listing.condition} </span> </div> {/* Price */} <div className="mt-4"> {listing.isFree ? ( <div className="flex items-center gap-2"> <span className="font-heading text-3xl font-bold text-eco">GRATUIT</span> <span className="flex items-center gap-1 text-sm text-mercury-500"> <Leaf className="h-4 w-4" strokeWidth={1.5} /> Contribuție ecologică </span> </div> ) : ( <div className="flex items-baseline gap-2"> <span className="font-heading text-3xl font-bold text-mercury-900"> {formatPrice(listing.price)} </span> <span className="text-sm text-mercury-500">/ {listing.unit}</span> {listing.originalPrice && ( <span className="text-base text-mercury-500 line-through"> {formatPrice(listing.originalPrice)} </span> )} {discountPercent > 0 && ( <span className="bg-yellow-sea-500/10 px-2 py-0.5 text-xs font-semibold text-amber-700"> Economie {discountPercent}% </span> )} </div> )} </div> {/* Quantity */} <div className="mt-4 flex items-center gap-3"> <span className="text-sm text-mercury-500"> {listing.quantity} {listing.unit} disponibil(e) </span> <div className="flex items-center -500-200"> <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-mercury-50 transition-colors -lg" aria-label="Scade cantitatea" > <Minus className="h-3.5 w-3.5 text-mercury-500" strokeWidth={1.5} /> </button> <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, Math.min(listing.quantity, Number(e.target.value) || 1))) } className="w-12 text-center text-sm font-medium text-mercury-900 -500-200 py-1.5 bg-transparent focus:outline-none" /> <button onClick={() => setQuantity(Math.min(listing.quantity, quantity + 1))} className="p-2 hover:bg-mercury-50 transition-colors -lg" aria-label="Crește cantitatea" > <Plus className="h-3.5 w-3.5 text-mercury-500" strokeWidth={1.5} /> </button> </div> </div> {/* Specs */} <div className="mt-5 bg-mercury-50 p-4"> <h3 className="text-xs font-semibold text-mercury-500 uppercase tracking-wider mb-3"> Specificații </h3> <div className="space-y-2"> {Object.entries(listing.specs).map(([key, value]) => ( <div key={key} className="flex justify-between text-sm"> <span className="text-mercury-500">{key}</span> <span className="font-data text-mercury-900 font-medium">{value}</span> </div> ))} </div> </div> {/* Location */} <div className="mt-4 flex items-center gap-2 text-sm text-mercury-500"> <MapPin className="h-4 w-4" strokeWidth={1.5} /> <span>{listing.location}</span> <span>·</span> <span>la {formatDistance(listing.distance)}</span> </div> {/* Logistics */} <div className="mt-3 flex flex-wrap gap-2"> {listing.pickupAvailable && ( <span className="flex items-center gap-1.5 bg-mercury-50 px-3 py-1.5 text-xs font-medium text-mercury-900"> <PackageCheck className="h-3.5 w-3.5 text-mercury-500" strokeWidth={1.5} /> Ridicare Disponibilă </span> )} {listing.deliveryAvailable && ( <span className="flex items-center gap-1.5 bg-mercury-50 px-3 py-1.5 text-xs font-medium text-mercury-900"> <Truck className="h-3.5 w-3.5 text-mercury-500" strokeWidth={1.5} /> Livrare {listing.deliveryCost ? `· ${formatPrice(listing.deliveryCost)}` : ""} </span> )} {listing.shippingAvailable && ( <span className="flex items-center gap-1.5 bg-mercury-50 px-3 py-1.5 text-xs font-medium text-mercury-900"> <Truck className="h-3.5 w-3.5 text-mercury-500" strokeWidth={1.5} /> Expediere {listing.shippingCost ? `· ${formatPrice(listing.shippingCost)}` : ""} </span> )} </div> {/* Actions */} <div className="mt-6 space-y-3"> <button onClick={handleAddToCart} className="btn-magnetic btn-cta w-full bg-mercury-900 py-3.5 font-heading text-sm font-semibold text-white hover:opacity-90 transition-all" > Adaugă în Coș </button> <button onClick={() => setContactOpen(true)} className="btn-magnetic w-full border border-mercury-200 py-3 font-heading text-sm font-semibold text-mercury-900 hover:bg-mercury-900/5 transition-colors"> <Phone className="inline h-4 w-4 mr-2" strokeWidth={1.5} /> {t("showContact")} </button> <div className="flex gap-3"> <button onClick={handleSave} className="flex flex-1 items-center justify-center gap-1.5 border border-mercury-200 py-2 text-xs text-mercury-500 hover:bg-mercury-50 transition-colors"> <Heart className="h-3.5 w-3.5" strokeWidth={1.5} /> {t("save")} </button> <button onClick={handleShare} className="flex flex-1 items-center justify-center gap-1.5 border border-mercury-200 py-2 text-xs text-mercury-500 hover:bg-mercury-50 transition-colors"> <Share2 className="h-3.5 w-3.5" strokeWidth={1.5} /> {t("share")} </button> <button onClick={handleReport} className="flex flex-1 items-center justify-center gap-1.5 border border-mercury-200 py-2 text-xs text-mercury-500 hover:bg-mercury-50 transition-colors"> <Flag className="h-3.5 w-3.5" strokeWidth={1.5} /> {t("report")} </button> </div> </div>

            {/* Contact Dialog */}
            {contactOpen && (
                <>
                    <div className="fixed inset-0 z-50 bg-mercury-900/40" onClick={() => setContactOpen(false)} aria-hidden="true" />
                    <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-mercury-200 bg-white p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-heading text-lg font-semibold text-mercury-900">{t("contactDetails")}</h3>
                            <button onClick={() => setContactOpen(false)} className="p-1.5 text-mercury-500 hover:bg-mercury-100 rounded transition-colors" aria-label="Close">
                                <X className="h-5 w-5" strokeWidth={1.5} />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <img src={listing.seller.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
                            <div>
                                <p className="font-semibold text-mercury-900">{listing.seller.name}</p>
                                <p className="text-sm text-mercury-500">{listing.seller.company}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {listing.seller.phone && (
                                <a href={`tel:${listing.seller.phone}`} className="flex items-center gap-3 text-sm text-mercury-900 hover:text-mercury-600">
                                    <Phone className="h-4 w-4 text-mercury-500" strokeWidth={1.5} />
                                    <span>{listing.seller.phone}</span>
                                </a>
                            )}
                            {listing.seller.email && (
                                <a href={`mailto:${listing.seller.email}`} className="flex items-center gap-3 text-sm text-mercury-900 hover:text-mercury-600">
                                    <Mail className="h-4 w-4 text-mercury-500" strokeWidth={1.5} />
                                    <span>{listing.seller.email}</span>
                                </a>
                            )}
                            <div className="flex items-center gap-3 text-sm text-mercury-500">
                                <MapPin className="h-4 w-4 text-mercury-500 shrink-0" strokeWidth={1.5} />
                                <span>{listing.seller.location}</span>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Impact Callout */} <div className="mt-5 /20 bg-eco/5 p-4"> <div className="flex items-start gap-3"> <Leaf className="h-5 w-5 text-eco shrink-0 mt-0.5" strokeWidth={1.5} /> <p className="text-sm text-mercury-900"> Cumpărând acest articol economisești estimativ{" "} <span className="font-semibold text-eco">{impact.wasteKg} kg</span>{" "} de deșeuri de la groapa de gunoi și{" "} <span className="font-semibold text-eco">{impact.co2Kg} kg</span>{" "} de emisii de CO₂. </p> </div> </div> </div> </div> </div> {/* Description */} <div className="mt-12 max-w-3xl"> <h2 className="font-heading text-lg font-semibold text-mercury-900 mb-3"> Descriere </h2> <p className="text-sm text-mercury-500 leading-relaxed">{listing.description}</p> </div> {/* Seller's Other Listings */} {sellerListings.length > 0 && ( <section className="mt-12"> <h2 className="font-heading text-lg font-semibold text-mercury-900 mb-6"> Mai multe de la {listing.seller.name} </h2> <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"> {sellerListings.map((l) => ( <ListingCard key={l.id} listing={l} /> ))} </div> </section> )} {/* Similar Materials */} {similarListings.length > 0 && ( <section className="mt-12 mb-8"> <h2 className="font-heading text-lg font-semibold text-mercury-900 mb-6"> Materiale Similare </h2> <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"> {similarListings.map((l) => ( <ListingCard key={l.id} listing={l} /> ))} </div> </section> )} </div> );
}
