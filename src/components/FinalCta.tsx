import { finalCta } from "../lib/content";
import { ArrowRightIcon } from "./icons";

export function FinalCta({ onCta }: { onCta: () => void }) {
  return (
    <section className="container-page py-20 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-coral-500 to-coral-600 px-8 py-14 text-center text-white sm:px-16">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10" />
        <h2 className="relative text-3xl font-black tracking-tight sm:text-4xl">{finalCta.heading}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/90">{finalCta.sub}</p>
        <button
          onClick={onCta}
          className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-coral-600 shadow-lg transition hover:bg-sand-50"
        >
          {finalCta.cta}
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
