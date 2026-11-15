import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { gsap } from "gsap";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import type { Language } from "@/i18n";
import { getBookingWhatsAppHref, getWhatsAppHref } from "@/lib/whatsapp";
import ReservationFlow from "@/pages/ReservationFlow";
import aboutImg from "@assets/image-Photoroom_(34)_1792364239140.png";
import portfolioImg from "@assets/image_1792111018777.png";
import servicesImg from "@assets/image_1792111032350.png";
import contactImg from "@assets/image_1792111044918.png";
import contactPortraitImg from "@assets/image-Photoroom_(32)_1789961357461.png";

const studioCopy = {
  es: {
    about: {
      title: ["CÓMO INICIÓ", "ESTE PROYECTO"],
      beats: [
        { title: ["IDEA", "COMÚN"], copy: "Salvatore Blackwork nace para transformar historias personales en diseños blackwork que se integran de forma natural al cuerpo." },
        { title: ["VISIÓN", "PROPIA"], copy: "El estudio desarrolla un lenguaje visual propio con contraste, líneas precisas y composiciones pensadas para cada anatomía." },
        { title: ["DIÁLOGO", "DIRECTO"], copy: "Cada proyecto comienza con una conversación sobre tu historia, tus referencias y lo que quieres expresar en la piel." },
        { title: ["DISEÑO", "A MEDIDA"], copy: "A partir de ese intercambio, creamos una pieza a medida que acompaña el movimiento y expresa una identidad visual propia." },
      ],
    },
    portfolio: {
      title: ["OBRAS", "BLACKWORK", "SELECCIONADAS"],
      specialtyLabel: "ESPECIALIDADES",
      intro: "Salvatore es tatuador en Funza y desarrolla proyectos de blackwork, ornamental y neotribal. Cada proceso comienza con una conversación para conocer tu idea, tus referencias y lo que quieres expresar. A partir de ahí, considera la ubicación y el movimiento del cuerpo para crear un diseño original, pensado para tu anatomía y para el flujo natural de la zona. Trabaja con tinta negra, líneas precisas, contraste y espacios negativos para construir composiciones equilibradas, desde piezas pequeñas hasta proyectos de mayor escala. El tamaño, la ubicación y cada detalle se definen contigo para que el resultado tenga identidad propia y se sienta parte de ti.",
      galleryTags: ["BLACKWORK", "DISEÑO A MEDIDA"],
      works: [
        ["BLACKWORK / CONTRASTE", "Tatuaje blackwork de alto contraste"],
        ["NEOTRIBAL / LÍNEAS FLUIDAS", "Composición de líneas fluidas estilo neotribal"],
        ["ORNAMENTAL / GEOMETRÍA", "Diseño ornamental de líneas geométricas"],
      ],
      stylePanelLabel: "GUÍA DE ESTILO",
      openStyleLabel: "Explorar estilo",
      closeStyleLabel: "Cerrar guía de estilo",
      styleFactsLabel: "DATOS CLAVE",
      previousStyleLabel: "Texto anterior",
      nextStyleLabel: "Siguiente texto",
      styleDetails: [
        {
          title: "BLACKWORK",
          subtitle: "CONTRASTE Y TINTA NEGRA",
          description: "El blackwork utiliza la tinta negra como protagonista. Combina líneas, formas sólidas y espacios negativos para construir diseños gráficos que se adaptan a la zona del cuerpo.",
          facts: ["Contraste marcado entre tinta y piel", "Composición personalizada para cada zona"],
        },
        {
          title: "NEOTRIBAL",
          subtitle: "LÍNEAS FLUIDAS Y MOVIMIENTO",
          description: "El neotribal reinterpreta formas tribales con trazos dinámicos, puntas orgánicas y curvas que acompañan la anatomía y el movimiento del cuerpo.",
          facts: ["Formas expresivas y fluidas", "Diseño pensado para seguir el cuerpo"],
        },
        {
          title: "ORNAMENTAL",
          subtitle: "PATRÓN, SIMETRÍA Y DETALLE",
          description: "El estilo ornamental se construye con patrones, simetrías y detalles decorativos. La composición se ajusta a la ubicación y escala de cada tatuaje.",
          facts: ["Geometría y repetición visual", "Equilibrio entre detalle y forma"],
        },
      ],
      noteTitle: ["Cada pieza,", "hecha para ti."],
      cta: "HABLEMOS DE TU DISEÑO →",
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
    manifesto: {
      phraseLines: ["Blackwork:", "la sombra", "encuentra su voz", "en tu piel."],
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
      phoneValue: "+57 320 815 6043",
      whatsapp: "WHATSAPP",
      whatsappValue: "+57 320 815 6043",
      mapLabel: "ABRIR EN MAPS ↗",
    },
  },
  en: {
    about: {
      title: ["HOW THIS PROJECT", "BEGAN"],
      beats: [
        { title: ["SHARED", "IDEA"], copy: "Salvatore Blackwork turns personal stories into blackwork designs that feel natural on the body." },
        { title: ["DISTINCT", "VISION"], copy: "The studio builds a visual language through contrast, precise lines, and compositions shaped for each anatomy." },
        { title: ["OPEN", "DIALOGUE"], copy: "Each project begins with a conversation about your story, references, and what you want to express through your tattoo." },
        { title: ["CUSTOM", "DESIGN"], copy: "From there, we create a custom piece that moves with the body and expresses a distinct visual identity." },
      ],
    },
    portfolio: {
      title: ["SELECTED", "BLACKWORK", "WORKS"],
      specialtyLabel: "SPECIALTIES",
      intro: "Salvatore is a tattoo artist in Funza who develops blackwork, ornamental, and neo-tribal projects. Each process begins with a conversation about your idea, references, and what you want to express. He then considers placement and body movement to create an original design shaped for your anatomy and the natural flow of the area. Black ink, precise lines, contrast, and negative space build balanced compositions, from small pieces to larger projects. Size, placement, and every detail are defined with you so the result feels personal and true to you.",
      galleryTags: ["BLACKWORK", "CUSTOM DESIGN"],
      works: [
        ["BLACKWORK / CONTRAST", "High-contrast blackwork tattoo"],
        ["NEO-TRIBAL / FLOWING LINES", "Neo-tribal composition with flowing lines"],
        ["ORNAMENTAL / GEOMETRY", "Ornamental design with geometric lines"],
      ],
      stylePanelLabel: "STYLE GUIDE",
      openStyleLabel: "Explore style",
      closeStyleLabel: "Close style guide",
      styleFactsLabel: "KEY DETAILS",
      previousStyleLabel: "Previous text",
      nextStyleLabel: "Next text",
      styleDetails: [
        {
          title: "BLACKWORK",
          subtitle: "CONTRAST AND BLACK INK",
          description: "Blackwork puts black ink at the center of the design. It combines lines, solid shapes, and negative space to create graphic work tailored to the body area.",
          facts: ["Strong contrast between ink and skin", "Custom composition for each placement"],
        },
        {
          title: "NEO-TRIBAL",
          subtitle: "FLOWING LINES AND MOVEMENT",
          description: "Neo-tribal reinterprets tribal forms with dynamic strokes, organic points, and curves that follow the body's anatomy and movement.",
          facts: ["Expressive, fluid forms", "Designed to follow the body"],
        },
        {
          title: "ORNAMENTAL",
          subtitle: "PATTERN, SYMMETRY, AND DETAIL",
          description: "Ornamental tattooing uses patterns, symmetry, and decorative detail. The composition is adapted to the placement and scale of each tattoo.",
          facts: ["Geometry and visual repetition", "Balance between detail and form"],
        },
      ],
      noteTitle: ["Every piece,", "made for you."],
      cta: "LET'S TALK ABOUT YOUR DESIGN →",
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
    manifesto: {
      phraseLines: ["Blackwork:", "shadow finds", "its voice", "on your skin."],
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
      phoneValue: "+57 320 815 6043",
      whatsapp: "WHATSAPP",
      whatsappValue: "+57 320 815 6043",
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
  const aboutSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = aboutSectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;

    const targets = Array.from(
      section.querySelectorAll<HTMLElement>('[data-about-reveal]:not([data-about-reveal="copy"])'),
    );
    if (!targets.length) return;

    const revealFrom = {
      clipPath: "inset(0px 100% 0px 0px)",
      opacity: 1,
    };
    const revealTo = {
      clipPath: "inset(0px 0% 0px 0px)",
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(targets, { clipPath: "inset(0px 0% 0px 0px)", opacity: 1 });
      return () => gsap.set(targets, { clearProps: "clipPath,opacity" });
    }

    const activeTargets = new WeakSet<HTMLElement>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          if (activeTargets.has(element)) return;
          activeTargets.add(element);
          gsap.killTweensOf(element);
          const isTitle = element.dataset.aboutReveal === "title";
          const isHeading = element.dataset.aboutReveal === "heading";
          const beat = element.closest<HTMLElement>(".page-about-editorial-beat");
          const headingDirection = beat?.classList.contains("page-about-editorial-beat-right-1") ||
            beat?.classList.contains("page-about-editorial-beat-right-2") ? 14 : -14;
          const isLowerBeat = beat?.classList.contains("page-about-editorial-beat-left-2") ||
            beat?.classList.contains("page-about-editorial-beat-right-2");
          gsap.fromTo(
            element,
            isTitle
              ? { opacity: 0, x: -14 }
              : isHeading
                ? { opacity: 0, x: headingDirection, y: 14, scale: .97, filter: "blur(8px)" }
                : revealFrom,
            {
              ...(isTitle
                ? { opacity: 1, x: 0 }
                : isHeading
                  ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
                  : revealTo),
              duration: 1.2,
              ease: "power3.out",
              delay: isTitle ? 0 : isHeading ? 0.14 + (isLowerBeat ? 0.12 : 0) : 0.32,
            },
          );
        } else if (!entry.isIntersecting) {
          gsap.killTweensOf(element);
          activeTargets.delete(element);
          gsap.set(element, {
            clipPath: "inset(0px 0% 0px 0px)",
            opacity: 0,
          });
        } else if (!activeTargets.has(element)) {
          gsap.set(element, {
            clipPath: "inset(0px 0% 0px 0px)",
            opacity: 0,
          });
        }
      });
    }, {
      threshold: [0, 0.15],
    });

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      gsap.killTweensOf(targets);
      gsap.set(targets, { clearProps: "clipPath,opacity" });
    };
  }, []);

  return (
    <StudioFrame id="studio-about" className="page-about">
      <section ref={aboutSectionRef} className="page-about-hero page-about-hero-editorial">
        <header className="page-about-editorial-heading">
          <h1 data-about-reveal="title">
            {copy.title.join(" ")}
          </h1>
          <p className="page-about-editorial-kicker" data-about-reveal="heading">
            {language === "es" ? "HISTORIAS · BLACKWORK · IDENTIDAD" : "STORIES · BLACKWORK · IDENTITY"}
          </p>
        </header>
        <div className="page-about-editorial-grid">
          <article
            className="page-about-editorial-side page-about-editorial-side-left"
            data-about-divider={language === "es" ? "ORIGEN · VISIÓN" : "ORIGIN · VISION"}
          >
            {[copy.beats[0], copy.beats[1]].map((beat, index) => (
              <div className={`page-about-editorial-beat page-about-editorial-beat-left-${index + 1}`} key={beat.title.join("-")}>
                <h2 data-about-reveal="heading">{beat.title[0]}{" "}<em>{beat.title[1]}</em></h2>
                <p data-about-reveal="copy">{beat.copy}</p>
              </div>
            ))}
          </article>
          <figure className="page-about-portrait">
            <img src={aboutImg} alt={language === "es" ? "Retrato editorial con tratamiento rojo sobre el rostro" : "Editorial portrait with a red tint across the face"} />
          </figure>
          <article
            className="page-about-editorial-side page-about-editorial-side-right"
            data-about-divider={language === "es" ? "DIÁLOGO · DISEÑO" : "DIALOGUE · DESIGN"}
          >
            {[copy.beats[2], copy.beats[3]].map((beat, index) => (
              <div className={`page-about-editorial-beat page-about-editorial-beat-right-${index + 1}`} key={beat.title.join("-")}>
                <h2 data-about-reveal="heading">{beat.title[0]}{" "}<em>{beat.title[1]}</em></h2>
                <p data-about-reveal="copy">{beat.copy}</p>
              </div>
            ))}
          </article>
        </div>
      </section>
    </StudioFrame>
  );
}

