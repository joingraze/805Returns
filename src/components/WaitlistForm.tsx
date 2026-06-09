import { useState } from "react";
import { plans, waitlist } from "../lib/content";
import { track, utmSource } from "../lib/analytics";
import { CheckIcon } from "./icons";

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm({
  selectedPlan,
  onSelectPlan,
}: {
  selectedPlan: string;
  onSelectPlan: (planId: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [returnsPerMonth, setReturnsPerMonth] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          zip: zip.trim(),
          plan: selectedPlan,
          returns_per_month: returnsPerMonth,
          referrer: typeof document !== "undefined" ? document.referrer : "",
          utm_source: utmSource(),
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      track("waitlist_submit", { plan: selectedPlan });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="waitlist" className="bg-navy-900 py-20 sm:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-2xl shadow-navy-950/30 sm:p-10">
          {status === "success" ? (
            <div className="text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-coral-100 text-coral-600">
                <CheckIcon className="h-7 w-7" />
              </span>
              <h2 className="mt-5 text-2xl font-black text-navy-950">{waitlist.successHeading}</h2>
              <p className="mt-3 text-navy-600">{waitlist.successSub}</p>
              <p className="mt-6 text-sm text-navy-500">
                Know someone drowning in returns? Send them to{" "}
                <span className="font-semibold text-navy-700">805Returns.com</span>.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-black tracking-tight text-navy-950 sm:text-3xl">
                {waitlist.heading}
              </h2>
              <p className="mt-3 text-navy-600">{waitlist.sub}</p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy-800">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-900 outline-none transition focus:border-coral-400 focus:ring-2 focus:ring-coral-200"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="zip" className="mb-1.5 block text-sm font-semibold text-navy-800">
                      ZIP code
                    </label>
                    <input
                      id="zip"
                      inputMode="numeric"
                      pattern="[0-9]{5}"
                      maxLength={5}
                      value={zip}
                      onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
                      placeholder="93101"
                      className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-900 outline-none transition focus:border-coral-400 focus:ring-2 focus:ring-coral-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="returns" className="mb-1.5 block text-sm font-semibold text-navy-800">
                      Returns / month
                    </label>
                    <select
                      id="returns"
                      value={returnsPerMonth}
                      onChange={(e) => setReturnsPerMonth(e.target.value)}
                      className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-navy-900 outline-none transition focus:border-coral-400 focus:ring-2 focus:ring-coral-200"
                    >
                      <option value="">Select…</option>
                      {waitlist.returnsOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-navy-800">
                    Plan you'd choose
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {plans.map((p) => (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => onSelectPlan(p.id)}
                        className={[
                          "rounded-xl border px-2 py-2.5 text-center text-xs font-semibold transition",
                          selectedPlan === p.id
                            ? "border-coral-400 bg-coral-50 text-coral-700 ring-2 ring-coral-200"
                            : "border-navy-200 text-navy-700 hover:border-navy-300",
                        ].join(" ")}
                      >
                        <span className="block">{p.name}</span>
                        <span className="block text-navy-500">{p.price}{p.cadence}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {status === "error" && (
                  <p className="rounded-lg bg-coral-50 px-3 py-2 text-sm text-coral-700">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-full bg-coral-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-coral-500/20 transition hover:bg-coral-600 disabled:opacity-60"
                >
                  {status === "submitting" ? "Joining…" : "Join the waitlist"}
                </button>
                <p className="text-center text-xs text-navy-400">
                  No spam, no card. We'll only email you when we launch near you.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
