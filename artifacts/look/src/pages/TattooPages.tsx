import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { Language } from "@/i18n";
import aboutImg from "@assets/generated_images/about-blackwork-portrait.png";
import portfolioImg from "@assets/generated_images/portfolio-blackwork-shoulder.png";
import servicesImg from "@assets/generated_images/services-blackwork-detail.png";
import bookingImg from "@assets/generated_images/booking-blackwork-study.png";
import contactImg from "@assets/generated_images/contact-blackwork-portrait.png";

const studioCopy = {
  es: {
    about: {
      eyebrow: "ACERCA DE / 002",
      title: ["LA MANO", "detrás", "DE LA TINTA"],
      intro: "Una práctica construida alrededor de la paciencia, la precisión y la confianza.",
      studio: "EL ESTUDIO / BOGOTÁ / 2026",
      method: "EL MÉTODO SALVATORE",
      storyTitle: ["Líneas precisas.", "Ritmo humano."],
      story: [
        "El blackwork es el punto de partida: masas de sombra, espacio negativo controlado y formas que siguen el movimiento real del cuerpo.",
        "Cada pieza comienza con una conversación. Observamos la anatomía, la historia y la energía de quien se sienta frente a nosotros antes de dibujar una sola línea.",
      ],
      process: "DEL CONCEPTO A LA PIEL / 03 PASOS",
      steps: [
        ["ESCUCHAR", "Entender la idea, el cuerpo y lo que quieres que permanezca."],
        ["DIBUJAR", "Convertir la conversación en una composición clara y propia."],
        ["MARCAR", "Trabajar con calma para que el resultado se sienta inevitable."],
      ],
    },
    portfolio: {
      eyebrow: "PORTFOLIO / 003",
      title: ["ESTUDIOS", "blackwork", "SELECCIONADOS"],
      intro: "Una selección de composiciones hechas a medida, pensadas para vivir con el cuerpo y no solo sobre él.",
      works: [
        ["BW—01", "HOMBRO / LLAMA NEGRA", "Tatuaje blackwork de hombro"],
        ["BW—02", "CUELLO / ESTUDIO DE ESPINAS", "Tatuaje blackwork de cuello"],
        ["BW—03", "MANO / GUION DEL VACÍO", "Tatuaje blackwork de mano"],
      ],
      note: "NO HAY DOS IGUALES",
      noteTitle: ["Tu marca,", "tu lenguaje."],
      cta: "CUÉNTANOS TU IDEA →",
    },
    services: {
      eyebrow: "SERVICIOS / 004",
      title: ["EL TRABAJO", "en detalle"],
      intro: "No hay una fórmula única. Cada proyecto recibe el nivel de detalle y tiempo que necesita.",
      imageCaption: "EL CUERPO / LA LÍNEA / EL PESO",
      items: [
        ["01", "BLACKWORK A MEDIDA", "Diseños construidos desde cero alrededor de tu idea, tu anatomía y tu ritmo."],
        ["02", "ESTUDIOS PEQUEÑOS", "Piezas pequeñas para comenzar una colección de tinta con intención."],
        ["03", "COMPOSICIONES GRANDES", "Proyectos de mayor escala pensados para moverse con el cuerpo y el tiempo."],
        ["04", "CONSULTA", "Una conversación clara para definir concepto, ubicación, tamaño y proceso."],
      ],
      method: "EL MÉTODO SALVATORE",
      callout: ["PRECISIÓN", "sobre el ruido"],
      cta: "CONOCER EL ESTUDIO →",
    },
    booking: {
      eyebrow: "RESERVAS / 005",
      title: ["EMPIEZA CON", "una idea"],
      intro: "Cuéntanos qué quieres llevar en la piel. Revisamos cada propuesta personalmente.",
      imageCaption: "PREPARA LA IDEA / DESPUÉS LA PIEL",
      asideEyebrow: "ANTES DE ESCRIBIR",
      aside: [
        "Incluye referencias visuales, tamaño aproximado, ubicación y cualquier detalle que sientas importante.",
        "Respondemos las solicitudes de lunes a viernes.",
      ],
      received: "RECIBIDO / 005",
      successTitle: ["Tu idea ya está", "en el estudio."],
      successText: "Gracias por escribir. Te contactaremos para continuar la conversación.",
      another: "ENVIAR OTRA CONSULTA →",
      name: "Tu nombre",
      email: "Tu email",
      idea: "Cuéntanos tu idea",
      namePlaceholder: "NOMBRE COMPLETO",
      ideaPlaceholder: "IDEA, UBICACIÓN, TAMAÑO...",
      submit: "ENVIAR CONSULTA",
    },
    contact: {
      eyebrow: "CONTACTO / 006",
      title: ["VEN", "a saludar"],
      intro: "Para consultas, colaboraciones y preguntas sobre el estudio, escríbenos.",
      email: "EMAIL",
      social: "REDES",
      hours: "HORARIO",
      days: "LUN — VIE",
      appointment: "CON CITA PREVIA",
      booking: "RESERVAS",
      bookingCta: "INICIAR CONSULTA →",
      statement: ["HAZLO", "permanente"],
      notes: "NOTAS DEL ESTUDIO / 2026",
    },
  },
  en: {
    about: {
      eyebrow: "ABOUT / 002",
      title: ["THE HAND", "behind", "THE INK"],
      intro: "A practice built around patience, precision, and trust.",
      studio: "THE STUDIO / BOGOTÁ / 2026",
      method: "THE SALVATORE METHOD",
      storyTitle: ["Sharp lines.", "Human rhythm."],
      story: [
        "Blackwork is the starting point: fields of shadow, controlled negative space, and forms that follow the body's real movement.",
        "Every piece begins with a conversation. We study the anatomy, history, and energy of the person in front of us before drawing a single line.",
      ],
      process: "FROM CONCEPT TO SKIN / 03 STEPS",
      steps: [
        ["LISTEN", "Understand the idea, the body, and what you want to keep."],
        ["DRAW", "Turn the conversation into a clear composition of your own."],
        ["MARK", "Work patiently until the result feels inevitable."],
      ],
    },
    portfolio: {
      eyebrow: "PORTFOLIO / 003",
      title: ["SELECTED", "blackwork", "STUDIES"],
      intro: "A selection of custom compositions made to live with the body, not simply sit on it.",
      works: [
        ["BW—01", "SHOULDER / BLACK FLAME", "Editorial blackwork shoulder tattoo"],
        ["BW—02", "NECK / THORN STUDY", "Editorial blackwork neck tattoo"],
        ["BW—03", "HAND / VOID SCRIPT", "Editorial blackwork hand tattoo"],
      ],
      note: "NO TWO ARE ALIKE",
      noteTitle: ["Your mark,", "your language."],
      cta: "TELL US YOUR IDEA →",
    },
    services: {
      eyebrow: "SERVICES / 004",
      title: ["THE WORK", "in detail"],
      intro: "There is no single formula. Every project receives the detail and time it needs.",
      imageCaption: "THE BODY / THE LINE / THE WEIGHT",
      items: [
        ["01", "CUSTOM BLACKWORK", "Designs built from scratch around your idea, anatomy, and rhythm."],
        ["02", "SMALL STUDIES", "Small pieces to begin an intentional collection of ink."],
        ["03", "LARGE COMPOSITIONS", "Larger projects designed to move with the body and time."],
        ["04", "CONSULTATION", "A clear conversation to define concept, placement, size, and process."],
      ],
      method: "THE SALVATORE METHOD",
      callout: ["PRECISION", "over noise"],
      cta: "MEET THE STUDIO →",
    },
    booking: {
      eyebrow: "BOOKING / 005",
      title: ["START WITH", "an idea"],
      intro: "Tell us what you want to carry on your skin. We review every proposal personally.",
      imageCaption: "PREPARE THE IDEA / THEN THE SKIN",
      asideEyebrow: "BEFORE YOU WRITE",
      aside: [
        "Include visual references, approximate size, placement, and any detail that feels important.",
        "We answer requests Monday through Friday.",
      ],
      received: "RECEIVED / 005",
      successTitle: ["Your idea is now", "in the studio."],
      successText: "Thanks for writing. We will contact you to continue the conversation.",
      another: "SEND ANOTHER REQUEST →",
      name: "Your name",
      email: "Your email",
      idea: "Tell us your idea",
      namePlaceholder: "FULL NAME",
      ideaPlaceholder: "IDEA, PLACEMENT, SIZE...",
      submit: "SEND REQUEST",
    },
    contact: {
      eyebrow: "CONTACT / 006",
      title: ["COME", "say hello"],
      intro: "For consultations, collaborations, and studio questions, write to us.",
      email: "EMAIL",
      social: "SOCIAL",
      hours: "HOURS",
      days: "MON — FRI",
      appointment: "BY APPOINTMENT",
      booking: "BOOKING",
      bookingCta: "START A CONSULTATION →",
      statement: ["MAKE IT", "permanent"],
      notes: "STUDIO NOTES / 2026",
    },
  },
} as const;