export function PortfolioPage({ language }: StudioProps) {
  const copy = studioCopy[language].portfolio;
  const images = [portfolioImg, servicesImg, contactImg];
  const portfolioHeroRef = useRef<HTMLElement | null>(null);
  const [activeStyleIndex, setActiveStyleIndex] = useState<number | null>(null);
  const [activeStyleSlide, setActiveStyleSlide] = useState(0);

  useEffect(() => {
    const title = portfolioHeroRef.current?.querySelector("h1");
    const eyebrow = portfolioHeroRef.current?.querySelector<HTMLElement>(
      ".page-portfolio-hero-copy .tattoo-eyebrow",
    );
    const intro = portfolioHeroRef.current?.querySelector<HTMLElement>(
      ".page-portfolio-hero-copy p:not(.tattoo-eyebrow)",
    );
    if (!title || !eyebrow || !intro || typeof IntersectionObserver === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.getElementById("fullscreen-section");
    const titleLines = Array.from(title.querySelectorAll<HTMLElement>(".page-portfolio-title-line"));
    const animatedElements = [...titleLines, eyebrow, intro];
    let entrance: gsap.core.Timeline | undefined;
    const hiddenTitleState = { autoAlpha: 0, y: 34, scale: .96, filter: "blur(8px)" };
    const hiddenEyebrowState = {
      autoAlpha: 0,
      y: 24,
      rotateX: -32,
      transformOrigin: "50% 100%",
      filter: "blur(7px)",
    };
    const hiddenIntroState = { autoAlpha: 0, y: 18, filter: "blur(5px)" };
    gsap.set(titleLines, hiddenTitleState);
    gsap.set(eyebrow, hiddenEyebrowState);
    gsap.set(intro, hiddenIntroState);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        entrance?.kill();
        gsap.killTweensOf(animatedElements);

        if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
          entrance = gsap.timeline();
          entrance
            .to(titleLines, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.05,
              stagger: 0.14,
              ease: "power4.out",
              overwrite: true,
            })
            .to(eyebrow, {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              filter: "blur(0px)",
              duration: .9,
              ease: "power3.out",
              overwrite: true,
            }, "-=.5")
            .to(intro, {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: .9,
              ease: "power2.out",
              overwrite: true,
            }, "-=.38");
        } else if (!entry.isIntersecting) {
          gsap.set(titleLines, hiddenTitleState);
          gsap.set(eyebrow, hiddenEyebrowState);
          gsap.set(intro, hiddenIntroState);
        }
      },
      { root, threshold: [0, 0.12] },
    );
    observer.observe(title);

    return () => {
      observer.disconnect();
      entrance?.kill();
      gsap.killTweensOf(animatedElements);
      gsap.set(animatedElements, { clearProps: "all" });
    };
  }, [language]);

  const moveStyleSlide = (direction: number) => {
    setActiveStyleSlide((current) => (current + direction + 2) % 2);
  };

  return (
    <StudioFrame id="studio-portfolio" className="page-portfolio">
      <section className="page-portfolio-hero" ref={portfolioHeroRef}>
        <div>
          <h1>
            <span className="page-portfolio-title-line">{copy.title.join(" ")}.</span>
          </h1>
        </div>
        <div className="page-portfolio-hero-copy">
          <Eyebrow>{copy.specialtyLabel}</Eyebrow>
          <p>{copy.intro}</p>
        </div>
      </section>
      <div className="page-portfolio-gallery-tags" aria-label={language === "es" ? "Etiquetas de la galería" : "Gallery labels"}>
        {copy.galleryTags.map((tag) => <span className="tattoo-eyebrow" key={tag}>{tag}</span>)}
      </div>
      <section className="page-portfolio-gallery">
        {copy.works.map(([name, alt], index) => (
          <article className="page-portfolio-card" key={name}>
            <div className={`page-portfolio-card-visual${activeStyleIndex === index ? " is-open" : ""}`}>
              <button
                className="page-portfolio-card-trigger"
                type="button"
                aria-label={`${activeStyleIndex === index ? copy.closeStyleLabel : copy.openStyleLabel}: ${name}`}
                aria-expanded={activeStyleIndex === index}
                onClick={() => {
                  if (activeStyleIndex === index) {
                    setActiveStyleIndex(null);
                  } else {
                    setActiveStyleIndex(index);
                    setActiveStyleSlide(0);
                  }
                }}
              >
                <img src={images[index]} alt={alt} />
              </button>
              {activeStyleIndex === index && (
                <div
                  className="page-portfolio-style-overlay"
                  role="region"
                  aria-live="polite"
                  aria-labelledby={`portfolio-style-title-${index}`}
                >
                  <button
                    className="page-portfolio-style-close"
                    type="button"
                    aria-label={copy.closeStyleLabel}
                    onClick={() => setActiveStyleIndex(null)}
                  >
                    ×
                  </button>
                  <div className="page-portfolio-style-text" key={`${index}-${activeStyleSlide}`}>
                    <Eyebrow>
                      {copy.stylePanelLabel} · {String(activeStyleSlide + 1).padStart(2, "0")} / 02
                    </Eyebrow>
                    <h3 id={`portfolio-style-title-${index}`}>{copy.styleDetails[index].title}</h3>
                    {activeStyleSlide === 0 ? (
                      <>
                        <strong className="page-portfolio-style-subtitle">{copy.styleDetails[index].subtitle}</strong>
                        <p>{copy.styleDetails[index].description}</p>
                      </>
                    ) : (
                      <>
                        <strong className="page-portfolio-style-subtitle">{copy.styleFactsLabel}</strong>
                        <ul>
                          {copy.styleDetails[index].facts.map((fact) => <li key={fact}>{fact}</li>)}
                        </ul>
                      </>
                    )}
                    <nav className="page-portfolio-style-controls" aria-label={copy.stylePanelLabel}>
                      <button
                        type="button"
                        aria-label={copy.previousStyleLabel}
                        onClick={() => moveStyleSlide(-1)}
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        aria-label={copy.nextStyleLabel}
                        onClick={() => moveStyleSlide(1)}
                      >
                        →
                      </button>
                    </nav>
                  </div>
                </div>
              )}
            </div>
            <div className="page-portfolio-meta"><strong>{name}</strong></div>
          </article>
        ))}
      </section>
      <section className="page-portfolio-note">
        <h2>{copy.noteTitle[0]}<br /><em>{copy.noteTitle[1]}</em></h2>
        <a className="tattoo-red-link" href="#studio-about">{copy.cta}</a>
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
      <section id="studio-reservas" className="page-services-callout reservation-callout">
        <ReservationFlow language={language} />
      </section>
    </StudioFrame>
  );
}

