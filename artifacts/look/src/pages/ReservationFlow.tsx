import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { getReservationWhatsAppHref } from "@/lib/whatsapp";
import type { Language } from "@/i18n";

type ReservationFlowProps = { language: Language };

const copy = {
  es: {
    eyebrow: "RESERVA TU PROYECTO",
    title: "Una idea en tu piel.",
    intro: "Cuéntame tu idea y la fecha que prefieres. Salvatore define el diseño y confirma la cita por WhatsApp.",
    steps: ["TU PROYECTO", "FECHA Y HORA", "WHATSAPP"],
    exit: "Cerrar",
    back: "VOLVER",
    continue: "CONTINUAR",
    projectTitle: "01 — CUÉNTAME TU PROYECTO",
    dateTitle: "02 — PROPÓN TU HORARIO",
    confirmTitle: "03 — CONFIRMA TU SOLICITUD",
    name: "Tu nombre",
    namePlaceholder: "¿Cómo te llamas?",
    placement: "Zona del cuerpo",
    placementPlaceholder: "Ej. antebrazo, espalda, pierna",
    idea: "¿Qué pieza tienes en mente?",
    ideaPlaceholder: "Estilo, tamaño aproximado y detalles que quieras compartir.",
    date: "Fecha que prefieres",
    time: "Hora preferida · Colombia",
    projectIntro: "Comparte lo esencial. El diseño se conversa y desarrolla directamente con Salvatore.",
    scheduleIntro: "Indica el día y la hora que te funcionan. Salvatore revisará su agenda y te confirmará por WhatsApp.",
    confirmIntro: "Revisa los datos. Al continuar, se abrirá WhatsApp con tu solicitud lista para enviar.",
    request: "ENVIAR SOLICITUD POR WHATSAPP",
    notice: "La fecha y hora son una solicitud; la cita solo queda confirmada cuando Salvatore responda.",
    required: "Completa los campos para continuar.",
    sent: "Si WhatsApp no se abrió, continúa desde aquí:",
    openWhatsApp: "ABRIR WHATSAPP",
    edit: "EDITAR DATOS",
  },
  en: {
    eyebrow: "BOOK YOUR PROJECT",
    title: "An idea on your skin.",
    intro: "Share your idea and preferred date. Salvatore creates the design and confirms your appointment on WhatsApp.",
    steps: ["YOUR PROJECT", "DATE & TIME", "WHATSAPP"],
    exit: "Close",
    back: "BACK",
    continue: "CONTINUE",
    projectTitle: "01 — TELL US ABOUT YOUR PROJECT",
    dateTitle: "02 — SUGGEST A TIME",
    confirmTitle: "03 — CONFIRM YOUR REQUEST",
    name: "Your name",
    namePlaceholder: "What should we call you?",
    placement: "Body placement",
    placementPlaceholder: "E.g. forearm, back, leg",
    idea: "What piece do you have in mind?",
    ideaPlaceholder: "Style, approximate size, and any details you’d like to share.",
    date: "Preferred date",
    time: "Preferred time · Colombia",
    projectIntro: "Share the essentials. The design will be discussed and developed directly with Salvatore.",
    scheduleIntro: "Choose a day and time that work for you. Salvatore will check his schedule and confirm on WhatsApp.",
    confirmIntro: "Review your details. Continue to open WhatsApp with your request ready to send.",
    request: "SEND REQUEST ON WHATSAPP",
    notice: "Your preferred date and time are a request; the appointment is confirmed only after Salvatore replies.",
    required: "Complete the fields to continue.",
    sent: "If WhatsApp didn’t open, continue here:",
    openWhatsApp: "OPEN WHATSAPP",
    edit: "EDIT DETAILS",
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
  const [activeStep, setActiveStep] = useState(0);
  const [hasOpenedStepContent, setHasOpenedStepContent] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [submittedHref, setSubmittedHref] = useState("");

  const clearMessages = () => {
    setRequestError("");
    setSubmittedHref("");
  };

  const selectStep = (step: number) => {
    setHasOpenedStepContent(true);
    setActiveStep(step);
    setRequestError("");
    if (!hasOpenedStepContent) {
      window.setTimeout(() => {
        document.getElementById("reservation-step-content")?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 80);
    }
  };

  const continueFromProject = () => {
    if (!name.trim() || !placement.trim() || !tattooBrief.trim()) {
      setRequestError(text.required);
      return;
    }
    selectStep(1);
  };

  const continueFromSchedule = () => {
    if (!date || !time) {
      setRequestError(text.required);
      return;
    }
    selectStep(2);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !placement.trim() || !tattooBrief.trim()) {
      setHasOpenedStepContent(true);
      setActiveStep(0);
      setRequestError(text.required);
      return;
    }
    if (!date || !time) {
      setHasOpenedStepContent(true);
      setActiveStep(1);
      setRequestError(text.required);
      return;
    }

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

  return (
    <div className="reservation-page reservation-embedded">
      <div className="reservation-frame">
        <section className="reservation-hero">
          <div className="reservation-hero-copy">
            <p className="reservation-eyebrow">{text.eyebrow}</p>
            <h1>{text.title}</h1>
            <p className="reservation-intro">{text.intro}</p>
          </div>
          <ol className="reservation-steps" aria-label={language === "es" ? "Pasos de la reserva" : "Reservation steps"}>
            {text.steps.map((step, index) => (
              <li key={step}>
                <button
                  type="button"
                  className="reservation-step-button"
                  aria-current={activeStep === index && hasOpenedStepContent ? "step" : undefined}
                  aria-expanded={hasOpenedStepContent && activeStep === index}
                  aria-controls="reservation-step-content"
                  aria-label={`${String(index + 1).padStart(2, "0")} ${step}`}
                  onClick={() => selectStep(index)}
                >
                  <span>0{index + 1}</span>{step}
                </button>
              </li>
            ))}
          </ol>
        </section>

        <form onSubmit={handleSubmit}>
          <div
            className={`reservation-slider${hasOpenedStepContent ? "" : " is-overview"}`}
            id="reservation-step-content"
            aria-live="polite"
          >
            {hasOpenedStepContent && activeStep === 0 && (
              <section className="reservation-process reservation-slide" aria-labelledby="reservation-start-title">
                <div className="reservation-section-heading reservation-start-heading">
                  <button type="button" className="reservation-exit-button reservation-exit-button-top" onClick={() => setHasOpenedStepContent(false)}>
                    <ArrowLeft size={14} aria-hidden="true" />{text.exit}
                  </button>
                  <div className="reservation-start-heading-title">
                    <span className="reservation-index">01 / 03</span>
                    <h2 id="reservation-start-title">{text.projectTitle}</h2>
                  </div>
                  <span className="reservation-start-heading-spacer" aria-hidden="true" />
                </div>
                <div className="reservation-contact-grid">
                  <p className="reservation-contact-intro">{text.projectIntro}</p>
                  <div className="reservation-contact-form reservation-wizard-fields">
                    <label>
                      {text.name}
                      <input
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(event) => { setName(event.target.value); clearMessages(); }}
                        placeholder={text.namePlaceholder}
                        maxLength={80}
                        required
                      />
                    </label>
                    <label>
                      <span><MapPin size={14} aria-hidden="true" />{text.placement}</span>
                      <input
                        type="text"
                        value={placement}
                        onChange={(event) => { setPlacement(event.target.value); clearMessages(); }}
                        placeholder={text.placementPlaceholder}
                        maxLength={120}
                        required
                      />
                    </label>
                    <label>
                      {text.idea}
                      <textarea
                        value={tattooBrief}
                        onChange={(event) => { setTattooBrief(event.target.value); clearMessages(); }}
                        placeholder={text.ideaPlaceholder}
                        maxLength={600}
                        rows={3}
                        required
                      />
                    </label>
                    {requestError && <p className="reservation-alert" role="alert">{requestError}</p>}
                    <div className="reservation-slide-actions reservation-project-actions">
                      <span />
                      <button
                        type="button"
                        className="reservation-exit-button reservation-exit-button-mobile"
                        onClick={() => setHasOpenedStepContent(false)}
                      >
                        <ArrowLeft size={14} aria-hidden="true" />{text.exit}
                      </button>
                      <button type="button" className="reservation-primary-button" onClick={continueFromProject}>
                        {text.continue}<ArrowRight size={17} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {hasOpenedStepContent && activeStep === 1 && (
              <section className="reservation-process reservation-slide" aria-labelledby="reservation-date-title">
                <div className="reservation-section-heading">
                  <button type="button" className="reservation-back-button" onClick={() => selectStep(0)}>
                    <ArrowLeft size={15} aria-hidden="true" />{text.back}
                  </button>
                  <span className="reservation-index">02 / 03</span>
                  <h2 id="reservation-date-title">{text.dateTitle}</h2>
                </div>
                <div className="reservation-contact-grid">
                  <p className="reservation-contact-intro">{text.scheduleIntro}</p>
                  <div className="reservation-contact-form reservation-wizard-fields">
                    <label>
                      <span><CalendarDays size={14} aria-hidden="true" />{text.date}</span>
                      <input
                        type="date"
                        value={date}
                        min={getLocalDateValue()}
                        onChange={(event) => { setDate(event.target.value); clearMessages(); }}
                        required
                      />
                    </label>
                    <label>
                      <span><Clock3 size={14} aria-hidden="true" />{text.time}</span>
                      <input
                        type="time"
                        value={time}
                        onChange={(event) => { setTime(event.target.value); clearMessages(); }}
                        required
                      />
                    </label>
                    {requestError && <p className="reservation-alert" role="alert">{requestError}</p>}
                    <div className="reservation-slide-actions">
                      <button type="button" className="reservation-back-button" onClick={() => selectStep(0)}>
                        <ArrowLeft size={15} aria-hidden="true" />{text.back}
                      </button>
                      <button type="button" className="reservation-primary-button" onClick={continueFromSchedule}>
                        {text.continue}<ArrowRight size={17} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {hasOpenedStepContent && activeStep === 2 && (
              <section className="reservation-result reservation-slide" aria-labelledby="reservation-confirm-title">
                <div className="reservation-section-heading">
                  <button type="button" className="reservation-back-button" onClick={() => selectStep(1)}>
                    <ArrowLeft size={15} aria-hidden="true" />{text.back}
                  </button>
                  <span className="reservation-index">03 / 03</span>
                  <h2 id="reservation-confirm-title">{text.confirmTitle}</h2>
                </div>
                <div className="reservation-contact-grid">
                  <p className="reservation-contact-intro">{text.confirmIntro}</p>
                  <div className="reservation-contact-form reservation-contact-quick">
                    <p className="reservation-confirmation-note">
                      <strong>{name}</strong><br />
                      {placement} · {date} · {time}<br />
                      {tattooBrief}
                    </p>
                    <p className="reservation-confirmation-note">{text.notice}</p>
                    {requestError && <p className="reservation-alert" role="alert">{requestError}</p>}
                    <button className="reservation-primary-button reservation-whatsapp-button" type="submit">
                      {text.request}<ArrowRight size={17} aria-hidden="true" />
                    </button>
                    {submittedHref && (
                      <p className="reservation-privacy-note" role="status">
                        {text.sent}{" "}
                        <a href={submittedHref} target="_blank" rel="noreferrer">{text.openWhatsApp} ↗</a>
                      </p>
                    )}
                    <button type="button" className="reservation-reset" onClick={() => selectStep(0)}>{text.edit}</button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
