/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_PLANS = new Set(["per_pickup", "concierge_monthly", "annual"]);

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/** POST /api/waitlist — record a founding-member signup. */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const email = String(payload.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  const zip = String(payload.zip ?? "").trim().slice(0, 10) || null;
  const planRaw = String(payload.plan ?? "").trim();
  const plan = VALID_PLANS.has(planRaw) ? planRaw : null;
  const returnsPerMonth = String(payload.returns_per_month ?? "").trim().slice(0, 40) || null;
  const referrer = String(payload.referrer ?? "").trim().slice(0, 300) || null;
  const utmSource = String(payload.utm_source ?? "").trim().slice(0, 100) || null;
  const userAgent = (request.headers.get("user-agent") ?? "").slice(0, 300) || null;

  try {
    // Upsert on email so re-submissions update the captured intent instead of
    // erroring on the unique index.
    await env.DB.prepare(
      `INSERT INTO signups (email, zip, plan, returns_per_month, referrer, user_agent, utm_source)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
       ON CONFLICT(email) DO UPDATE SET
         zip = COALESCE(excluded.zip, signups.zip),
         plan = COALESCE(excluded.plan, signups.plan),
         returns_per_month = COALESCE(excluded.returns_per_month, signups.returns_per_month)`,
    )
      .bind(email, zip, plan, returnsPerMonth, referrer, userAgent, utmSource)
      .run();

    return json({ ok: true });
  } catch (err) {
    console.error("waitlist insert failed", err);
    return json({ error: "We couldn't save that just now. Please try again." }, 500);
  }
};