export function ManifestoPage({ language }: StudioProps) {
  const copy = studioCopy[language].manifesto;
  useEffect(() => {
    const section = document.getElementById("studio-manifesto");
    const lineGroups = section
      ? Array.from(section.querySelectorAll<HTMLElement>(".page-manifesto-line")).map((line) =>
          Array.from(line.querySelectorAll<HTMLElement>(".page-manifesto-word")),
        )
      : [];
    const words = lineGroups.flat();

    if (
      !section ||
      words.length === 0 ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return undefined;
    }

    const hiddenState = {
      autoAlpha: 0,
      yPercent: 115,
      rotateX: -48,
      filter: "blur(10px)",
    };
    gsap.set(words, hiddenState);
    let entranceTimeline: gsap.core.Timeline | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        entranceTimeline?.kill();
        gsap.killTweensOf(words);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
          entranceTimeline = gsap.timeline();
          lineGroups.forEach((lineWords, index) => {
            entranceTimeline?.to(
              lineWords,
              {
                autoAlpha: 1,
                yPercent: 0,
                rotateX: 0,
                filter: "blur(0px)",
                duration: 0.95,
                stagger: { each: 0.075, from: "start" },
                ease: "power4.out",
                overwrite: true,
              },
              index === 0 ? 0 : ">-0.58",
            );
          });
        } else {
          gsap.set(words, hiddenState);
        }
      },
      { root: document.getElementById("fullscreen-section"), threshold: [0, 0.12] },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      entranceTimeline?.kill();
      gsap.killTweensOf(words);
      gsap.set(words, { clearProps: "all" });
    };
  }, [language]);

  return (
    <StudioFrame id="studio-manifesto" className="page-manifesto">
      <h1 className="page-manifesto-quote" aria-label={copy.phraseLines.join(" ")}>
        {copy.phraseLines.map((line) => (
          <span className="page-manifesto-line" key={line} aria-hidden="true">
            <span className="page-manifesto-line-inner">
              {line.split(/\s+/).map((word) => (
                <span className="page-manifesto-word" key={word}>{word}</span>
              ))}
            </span>
          </span>
        ))}
      </h1>
    </StudioFrame>
  );
}

