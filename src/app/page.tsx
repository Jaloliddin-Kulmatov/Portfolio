import { ProjectGrid } from "@/components/ProjectGrid";
import { getContent } from "@/lib/db";

// Rebuilt when the admin saves (revalidatePath("/")), and at most once a minute otherwise.
export const revalidate = 60;

export default async function Home() {
  const c = await getContent();
  const { profile } = c;

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a href="#top" className="brand">{profile.name}</a>
          <nav aria-label="Sections" className="nav-links">
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div className="hero-text">
            <p className="eyebrow">{profile.location}</p>
            <h1>{profile.name}</h1>
            <p className="headline">{profile.headline}</p>
            <p className="intro">{profile.intro}</p>
            <div className="row">
              <a className="btn primary" href="#projects">See my projects</a>
              {profile.cvUrl && <a className="btn" href={profile.cvUrl} target="_blank" rel="noreferrer">Download CV</a>}
            </div>
          </div>
          {profile.photo && <img className="hero-photo" src={profile.photo} alt={`Photo of ${profile.name}`} />}
        </section>

        {c.stats.length > 0 && (
          <section className="wrap stats" aria-label="Highlights">
            {c.stats.map((s) => (
              <div className="stat" key={s.id}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </section>
        )}

        <section className="wrap section about" aria-labelledby="about-h">
          <h2 id="about-h">About me</h2>
          <div className="about-text">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="wrap section" id="projects" aria-labelledby="projects-h">
          <h2 id="projects-h">Projects</h2>
          <ProjectGrid projects={c.projects} />
        </section>

        <section className="wrap section" id="experience" aria-labelledby="exp-h">
          <h2 id="exp-h">Experience</h2>
          <ol className="timeline">
            {c.experience.map((e) => (
              <li key={e.id}>
                <div className="tl-head">
                  <h3>{e.role}</h3>
                  <span className="muted">{e.period}</span>
                </div>
                <p className="muted">{e.org}</p>
                <ul>
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="wrap section two-col" id="skills">
          <div>
            <h2>Skills</h2>
            <dl className="skills">
              {c.skills.map((g) => (
                <div key={g.id}>
                  <dt>{g.name}</dt>
                  <dd>
                    {g.items.map((s) => (
                      <span className="chip" key={s}>{s}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2>Awards & publications</h2>
            <ul className="awards">
              {c.awards.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="wrap footer-in">
          <div>
            <h2>Let’s talk</h2>
            <p>
              Email me at <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </div>
          <ul className="links">
            {c.links.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <p className="wrap muted small">© {new Date().getFullYear()} {profile.name}</p>
      </footer>
    </>
  );
}
