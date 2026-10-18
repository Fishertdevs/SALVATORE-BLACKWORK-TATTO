import "./_group.css";

const image = "/__mockup/images/salvatore-about-cutout.png";

export function CenterStory() {
  return (
    <main className="about-mockup-root">
      <section className="tattoo-page page-about about-center-story">
        <section className="page-about-hero-editorial">
          <header className="page-about-editorial-heading">
            <h1>CÓMO INICIÓ ESTE PROYECTO</h1>
          </header>
          <div className="page-about-editorial-grid">
            <article className="page-about-editorial-side page-about-editorial-side-left">
              <h2>Líneas precisas.<br /><em>ritmo humano.</em></h2>
              <p>Salvatore Blackwork parte de una convicción: cada pieza debe nacer de una conversación y encontrar su forma en el cuerpo.</p>
            </article>
            <figure className="page-about-portrait">
              <img src={image} alt="Retrato editorial con tratamiento rojo sobre el rostro" />
            </figure>
            <article className="page-about-editorial-side page-about-editorial-side-right">
              <h2>Observar<br /><em>antes de marcar.</em></h2>
              <p>El blackwork combina masas de sombra y espacio negativo para crear formas que siguen el movimiento real del cuerpo.</p>
              <p>La anatomía, la historia y la energía de cada persona orientan el diseño antes de dibujar una sola línea.</p>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}
