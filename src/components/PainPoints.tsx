import { painPoints } from "../lib/content";
import { iconMap } from "./icons";
import { useReveal } from "./useReveal";

export function PainPoints() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="container-page py-20 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-black tracking-tight text-navy-950 sm:text-4xl">
          {painPoints.heading}
        </h2>
        <p className="mt-4 text-lg text-navy-600">{painPoints.sub}</p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {painPoints.items.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          return (
            <div
              key={item.title}
              className="rounded-2xl border border-navy-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/5"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-coral-50 text-coral-600">
                <Icon />
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
