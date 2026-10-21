import { useEffect, useRef } from "react";
import "./_group.css";

const image = "/__mockup/images/salvatore-about-cutout.png";

export function CenterStory() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const targets = Array.from(section.querySelectorAll<HTMLElement>("[data-about-reveal]"));
    const activeTargets = new WeakSet<HTMLElement>();
    targets.forEach((target) => target.classList.add("about-hero-reveal"));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          if (activeTargets.has(target)) return;
          activeTargets.add(target);
          target.classList.remove("is-offscreen");
          target.classList.remove("is-revealing");
          void target.offsetWidth;
          target.classList.add("is-revealing");
        } else if (!entry.isIntersecting) {
          activeTargets.delete(target);
          target.classList.remove("is-revealing");
          target.classList.add("is-offscreen");
        } else if (!activeTargets.has(target)) {
          target.classList.add("is-offscreen");
        }
      });
    }, { threshold: [0, 0.15] });

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      targets.forEach((target) => target.classList.remove("about-hero-reveal", "is-revealing"));
    };
  }, []);

  return (
    <main className="about-mockup-root">
      <section ref={sectionRef} className="tattoo-page page-about about-center-story">
        <section className="page-about-hero-editorial">
          <header className="page-about-editorial-heading">
            <h1 data-about-reveal="title">CÓMO INICIÓ ESTE PROYECTO</h1>
          </header>
          <div className="page-about-editorial-grid">
            <article className="page-about-editorial-side page-about-editorial-side-left">
              <h2 data-about-reveal="heading">Líneas precisas.<br /><em>ritmo humano.</em></h2>
              <p data-about-reveal="copy">Salvatore Blackwork parte de una convicción: cada pieza debe nacer de una conversación y encontrar su forma en el cuerpo.</p>
            </article>
            <figure className="page-about-portrait">
              <img src={image} alt="Retrato editorial con tratamiento rojo sobre el rostro" />
            </figure>
            <article className="page-about-editorial-side page-about-editorial-side-right">
              <h2 data-about-reveal="heading">Observar<br /><em>antes de marcar.</em></h2>
              <p data-about-reveal="copy">El blackwork combina masas de sombra y espacio negativo para crear formas que siguen el movimiento real del cuerpo.</p>
              <p data-about-reveal="copy">La anatomía, la historia y la energía de cada persona orientan el diseño antes de dibujar una sola línea.</p>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}
