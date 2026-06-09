import { guarantee } from "../lib/content";

export function Guarantee() {
  return (
    <section className="bg-sand-100 py-20 sm:py-24">
      <div className="container-page">
        <h2 className="text-center text-3xl font-black tracking-tight text-navy-950 sm:text-4xl">
          {guarantee.heading}
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {guarantee.points.map((p) => (
            <div key={p.title} className="rounded-2xl border border-navy-100 bg-white p-6">
              <h3 className="text-lg font-bold text-navy-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
