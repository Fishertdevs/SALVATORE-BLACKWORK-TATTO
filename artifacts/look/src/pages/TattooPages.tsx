import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import aboutImg from "@assets/generated_images/about-blackwork-portrait.png";
import portfolioImg from "@assets/generated_images/portfolio-blackwork-shoulder.png";
import servicesImg from "@assets/generated_images/services-blackwork-detail.png";
import bookingImg from "@assets/generated_images/booking-blackwork-study.png";
import contactImg from "@assets/generated_images/contact-blackwork-portrait.png";

function StudioFrame({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`tattoo-page ${className}`}>
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="tattoo-eyebrow">{children}</p>;
}

export function AboutPage() {
  return (
    <StudioFrame id="studio-about" className="page-about">
      <section className="page-about-hero">
        <div className="page-about-title">
          <Eyebrow>ACERCA DE / 002</Eyebrow>
          <h1>THE HAND<br /><em>behind</em><br />THE INK.</h1>
          <p>Una práctica construida alrededor de la paciencia, la precisión y la confianza.</p>
        </div>
        <figure className="page-about-portrait">
          <img src={aboutImg} alt="Retrato editorial de una modelo con tatuajes blackwork" />
          <figcaption>THE STUDIO / BOGOTÁ / 2026</figcaption>
        </figure>
      </section>
      <section className="page-about-story">
        <div className="page-about-story-label"><Eyebrow>THE SALVATORE METHOD</Eyebrow><span>↓</span></div>
        <div className="page-about-story-copy">
          <h2>Sharp lines.<br /><em>Human rhythm.</em></h2>
          <p>El blackwork es el punto de partida: masas de sombra, espacio negativo controlado y formas que siguen el movimiento real del cuerpo.</p>
          <p>Cada pieza comienza con una conversación. Observamos la anatomía, la historia y la energía de quien se sienta frente a nosotros antes de dibujar una sola línea.</p>
        </div>
      </section>
      <section className="page-about-process">
        <Eyebrow>DEL CONCEPTO A LA PIEL / 03 PASOS</Eyebrow>
        <div className="page-about-process-grid">
          <article><strong>01</strong><h3>ESCUCHAR</h3><p>Entender la idea, el cuerpo y lo que quieres que permanezca.</p></article>
          <article><strong>02</strong><h3>DIBUJAR</h3><p>Convertir la conversación en una composición clara y propia.</p></article>
          <article><strong>03</strong><h3>MARCAR</h3><p>Trabajar con calma para que el resultado se sienta inevitable.</p></article>
        </div>
      </section>
    </StudioFrame>
  );
}

export function PortfolioPage() {
  const works = [
    ["BW—01", "SHOULDER / BLACK FLAME", portfolioImg, "page-portfolio-card-large"],
    ["BW—02", "NECK / THORN STUDY", servicesImg, "page-portfolio-card-small"],
    ["BW—03", "HAND / VOID SCRIPT", contactImg, "page-portfolio-card-small"],
  ] as const;

  return (
    <StudioFrame id="studio-portfolio" className="page-portfolio">
      <section className="page-portfolio-hero">
        <div>
          <Eyebrow>PORTFOLIO / 003</Eyebrow>
          <h1>SELECTED<br /><em>blackwork</em><br />STUDIES.</h1>
        </div>
        <p>Una selección de composiciones hechas a medida, pensadas para vivir con el cuerpo y no solo sobre él.</p>
      </section>
      <section className="page-portfolio-gallery">
        {works.map(([code, name, image, className]) => (
          <article className={className} key={code}>
            <figure>
              <img src={image} alt={`${name} — tatuaje blackwork editorial`} />
            </figure>
            <div className="page-portfolio-meta"><span>{code}</span><strong>{name}</strong></div>
          </article>
        ))}
      </section>
      <section className="page-portfolio-note">
        <Eyebrow>NO HAY DOS IGUALES</Eyebrow>
        <h2>Your mark,<br /><em>your language.</em></h2>
        <a className="tattoo-red-link" href="#studio-booking">CUÉNTANOS TU IDEA →</a>
      </section>
    </StudioFrame>
  );
}

