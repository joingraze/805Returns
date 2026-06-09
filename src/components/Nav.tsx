import { brand } from "../lib/content";

export function Nav({ onCta }: { onCta: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-100/60 bg-sand-50/85 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy-900 text-sm font-black text-coral-400">
            805
          </span>
          <span className="text-lg text-navy-900">{brand.name}</span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-navy-700 md:flex">
          <a href="#how" className="hover:text-coral-600">How it works</a>
          <a href="#pricing" className="hover:text-coral-600">Pricing</a>
          <a href="#faq" className="hover:text-coral-600">FAQ</a>
        </div>

        <button
          onClick={onCta}
          className="rounded-full bg-coral-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-coral-600"
        >
          Get early access
        </button>
      </nav>
    </header>
  );
}
