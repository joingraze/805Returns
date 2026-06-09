/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
  ADMIN_TOKEN?: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/**
 * GET /api/stats?token=… — the validation dashboard in JSON form.
 * Returns total signups + a breakdown of which plan people chose, so you can
 * see willingness-to-pay at a glance.
 *
 * Guarded by ADMIN_TOKEN (set with: wrangler pages secret put ADMIN_TOKEN).
 */
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const token = new URL(request.url).searchParams.get("token");
  if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) {
    return json({ error: "Unauthorized." }, 401);
  }

  try {
    const total = await env.DB.prepare(`SELECT COUNT(*) AS n FROM signups`).first<{ n: number }>();
    const byPlan = await env.DB.prepare(
      `SELECT COALESCE(plan, 'unspecified') AS plan, COUNT(*) AS n
       FROM signups GROUP BY plan ORDER BY n DESC`,
    ).all();
    const byVolume = await env.DB.prepare(
      `SELECT COALESCE(returns_per_month, 'unspecified') AS returns_per_month, COUNT(*) AS n
       FROM signups GROUP BY returns_per_month ORDER BY n DESC`,
    ).all();
    const planClicks = await env.DB.prepare(
      `SELECT COALESCE(plan, 'unspecified') AS plan, COUNT(*) AS n
       FROM events WHERE event = 'plan_click' GROUP BY plan ORDER BY n DESC`,
    ).all();
    const recent = await env.DB.prepare(
      `SELECT email, zip, plan, returns_per_month, created_at
       FROM signups ORDER BY created_at DESC LIMIT 25`,
    ).all();

    return json({
      total_signups: total?.n ?? 0,
      signups_by_plan: byPlan.results,
      signups_by_return_volume: byVolume.results,
      plan_clicks: planClicks.results,
      recent_signups: recent.results,
    });
  } catch (err) {
    console.error("stats query failed", err);
    return json({ error: "Query failed." }, 500);
  }
};
