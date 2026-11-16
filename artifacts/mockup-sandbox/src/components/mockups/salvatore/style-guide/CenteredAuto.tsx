import "./_group.css";
import { useEffect, useState } from "react";

const image = "/__mockup/images/salvatore-neotribal-source.png";

export function CenteredAuto() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [prefersReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % 2);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <main className="style-guide-preview style-guide-preview--auto">
      <article className="style-guide-preview-card">
        <img src={image} alt="Tatuaje neotribal que sigue las líneas del cuerpo" />
        {isOpen && (
          <div className="page-portfolio-style-overlay" role="region" aria-live="off" aria-labelledby="preview-style-title">
            <button
              className="page-portfolio-style-close"
              type="button"
              aria-label="Cerrar guía de estilo"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <div className="page-portfolio-style-text portfolio-style-copy-in" key={activeSlide}>
              <p className="tattoo-eyebrow">GUÍA DE ESTILO · {String(activeSlide + 1).padStart(2, "0")} / 02</p>
              <h3 id="preview-style-title">NEOTRIBAL</h3>
              {activeSlide === 0 ? (
                <>
                  <strong className="page-portfolio-style-subtitle">LÍNEAS FLUIDAS Y MOVIMIENTO</strong>
                  <p>
                    El neotribal reinterpreta las formas tribales con líneas negras de ritmo variable,
                    puntas orgánicas y curvas. La composición se adapta a la anatomía, al movimiento
                    y a la zona elegida para crear una pieza original.
                  </p>
                </>
              ) : (
                <>
                  <strong className="page-portfolio-style-subtitle">DATOS CLAVE</strong>
                  <ul>
                    <li>Trazos fluidos y contrastados</li>
                    <li>Composición personalizada para la anatomía</li>
                    <li>Dirección visual definida por ubicación y escala</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
