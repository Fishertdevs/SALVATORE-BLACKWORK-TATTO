import { useEffect, useRef, useState } from "react";
import type { FormEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import type { Language } from "@/i18n";
import { getBookingWhatsAppHref, getWhatsAppHref } from "@/lib/whatsapp";
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
      intro: "Cuéntanos qué tatuaje tienes en mente y lo diseñamos contigo.",
      contactLabel: "CONTÁCTANOS",
      bookingLabel: "AGENDAR CITA",
      bookingHeading: "Agenda una llamada y en 30 min te respondemos.",
      bookingSteps: [
        ["Cuéntanos tu proyecto", "Envíanos un mensaje con una breve descripción de tu idea. Respondemos en menos de 24 h."],
        ["Agendamos una llamada", "Te proponemos un horario de 30 minutos para conocernos y alinear el alcance del proyecto."],
        ["Recibes la confirmación", "La cita llega directo a tu WhatsApp. Sin formularios, sin fricciones."],
      ],
      bookingCta: "AGENDAR",
      location: "UBICACIÓN",
      locationNote: "Colombia · Remoto global",
      email: "CORREO ELECTRÓNICO",
      emailValue: "salvatoreblackwork@gmail.com",
      social: "REDES",
      hours: "HORARIO",
      hoursWeekdays: "Lun — Vie · 8:00 am — 9:00 pm",
      hoursWeekend: "Sáb — Dom · 8:00 am — 2:00 pm",
      phone: "TELÉFONO",
      phoneValue: "+57 321 454 6835",
      whatsapp: "WHATSAPP",
      whatsappValue: "+57 321 454 6835",
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
      intro: "Tell us what tattoo you have in mind and we will design it with you.",
      contactLabel: "CONTACT US",
      bookingLabel: "BOOK AN APPOINTMENT",
      bookingHeading: "Book a call and we’ll get back to you within 30 minutes.",
      bookingSteps: [
        ["Tell us about your project", "Send us a message with a brief description of your idea. We reply within 24 hours."],
        ["We schedule a call", "We’ll suggest a 30-minute time to meet and align on the project scope."],
        ["You receive confirmation", "The appointment goes straight to your WhatsApp. No forms, no friction."],
      ],
      bookingCta: "BOOK NOW",
      location: "LOCATION",
      locationNote: "Colombia · Remote worldwide",
      email: "EMAIL",
      emailValue: "salvatoreblackwork@gmail.com",
      social: "SOCIAL",
      hours: "HOURS",
      hoursWeekdays: "Mon — Fri · 8:00 am — 9:00 pm",
      hoursWeekend: "Sat — Sun · 8:00 am — 2:00 pm",
      phone: "PHONE",
      phoneValue: "+57 321 454 6835",
      whatsapp: "WHATSAPP",
      whatsappValue: "+57 321 454 6835",
      mapLabel: "OPEN IN MAPS ↗",
    },
  },
} as const;

type StudioProps = { language: Language };
const bookingStepNumbers = ["1.", "2.", "3."] as const;
const portraitBrushSpacing = 16;
const portraitBrushLimit = 120;

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

const faqCopy = {
  es: {
    eyebrow: "PREGUNTAS FRECUENTES",
    title: <>LO QUE<br /><em>quieres saber.</em></>,
    intro: "Una conversación clara también forma parte del proceso.",
    questions: [
      ["¿Qué estilos realiza el estudio?", "El enfoque es el blackwork, con composiciones ornamentales y tribales. Cada propuesta se desarrolla según tu idea, el tamaño y la zona del cuerpo."],
      ["¿Cómo solicito una cotización?", "Escríbenos por WhatsApp con una breve descripción, la zona, el tamaño aproximado y referencias visuales. Revisamos cada propuesta personalmente y te orientamos sobre el siguiente paso."],
      ["¿Los diseños son personalizados?", "Sí. Cada pieza se compone para el proyecto y la anatomía de quien la lleva; no reproducimos exactamente el tatuaje de otro artista."],
      ["¿Qué información debo enviar para empezar?", "Comparte referencias, ubicación en el cuerpo, medidas aproximadas y cualquier detalle que quieras explicar. Así podemos entender mejor lo que imaginas."],
      ["¿Cómo reservo una cita?", "Primero conversamos sobre la idea y el alcance. Si hace falta, agendamos una llamada de 30 minutos; la confirmación y los siguientes pasos llegan por WhatsApp."],
      ["¿Duele tatuarse?", "La sensación varía según la persona, la zona y la duración de la sesión. Podemos conversar sobre la ubicación y organizar pausas durante la jornada."],
      ["¿Cuánto dura una sesión?", "Depende del tamaño, el nivel de detalle y la ubicación. Después de revisar la propuesta te damos una estimación más precisa."],
      ["¿Qué cuidados necesita el tatuaje?", "Al terminar te compartimos indicaciones de cuidado adecuadas para tu sesión. Sigue esas indicaciones durante la cicatrización y consúltanos si tienes dudas."],
    ],
  },
  en: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: <>A FEW<br /><em>things to know.</em></>,
    intro: "A clear conversation is part of the process, too.",
    questions: [
      ["What styles does the studio specialize in?", "The focus is blackwork, including ornamental and tribal compositions. Each proposal is developed around your idea, the size, and the placement."],
      ["How do I request a quote?", "Message us on WhatsApp with a short description, placement, approximate size, and visual references. We review each proposal personally and guide you through the next step."],
      ["Are the designs custom?", "Yes. Each piece is composed for the project and the wearer's anatomy; we do not reproduce another artist's tattoo exactly."],
      ["What should I share before we start?", "Send references, body placement, approximate measurements, and any details you would like to explain. This helps us understand what you have in mind."],
      ["How do I book an appointment?", "We first discuss the idea and scope. If useful, we arrange a 30-minute call; confirmation and next steps are sent through WhatsApp."],
      ["Does getting tattooed hurt?", "Sensation varies by person, placement, and session length. We can discuss placement and arrange breaks during the session."],
      ["How long does a session take?", "It depends on the size, detail, and placement. After reviewing your proposal, we can give you a more accurate estimate."],
      ["How should I care for a new tattoo?", "We share care instructions tailored to your session afterward. Follow them while it heals, and contact us if you have questions."],
    ],
  },
} as const;

