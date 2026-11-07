import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const TITLE = "Vante — Craft in Motion";
const DESCRIPTION =
  "A studio portfolio where a ribbon of live video work sweeps through space, then lands in a grid.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import("@/vante/scene").then(({ startVante }) => {
      if (!cancelled) cleanup = startVante();
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div id="track">
      <main className="stage" id="stage">
        <h1 aria-label="Craft in motion">
          <div className="hl" id="l1" aria-hidden="true">
            <span>CRAFT IN</span>
          </div>
          <div className="hl" id="l2" aria-hidden="true">
            <span>MOTION</span>
          </div>
        </h1>
        <div id="cap">Exploring ideas through daily design practice.</div>
        <div id="glow"></div>
        <div id="cross">
          <i>+</i>
        </div>
        <div id="rule"></div>
        <canvas id="gl"></canvas>
        <div id="hint">START A PROJECT &nbsp;→</div>
        <header className="top">
          <div className="logo">
            <svg viewBox="0 0 22 18">
              <path d="M11 0l11 18h-6.200L11 9.600 6.200 18H0z" />
            </svg>
            VANTE
          </div>
          <div id="pager">
            <span>←</span>
            <span>→</span>
          </div>
          <nav className="acts">
            <a href="#">
              <i></i>LET'S TALK
            </a>
            <a href="#">
              MENU<b></b>
            </a>
          </nav>
        </header>
        <footer className="bot">
          <p>
            Concepts, explorations and interface experiments shared openly as part of our creative
            process.
          </p>
          <div className="mid">
            VISUALS<s>/</s>FILM<s>/</s>MUSIC<s>/</s>EXPERIMENTS
          </div>
          <div className="r">VIEW SHOWREEL</div>
        </footer>
        <div id="name"></div>
      </main>
    </div>
  );
}
