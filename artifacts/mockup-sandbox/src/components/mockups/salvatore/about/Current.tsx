import "./_group.css";

const image = "/__mockup/images/salvatore-about-current.png";

const steps = [
  ["ESCUCHAR", "Entender la idea, el cuerpo y lo que quieres que permanezca."],
  ["DIBUJAR", "Convertir la conversación en una composición clara y propia."],
  ["MARCAR", "Trabajar con calma para que el resultado se sienta inevitable."],
];

export function Current() {
  return (
    <main className="about-mockup-root">
      <section className="tattoo-page page-about">
        <section className="page-about-hero-editorial">
          <header className="page-about-editorial-heading">
            <p className="tattoo-eyebrow">ACERCA DE / 002</p>
            <h1>LA MANO<br /><em>detrás</em><br />DE LA TINTA.</h1>
            <span>EL ESTUDIO / BOGOTÁ / 2026</span>
          </header>
          <div className="page-about-editorial-grid">
            <article className="page-about-editorial-side page-about-editorial-side-left">
              <span className="page-about-editorial-index">01 / LA PRÁCTICA</span>
              <h2>Líneas precisas.<br /><em>ritmo humano.</em></h2>
              <p>Una práctica construida alrededor de la paciencia, la precisión y la confianza.</p>
              <a className="tattoo-red-link" href="#studio-services">CONOCER EL MÉTODO →</a>
            </article>
            <figure className="page-about-portrait">
              <img src={image} alt="Retrato editorial con una franja naranja sobre el rostro" />
              <figcaption>EL ESTUDIO / BOGOTÁ / 2026</figcaption>
            </figure>
            <article className="page-about-editorial-side page-about-editorial-side-right">
              <span className="page-about-editorial-index">02 / LA MIRADA</span>
              <h2>OBSERVAR<br /><em>antes de marcar.</em></h2>
              <p>El blackwork es el punto de partida: masas de sombra, espacio negativo controlado y formas que siguen el movimiento real del cuerpo.</p>
              <p>Cada pieza comienza con una conversación. Observamos la anatomía, la historia y la energía de quien se sienta frente a nosotros antes de dibujar una sola línea.</p>
            </article>
          </div>
        </section>
        <section className="page-about-process">
          <p className="tattoo-eyebrow">DEL CONCEPTO A LA PIEL / 03 PASOS</p>
          <div className="page-about-process-grid">
            {steps.map(([title, description], index) => (
              <article key={title}>
                <strong>0{index + 1}</strong>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
