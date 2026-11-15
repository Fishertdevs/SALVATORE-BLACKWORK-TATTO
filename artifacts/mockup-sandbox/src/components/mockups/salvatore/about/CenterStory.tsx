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
              <div className="page-about-editorial-beat page-about-editorial-beat-left-1">
                <h2 data-about-reveal="heading">UNA IDEA<br /><em>EN COMÚN</em></h2>
                <p data-about-reveal="copy">Salvatore Blackwork nació para convertir ideas personales en piezas pensadas para el cuerpo.</p>
              </div>
              <div className="page-about-editorial-beat page-about-editorial-beat-left-2">
                <h2 data-about-reveal="heading">UNA VISIÓN<br /><em>PROPIA</em></h2>
                <p data-about-reveal="copy">La propuesta une contraste, líneas precisas y composición a medida en un lenguaje visual sobrio.</p>
              </div>
            </article>
            <figure className="page-about-portrait">
              <img src={image} alt="Retrato editorial con tratamiento rojo sobre el rostro" />
            </figure>
            <article className="page-about-editorial-side page-about-editorial-side-right">
              <div className="page-about-editorial-beat page-about-editorial-beat-right-1">
                <h2 data-about-reveal="heading">EL DIÁLOGO<br /><em>PRIMERO</em></h2>
                <p data-about-reveal="copy">Cada proyecto comienza escuchando la historia, las referencias y la intención de quien lo llevará.</p>
              </div>
              <div className="page-about-editorial-beat page-about-editorial-beat-right-2">
                <h2 data-about-reveal="heading">DISEÑO<br /><em>CON SENTIDO</em></h2>
                <p data-about-reveal="copy">De esa conversación surge una pieza que acompaña el movimiento y expresa una identidad propia.</p>
              </div>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}
