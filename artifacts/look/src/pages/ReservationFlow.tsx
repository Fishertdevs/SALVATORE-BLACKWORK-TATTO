import { useState, type FormEvent } from "react";
import { ArrowUpRight, CalendarDays, Clock3, MapPin, MessageCircle } from "lucide-react";
import { getReservationWhatsAppHref } from "@/lib/whatsapp";
import type { Language } from "@/i18n";

type ReservationFlowProps = { language: Language };

const copy = {
  es: {
    eyebrow: "AGENDA DIRECTA / WHATSAPP",
    title: ["TU PRÓXIMA PIEZA", "EMPIEZA AQUÍ."],
    intro: "Cuéntale a Salvatore qué tienes en mente y qué fecha prefieres. Él revisará tu proyecto y confirmará la cita por WhatsApp.",
    asideLabel: "EL PROCESO",
    asideTitle: "Una conversación. Un diseño hecho por el tatuador.",
    steps: [
      "Cuéntanos tu idea y la zona del cuerpo.",
      "Propón el día y la hora que prefieres.",
      "Salvatore confirma contigo por WhatsApp.",
    ],
    name: "Tu nombre",
    namePlaceholder: "¿Cómo te llamas?",
    placement: "Zona del cuerpo",
    placementPlaceholder: "Ej. antebrazo, espalda, pierna",
    idea: "Cuéntanos sobre tu idea",
    ideaPlaceholder: "Estilo, tamaño aproximado y detalles que quieras compartir.",
    date: "Fecha que prefieres",
    time: "Hora que prefieres · Colombia",
    button: "SOLICITAR CITA POR WHATSAPP",
    note: "La fecha y hora son una solicitud. Salvatore confirmará disponibilidad por WhatsApp.",
    sent: "Tu solicitud está lista. Si WhatsApp no se abrió, continúa aquí:",
    openWhatsApp: "ABRIR WHATSAPP",
    formLabel: "Datos de la solicitud de cita",
  },
  en: {
    eyebrow: "DIRECT BOOKING / WHATSAPP",
    title: ["YOUR NEXT PIECE", "STARTS HERE."],
    intro: "Tell Salvatore what you have in mind and when you’d like to come in. He’ll review your project and confirm the appointment on WhatsApp.",
    asideLabel: "THE PROCESS",
    asideTitle: "A conversation. A design made by the tattoo artist.",
    steps: [
      "Share your idea and body placement.",
      "Suggest your preferred date and time.",
      "Salvatore confirms with you on WhatsApp.",
    ],
    name: "Your name",
    namePlaceholder: "What should we call you?",
    placement: "Body placement",
    placementPlaceholder: "E.g. forearm, back, leg",
    idea: "Tell us about your idea",
    ideaPlaceholder: "Style, approximate size, and any details you’d like to share.",
    date: "Preferred date",
    time: "Preferred time · Colombia",
    button: "REQUEST AN APPOINTMENT ON WHATSAPP",
    note: "Your preferred date and time are a request. Salvatore will confirm availability on WhatsApp.",
    sent: "Your request is ready. If WhatsApp didn’t open, continue here:",
    openWhatsApp: "OPEN WHATSAPP",
    formLabel: "Appointment request details",
  },
} as const;

function getLocalDateValue() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

export default function ReservationFlow({ language }: ReservationFlowProps) {
  const text = copy[language];
  const [name, setName] = useState("");
  const [placement, setPlacement] = useState("");
  const [tattooBrief, setTattooBrief] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submittedHref, setSubmittedHref] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const href = getReservationWhatsAppHref(language, {
      name: name.trim(),
      placement: placement.trim(),
      tattooBrief: tattooBrief.trim(),
      date,
      time,
    });
    setSubmittedHref(href);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const clearSubmittedState = () => setSubmittedHref("");

  return (
    <section className="reservation-page reservation-embedded reservation-quick-flow" aria-labelledby="reservation-quick-title">
      <div className="reservation-frame">
        <header className="reservation-quick-heading">
          <p className="reservation-quick-eyebrow">{text.eyebrow}</p>
          <h2 id="reservation-quick-title">
            {text.title[0]} <em>{text.title[1]}</em>
          </h2>
          <p>{text.intro}</p>
        </header>

        <div className="reservation-quick-layout">
          <aside className="reservation-quick-aside">
            <p className="reservation-quick-aside-label">{text.asideLabel} <span>01—03</span></p>
            <h3>{text.asideTitle}</h3>
            <ol>
              {text.steps.map((step, index) => (
                <li key={step}>
                  <span>0{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="reservation-quick-signoff">
              <MessageCircle size={17} aria-hidden="true" />
              <span>WhatsApp</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </div>
          </aside>

          <form className="reservation-quick-form" onSubmit={handleSubmit} aria-label={text.formLabel}>
            <div className="reservation-quick-fields">
              <label>
                <span>{text.name}</span>
                <input
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => { setName(event.target.value); clearSubmittedState(); }}
                  placeholder={text.namePlaceholder}
                  required
                  maxLength={80}
                />
              </label>
              <label>
                <span><MapPin size={14} aria-hidden="true" />{text.placement}</span>
                <input
                  type="text"
                  value={placement}
                  onChange={(event) => { setPlacement(event.target.value); clearSubmittedState(); }}
                  placeholder={text.placementPlaceholder}
                  required
                  maxLength={120}
                />
              </label>
              <label className="reservation-quick-idea">
                <span>{text.idea}</span>
                <textarea
                  value={tattooBrief}
                  onChange={(event) => { setTattooBrief(event.target.value); clearSubmittedState(); }}
                  placeholder={text.ideaPlaceholder}
                  required
                  minLength={5}
                  maxLength={600}
                  rows={3}
                />
              </label>
              <div className="reservation-quick-datetime">
                <label>
                  <span><CalendarDays size={14} aria-hidden="true" />{text.date}</span>
                  <input
                    type="date"
                    value={date}
                    min={getLocalDateValue()}
                    onChange={(event) => { setDate(event.target.value); clearSubmittedState(); }}
                    required
                  />
                </label>
                <label>
                  <span><Clock3 size={14} aria-hidden="true" />{text.time}</span>
                  <input
                    type="time"
                    value={time}
                    onChange={(event) => { setTime(event.target.value); clearSubmittedState(); }}
                    required
                  />
                </label>
              </div>
            </div>

            <p className="reservation-quick-note">{text.note}</p>
            <button type="submit" className="reservation-quick-submit">
              {text.button}
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
            {submittedHref && (
              <p className="reservation-quick-sent" role="status">
                {text.sent}{" "}
                <a href={submittedHref} target="_blank" rel="noreferrer">{text.openWhatsApp} ↗</a>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