export function FAQPage({ language }: StudioProps) {
  const copy = faqCopy[language];
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [carouselDirection, setCarouselDirection] = useState<"next" | "previous">("next");
  const activeQuestion = copy.questions[activeQuestionIndex]!;

  function navigateQuestions(direction: "next" | "previous") {
    setCarouselDirection(direction);
    setActiveQuestionIndex((currentIndex) => {
      const offset = direction === "next" ? 1 : -1;
      return (currentIndex + offset + copy.questions.length) % copy.questions.length;
    });
  }

  return (
    <StudioFrame id="studio-faq" className="page-faq">
      <div className="page-faq-panel">
        <div className="page-faq-layout">
          <header className="page-faq-heading">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2>{copy.title}</h2>
            <p>{copy.intro}</p>
            <span className="page-faq-index" aria-hidden="true">S / B — 08</span>
          </header>
          <div
            className="page-faq-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label={language === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}
          >
            <div
              className={`page-faq-slide page-faq-slide--${carouselDirection}`}
              key={`${language}-${activeQuestionIndex}`}
              aria-live="polite"
            >
              <details className="page-faq-item">
                <summary>
                  <span className="page-faq-number" aria-hidden="true">
                    {String(activeQuestionIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="page-faq-question">{activeQuestion[0]}</span>
                  <span className="page-faq-toggle" aria-hidden="true" />
                </summary>
                <div className="page-faq-answer"><p>{activeQuestion[1]}</p></div>
              </details>
            </div>
            <div className="page-faq-carousel-controls">
              <span className="page-faq-counter" role="status" aria-live="polite">
                {String(activeQuestionIndex + 1).padStart(2, "0")}
                <span aria-hidden="true"> / </span>
                {String(copy.questions.length).padStart(2, "0")}
              </span>
              <div className="page-faq-carousel-nav">
                <button
                  type="button"
                  aria-label={language === "es" ? "Pregunta anterior" : "Previous question"}
                  onClick={() => navigateQuestions("previous")}
                >
                  <ArrowLeft aria-hidden="true" size={18} />
                </button>
                <button
                  type="button"
                  aria-label={language === "es" ? "Pregunta siguiente" : "Next question"}
                  onClick={() => navigateQuestions("next")}
                >
                  <ArrowRight aria-hidden="true" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudioFrame>
  );
}

export function ContactPage({ language }: StudioProps) {
  const copy = studioCopy[language].contact;
  const [activePanelTab, setActivePanelTab] = useState<"contact" | "booking">("contact");
  const [portraitColorSpots, setPortraitColorSpots] = useState<Array<{ x: number; y: number }>>([]);
  const contactRef = useRef<HTMLElement>(null);
  const lastPortraitBrushPoint = useRef<{ x: number; y: number } | null>(null);

  function handlePortraitPointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const current = { x: event.clientX, y: event.clientY };
    const previous = lastPortraitBrushPoint.current;

    if (!previous) {
      lastPortraitBrushPoint.current = current;
      setPortraitColorSpots((spots) => [
        ...spots,
        {
          x: ((current.x - bounds.left) / bounds.width) * 100,
          y: ((current.y - bounds.top) / bounds.height) * 100,
        },
      ].slice(-portraitBrushLimit));
      return;
    }

    const dx = current.x - previous.x;
    const dy = current.y - previous.y;
    const distance = Math.hypot(dx, dy);
    if (distance < portraitBrushSpacing) return;

    const stampCount = Math.ceil(distance / portraitBrushSpacing);
    const newSpots = Array.from({ length: stampCount }, (_, index) => {
      const progress = (index + 1) / stampCount;
      const x = previous.x + dx * progress;
      const y = previous.y + dy * progress;
      return {
        x: Math.max(0, Math.min(100, ((x - bounds.left) / bounds.width) * 100)),
        y: Math.max(0, Math.min(100, ((y - bounds.top) / bounds.height) * 100)),
      };
    });
    lastPortraitBrushPoint.current = current;
    setPortraitColorSpots((spots) => [...spots, ...newSpots].slice(-portraitBrushLimit));
  }

  useEffect(() => {
    const section = contactRef.current;
    if (!section || typeof window === "undefined") return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (typeof IntersectionObserver === "undefined") return undefined;

    const title = section.querySelector<HTMLElement>(".page-contact-heading h1");
    const entranceTargets = [
      section.querySelector<HTMLElement>(".page-contact-map"),
      section.querySelector<HTMLElement>(".page-contact-form-panel"),
    ].filter((target): target is HTMLElement => target !== null);
    if (!title) return undefined;

    try {
      gsap.set(title, { clipPath: "inset(0px 100% 0px 0px)" });
      gsap.set(entranceTargets, { opacity: 0, y: 12 });
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          if (!entry.isIntersecting) {
            lastPortraitBrushPoint.current = null;
            setPortraitColorSpots([]);
          }
          if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
            gsap.killTweensOf([title, ...entranceTargets]);
            gsap.to(title, {
              clipPath: "inset(0px 0% 0px 0px)",
              duration: 1.2,
              ease: "power3.out",
            });
            gsap.to(entranceTargets, {
              opacity: 1,
              y: 0,
              duration: 0.72,
              ease: "power3.out",
              stagger: 0.14,
              delay: 0.18,
            });
          } else {
            gsap.killTweensOf([title, ...entranceTargets]);
            gsap.set(title, { clipPath: "inset(0px 100% 0px 0px)" });
            gsap.set(entranceTargets, { opacity: 0, y: 12 });
          }
        },
        { threshold: [0, 0.12] },
      );
      observer.observe(section);
      return () => observer.disconnect();
    } catch {
      gsap.set([title, ...entranceTargets], { clearProps: "all" });
      return undefined;
    }
  }, []);

  return (
    <StudioFrame id="studio-contact" className="page-contact">
      <section ref={contactRef} className="page-contact-reference">
        <section className="page-contact-form-section page-contact-form-layout">
          <div className="page-contact-copy-column">
            <header className="page-contact-heading">
              <h1>
                {language === "es" && <span className="page-contact-question page-contact-question-open" aria-hidden="true">?</span>}
                {copy.title[0].replace(/^¿/, "")}{" "}
                {copy.title[1].replace(/\?$/, "")}
                <span className="page-contact-question" aria-hidden="true">?</span>
              </h1>
            </header>

            <div className="page-contact-cluster">
              <a
                className="page-contact-map"
                href="https://www.google.com/maps/search/?api=1&query=Funza%2C%20Cundinamarca%2C%20Colombia"
                target="_blank"
                rel="noreferrer"
                aria-label={copy.mapLabel}
              >
                <iframe
                  title={language === "es" ? "Mapa de Funza, Cundinamarca" : "Map of Funza, Cundinamarca"}
                  src="https://maps.google.com/maps?q=Funza%2C%20Cundinamarca%2C%20Colombia&z=15&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <span>{copy.mapLabel}</span>
              </a>

              <div className="page-contact-form-panel">
                <div
                  className="page-contact-panel-tabs"
                  role="tablist"
                  aria-label={language === "es" ? "Información de contacto y reservas" : "Contact and booking information"}
                  data-active-tab={activePanelTab}
                >
                  <button
                    type="button"
                    id="contact-tab-contact"
                    role="tab"
                    aria-selected={activePanelTab === "contact"}
                    aria-controls="contact-tabpanel"
                    tabIndex={activePanelTab === "contact" ? 0 : -1}
                    onClick={() => setActivePanelTab("contact")}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                        event.preventDefault();
                        setActivePanelTab(activePanelTab === "contact" ? "booking" : "contact");
                        document.getElementById(activePanelTab === "contact" ? "contact-tab-booking" : "contact-tab-contact")?.focus();
                      }
                    }}
                  >
                    {copy.contactLabel}
                  </button>
                  <button
                    type="button"
                    id="contact-tab-booking"
                    role="tab"
                    aria-selected={activePanelTab === "booking"}
                    aria-controls="contact-tabpanel"
                    tabIndex={activePanelTab === "booking" ? 0 : -1}
                    onClick={() => setActivePanelTab("booking")}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                        event.preventDefault();
                        setActivePanelTab(activePanelTab === "contact" ? "booking" : "contact");
                        document.getElementById(activePanelTab === "contact" ? "contact-tab-booking" : "contact-tab-contact")?.focus();
                      }
                    }}
                  >
                    {copy.bookingLabel}
                  </button>
                  <span className="page-contact-tabs-indicator" aria-hidden="true" />
                </div>

                <div
                  className="page-contact-tab-content"
                  id="contact-tabpanel"
                  role="tabpanel"
                  aria-labelledby={activePanelTab === "contact" ? "contact-tab-contact" : "contact-tab-booking"}
                  key={activePanelTab}
                >
                  {activePanelTab === "contact" ? (
                    <aside className="page-contact-form-aside">
                      <p className="page-contact-panel-intro">{copy.intro}</p>
                      <div className="page-contact-hours" aria-label={copy.hours}>
                        <span>{copy.hoursWeekdays}</span>
                        <span>{copy.hoursWeekend}</span>
                      </div>
                      <dl className="page-contact-info-list">
                        <div>
                          <MapPin aria-hidden="true" />
                          <dt>{copy.location}</dt>
                          <dd>{copy.locationNote}</dd>
                        </div>
                        <div>
                          <Mail aria-hidden="true" />
                          <dt>{copy.email}</dt>
                          <dd><a href={`mailto:${copy.emailValue}`}>{copy.emailValue}</a></dd>
                        </div>
                        <div>
                          <Phone aria-hidden="true" />
                          <dt>{copy.phone}</dt>
                          <dd><a href="tel:+573214546835">{copy.phoneValue}</a></dd>
                        </div>
                        <div>
                          <SiWhatsapp aria-hidden="true" />
                          <dt>{copy.whatsapp}</dt>
                          <dd>
                            <a
                              href={getWhatsAppHref(language)}
                              onClick={(event) => {
                                event.currentTarget.href = getWhatsAppHref(language);
                              }}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {copy.whatsappValue}
                            </a>
                          </dd>
                        </div>
                      </dl>
                      <nav className="page-contact-card-socials" aria-label={copy.social}>
                        <a href="#studio-contact" aria-label="Instagram"><SiInstagram aria-hidden="true" /></a>
                        <a href="#studio-contact" aria-label="Facebook"><SiFacebook aria-hidden="true" /></a>
                        <a
                          href={getWhatsAppHref(language)}
                          onClick={(event) => {
                            event.currentTarget.href = getWhatsAppHref(language);
                          }}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="WhatsApp"
                        >
                          <SiWhatsapp aria-hidden="true" />
                        </a>
                      </nav>
                    </aside>
                  ) : (
                    <aside className="page-contact-booking-content">
                      <h3 className="page-contact-booking-heading">{copy.bookingHeading}</h3>
                      <ol className="page-contact-booking-steps">
                        {copy.bookingSteps.map(([title, description], index) => (
                          <li key={title} className="page-contact-booking-step">
                            <span className="page-contact-booking-number" aria-hidden="true">
                              {bookingStepNumbers[index]}
                            </span>
                            <div>
                              <h4>{title}</h4>
                              <p>{description}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                      <a
                        className="page-contact-booking-cta"
                        href={getBookingWhatsAppHref(language)}
                        onClick={(event) => {
                          event.currentTarget.href = getBookingWhatsAppHref(language);
                        }}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <SiWhatsapp aria-hidden="true" />
                        <span>{copy.bookingCta}</span>
                      </a>
                    </aside>
                  )}
                </div>
              </div>
            </div>
          </div>

          <figure
            className="page-contact-portrait"
            onPointerMove={handlePortraitPointerMove}
            onPointerLeave={() => {
              lastPortraitBrushPoint.current = null;
            }}
          >
            <img
              className="page-contact-portrait-base"
              src={contactPortraitImg}
              alt={language === "es" ? "Retrato editorial con gafas escultóricas y estética blackwork" : "Editorial portrait with sculptural eyewear and blackwork styling"}
            />
            {portraitColorSpots.map(({ x, y }, index) => (
              <img
                key={`${x}-${y}-${index}`}
                className="page-contact-portrait-color-spot"
                src={contactPortraitImg}
                alt=""
                aria-hidden="true"
                style={{
                  maskImage: `radial-gradient(circle 72px at ${x}% ${y}%, #000 0%, #000 55%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(circle 72px at ${x}% ${y}%, #000 0%, #000 55%, transparent 100%)`,
                }}
              />
            ))}
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
      <FAQPage language={language} />
      <ContactPage language={language} />
    </div>
  );
}