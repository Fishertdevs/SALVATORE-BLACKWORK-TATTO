import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { Language } from "@/i18n";
import aboutImg from "@assets/generated_images/about-blackwork-portrait.png";
import portfolioImg from "@assets/generated_images/portfolio-blackwork-shoulder.png";
import servicesImg from "@assets/generated_images/services-blackwork-detail.png";
import bookingImg from "@assets/generated_images/booking-blackwork-study.png";
import contactImg from "@assets/generated_images/contact-blackwork-portrait.png";
import contactPortraitImg from "@assets/image-Photoroom_(32)_1789961357461.png";

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
      cta: "CONOCER EL MÉTODO →",
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
      title: ["¿TIENES UN PROYECTO", "EN MENTE?"],
      intro: "Cuéntanos tu idea y construimos juntos la solución.",
      contactLabel: "CONTÁCTANOS",
      bookingLabel: "AGENDAR CITA",
      location: "BOGOTÁ / CO",
      locationNote: "REMOTO GLOBAL",
      email: "EMAIL",
      social: "REDES",
      hours: "HORARIO",
      days: "LUN — VIE",
      appointment: "CON CITA PREVIA",
      phone: "WHATSAPP",
      phoneValue: "+57 311 251 2939",
      mapLabel: "ABRIR EN MAPS ↗",
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
      cta: "MEET THE METHOD →",
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
      title: ["DO YOU HAVE A PROJECT", "IN MIND?"],
      intro: "Tell us your idea and we will build the solution together.",
      contactLabel: "CONTACT US",
      bookingLabel: "BOOK AN APPOINTMENT",
      location: "BOGOTÁ / CO",
      locationNote: "REMOTE WORLDWIDE",
      email: "EMAIL",
      social: "SOCIAL",
      hours: "HOURS",
      days: "MON — FRI",
      appointment: "BY APPOINTMENT",
      phone: "WHATSAPP",
      phoneValue: "+57 311 251 2939",
      mapLabel: "OPEN IN MAPS ↗",
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
      <section className="page-about-hero page-about-hero-editorial">
        <header className="page-about-editorial-heading">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1>{copy.title[0]}<br /><em>{copy.title[1]}</em><br />{copy.title[2]}.</h1>
          <span>{copy.studio}</span>
        </header>
        <div className="page-about-editorial-grid">
          <article className="page-about-editorial-side page-about-editorial-side-left">
            <span className="page-about-editorial-index">01 / {language === "es" ? "LA PRÁCTICA" : "THE PRACTICE"}</span>
            <h2>{copy.storyTitle[0]}<br /><em>{copy.storyTitle[1]}</em></h2>
            <p>{copy.intro}</p>
            <a className="tattoo-red-link" href="#studio-services">{copy.cta}</a>
          </article>
          <figure className="page-about-portrait">
            <img src={aboutImg} alt={language === "es" ? "Retrato editorial de una modelo con tatuajes blackwork" : "Editorial portrait of a model with blackwork tattoos"} />
            <figcaption>{copy.studio}</figcaption>
          </figure>
          <article className="page-about-editorial-side page-about-editorial-side-right">
            <span className="page-about-editorial-index">02 / {language === "es" ? "LA MIRADA" : "THE GAZE"}</span>
            <h2>{language === "es" ? <>OBSERVAR<br /><em>antes de marcar.</em></> : <>OBSERVE<br /><em>before marking.</em></>}</h2>
            <p>{copy.story[0]}</p>
            <p>{copy.story[1]}</p>
          </article>
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

export function ServicesPage({ language }: StudioProps) {
  const copy = studioCopy[language].services;
  return (
    <StudioFrame id="studio-services" className="page-services">
      <section className="page-services-hero">
        <div className="page-services-hero-copy">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1>{copy.title[0]}<br /><em>{copy.title[1]}.</em></h1>
          <p>{copy.intro}</p>
        </div>
        <figure className="page-services-image">
          <img src={servicesImg} alt={language === "es" ? "Detalle de tatuaje blackwork en una composición editorial" : "Blackwork tattoo detail in an editorial composition"} />
          <figcaption>{copy.imageCaption}</figcaption>
        </figure>
      </section>
      <section className="page-services-list">
        {copy.items.map(([number, name, description]) => (
          <article key={number}>
            <span>{number}</span>
            <h2>{name}</h2>
            <p>{description}</p>
            <span className="page-services-arrow">↗</span>
          </article>
        ))}
      </section>
      <section className="page-services-callout">
        <Eyebrow>{copy.method}</Eyebrow>
        <h2>{copy.callout[0]}<br /><em>{copy.callout[1]}.</em></h2>
        <a className="tattoo-light-link" href="#studio-about">{copy.cta}</a>
      </section>
    </StudioFrame>
  );
}

