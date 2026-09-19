export type Language = "es" | "en";

export function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "es";
  return window.localStorage.getItem("salvatore-language") === "en" ? "en" : "es";
}

export function persistLanguage(language: Language) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("salvatore-language", language);
  }
}

export const galleryCopy = {
  es: {
    nav: ["INICIO", "ACERCA DE", "PORTFOLIO", "SERVICIOS", "RESERVAS", "CONTACTO"],
    heroEyebrow: "SALVATORE — BLACKWORK",
    heroTitle: ["TATUAJE", "BLACKWORK"],
    heroFuture: ["LA TINTA ES", "ARQUITECTURA"],
    heroDescription:
      "Tatuajes blackwork construidos desde el contraste, la línea precisa y una mirada que solo te pertenece a ti.",
    mobileHeroIntro: "Tatuajes de autor creados con precisión, identidad y carácter.",
    mobileHeroStyles: "BLACKWORK · TRIBAL · ORNAMENTAL",
    heroLeftTitle: ["PROYECTOS ÚNICOS"],
    heroLeftDescription:
      "Hablemos de una pieza pensada para tu cuerpo, tu historia y la forma en que quieres llevarla.",
    heroLeftAction: "COTIZAR PROYECTO",
    heroRightTitle: ["CATÁLOGO", "DE OBRAS"],
    heroRightDescription:
      "Diseños blackwork precisos, creados para tu cuerpo y pensados para acompañarte toda la vida.",
    heroRightAction: "VER PORTAFOLIO",
    featuredLabel: "SALVATORE BLACKWORK TATTO / OBRA DESTACADA",
    featuredParagraphs: [
      "SALVATORE BLACKWORK TATTO trabaja en el punto donde se encuentran la tinta, la anatomía y el lenguaje visual. Cada pieza se compone para moverse con el cuerpo y conservar su significado durante toda la vida.",
      "El estudio parte de una idea: un tatuaje debe sentirse inevitable sobre la piel. Desde el primer boceto hasta la última pasada de aguja, cada línea está al servicio de quien la lleva.",
    ],
    featuredHeadline: "PIEZA BLACKWORK 01 — DONDE LA TINTA SE VUELVE ARQUITECTURA",
    selectedWorks: "OBRAS SELECCIONADAS 2026",
    appointment: "CON CITA PREVIA",
    archiveWorks: [
      ["LLAMA NEGRA", "Mesa cromada"],
      ["FORMA NOCTURNA", "Tacones cromados"],
      ["ESTUDIO DE ESPINAS", "Portavelas cromado"],
      ["MARCA RITUAL", "Pendiente escultórico"],
      ["GUION DEL VACÍO", "Estuche translúcido"],
      ["VELO DE HIERRO", "Audífonos escultóricos"],
    ],
    footerEyebrow: "NEWSLETTER — N° 01",
    footerJournal: "DIARIO BLACKWORK — N° 01",
    footerMark: ["DEJA TU MARCA", "EN EL", "archivo"],
    footerHeadline: ["FORMA PARTE", "DEL", "archivo"],
    emailPlaceholder: "ESCRIBE TU EMAIL",
    subscribe: "SUSCRIBIRSE →",
    footerColumns: [
      ["+ ESTUDIO", ["Sobre Salvatore", "Blackwork", "Proceso", "Cuidados"]],
      ["+ RESERVAS", ["Consulta", "Disponibilidad", "Preparación", "Preguntas frecuentes"]],
      ["+ SOPORTE", ["Contacto", "Guía de cuidados", "Políticas", "Preguntas frecuentes"]],
      ["+ CONECTA", ["Instagram", "Are.na", "Tumblr", "Spotify"]],
    ],
    footerTagline: "BLACKWORK / LA TINTA ES ARQUITECTURA",
    footerAppointment: "CON CITA PREVIA",
  },
  en: {
    nav: ["HOME", "ABOUT", "PORTFOLIO", "SERVICES", "BOOKING", "CONTACT"],
    heroEyebrow: "SALVATORE — BLACKWORK",
    heroTitle: ["BLACKWORK", "TATTOO"],
    heroFuture: ["INK IS", "ARCHITECTURE"],
    heroDescription:
      "Blackwork tattoos built from deep contrast, deliberate linework, and a point of view that belongs only to you.",
    mobileHeroIntro: "Signature tattoos created with precision, identity, and character.",
    mobileHeroStyles: "BLACKWORK · TRIBAL · ORNAMENTAL",
    heroLeftTitle: ["UNIQUE PROJECTS"],
    heroLeftDescription:
      "Let's talk about a piece shaped around your body, your story, and the way you want to carry it.",
    heroLeftAction: "PRICE YOUR PROJECT",
    heroRightTitle: ["WORKS", "CATALOGUE"],
    heroRightDescription:
      "Precise blackwork designs, created for your body and made to stay with you for a lifetime.",
    heroRightAction: "VIEW PORTFOLIO",
    featuredLabel: "SALVATORE BLACKWORK TATTO / FEATURED WORK",
    featuredParagraphs: [
      "SALVATORE BLACKWORK TATTO operates at the intersection of ink, anatomy, and visual language. Each piece is composed to move with the body and hold its meaning for a lifetime.",
      "The studio is driven by one idea: a tattoo should feel inevitable on the skin. From first sketch to final needle pass, every line serves the person wearing it.",
    ],
    featuredHeadline: "BLACKWORK PIECE 01 — WHERE INK BECOMES ARCHITECTURE",
    selectedWorks: "SELECTED WORKS 2026",
    appointment: "BY APPOINTMENT",
    archiveWorks: [
      ["BLACK FLAME", "Chrome table"],
      ["NOCTURNAL FORM", "Chrome heels"],
      ["THORN STUDY", "Chrome candle holder"],
      ["RITUAL MARK", "Sculptural ear cuff"],
      ["VOID SCRIPT", "Translucent case"],
      ["IRON VEIL", "Sculptural headphones"],
    ],
    footerEyebrow: "NEWSLETTER — N° 01",
    footerJournal: "BLACKWORK JOURNAL — N° 01",
    footerMark: ["MAKE YOUR MARK", "IN THE", "archive"],
    footerHeadline: ["BECOME PART", "OF THE", "archive"],
    emailPlaceholder: "ENTER YOUR EMAIL",
    subscribe: "SUBSCRIBE →",
    footerColumns: [
      ["+ STUDIO", ["About Salvatore", "Blackwork", "Process", "Aftercare"]],
      ["+ BOOKING", ["Consultation", "Availability", "Preparation", "FAQ"]],
      ["+ SUPPORT", ["Contact", "Care guide", "Policies", "FAQ"]],
      ["+ CONNECT", ["Instagram", "Are.na", "Tumblr", "Spotify"]],
    ],
    footerTagline: "BLACKWORK / INK IS ARCHITECTURE",
    footerAppointment: "BY APPOINTMENT",
  },
} as const;