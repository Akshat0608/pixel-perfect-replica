import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { Hero } from "@/components/hero";
import { PortfolioSections } from "@/components/portfolio-sections";

const TITLE = "Akshat Portfolio";
const DESCRIPTION =
  "Akshat Kumar is an AI filmmaker, video editor and sound designer creating ultra-realistic, cinematic stories.";

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
    import("@/lib/reveal").then(({ startReveal }) => {
      if (!cancelled) cleanup = startReveal();
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <main className="pf">
      <Hero />
      <PortfolioSections />
    </main>
  );
}