export function ServicesPage() {
  const services = [
    ["01", "CUSTOM BLACKWORK", "Diseños construidos desde cero alrededor de tu idea, tu anatomía y tu ritmo."],
    ["02", "SMALL STUDIES", "Piezas pequeñas para comenzar una colección de tinta con intención."],
    ["03", "LARGE COMPOSITIONS", "Proyectos de mayor escala pensados para moverse con el cuerpo y el tiempo."],
    ["04", "CONSULTATION", "Una conversación clara para definir concepto, ubicación, tamaño y proceso."],
  ];

  return (
    <StudioFrame id="studio-services" className="page-services">
      <section className="page-services-hero">
        <div className="page-services-hero-copy">
          <Eyebrow>SERVICIOS / 004</Eyebrow>
          <h1>THE WORK<br /><em>in detail.</em></h1>
          <p>No hay una fórmula única. Cada proyecto recibe el nivel de detalle y tiempo que necesita.</p>
        </div>
        <figure className="page-services-image">
          <img src={servicesImg} alt="Detalle de tatuaje blackwork en una composición editorial" />
          <figcaption>THE BODY / THE LINE / THE WEIGHT</figcaption>
        </figure>
      </section>
      <section className="page-services-list">
        {services.map(([number, name, description]) => (
          <article key={number}>
            <span>{number}</span>
            <h2>{name}</h2>
            <p>{description}</p>
            <span className="page-services-arrow">↗</span>
          </article>
        ))}
      </section>
      <section className="page-services-callout">
        <Eyebrow>THE SALVATORE METHOD</Eyebrow>
        <h2>PRECISION<br /><em>over noise.</em></h2>
        <a className="tattoo-light-link" href="#studio-about">CONOCER EL ESTUDIO →</a>
      </section>
    </StudioFrame>
  );
}

export function BookingPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <StudioFrame id="studio-booking" className="page-booking">
      <section className="page-booking-heading">
        <Eyebrow>RESERVAS / 005</Eyebrow>
        <h1>START WITH<br /><em>an idea.</em></h1>
        <p>Cuéntanos qué quieres llevar en la piel. Revisamos cada propuesta personalmente.</p>
      </section>
      <section className="page-booking-layout">
        <figure className="page-booking-image">
          <img src={bookingImg} alt="Estudio de dibujo y preparación para una sesión de tatuaje" />
          <figcaption>PREPARE THE IDEA / THEN THE SKIN</figcaption>
        </figure>
        <div className="page-booking-form-wrap">
          <div className="page-booking-aside">
            <Eyebrow>ANTES DE ESCRIBIR</Eyebrow>
            <p>Incluye referencias visuales, tamaño aproximado, ubicación y cualquier detalle que sientas importante.</p>
            <p>Respondemos las solicitudes de lunes a viernes.</p>
          </div>
          {sent ? (
            <div className="tattoo-form-success">
              <Eyebrow>RECIBIDO / 005</Eyebrow>
              <h2>Tu idea ya está<br /><em>en el estudio.</em></h2>
              <p>Gracias por escribir. Te contactaremos para continuar la conversación.</p>
              <button type="button" onClick={() => setSent(false)}>ENVIAR OTRA CONSULTA →</button>
            </div>
          ) : (
            <form className="tattoo-form" onSubmit={handleSubmit}>
              <label>Tu nombre<input required name="name" placeholder="NOMBRE COMPLETO" /></label>
              <label>Tu email<input required type="email" name="email" placeholder="EMAIL" /></label>
              <label>Cuéntanos tu idea<textarea required name="idea" rows={5} placeholder="IDEA, UBICACIÓN, TAMAÑO..." /></label>
              <button type="submit">ENVIAR CONSULTA <span>↗</span></button>
            </form>
          )}
        </div>
      </section>
    </StudioFrame>
  );
}

export function ContactPage() {
  return (
    <StudioFrame id="studio-contact" className="page-contact">
      <section className="page-contact-hero">
        <div className="page-contact-title">
          <Eyebrow>CONTACTO / 006</Eyebrow>
          <h1>COME<br /><em>say hello.</em></h1>
          <p>Para consultas, colaboraciones y preguntas sobre el estudio, escríbenos.</p>
        </div>
        <figure className="page-contact-image">
          <img src={contactImg} alt="Retrato editorial con tatuajes blackwork" />
        </figure>
      </section>
      <section className="page-contact-details">
        <div><Eyebrow>EMAIL</Eyebrow><a href="mailto:hello@salvatoreblackwork.tattoo">HELLO@SALVATOREBLACKWORK.TATTOO</a></div>
        <div><Eyebrow>SOCIAL</Eyebrow><a href="#">@SALVATOREBLACKWORK</a></div>
        <div><Eyebrow>HORARIO</Eyebrow><p>LUN — VIE<br />BY APPOINTMENT</p></div>
        <div><Eyebrow>RESERVAS</Eyebrow><a className="tattoo-red-link" href="#studio-booking">INICIAR CONSULTA →</a></div>
      </section>
      <section className="page-contact-statement">
        <h2>MAKE IT<br /><em>permanent.</em></h2>
        <span>STUDIO NOTES / 2026</span>
      </section>
    </StudioFrame>
  );
}

export function StudioHomeSections() {
  return (
    <div className="studio-home-sections" aria-label="Información del estudio">
      <AboutPage />
      <PortfolioPage />
      <ServicesPage />
      <BookingPage />
      <ContactPage />
    </div>
  );
}