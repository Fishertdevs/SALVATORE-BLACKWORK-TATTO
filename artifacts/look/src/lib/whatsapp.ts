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

export function getReservationWhatsAppHref(
  language: Language,
  details: {
    name: string;
    email?: string;
    placement: string;
    date: string;
    time: string;
    hasPreview: boolean;
  },
  now = new Date(),
) {
  const greeting = getGreeting(language, now);
  const message =
    language === "es"
      ? [
          `${greeting}, Salvatore. Quisiera solicitar una consulta de 30 minutos sobre mi tatuaje.`,
          `Nombre: ${details.name}`,
          details.email ? `Correo: ${details.email}` : "",
          `Zona: ${details.placement}`,
          `Fecha preferida: ${details.date}`,
          `Hora preferida: ${details.time}`,
          details.hasPreview
            ? "Adjuntaré la previsualización aproximada al enviar este mensaje."
            : "No tengo una previsualización disponible; revisaremos la idea durante la consulta.",
          "Entiendo que el horario queda pendiente de confirmación del estudio.",
        ]
          .filter(Boolean)
          .join("\n")
      : [
          `${greeting}, Salvatore. I would like to request a 30-minute consultation about my tattoo.`,
          `Name: ${details.name}`,
          details.email ? `Email: ${details.email}` : "",
          `Placement: ${details.placement}`,
          `Preferred date: ${details.date}`,
          `Preferred time: ${details.time}`,
          details.hasPreview
            ? "I will attach the approximate preview when I send this message."
            : "I do not have a preview available; we can review the idea during the consultation.",
          "I understand the time is pending studio confirmation.",
        ]
          .filter(Boolean)
          .join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}