import { hero, trustLogos } from "../lib/content";
import { ArrowRightIcon, TruckIcon } from "./icons";

export function Hero({ onPrimary }: { onPrimary: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient coastal gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-navy-100/70 blur-3xl" />
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-coral-100/70 blur-3xl" />
      </div>

      <div className="container-page grid gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-600">
            <span className="h-1.5 w-1.5 rounded-full bg-coral-500" />
            {hero.eyebrow}
          </span>

          <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-navy-950 sm:text-6xl">
            {hero.headline}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-700">
            {hero.subhead}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={onPrimary}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-coral-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-coral-500/20 transition hover:bg-coral-600"
            >
              {hero.primaryCta}
              <ArrowRightIcon className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </button>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-full border border-navy-200 bg-white px-7 py-3.5 text-base font-semibold text-navy-800 transition hover:border-navy-300"
            >
              {hero.secondaryCta}
            </a>
          </div>

          <p className="mt-5 text-sm text-navy-500">
            Free to join the waitlist · Founding-member pricing locked in · No card required
          </p>
        </div>

        {/* proof card */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm rounded-3xl border border-navy-100 bg-white p-7 shadow-xl shadow-navy-900/5">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-coral-400">
                <TruckIcon />
              </span>
              <div>
                <p className="text-sm font-medium text-navy-500">Doorstep pickup</p>
                <p className="font-semibold text-navy-900">Your local 805 driver</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-sand-100 p-5 text-center">
              <p className="text-4xl font-black text-navy-950">{hero.proofStat}</p>
              <p className="mt-1 text-sm font-medium text-navy-600">{hero.proofStatSub}</p>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-navy-700">
              {["Leave returns at your door", "We pack + label everything", "Off to UPS, FedEx & Amazon", "You get your refund"].map(
                (line, i) => (
                  <li key={line} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-coral-100 text-xs font-bold text-coral-600">
                      {i + 1}
                    </span>
                    {line}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* trust bar */}
      <div className="border-y border-navy-100 bg-white/60">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-5 text-sm font-semibold text-navy-400">
          <span className="text-xs uppercase tracking-wider text-navy-400">Returns to</span>
          {trustLogos.map((logo) => (
            <span key={logo} className="text-navy-500">{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
