/**
 * Tiny funnel tracker. Fires lightweight events to /api/track so we can
 * measure willingness-to-pay (which plan people click) even before they
 * submit the waitlist form. Fails silently — analytics should never break
 * the page.
 */
export function track(event: string, data?: { plan?: string; meta?: Record<string, unknown> }) {
  try {
    const body = JSON.stringify({
      event,
      plan: data?.plan,
      meta: data?.meta ? JSON.stringify(data.meta) : undefined,
    });
    const url = "/api/track";
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
    } else {
      void fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  } catch {
    /* never throw from analytics */
  }
}

export function utmSource(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const p = new URLSearchParams(window.location.search);
  return p.get("utm_source") ?? undefined;
}
