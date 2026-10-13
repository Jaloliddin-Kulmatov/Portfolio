import { neon } from "@neondatabase/serverless";
import { defaultContent, type SiteContent } from "./content";

/**
 * Content lives in one row of one table in Neon Postgres:
 *   site_content(id int primary key, data jsonb, updated_at timestamptz)
 * Without DATABASE_URL the site shows the defaults from content.ts (handy for local preview).
 */
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

async function ensureTable() {
  if (!sql) return;
  await sql`create table if not exists site_content (
    id int primary key,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`;
}

export async function getContent(): Promise<SiteContent> {
  if (!sql) return defaultContent;
  try {
    await ensureTable();
    const rows = (await sql`select data from site_content where id = 1`) as { data: SiteContent }[];
    // Merge with defaults so new fields added in code always have a value.
    return rows[0] ? { ...defaultContent, ...rows[0].data } : defaultContent;
  } catch (err) {
    console.error("Could not read content, showing defaults:", err);
    return defaultContent;
  }
}

export async function saveContent(data: SiteContent): Promise<void> {
  if (!sql) throw new Error("DATABASE_URL is not set, so changes can't be saved.");
  await ensureTable();
  await sql`insert into site_content (id, data, updated_at)
            values (1, ${JSON.stringify(data)}::jsonb, now())
            on conflict (id) do update set data = excluded.data, updated_at = now()`;
}

export const canSave = () => !!sql;
