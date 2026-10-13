"use client";

import { useEffect, useState, useTransition } from "react";
import { logout, save, uploadFile } from "@/app/admin/actions";
import type { Experience, Project, SiteContent, SkillGroup, Stat } from "@/lib/content";

type Tab = "profile" | "projects" | "experience" | "skills";

const newId = () => Math.random().toString(36).slice(2, 9);
const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);
const commas = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);

/** Move item i by delta (-1 up, +1 down) and return a new array. */
function move<T>(arr: T[], i: number, delta: number): T[] {
  const j = i + delta;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j]!, next[i]!];
  return next;
}

export function Editor({ initial, canSave }: { initial: SiteContent; canSave: boolean }) {
  const [c, setC] = useState<SiteContent>(initial);
  const [tab, setTab] = useState<Tab>("projects");
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [saving, startSaving] = useTransition();

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    const onLeave = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  function update(fn: (draft: SiteContent) => SiteContent) {
    setC((prev) => fn(prev));
    setDirty(true);
    setStatus(null);
  }

  function onSave() {
    startSaving(async () => {
      const r = await save(c);
      if (r.ok) {
        setDirty(false);
        setStatus({ kind: "ok", text: "Saved. The public site is updated." });
      } else setStatus({ kind: "error", text: r.error });
    });
  }

  const setProfile = (key: keyof SiteContent["profile"], value: string | string[]) =>
    update((d) => ({ ...d, profile: { ...d.profile, [key]: value } }));
  const setProject = (i: number, patch: Partial<Project>) =>
    update((d) => ({ ...d, projects: d.projects.map((p, k) => (k === i ? { ...p, ...patch } : p)) }));
  const setExp = (i: number, patch: Partial<Experience>) =>
    update((d) => ({ ...d, experience: d.experience.map((e, k) => (k === i ? { ...e, ...patch } : e)) }));
  const setSkill = (i: number, patch: Partial<SkillGroup>) =>
    update((d) => ({ ...d, skills: d.skills.map((g, k) => (k === i ? { ...g, ...patch } : g)) }));
  const setStat = (i: number, patch: Partial<Stat>) =>
    update((d) => ({ ...d, stats: d.stats.map((s, k) => (k === i ? { ...s, ...patch } : s)) }));

  return (
    <div className="admin">
      <header className="admin-bar">
        <strong>Portfolio admin</strong>
        <nav className="tabs" aria-label="Sections">
          {(["profile", "projects", "experience", "skills"] as Tab[]).map((t) => (
            <button key={t} aria-pressed={tab === t} onClick={() => setTab(t)}>
              {t === "skills" ? "Skills & awards" : t[0]!.toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>
        <div className="row">
          <a className="btn" href="/" target="_blank" rel="noreferrer">View site</a>
          <button className="btn primary" onClick={onSave} disabled={!dirty || saving || !canSave}>
            {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
          </button>
          <form action={logout}><button className="btn ghost">Log out</button></form>
        </div>
      </header>

      {!canSave && (
        <p className="banner error">DATABASE_URL is not set, so you can look around but changes can't be saved. See the README.</p>
      )}
      {status && <p className={`banner ${status.kind}`} role="status">{status.text}</p>}

      <main className="admin-main">
        {tab === "profile" && (
          <section className="panel">
            <h2>Profile</h2>
            <Field label="Name" value={c.profile.name} onChange={(v) => setProfile("name", v)} />
            <Field label="Headline" value={c.profile.headline} onChange={(v) => setProfile("headline", v)} />
            <Field label="Short intro (top of the page)" value={c.profile.intro} onChange={(v) => setProfile("intro", v)} multiline />
            <Field
              label="About (one paragraph per line)"
              value={c.profile.about.join("\n")}
              onChange={(v) => setProfile("about", lines(v))}
              multiline
              rows={6}
            />
            <div className="grid2">
              <Field label="Location" value={c.profile.location} onChange={(v) => setProfile("location", v)} />
              <Field label="Email" value={c.profile.email} onChange={(v) => setProfile("email", v)} />
            </div>
            <div className="grid2">
              <FileField label="Photo" value={c.profile.photo} onChange={(v) => setProfile("photo", v)} accept="image/*" />
              <FileField label="CV (PDF)" value={c.profile.cvUrl} onChange={(v) => setProfile("cvUrl", v)} accept="application/pdf" />
            </div>

            <h3>Links</h3>
            {c.links.map((l, i) => (
              <div className="grid-link" key={i}>
                <Field label="Label" value={l.label} onChange={(v) => update((d) => ({ ...d, links: d.links.map((x, k) => (k === i ? { ...x, label: v } : x)) }))} />
                <Field label="URL" value={l.url} onChange={(v) => update((d) => ({ ...d, links: d.links.map((x, k) => (k === i ? { ...x, url: v } : x)) }))} />
                <button className="btn ghost danger" onClick={() => update((d) => ({ ...d, links: d.links.filter((_, k) => k !== i) }))} aria-label={`Remove ${l.label}`}>Remove</button>
              </div>
            ))}
            <button className="btn" onClick={() => update((d) => ({ ...d, links: [...d.links, { label: "", url: "" }] }))}>+ Add link</button>

            <h3>Highlights (number cards)</h3>
            {c.stats.map((s, i) => (
              <div className="grid-link" key={s.id}>
                <Field label="Value" value={s.value} onChange={(v) => setStat(i, { value: v })} />
                <Field label="Label" value={s.label} onChange={(v) => setStat(i, { label: v })} />
                <button className="btn ghost danger" onClick={() => update((d) => ({ ...d, stats: d.stats.filter((_, k) => k !== i) }))}>Remove</button>
              </div>
            ))}
            <button className="btn" onClick={() => update((d) => ({ ...d, stats: [...d.stats, { id: newId(), value: "", label: "" }] }))}>+ Add highlight</button>
          </section>
        )}

        {tab === "projects" && (
          <section className="panel">
            <div className="panel-head">
              <h2>Projects ({c.projects.length})</h2>
              <button
                className="btn primary"
                onClick={() =>
                  update((d) => ({
                    ...d,
                    projects: [{ id: newId(), title: "New project", category: "AI & Full-Stack", summary: "", tech: [], image: "", github: "", demo: "", featured: false }, ...d.projects],
                  }))
                }
              >
                + Add project
              </button>
            </div>
            <p className="muted small">The order here is the order on the site. Featured projects appear first and larger.</p>
            {c.projects.map((p, i) => (
              <details className="item" key={p.id} open={i === 0 && p.title === "New project"}>
                <summary>
                  <span className="item-title">{p.title || "Untitled"}</span>
                  <span className="muted small">{p.category}{p.featured ? " · Featured" : ""}</span>
                </summary>
                <div className="item-body">
                  <div className="grid2">
                    <Field label="Title" value={p.title} onChange={(v) => setProject(i, { title: v })} />
                    <Field label="Category" value={p.category} onChange={(v) => setProject(i, { category: v })} />
                  </div>
                  <Field label="Description" value={p.summary} onChange={(v) => setProject(i, { summary: v })} multiline />
                  <Field label="Technologies (comma separated)" value={p.tech.join(", ")} onChange={(v) => setProject(i, { tech: commas(v) })} />
                  <div className="grid2">
                    <Field label="GitHub link" value={p.github} onChange={(v) => setProject(i, { github: v })} />
                    <Field label="Live site link" value={p.demo} onChange={(v) => setProject(i, { demo: v })} />
                  </div>
                  <FileField label="Image" value={p.image} onChange={(v) => setProject(i, { image: v })} accept="image/*" />
                  <label className="check">
                    <input type="checkbox" checked={p.featured} onChange={(e) => setProject(i, { featured: e.target.checked })} /> Featured
                  </label>
                  <div className="row">
                    <button className="btn" onClick={() => update((d) => ({ ...d, projects: move(d.projects, i, -1) }))} disabled={i === 0}>↑ Up</button>
                    <button className="btn" onClick={() => update((d) => ({ ...d, projects: move(d.projects, i, 1) }))} disabled={i === c.projects.length - 1}>↓ Down</button>
                    <ConfirmDelete label={p.title} onConfirm={() => update((d) => ({ ...d, projects: d.projects.filter((_, k) => k !== i) }))} />
                  </div>
                </div>
              </details>
            ))}
          </section>
        )}

        {tab === "experience" && (
          <section className="panel">
            <div className="panel-head">
              <h2>Experience</h2>
              <button className="btn primary" onClick={() => update((d) => ({ ...d, experience: [{ id: newId(), role: "New role", org: "", period: "", bullets: [] }, ...d.experience] }))}>+ Add</button>
            </div>
            {c.experience.map((e, i) => (
              <details className="item" key={e.id}>
                <summary>
                  <span className="item-title">{e.role || "Untitled"}</span>
                  <span className="muted small">{e.org} · {e.period}</span>
                </summary>
                <div className="item-body">
                  <div className="grid2">
                    <Field label="Role" value={e.role} onChange={(v) => setExp(i, { role: v })} />
                    <Field label="Organization" value={e.org} onChange={(v) => setExp(i, { org: v })} />
                  </div>
                  <Field label="Period" value={e.period} onChange={(v) => setExp(i, { period: v })} />
                  <Field label="Points (one per line)" value={e.bullets.join("\n")} onChange={(v) => setExp(i, { bullets: lines(v) })} multiline rows={4} />
                  <div className="row">
                    <button className="btn" onClick={() => update((d) => ({ ...d, experience: move(d.experience, i, -1) }))} disabled={i === 0}>↑ Up</button>
                    <button className="btn" onClick={() => update((d) => ({ ...d, experience: move(d.experience, i, 1) }))} disabled={i === c.experience.length - 1}>↓ Down</button>
                    <ConfirmDelete label={e.role} onConfirm={() => update((d) => ({ ...d, experience: d.experience.filter((_, k) => k !== i) }))} />
                  </div>
                </div>
              </details>
            ))}
          </section>
        )}

        {tab === "skills" && (
          <section className="panel">
            <h2>Skills</h2>
            {c.skills.map((g, i) => (
              <div className="grid-link" key={g.id}>
                <Field label="Group" value={g.name} onChange={(v) => setSkill(i, { name: v })} />
                <Field label="Skills (comma separated)" value={g.items.join(", ")} onChange={(v) => setSkill(i, { items: commas(v) })} />
                <button className="btn ghost danger" onClick={() => update((d) => ({ ...d, skills: d.skills.filter((_, k) => k !== i) }))}>Remove</button>
              </div>
            ))}
            <button className="btn" onClick={() => update((d) => ({ ...d, skills: [...d.skills, { id: newId(), name: "", items: [] }] }))}>+ Add group</button>

            <h2 style={{ marginTop: 32 }}>Awards & publications</h2>
            <Field label="One per line" value={c.awards.join("\n")} onChange={(v) => update((d) => ({ ...d, awards: lines(v) }))} multiline rows={8} />
          </section>
        )}
      </main>
    </div>
  );
}

function Field({ label, value, onChange, multiline, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; rows?: number }) {
  return (
    <label className="field">
      <span>{label}</span>
      {multiline ? (
        <textarea value={value} rows={rows} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

/** A URL field with an Upload button (uses Vercel Blob when configured). */
function FileField({ label, value, onChange, accept }: { label: string; value: string; onChange: (v: string) => void; accept: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    const form = new FormData();
    form.set("file", file);
    const r = await uploadFile(form);
    setBusy(false);
    if (r.ok) onChange(r.url);
    else setError(r.error);
  }

  return (
    <div className="field">
      <span>{label}</span>
      <div className="row">
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="/projects/image.jpg or https://…" aria-label={`${label} URL`} />
        <label className="btn">
          {busy ? "Uploading…" : "Upload"}
          <input type="file" accept={accept} hidden onChange={(e) => onFile(e.target.files?.[0])} />
        </label>
      </div>
      {value && accept.startsWith("image") && <img src={value} alt="" className="thumb" />}
      {error && <p className="error small">{error}</p>}
    </div>
  );
}

function ConfirmDelete({ label, onConfirm }: { label: string; onConfirm: () => void }) {
  const [armed, setArmed] = useState(false);
  return armed ? (
    <span className="row">
      <button className="btn danger" onClick={onConfirm}>Delete “{label}”</button>
      <button className="btn ghost" onClick={() => setArmed(false)}>Cancel</button>
    </span>
  ) : (
    <button className="btn ghost danger" onClick={() => setArmed(true)}>Delete</button>
  );
}
