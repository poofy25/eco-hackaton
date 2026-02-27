import Link from "next/link";
import { Camera, MessageCircle, Leaf } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Camera,
    title: "List It",
    description:
      "Snap a photo, set a price (or give it away), and publish in under 60 seconds.",
  },
  {
    number: 2,
    icon: MessageCircle,
    title: "Connect",
    description:
      "Buyers browse, message, and arrange pickup or delivery.",
  },
  {
    number: 3,
    icon: Leaf,
    title: "Impact",
    description:
      "Every transaction diverts materials from landfill. Track your ecological impact in real time.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-sand">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal text-center">
          How It Works
        </h2>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white shadow-warm-md">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-terracotta/10 text-terracotta text-xs font-bold">
                  {step.number}
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-stone leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/dashboard/new-listing"
            className="btn-magnetic btn-cta inline-flex items-center gap-2 rounded-lg bg-terracotta px-8 py-3.5 font-heading text-sm font-semibold text-white shadow-warm-md hover:shadow-warm-lg transition-shadow"
          >
            Start Selling — It&apos;s Free
          </Link>
        </div>
      </div>
    </section>
  );
}