export function BookingPage({ language }: StudioProps) {
  const [sent, setSent] = useState(false);
  const copy = studioCopy[language].booking;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <StudioFrame id="studio-booking" className="page-booking">
      <section className="page-booking-heading">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h1>{copy.title[0]}<br /><em>{copy.title[1]}.</em></h1>
        <p>{copy.intro}</p>
      </section>
      <section className="page-booking-layout">
        <figure className="page-booking-image">
          <img src={bookingImg} alt={language === "es" ? "Estudio de dibujo y preparación para una sesión de tatuaje" : "Drawing studio prepared for a tattoo session"} />
          <figcaption>{copy.imageCaption}</figcaption>
        </figure>
        <div className="page-booking-form-wrap">
          <div className="page-booking-aside">
            <Eyebrow>{copy.asideEyebrow}</Eyebrow>
            <p>{copy.aside[0]}</p>
            <p>{copy.aside[1]}</p>
          </div>
          {sent ? (
            <div className="tattoo-form-success">
              <Eyebrow>{copy.received}</Eyebrow>
              <h2>{copy.successTitle[0]}<br /><em>{copy.successTitle[1]}</em></h2>
              <p>{copy.successText}</p>
              <button type="button" onClick={() => setSent(false)}>{copy.another}</button>
            </div>
          ) : (
            <form className="tattoo-form" onSubmit={handleSubmit}>
              <label>{copy.name}<input required name="name" placeholder={copy.namePlaceholder} /></label>
              <label>{copy.email}<input required type="email" name="email" placeholder="EMAIL" /></label>
              <label>{copy.idea}<textarea required name="idea" rows={5} placeholder={copy.ideaPlaceholder} /></label>
              <button type="submit">{copy.submit} <span>↗</span></button>
            </form>
          )}
        </div>
      </section>
    </StudioFrame>
  );
}

export function ContactPage({ language }: StudioProps) {
  const copy = studioCopy[language].contact;
  const formCopy = studioCopy[language].booking;
  const [sent, setSent] = useState(false);
  const [portraitInView, setPortraitInView] = useState(false);
  const portraitRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setPortraitInView(entry.isIntersecting),
      { threshold: 0.42, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(portrait);
    return () => observer.disconnect();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <StudioFrame id="studio-contact" className="page-contact">
      <section className="page-contact-reference">
        <header className="page-contact-heading">
          <h1>
            {language === "es" && <span className="page-contact-question page-contact-question-open" aria-hidden="true">?</span>}
            {copy.title[0].replace(/^¿/, "")}{" "}
            {copy.title[1].replace(/\?$/, "")}
            <span className="page-contact-question" aria-hidden="true">?</span>
          </h1>
        </header>

        <section className="page-contact-form-section page-contact-form-layout">
          <div className="page-contact-cluster">
            <a
              className="page-contact-map"
              href="https://www.openstreetmap.org/?mlat=4.668&mlon=-74.056#map=14/4.668/-74.056"
              target="_blank"
              rel="noreferrer"
              aria-label={copy.mapLabel}
            >
              <iframe
                title={language === "es" ? "Mapa de Bogotá" : "Map of Bogotá"}
                src="https://www.google.com/maps?q=4.668,-74.056&z=13&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <span>{copy.mapLabel}</span>
            </a>

            <div className="page-contact-form-panel">
              <div className="page-contact-panel-tabs">
                <a className="is-active" href="#studio-contact">{copy.contactLabel}</a>
                <a href="#studio-booking">{copy.bookingLabel}</a>
              </div>

              <aside className="page-contact-form-aside">
                <p className="page-contact-panel-intro">{copy.intro}</p>
                <dl className="page-contact-info-list">
                  <div>
                    <dt>{copy.hours}</dt>
                    <dd>{copy.days}<br />{copy.appointment}</dd>
                  </div>
                  <div>
                    <dt>{copy.location}</dt>
                    <dd>{copy.locationNote}</dd>
                  </div>
                  <div>
                    <dt>{copy.email}</dt>
                    <dd><a href="mailto:hello@salvatoreblackwork.tattoo">hello@salvatoreblackwork.tattoo</a></dd>
                  </div>
                  <div>
                    <dt>{copy.phone}</dt>
                    <dd><a href="https://wa.me/573112512939" target="_blank" rel="noreferrer">{copy.phoneValue}</a></dd>
                  </div>
                </dl>
              </aside>

              <div className="page-contact-form-wrap">
                {sent ? (
                  <div className="tattoo-form-success">
                    <Eyebrow>{formCopy.received}</Eyebrow>
                    <h2>{formCopy.successTitle[0]}<br /><em>{formCopy.successTitle[1]}</em></h2>
                    <p>{formCopy.successText}</p>
                    <button type="button" onClick={() => setSent(false)}>{formCopy.another}</button>
                  </div>
                ) : (
                  <form className="tattoo-form page-contact-form" onSubmit={handleSubmit}>
                    <label>{formCopy.name}<input required name="contact-name" placeholder={formCopy.namePlaceholder} /></label>
                    <label>{formCopy.email}<input required type="email" name="contact-email" placeholder="EMAIL" /></label>
                    <label>{formCopy.idea}<textarea required name="contact-idea" rows={5} placeholder={formCopy.ideaPlaceholder} /></label>
                    <button type="submit">{formCopy.submit} <span>↗</span></button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <figure ref={portraitRef} className={`page-contact-portrait ${portraitInView ? "is-in-view" : ""}`}>
            <img src={contactPortraitImg} alt={language === "es" ? "Retrato editorial con gafas escultóricas y estética blackwork" : "Editorial portrait with sculptural eyewear and blackwork styling"} />
          </figure>
        </section>
      </section>
    </StudioFrame>
  );
}

export function StudioHomeSections({ language }: StudioProps) {
  return (
    <div className="studio-home-sections" aria-label="Información del estudio">
      <AboutPage language={language} />
      <PortfolioPage language={language} />
      <ServicesPage language={language} />
      <BookingPage language={language} />
      <ContactPage language={language} />
    </div>
  );
}