const faqCopy = {
  es: {
    eyebrow: "PREGUNTAS FRECUENTES",
    title: "LO QUE NECESITAS SABER",
    questions: [
      ["¿Qué estilos realiza el estudio?", "El enfoque es el blackwork, con composiciones ornamentales y tribales. Cada propuesta se desarrolla según tu idea, el tamaño y la zona del cuerpo."],
      ["¿Cómo solicito una cotización?", "Escríbenos por WhatsApp con una breve descripción, la zona, el tamaño aproximado y referencias visuales. Revisamos cada propuesta personalmente y te orientamos sobre el siguiente paso."],
      ["¿Los diseños son personalizados?", "Sí. Cada pieza se compone para el proyecto y la anatomía de quien la lleva; no reproducimos exactamente el tatuaje de otro artista."],
      ["¿Qué información debo enviar para empezar?", "Comparte referencias, ubicación en el cuerpo, medidas aproximadas y cualquier detalle que quieras explicar. Así podemos entender mejor lo que imaginas."],
      ["¿Cómo reservo una cita?", "Primero conversamos sobre la idea y el alcance. Si hace falta, agendamos una llamada de 30 minutos; la confirmación y los siguientes pasos llegan por WhatsApp."],
      ["¿Duele tatuarse?", "La sensación varía según la persona, la zona y la duración de la sesión. Podemos conversar sobre la ubicación y organizar pausas durante la jornada."],
      ["¿Cuánto dura una sesión?", "Depende del tamaño, el nivel de detalle y la ubicación. Después de revisar la propuesta te damos una estimación más precisa."],
      ["¿Qué cuidados necesita el tatuaje?", "Al terminar te compartimos indicaciones de cuidado adecuadas para tu sesión. Sigue esas indicaciones durante la cicatrización y consúltanos si tienes dudas."],
      ["¿Puedo llevar una referencia visual?", "Sí. Nos ayuda a entender el estilo y la intención; la propuesta final se adapta a tu idea, tu anatomía y el lenguaje propio del estudio."],
      ["¿Qué zonas del cuerpo se pueden tatuar?", "Podemos conversar sobre distintas zonas y su tamaño. Revisamos la ubicación contigo para que la composición funcione con la forma y el movimiento del cuerpo."],
      ["¿Cómo me preparo para la sesión?", "Antes de la cita te compartimos indicaciones sencillas. Llega con tiempo y cuéntanos si tienes alguna duda sobre el proceso."],
      ["¿Puedo cambiar la fecha de mi cita?", "Sí. Escríbenos con anticipación para revisar disponibilidad y coordinar una nueva fecha."],
    ],
  },
  en: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "WHAT YOU NEED TO KNOW",
    questions: [
      ["What styles does the studio specialize in?", "The focus is blackwork, including ornamental and tribal compositions. Each proposal is developed around your idea, the size, and the placement."],
      ["How do I request a quote?", "Message us on WhatsApp with a short description, placement, approximate size, and visual references. We review each proposal personally and guide you through the next step."],
      ["Are the designs custom?", "Yes. Each piece is composed for the project and the wearer's anatomy; we do not reproduce another artist's tattoo exactly."],
      ["What should I share before we start?", "Send references, body placement, approximate measurements, and any details you would like to explain. This helps us understand what you have in mind."],
      ["How do I book an appointment?", "We first discuss the idea and scope. If useful, we arrange a 30-minute call; confirmation and next steps are sent through WhatsApp."],
      ["Does getting tattooed hurt?", "Sensation varies by person, placement, and session length. We can discuss placement and arrange breaks during the session."],
      ["How long does a session take?", "It depends on the size, detail, and placement. After reviewing your proposal, we can give you a more accurate estimate."],
      ["How should I care for a new tattoo?", "We share care instructions tailored to your session afterward. Follow them while it heals, and contact us if you have questions."],
      ["Can I bring a visual reference?", "Yes. It helps us understand the style and intent; the final proposal is tailored to your idea, anatomy, and the studio's own visual language."],
      ["Which body areas can be tattooed?", "We can discuss different placements and sizes. We review the location with you so the composition works with the body's shape and movement."],
      ["How should I prepare for my session?", "We’ll send you straightforward instructions before your appointment. Arrive with time to spare and tell us if you have questions about the process."],
      ["Can I change my appointment date?", "Yes. Message us in advance so we can check availability and coordinate a new date."],
    ],
  },
} as const;

