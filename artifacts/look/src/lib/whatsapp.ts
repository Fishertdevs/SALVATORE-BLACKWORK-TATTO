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