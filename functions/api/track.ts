/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
}

const ALLOWED_EVENTS = new Set(["plan_click", "cta_click", "waitlist_submit"]);

/** POST /api/track — lightweight funnel events (which plan people click, etc). */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: { event?: string; plan?: string; meta?: string };
  try {
    payload = await request.json();
  } catch {
    return new Response(null, { status: 204 });
  }

  const event = String(payload.event ?? "").trim();
  if (!ALLOWED_EVENTS.has(event)) {
    return new Response(null, { status: 204 });
  }

  const plan = payload.plan ? String(payload.plan).slice(0, 40) : null;
  const meta = payload.meta ? String(payload.meta).slice(0, 500) : null;

  try {
    await env.DB.prepare(`INSERT INTO events (event, plan, meta) VALUES (?1, ?2, ?3)`)
      .bind(event, plan, meta)
      .run();
  } catch (err) {
    console.error("track insert failed", err);
  }

  // Always 204 — analytics must never surface errors to the client.
  return new Response(null, { status: 204 });
};