function observeFaqEntrance(
  targets: HTMLElement[],
  root: Element | null,
  options: { stagger?: number; revealWords?: boolean } = {},
): (() => void) | undefined {
  if (
    targets.length === 0 ||
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  ) {
    return undefined;
  }

  const visibleTargets = new Set<HTMLElement>();
  const initialState = { clipPath: "inset(0px 100% 0px 0px)" };
  const wordInitialState = {
    autoAlpha: 0,
    yPercent: 115,
    rotateX: -42,
    filter: "blur(8px)",
  };
  const finalState = {
    clipPath: "inset(0px 0% 0px 0px)",
    duration: 1.2,
    ease: "power3.out",
  };
  const animationTargets = (target: HTMLElement) => options.revealWords
    ? Array.from(target.querySelectorAll<HTMLElement>(".page-faq-word"))
    : [target];

  const updateVisibility = () => {
    const rootRect = root?.getBoundingClientRect();
    const bounds = rootRect ?? {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    };

    for (const target of targets) {
      const rect = target.getBoundingClientRect();
      const visibleWidth = Math.max(0, Math.min(rect.right, bounds.right) - Math.max(rect.left, bounds.left));
      const visibleHeight = Math.max(0, Math.min(rect.bottom, bounds.bottom) - Math.max(rect.top, bounds.top));
      const visibleRatio =
        (visibleWidth * visibleHeight) / Math.max(1, rect.width * rect.height);

      if (visibleRatio >= 0.12) {
        if (visibleTargets.has(target)) continue;
        visibleTargets.add(target);
          const animatedElements = animationTargets(target);
          gsap.killTweensOf(animatedElements);
          if (options.revealWords) {
            gsap.fromTo(animatedElements, wordInitialState, {
              autoAlpha: 1,
              yPercent: 0,
              rotateX: 0,
              filter: "blur(0px)",
              duration: 0.85,
              stagger: { each: 0.035, from: "start" },
              delay: targets.indexOf(target) * (options.stagger ?? 0),
              ease: "power4.out",
              overwrite: true,
            });
          } else {
            gsap.fromTo(target, initialState, {
              ...finalState,
              delay: targets.indexOf(target) * (options.stagger ?? 0),
              overwrite: true,
            });
          }
      } else {
        visibleTargets.delete(target);
          const animatedElements = animationTargets(target);
          gsap.killTweensOf(animatedElements);
          gsap.set(animatedElements, options.revealWords ? wordInitialState : initialState);
      }
    }
  };

  let checkScheduled = false;
  const scheduleVisibilityCheck = () => {
    if (checkScheduled) return;
    checkScheduled = true;
    window.requestAnimationFrame(() => {
      checkScheduled = false;
      updateVisibility();
    });
  };

  const observer = typeof IntersectionObserver === "undefined"
    ? undefined
    : new IntersectionObserver(scheduleVisibilityCheck, { root, threshold: [0, 0.12] });
  targets.forEach((target) => observer?.observe(target));
  root?.addEventListener("scroll", scheduleVisibilityCheck, { passive: true });
  window.addEventListener("scroll", scheduleVisibilityCheck, { passive: true });
  window.addEventListener("resize", scheduleVisibilityCheck);
  updateVisibility();

  return () => {
    observer?.disconnect();
    root?.removeEventListener("scroll", scheduleVisibilityCheck);
    window.removeEventListener("scroll", scheduleVisibilityCheck);
    window.removeEventListener("resize", scheduleVisibilityCheck);
    const animatedElements = targets.flatMap(animationTargets);
    gsap.killTweensOf(animatedElements);
    gsap.set(animatedElements, {
      clearProps: options.revealWords
        ? "clipPath,opacity,transform,filter,visibility"
        : "clipPath",
    });
  };
}

