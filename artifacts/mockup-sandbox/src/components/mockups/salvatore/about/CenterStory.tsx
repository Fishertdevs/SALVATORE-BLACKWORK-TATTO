import "./_group.css";

const image = "/__mockup/images/salvatore-about-current.png";

const steps = [
  ["ESCUCHAR", "Entender la idea, el cuerpo y lo que quieres que permanezca."],
  ["DIBUJAR", "Convertir la conversación en una composición clara y propia."],
  ["MARCAR", "Trabajar con calma para que el resultado se sienta inevitable."],
];

export function CenterStory() {
  return (
    <main className="about-mockup-root">
      <section className="tattoo-page page-about about-center-story">
        <section className="page-about-hero-editorial">
          <header className="page-about-editorial-heading">
            <p className="tattoo-eyebrow">ACERCA DE / 002</p>
            <h1>LA MANO<br /><em>detrás</em><br />DE LA TINTA.</h1>
            <span>EL ESTUDIO / BOGOTÁ / 2026</span>
          </header>
          <div className="page-about-editorial-grid">
            <article className="page-about-editorial-side page-about-editorial-side-left">
              <span className="page-about-editorial-index">01 / EL ORIGEN</span>
              <h2>Líneas precisas.<br /><em>ritmo humano.</em></h2>
              <p>Salvatore Blackwork parte de una convicción: cada pieza debe nacer de una conversación y encontrar su forma en el cuerpo.</p>
            </article>
            <figure className="page-about-portrait">
              <img src={image} alt="Retrato editorial con una franja naranja sobre el rostro" />
              <figcaption>EL ESTUDIO / BOGOTÁ / 2026</figcaption>
            </figure>
            <article className="page-about-editorial-side page-about-editorial-side-right">
              <span className="page-about-editorial-index">02 / EL LENGUAJE</span>
              <h2>Observar<br /><em>antes de marcar.</em></h2>
              <p>El blackwork combina masas de sombra y espacio negativo para crear formas que siguen el movimiento real del cuerpo.</p>
              <p>La anatomía, la historia y la energía de cada persona orientan el diseño antes de dibujar una sola línea.</p>
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
