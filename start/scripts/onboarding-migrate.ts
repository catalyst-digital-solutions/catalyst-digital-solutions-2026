/**
 * Applies supabase/migrations/*.sql in order (idempotent SQL) using a direct
 * Postgres URL — POSTGRES_URL_NON_POOLING (Supabase × Vercel integration),
 * then POSTGRES_URL / DATABASE_URL. Records applied files in
 * public.onboarding_schema_migrations.
 *
 *   npm run onboarding:migrate
 */
import fs from "node:fs";
import path from "node:path";
import postgres from "postgres";

for (const f of [".env.local", ".env"]) {
  const p = path.join(process.cwd(), f);
  if (fs.existsSync(p)) process.loadEnvFile(p);
}

async function main() {
  const url = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!url) throw new Error("Set POSTGRES_URL_NON_POOLING (or POSTGRES_URL / DATABASE_URL).");
  const sql = postgres(url, { max: 1, ssl: /localhost|127\.0\.0\.1/.test(url) ? false : "require", onnotice: () => {} });
  try {
    await sql`create table if not exists public.onboarding_schema_migrations (name text primary key, applied_at timestamptz not null default now())`;
    await sql`alter table public.onboarding_schema_migrations enable row level security`;
    const dir = path.join(process.cwd(), "supabase", "migrations");
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();
    const done = new Set((await sql`select name from public.onboarding_schema_migrations`).map((r) => r.name as string));
    for (const f of files) {
      if (done.has(f)) {
        console.log("skip  " + f);
        continue;
      }
      const body = fs.readFileSync(path.join(dir, f), "utf8");
      await sql.begin(async (tx) => {
        await tx.unsafe(body);
        await tx`insert into public.onboarding_schema_migrations (name) values (${f})`;
      });
      console.log("apply " + f);
    }
  } finally {
    await sql.end();
  }
}

main().catch((e) => {
  console.error("migration failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});