export function FAQPage({ language }: StudioProps) {
  const copy = faqCopy[language];
  const slideCount = Math.ceil(copy.questions.length / 3);
  const lastSlideIndex = slideCount - 1;
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [carouselDirection, setCarouselDirection] = useState<"next" | "previous">("next");
  const activeSlideIndexRef = useRef(0);

  const goToSlide = useCallback((slideIndex: number) => {
    const nextIndex = Math.max(
      0,
      Math.min(lastSlideIndex, slideIndex),
    );
    if (nextIndex === activeSlideIndexRef.current) return false;

    const direction = nextIndex > activeSlideIndexRef.current ? "next" : "previous";
    activeSlideIndexRef.current = nextIndex;
    setCarouselDirection(direction);
    setActiveSlideIndex(nextIndex);
    return true;
  }, [lastSlideIndex]);

  const navigateQuestions = useCallback((direction: "next" | "previous") => {
    const offset = direction === "next" ? 1 : -1;
    return goToSlide(activeSlideIndexRef.current + offset);
  }, [goToSlide]);

  useEffect(() => {
    if (slideCount < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      goToSlide((activeSlideIndexRef.current + 1) % slideCount);
    }, 6000);
    return () => window.clearInterval(intervalId);
  }, [goToSlide, slideCount]);

  useEffect(() => {
    const section = document.getElementById("studio-faq");
    const title = section?.querySelector<HTMLElement>(".page-faq-heading h2");
    if (!title) return undefined;

    return observeFaqEntrance(
      [title],
      document.getElementById("fullscreen-section"),
    );
  }, [language]);

  useEffect(() => {
    const section = document.getElementById("studio-faq");
    const questionTitles = section
      ? Array.from(
          section.querySelectorAll<HTMLElement>(
            ".page-faq-slide.is-active .page-faq-question",
          ),
        )
      : [];
    if (questionTitles.length === 0) return undefined;

    return observeFaqEntrance(
      questionTitles,
      document.getElementById("fullscreen-section"),
      { stagger: 0.14, revealWords: true },
    );
  }, [activeSlideIndex, language]);

  return (
    <StudioFrame id="studio-faq" className="page-faq">
      <div className="page-faq-panel">
        <div className="page-faq-layout">
          <header className="page-faq-heading">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2>{copy.title}</h2>
          </header>
          <div className="page-faq-columns">
            <div
              className="page-faq-carousel"
              role="region"
              aria-roledescription="carousel"
              aria-label={language === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}
              tabIndex={0}
              onKeyDown={(event) => {
                const direction =
                  event.key === "ArrowRight"
                    ? "next"
                    : event.key === "ArrowLeft"
                      ? "previous"
                      : null;
                if (!direction) return;
                const canMove = direction === "next"
                  ? activeSlideIndexRef.current < lastSlideIndex
                  : activeSlideIndexRef.current > 0;
                if (!canMove) return;
                event.preventDefault();
                navigateQuestions(direction);
              }}
            >
              {Array.from({ length: slideCount }, (_, slideIndex) => {
                const questionStartIndex = slideIndex * 3;
                const isActive = slideIndex === activeSlideIndex;
                return (
                  <div
                    className={[
                      "page-faq-slide",
                      isActive ? "is-active" : "",
                      isActive ? `page-faq-slide--${carouselDirection}` : "",
                    ].filter(Boolean).join(" ")}
                    key={`${language}-${slideIndex}`}
                    aria-hidden={!isActive}
                    aria-live={isActive ? "polite" : "off"}
                  >
                    {copy.questions
                      .slice(questionStartIndex, questionStartIndex + 3)
                      .map(([question, answer], index) => {
                        const questionNumber = questionStartIndex + index + 1;
                        return (
                          <article className="page-faq-item" key={questionNumber}>
                            <div className="page-faq-question-row">
                              <span className="page-faq-number" aria-hidden="true">
                                {String(questionNumber).padStart(2, "0")}
                              </span>
                              <h3 className="page-faq-question" aria-label={question}>
                                <span aria-hidden="true">
                                  {question.split(/(\s+)/).map((part, partIndex) =>
                                    /^\s+$/.test(part) ? part : (
                                      <span className="page-faq-word" key={`${questionNumber}-${partIndex}`}>
                                        {part}
                                      </span>
                                    ),
                                  )}
                                </span>
                              </h3>
                            </div>
                            <div className="page-faq-answer"><p>{answer}</p></div>
                          </article>
                        );
                      })}
                  </div>
                );
              })}
              <div className="page-faq-carousel-controls">
                <div
                  className="page-faq-carousel-dots"
                  role="group"
                  aria-label={language === "es" ? "Grupos de preguntas" : "Question groups"}
                >
                  {Array.from({ length: slideCount }, (_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={index === activeSlideIndex ? "is-active" : ""}
                      onClick={() => goToSlide(index)}
                      aria-label={
                        language === "es"
                          ? `Mostrar grupo ${index + 1} de preguntas`
                          : `Show question group ${index + 1}`
                      }
                      aria-current={index === activeSlideIndex ? "true" : undefined}
                    />
                  ))}
                </div>
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
                          <dd><a href="tel:+573208156043">{copy.phoneValue}</a></dd>
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
              alt={language === "es" ? "Retrato editorial con tatuajes y accesorios metálicos" : "Editorial portrait with tattoos and metal accessories"}
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
      <ManifestoPage language={language} />
      <FAQPage language={language} />
      <ContactPage language={language} />
    </div>
  );
}