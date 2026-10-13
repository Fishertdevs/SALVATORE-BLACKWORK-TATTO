import type { Language } from "@/i18n";

const whatsappNumber = "573214546835";

function getGreeting(language: Language, now: Date) {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Bogota",
      hour: "2-digit",
      hourCycle: "h23",
    }).format(now),
  );

  if (hour >= 5 && hour < 12) {
    return language === "es" ? "Buenos días" : "Good morning";
  }
  if (hour >= 12 && hour < 19) {
    return language === "es" ? "Buenas tardes" : "Good afternoon";
  }
  return language === "es" ? "Buenas noches" : "Good evening";
}

export function getWhatsAppGreeting(language: Language, now = new Date()) {
  return getGreeting(language, now);
}

export function getWhatsAppHref(language: Language, now = new Date()) {
  const greeting = getWhatsAppGreeting(language, now);
  const message =
    language === "es"
      ? `${greeting}, Salvatore. Quisiera conversar contigo sobre una idea de tatuaje y recibir orientación para cotizarla.`
      : `${greeting}, Salvatore. I would like to discuss a tattoo idea and receive guidance on a quote.`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getBookingWhatsAppHref(language: Language, now = new Date()) {
  const greeting = getGreeting(language, now);
  const message =
    language === "es"
      ? `${greeting}, Salvatore. Quisiera agendar una llamada de 30 minutos para conversar sobre mi proyecto de tatuaje, revisar la idea, la ubicación y el tamaño, y recibir orientación sobre el diseño y la cotización. ¿Podrías indicarme los horarios disponibles?`
      : `${greeting}, Salvatore. I would like to schedule a 30-minute call to discuss my tattoo project, review the concept, placement, and size, and get guidance on the design and quote. Could you please share your available times?`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type ReservationWhatsAppDetails = {
  name?: string;
  email?: string;
  placement: string;
  date?: string;
  time?: string;
  designIdea?: string;
  tattooSize?: string;
  budget?: string;
  hasPreview: boolean;
};

export function getReservationWhatsAppMessage(
  language: Language,
  details: ReservationWhatsAppDetails,
  now = new Date(),
) {
  const greeting = getGreeting(language, now);
  return language === "es"
    ? [
        `${greeting}, Salvatore. Quisiera solicitar una cita de consulta para un proyecto de tatuaje.`,
        details.name ? `Nombre: ${details.name}` : "",
        details.designIdea ? `Idea o estilo: ${details.designIdea}` : "",
        `Zona del cuerpo: ${details.placement}`,
        details.tattooSize ? `Tamaño aproximado: ${details.tattooSize}` : "",
        details.budget ? `Presupuesto estimado: ${details.budget} COP` : "",
        details.hasPreview
          ? "Incluyo una aproximación visual generada con IA para conversar sobre el proyecto."
          : "No se generó una aproximación; quisiera revisar la idea durante la consulta.",
        "Quedo atento/a a la disponibilidad. Entiendo que este mensaje es una solicitud y no confirma una cita.",
      ]
        .filter(Boolean)
        .join("\n")
    : [
        `${greeting}, Salvatore. I would like to request a consultation for a tattoo project.`,
        details.name ? `Name: ${details.name}` : "",
        details.designIdea ? `Idea or style: ${details.designIdea}` : "",
        `Body placement: ${details.placement}`,
        details.tattooSize ? `Approximate size: ${details.tattooSize}` : "",
        details.budget ? `Estimated budget: ${details.budget} COP` : "",
        details.hasPreview
          ? "I am including an AI-generated visual approximation to discuss the project."
          : "No preview was generated; I would like to review the idea during the consultation.",
        "Please share your availability. I understand this is a request, not a confirmed appointment.",
      ]
        .filter(Boolean)
        .join("\n");
}

export function getReservationWhatsAppHref(
  language: Language,
  details: ReservationWhatsAppDetails,
  now = new Date(),
) {
  const message = getReservationWhatsAppMessage(language, details, now);
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}