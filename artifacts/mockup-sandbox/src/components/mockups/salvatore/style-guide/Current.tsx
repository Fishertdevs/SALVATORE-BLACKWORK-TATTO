import "./_group.css";
import { useState } from "react";

const image = "/__mockup/images/salvatore-neotribal-source.png";

export function Current() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main className="style-guide-preview">
      <article className="style-guide-preview-card">
        <img src={image} alt="Tatuaje neotribal que sigue las líneas del cuerpo" />
        {isOpen && (
          <div className="page-portfolio-style-overlay">
            <button
              className="page-portfolio-style-close"
              type="button"
              aria-label="Cerrar guía de estilo"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <div className="page-portfolio-style-text" key={activeSlide}>
              <p className="tattoo-eyebrow">GUÍA DE ESTILO · {String(activeSlide + 1).padStart(2, "0")} / 02</p>
              <h3>NEOTRIBAL</h3>
              {activeSlide === 0 ? (
                <>
                  <strong className="page-portfolio-style-subtitle">LÍNEAS FLUIDAS Y MOVIMIENTO</strong>
                  <p>
                    El neotribal reinterpreta formas tribales con trazos dinámicos,
                    puntas orgánicas y curvas que acompañan la anatomía y el movimiento del cuerpo.
                  </p>
                </>
              ) : (
                <>
                  <strong className="page-portfolio-style-subtitle">DATOS CLAVE</strong>
                  <ul>
                    <li>Formas expresivas y fluidas</li>
                    <li>Diseño pensado para seguir el cuerpo</li>
                  </ul>
                </>
              )}
              <nav className="page-portfolio-style-controls" aria-label="Guía de estilo">
                <button type="button" aria-label="Texto anterior" onClick={() => setActiveSlide((slide) => (slide + 1) % 2)}>
                  ←
                </button>
                <button type="button" aria-label="Siguiente texto" onClick={() => setActiveSlide((slide) => (slide + 1) % 2)}>
                  →
                </button>
              </nav>
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
