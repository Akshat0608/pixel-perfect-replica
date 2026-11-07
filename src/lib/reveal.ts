/**
 * Scroll effects for the sections below the hero: fade-up reveals, the About text
 * lighting up word by word, and project videos that only play while on screen.
 * Call startReveal() from the browser only; it returns a cleanup function.
 */
export function startReveal() {
  const reveals = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("in");
        reveals.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  document.querySelectorAll(".rv").forEach((el) => reveals.observe(el));

  const videos = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }
  });
  document.querySelectorAll("video[data-lazy]").forEach((el) => videos.observe(el));

  // Each word brightens as the paragraph moves from the bottom of the viewport to its middle.
  const paragraphs = [...document.querySelectorAll<HTMLElement>("[data-words]")];
  let raf = 0;
  const paint = () => {
    raf = 0;
    for (const p of paragraphs) {
      const r = p.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (innerHeight * 0.9 - r.top) / (innerHeight * 0.5)));
      const words = p.children;
      const lit = t * words.length;
      for (let i = 0; i < words.length; i++) {
        (words[i] as HTMLElement).style.opacity = String(
          0.22 + 0.78 * Math.min(1, Math.max(0, lit - i)),
        );
      }
    }
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(paint);
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  paint();

  return () => {
    reveals.disconnect();
    videos.disconnect();
    cancelAnimationFrame(raf);
    removeEventListener("scroll", onScroll);
    removeEventListener("resize", onScroll);
  };
}
