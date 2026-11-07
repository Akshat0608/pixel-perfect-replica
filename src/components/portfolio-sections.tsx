import { ABOUT, EMAIL, EXPERIENCE, PROJECTS, SERVICES, STATS } from "@/content/portfolio";

const pad = (n: number) => String(n + 1).padStart(2, "0");

function ContactButton({ href = "#contact" }: { href?: string }) {
  return (
    <a href={href} className="pf-contact">
      Contact me
    </a>
  );
}

function Experience() {
  const strip = (
    <>
      {EXPERIENCE.map((x) => (
        <div key={x.note} className="pf-chip">
          <span className="pf-chip-mark">{x.org.charAt(0)}</span>
          <span>
            <b>{x.role}</b>
            <small>
              {x.org} · {x.note}
            </small>
          </span>
        </div>
      ))}
      {STATS.map((s) => (
        <div key={s.label} className="pf-chip pf-stat">
          <strong>{s.value}</strong>
          <small>{s.label}</small>
        </div>
      ))}
    </>
  );
  return (
    <section className="pf-exp" aria-labelledby="pf-exp-title">
      <h2 id="pf-exp-title" className="pf-eyebrow rv">
        Experience
      </h2>
      <div className="pf-marquee">
        {/* Two copies so the loop is seamless; the second is hidden from screen readers. */}
        <div className="pf-marquee-track">
          <div className="pf-marquee-set">{strip}</div>
          <div className="pf-marquee-set" aria-hidden="true">
            {strip}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="pf-about">
      <h2 className="pf-giant pf-grad rv">About me</h2>
      <p className="pf-roles rv">{ABOUT.roles}</p>
      <div className="pf-words">
        {ABOUT.paragraphs.map((para) => (
          <p key={para} data-words>
            {para.split(" ").map((w, i) => (
              <span key={i}>{w} </span>
            ))}
          </p>
        ))}
      </div>
      <div className="rv">
        <ContactButton />
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="pf-services">
      <h2 className="pf-giant rv">What I do</h2>
      <ol className="pf-svc-list">
        {SERVICES.map((s, i) => (
          <li key={s.name} className="pf-svc rv">
            <span className="pf-svc-num">{pad(i)}</span>
            <div>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <ul className="pf-tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="pf-projects">
      <h2 className="pf-giant pf-grad rv">Projects</h2>
      <div className="pf-proj-list">
        {PROJECTS.map((p, i) => (
          <article key={p.title} className="pf-proj rv">
            <header>
              <span className="pf-proj-num pf-grad">{pad(i)}</span>
              <div className="pf-proj-head">
                <small>{p.kicker}</small>
                <h3>{p.title}</h3>
              </div>
              {p.media[0] && (
                <a
                  className="pf-ghost"
                  href={`/projects/${p.media[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch <span aria-hidden="true">↗</span>
                </a>
              )}
            </header>
            <p className="pf-proj-copy">{p.overview}</p>
            <p className="pf-proj-role">{p.role}</p>
            {p.media.length > 0 && (
              <div className={`pf-media pf-media-${p.media.length}`}>
                {p.media.map((m) => (
                  <a
                    key={m}
                    href={`/projects/${m}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${p.title} clip`}
                  >
                    <video
                      src={`/projects/${m}#t=0.5`}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      data-lazy
                    />
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="pf-footer">
      <p className="pf-eyebrow rv">Got an idea but don't know where to start?</p>
      <h2 className="pf-giant pf-grad rv">Let's talk</h2>
      <a className="pf-mail rv" href={`mailto:${EMAIL}`}>
        {EMAIL}
      </a>
      <div className="rv">
        <ContactButton href={`mailto:${EMAIL}`} />
      </div>
      <small className="pf-copy">© {new Date().getFullYear()} Akshat Kumar</small>
    </footer>
  );
}

export function PortfolioSections() {
  return (
    <>
      <Experience />
      <About />
      <Services />
      <Projects />
      <Contact />
    </>
  );
}