type StudioProps = { language: Language };

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

export function AboutPage({ language }: StudioProps) {
  const copy = studioCopy[language].about;
  return (
    <StudioFrame id="studio-about" className="page-about">
      <section className="page-about-hero">
        <div className="page-about-title">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1>{copy.title[0]}<br /><em>{copy.title[1]}</em><br />{copy.title[2]}.</h1>
          <p>{copy.intro}</p>
        </div>
        <figure className="page-about-portrait">
          <img src={aboutImg} alt={language === "es" ? "Retrato editorial de una modelo con tatuajes blackwork" : "Editorial portrait of a model with blackwork tattoos"} />
          <figcaption>{copy.studio}</figcaption>
        </figure>
      </section>
      <section className="page-about-story">
        <div className="page-about-story-label"><Eyebrow>{copy.method}</Eyebrow><span>↓</span></div>
        <div className="page-about-story-copy">
          <h2>{copy.storyTitle[0]}<br /><em>{copy.storyTitle[1]}</em></h2>
          <p>{copy.story[0]}</p>
          <p>{copy.story[1]}</p>
        </div>
      </section>
      <section className="page-about-process">
        <Eyebrow>{copy.process}</Eyebrow>
        <div className="page-about-process-grid">
          {copy.steps.map(([title, description], index) => (
            <article key={title}><strong>0{index + 1}</strong><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>
    </StudioFrame>
  );
}

export function PortfolioPage({ language }: StudioProps) {
  const copy = studioCopy[language].portfolio;
  const images = [portfolioImg, servicesImg, contactImg];
  const classes = ["page-portfolio-card-large", "page-portfolio-card-small", "page-portfolio-card-small"];

  return (
    <StudioFrame id="studio-portfolio" className="page-portfolio">
      <section className="page-portfolio-hero">
        <div>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1>{copy.title[0]}<br /><em>{copy.title[1]}</em><br />{copy.title[2]}.</h1>
        </div>
        <p>{copy.intro}</p>
      </section>
      <section className="page-portfolio-gallery">
        {copy.works.map(([code, name, alt], index) => (
          <article className={classes[index]} key={code}>
            <figure>
              <img src={images[index]} alt={alt} />
            </figure>
            <div className="page-portfolio-meta"><span>{code}</span><strong>{name}</strong></div>
          </article>
        ))}
      </section>
      <section className="page-portfolio-note">
        <Eyebrow>{copy.note}</Eyebrow>
        <h2>{copy.noteTitle[0]}<br /><em>{copy.noteTitle[1]}</em></h2>
        <a className="tattoo-red-link" href="#studio-booking">{copy.cta}</a>
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