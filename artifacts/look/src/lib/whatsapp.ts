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

export function getWhatsAppHref(language: Language, now = new Date()) {
  const greeting = getGreeting(language, now);
  const message =
    language === "es"
      ? `${greeting}, Salvatore. Me gustaría cotizar un tatuaje.`
      : `${greeting}, Salvatore. I'd like to get a quote for a tattoo.`;

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