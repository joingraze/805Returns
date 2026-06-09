import { howItWorks } from "../lib/content";
import { useReveal } from "./useReveal";

export function HowItWorks() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="how" className="bg-navy-900 py-20 text-white sm:py-28">
      <div className="container-page">
        <div ref={ref} className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{howItWorks.heading}</h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {howItWorks.steps.map((s, i) => (
            <div key={s.step} className="relative">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-black text-coral-400">{s.step}</span>
                {i < howItWorks.steps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-navy-400/60 to-transparent md:block" />
                )}
              </div>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-navy-100/80">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
