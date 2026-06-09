import { plans } from "../lib/content";
import { CheckIcon } from "./icons";
import { useReveal } from "./useReveal";

export function Pricing({ onChoose }: { onChoose: (planId: string) => void }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="pricing" className="container-page py-20 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-coral-600">
          Founding-member pricing
        </span>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-navy-950 sm:text-4xl">
          Pick the plan you'd actually pay for
        </h2>
        <p className="mt-4 text-lg text-navy-600">
          We're choosing where to launch first based on real demand. Tap the plan you'd
          choose — it takes you straight to the waitlist.
        </p>
      </div>

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={[
              "relative flex flex-col rounded-3xl border p-7 transition",
              plan.highlighted
                ? "border-coral-300 bg-white shadow-xl shadow-coral-500/10 lg:-mt-4 lg:mb-4"
                : "border-navy-100 bg-white hover:shadow-lg hover:shadow-navy-900/5",
            ].join(" ")}
          >
            {plan.badge && (
              <span
                className={[
                  "absolute -top-3 left-7 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
                  plan.highlighted ? "bg-coral-500 text-white" : "bg-navy-100 text-navy-700",
                ].join(" ")}
              >
                {plan.badge}
              </span>
            )}

            <h3 className="text-lg font-bold text-navy-900">{plan.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-black text-navy-950">{plan.price}</span>
              <span className="text-sm font-medium text-navy-500">{plan.cadence}</span>
            </div>
            <p className="mt-3 text-sm text-navy-600">{plan.blurb}</p>

            <ul className="mt-6 flex-1 space-y-3 text-sm text-navy-700">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-coral-500" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => onChoose(plan.id)}
              className={[
                "mt-7 w-full rounded-full px-5 py-3 text-sm font-semibold transition",
                plan.highlighted
                  ? "bg-coral-500 text-white hover:bg-coral-600"
                  : "border border-navy-200 text-navy-800 hover:border-navy-300 hover:bg-navy-50",
              ].join(" ")}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-navy-500">
        Picking a plan doesn't charge you anything — it tells us which price to launch with.
      </p>
    </section>
  );
}
