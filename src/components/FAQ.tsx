import { faqs } from "../lib/content";

export function FAQ() {
  return (
    <section id="faq" className="container-page py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-black tracking-tight text-navy-950 sm:text-4xl">
          Questions, answered
        </h2>
        <div className="mt-10 divide-y divide-navy-100 overflow-hidden rounded-2xl border border-navy-100 bg-white">
          {faqs.map((item) => (
            <details key={item.q} className="group p-6 open:bg-sand-50">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-900">
                {item.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-navy-200 text-navy-500 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-navy-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
