import { brand } from "../lib/content";

export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-sand-50 py-12">
      <div className="container-page flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy-900 text-sm font-black text-coral-400">
            805
          </span>
          <span className="text-navy-900">{brand.name}</span>
        </div>

        <p className="text-center text-sm text-navy-500">
          The local errand crew for your online returns · {brand.region}
        </p>

        <a href={`mailto:${brand.email}`} className="text-sm font-medium text-navy-600 hover:text-coral-600">
          {brand.email}
        </a>
      </div>
      <p className="container-page mt-6 text-center text-xs text-navy-400">
        © {new Date().getFullYear()} {brand.name}. Validating demand — not yet accepting orders.
      </p>
    </footer>
  );
}
