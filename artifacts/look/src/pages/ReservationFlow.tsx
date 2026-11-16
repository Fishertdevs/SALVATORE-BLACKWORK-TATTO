import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Clock3, MapPin } from "lucide-react";
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
    hour: "HORA",
    minute: "MIN",
    chooseDate: "ELIGE UNA FECHA",
    previousMonth: "Mes anterior",
    nextMonth: "Mes siguiente",
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
    requestMobile: "ENVIAR SOLICITUD",
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
    hour: "HOUR",
    minute: "MIN",
    chooseDate: "CHOOSE A DATE",
    previousMonth: "Previous month",
    nextMonth: "Next month",
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
    requestMobile: "SEND REQUEST",
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

function toLocalDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function ReservationFlow({ language }: ReservationFlowProps) {
  const text = copy[language];
  const [name, setName] = useState("");
  const [placement, setPlacement] = useState("");
  const [tattooBrief, setTattooBrief] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mobileHour, setMobileHour] = useState("");
  const [mobileMinute, setMobileMinute] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [activeStep, setActiveStep] = useState(0);
  const [hasOpenedStepContent, setHasOpenedStepContent] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [submittedHref, setSubmittedHref] = useState("");
  const todayValue = getLocalDateValue();
  const monthStart = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1);
  const leadingCalendarDays = (monthStart.getDay() + 6) % 7;
  const daysInCalendarMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    0,
  ).getDate();
  const calendarCellCount = Math.ceil((leadingCalendarDays + daysInCalendarMonth) / 7) * 7;
  const calendarDays = Array.from(
    { length: calendarCellCount },
    (_, index) => new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      index - leadingCalendarDays + 1,
    ),
  );
  const calendarLocale = language === "es" ? "es-CO" : "en-US";
  const calendarMonthLabel = new Intl.DateTimeFormat(calendarLocale, {
    month: "long",
    year: "numeric",
  }).format(calendarMonth);
  const now = new Date();
  const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const canGoToPreviousMonth = calendarMonth.getTime() > currentMonth.getTime();
  const selectedDateLabel = date
    ? new Intl.DateTimeFormat(calendarLocale, {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(`${date}T12:00:00`))
    : text.chooseDate;
  const weekDayLabels = language === "es"
    ? ["LU", "MA", "MI", "JU", "VI", "SA", "DO"]
    : ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
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

  const updateMobileTime = (part: "hour" | "minute", value: string) => {
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 2);
    const nextHour = part === "hour" ? sanitizedValue : mobileHour;
    const nextMinute = part === "minute" ? sanitizedValue : mobileMinute;
    setMobileHour(nextHour);
    setMobileMinute(nextMinute);
    const isValidTime = nextHour.length === 2
      && nextMinute.length === 2
      && Number(nextHour) <= 23
      && Number(nextMinute) <= 59;
    setTime(isValidTime ? `${nextHour}:${nextMinute}` : "");
    clearMessages();
  };

  const toggleMobileCalendar = () => {
    if (!isCalendarOpen) {
      const referenceDate = date ? new Date(`${date}T12:00:00`) : new Date();
      setCalendarMonth(new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1));
    }
    setIsCalendarOpen((open) => !open);
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
              <section className="reservation-process reservation-slide reservation-start-step" aria-labelledby="reservation-start-title">
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
                  <button type="button" className="reservation-back-button reservation-date-top-back" onClick={() => selectStep(0)}>
                    <ArrowLeft size={15} aria-hidden="true" />{text.back}
                  </button>
                  <span className="reservation-index">02 / 03</span>
                  <h2 id="reservation-date-title">{text.dateTitle}</h2>
                </div>
                <div className="reservation-contact-grid">
                  <p className="reservation-contact-intro">{text.scheduleIntro}</p>
                  <div className="reservation-contact-form reservation-wizard-fields">
                    <label className="reservation-desktop-picker">
                      <span><CalendarDays size={14} aria-hidden="true" />{text.date}</span>
                      <input
                        className="reservation-native-date"
                        type="date"
                        value={date}
                        min={todayValue}
                        onChange={(event) => { setDate(event.target.value); clearMessages(); }}
                        required
                      />
                    </label>
                    <div className="reservation-mobile-picker reservation-mobile-date-picker">
                      <span className="reservation-mobile-picker-label">
                        <CalendarDays size={14} aria-hidden="true" />{text.date}
                      </span>
                      <button
                        type="button"
                        className="reservation-mobile-date-trigger"
                        aria-expanded={isCalendarOpen}
                        aria-controls="reservation-mobile-calendar"
                        onClick={toggleMobileCalendar}
                      >
                        <span>{selectedDateLabel}</span>
                        <ChevronRight size={16} aria-hidden="true" />
                      </button>
                      {isCalendarOpen && (
                        <div className="reservation-mobile-calendar" id="reservation-mobile-calendar">
                          <div className="reservation-calendar-heading">
                            <button
                              type="button"
                              aria-label={text.previousMonth}
                              disabled={!canGoToPreviousMonth}
                              onClick={() => setCalendarMonth((month) =>
                                new Date(month.getFullYear(), month.getMonth() - 1, 1),
                              )}
                            >
                              <ChevronLeft size={16} aria-hidden="true" />
                            </button>
                            <strong>{calendarMonthLabel}</strong>
                            <button
                              type="button"
                              aria-label={text.nextMonth}
                              onClick={() => setCalendarMonth((month) =>
                                new Date(month.getFullYear(), month.getMonth() + 1, 1),
                              )}
                            >
                              <ChevronRight size={16} aria-hidden="true" />
                            </button>
                          </div>
                          <div className="reservation-calendar-weekdays" aria-hidden="true">
                            {weekDayLabels.map((day) => <span key={day}>{day}</span>)}
                          </div>
                          <div className="reservation-calendar-days" role="group" aria-label={calendarMonthLabel}>
                            {calendarDays.map((calendarDay) => {
                              const dayValue = toLocalDateValue(calendarDay);
                              const isDisabled = dayValue < todayValue;
                              const isInMonth = calendarDay.getMonth() === calendarMonth.getMonth();
                              const isSelected = dayValue === date;
                              return (
                                <button
                                  key={dayValue}
                                  type="button"
                                  className={[
                                    "reservation-calendar-day",
                                    isInMonth ? "" : "is-outside-month",
                                    isSelected ? "is-selected" : "",
                                  ].filter(Boolean).join(" ")}
                                  disabled={isDisabled}
                                  aria-pressed={isSelected}
                                  onClick={() => {
                                    setDate(dayValue);
                                    setIsCalendarOpen(false);
                                    clearMessages();
                                  }}
                                >
                                  {calendarDay.getDate()}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    <label className="reservation-desktop-picker">
                      <span><Clock3 size={14} aria-hidden="true" />{text.time}</span>
                      <input
                        className="reservation-native-time"
                        type="time"
                        value={time}
                        onChange={(event) => {
                          const nextTime = event.target.value;
                          setTime(nextTime);
                          setMobileHour(nextTime.slice(0, 2));
                          setMobileMinute(nextTime.slice(3, 5));
                          clearMessages();
                        }}
                        required
                      />
                    </label>
                    <div className="reservation-mobile-picker reservation-mobile-time-picker">
                      <span className="reservation-mobile-picker-label">{text.time}</span>
                      <div className="reservation-mobile-time-panel">
                        <div className="reservation-mobile-time-controls">
                          <label>
                            <span>{text.hour}</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              aria-label={text.hour}
                              value={mobileHour}
                              onChange={(event) => updateMobileTime("hour", event.target.value)}
                              placeholder="HH"
                              maxLength={2}
                              pattern="[0-9]{2}"
                              required
                            />
                          </label>
                          <span className="reservation-mobile-time-separator">:</span>
                          <label>
                            <span>{text.minute}</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              aria-label={text.minute}
                              value={mobileMinute}
                              onChange={(event) => updateMobileTime("minute", event.target.value)}
                              placeholder="MM"
                              maxLength={2}
                              pattern="[0-9]{2}"
                              required
                            />
                          </label>
                        </div>
                        <span className="reservation-mobile-time-format">
                          {language === "es" ? "FORMATO 24 H · HH:MM" : "24-HOUR FORMAT · HH:MM"}
                        </span>
                      </div>
                    </div>
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
                  <button type="button" className="reservation-back-button reservation-confirm-back-top" onClick={() => selectStep(1)}>
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
                      <span className="reservation-request-label-desktop">{text.request}</span>
                      <span className="reservation-request-label-mobile">{text.requestMobile}</span>
                      <ArrowRight size={17} aria-hidden="true" />
                    </button>
                    {submittedHref && (
                      <p className="reservation-privacy-note" role="status">
                        {text.sent}{" "}
                        <a href={submittedHref} target="_blank" rel="noreferrer">{text.openWhatsApp} ↗</a>
                      </p>
                    )}
                    <button type="button" className="reservation-reset reservation-confirm-edit" onClick={() => selectStep(0)}>{text.edit}</button>
                    <button type="button" className="reservation-back-button reservation-confirm-back-mobile" onClick={() => selectStep(1)}>
                      <ArrowLeft size={15} aria-hidden="true" />{text.back}
                    </button>
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
