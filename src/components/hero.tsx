import { useRef, type PointerEvent } from "react";

import { EMAIL } from "@/content/portfolio";

const NAV = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
];

const TOOLS = ["Higgsfield", "Veo 3.1", "Kling", "Runway", "ElevenLabs", "Midjourney"];

const CLIENTS = ["PhysicsWallah", "ADISNPIRE", "Freelance"];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

// Moves the colour lens to the cursor; touch is left alone so the page still scrolls.
function moveLens(e: PointerEvent<HTMLElement>) {
  if (e.pointerType === "touch") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - r.left}px`);
  el.style.setProperty("--y", `${e.clientY - r.top}px`);
  el.classList.add("lens-on");
}

export function Hero() {
  const progress = useRef<HTMLElement>(null);

  return (
    <section className="hx" aria-labelledby="hero-title">
      <figure
        className="hx-photo"
        onPointerEnter={moveLens}
        onPointerMove={moveLens}
        onPointerLeave={(e) => e.currentTarget.classList.remove("lens-on")}
      >
        <img src="/akshat.png" alt="Akshat Kumar, AI filmmaker" />
        {/* Hover lens: the colour photo, slightly magnified, clipped to a circle under the cursor. */}
        <div className="hx-lens" aria-hidden="true">
          <img src="/akshat.png" alt="" />
          <span className="hx-lens-ring" />
        </div>
        <svg width="0" height="0" className="hx-svg" aria-hidden="true">
          <filter id="hx-liquid" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.011 0.016" numOctaves="2" seed="7" />
            <feDisplacementMap
              in="SourceGraphic"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      </figure>
      {/* Giant name set behind the portrait. */}
      <h1 id="hero-title" className="hx-name">
        Akshat
      </h1>
      <p className="hx-clients" aria-label="Worked with">
        {CLIENTS.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </p>

      <div className="hx-left">
        <nav className="hx-nav" aria-label="Primary navigation">
          {NAV.map((item, i) => (
            <a key={item.label} href={item.href} aria-current={i === 0 ? "page" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hx-title">
          <p>
            Pure
            <br />
            Cinema
          </p>
          <span>('26)</span>
        </div>

        <div className="hx-about">
          <p className="hx-tag">(About)</p>
          <p>Turning scripts into ultra-realistic, cinematic AI films.</p>
          <a className="hx-btn" href={`mailto:${EMAIL}`}>
            Book a call <Arrow />
          </a>
        </div>

        <div className="hx-cards">
          <div className="hx-card hx-card-dark">
            <strong>10+</strong>
            <small>AI tools in the kit</small>
            <ul>
              {TOOLS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <a className="hx-btn hx-btn-light" href={`mailto:${EMAIL}`}>
              Book a call <Arrow />
            </a>
          </div>
          <a
            className="hx-card hx-card-media"
            href="/projects/project-5.mp4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <video src="/projects/project-5.mp4#t=2" muted loop autoPlay playsInline />
            <span className="hx-card-top">
              <span>Showreel</span>
              <span>05/06</span>
            </span>
            <span className="hx-card-foot">
              <strong>AI films</strong>
              for PhysicsWallah
            </span>
          </a>
        </div>
      </div>

      <div className="hx-right">
        <div className="hx-top">
          <p>
            Currently
            <br />
            AI Filmmaker at PhysicsWallah
          </p>
          <a className="hx-btn" href="#contact">
            Contact me <Arrow />
          </a>
        </div>

        <span className="hx-chip">
          <i aria-hidden="true">✓</i>
          AI-first workflow
        </span>

        <p className="hx-avail">
          Available
          <br />
          <span>for projects</span>
        </p>

        <div className="hx-latest">
          <small>Latest work</small>
          <div className="hx-latest-head">
            <b>PW Original OTT Series</b>
            <span>Ongoing</span>
          </div>
          <a
            className="hx-latest-media"
            href="/projects/project-4.mp4"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch PW Original OTT Series clip"
          >
            <video
              src="/projects/project-4.mp4"
              muted
              loop
              autoPlay
              playsInline
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                if (progress.current && v.duration)
                  progress.current.style.width = `${(v.currentTime / v.duration) * 100}%`;
              }}
            />
            <span className="hx-play">
              <Arrow />
            </span>
            <span className="hx-progress">
              <b ref={progress} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
