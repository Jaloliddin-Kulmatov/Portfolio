"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkPassword, COOKIE, createSession, verifySession } from "@/lib/auth";
import type { SiteContent } from "@/lib/content";
import { saveContent } from "@/lib/db";

async function requireAdmin() {
  const jar = await cookies();
  if (!(await verifySession(jar.get(COOKIE)?.value))) throw new Error("Your session has expired. Log in again.");
}

export async function login(_prev: { error: string } | null, form: FormData): Promise<{ error: string } | null> {
  const password = String(form.get("password") ?? "");
  if (!process.env.ADMIN_PASSWORD) return { error: "ADMIN_PASSWORD is not set on the server." };
  if (!checkPassword(password)) return { error: "Wrong password." };
  const { value, maxAge } = await createSession();
  (await cookies()).set(COOKIE, value, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(COOKIE);
  redirect("/admin/login");
}

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const list = (v: unknown, max = 60) => (Array.isArray(v) ? v.map((x) => str(x, 300)).filter(Boolean).slice(0, max) : []);
const url = (v: unknown) => {
  const s = str(v, 500);
  return s === "" || s.startsWith("/") || /^https?:\/\//.test(s) ? s : "";
};

/** Keep only known fields, trim text, and drop unsafe links before saving. */
function clean(c: SiteContent): SiteContent {
  return {
    profile: {
      name: str(c.profile?.name, 120),
      headline: str(c.profile?.headline, 200),
      intro: str(c.profile?.intro, 600),
      about: list(c.profile?.about, 10).map((p) => p.slice(0, 1200)),
      location: str(c.profile?.location, 120),
      email: str(c.profile?.email, 200),
      photo: url(c.profile?.photo),
      cvUrl: url(c.profile?.cvUrl),
    },
    links: (c.links ?? []).slice(0, 12).map((l) => ({ label: str(l.label, 40), url: url(l.url) })).filter((l) => l.label && l.url),
    stats: (c.stats ?? []).slice(0, 8).map((s, i) => ({ id: str(s.id, 40) || `stat-${i}`, value: str(s.value, 40), label: str(s.label, 120) })),
    projects: (c.projects ?? []).slice(0, 100).map((p, i) => ({
      id: str(p.id, 60) || `project-${i}`,
      title: str(p.title, 120),
      category: str(p.category, 60) || "Other",
      summary: str(p.summary, 1000),
      tech: list(p.tech, 20),
      image: url(p.image),
      github: url(p.github),
      demo: url(p.demo),
      featured: !!p.featured,
    })),
    experience: (c.experience ?? []).slice(0, 30).map((e, i) => ({
      id: str(e.id, 60) || `exp-${i}`,
      role: str(e.role, 120),
      org: str(e.org, 160),
      period: str(e.period, 60),
      bullets: list(e.bullets, 10),
    })),
    skills: (c.skills ?? []).slice(0, 12).map((g, i) => ({ id: str(g.id, 40) || `skill-${i}`, name: str(g.name, 60), items: list(g.items, 40) })),
    awards: list(c.awards, 30),
  };
}

export async function save(content: SiteContent): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await requireAdmin();
    await saveContent(clean(content));
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Could not save." };
  }
}

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function uploadFile(form: FormData): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  try {
    await requireAdmin();
    if (!process.env.BLOB_READ_WRITE_TOKEN) return { ok: false, error: "Uploads need Vercel Blob. Paste an image URL instead, or add Blob storage in Vercel." };
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Choose a file first." };
    const isPdf = file.type === "application/pdf";
    if (!IMAGE_TYPES.includes(file.type) && !isPdf) return { ok: false, error: "Use a JPG, PNG, WebP, GIF or PDF file." };
    // Vercel functions accept requests up to 4.5 MB.
    if (file.size > 4 * 1024 * 1024) return { ok: false, error: "The file is larger than 4 MB. Make it smaller and try again." };
    const blob = await put(`portfolio/${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`, file, { access: "public" });
    return { ok: true, url: blob.url };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Upload failed." };
  }
}
