import Link from "next/link";

export default function MissionStrip() {
  return (
    <section className="bg-charcoal py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 lg:px-6 text-center">
        <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-white/90 leading-relaxed">
          &ldquo;The construction industry generates 600 million tons of waste
          annually. We believe every material deserves a second chance.&rdquo;
        </p>
        <Link
          href="#"
          className="mt-8 inline-block text-sm text-white/60 hover:text-white/90 transition-colors underline underline-offset-4 decoration-white/30"
        >
          Learn About Our Mission →
        </Link>
      </div>
    </section>
  );
}
