import { useState, type ChangeEvent, type FormEvent } from "react";
import { useGenerateTattooPreview } from "@workspace/api-client-react";
import { ArrowDownToLine, ArrowLeft, ArrowRight, ImagePlus, LoaderCircle, RotateCcw, ShieldCheck } from "lucide-react";
import { getReservationWhatsAppHref } from "@/lib/whatsapp";
import type { Language } from "@/i18n";

type CompressedImage = {
  base64: string;
  mimeType: "image/jpeg" | "image/png" | "image/webp";
  previewUrl: string;
  fileName: string;
};

type ReservationFlowProps = { language: Language };

const copy = {
  es: {
    title: "Una idea en tu piel.",
    intro: "Cuéntame dónde imaginas la pieza. Empezaremos por una aproximación visual, y luego conversaremos sobre lo que realmente funciona para ti.",
    steps: ["IMAGINA", "VISUALIZA", "CONVERSEMOS"],
    back: "VOLVER",
    continue: "CONTINUAR",
    retry: "Cambiar las imágenes",
    sectionTitle: "01 — TU PUNTO DE PARTIDA",
    bodyLabel: "Fotografía de la zona",
    bodyHint: "Piel visible y buena luz.",
    referenceLabel: "Imagen de referencia",
    referenceHint: "Una pieza o estilo que te inspire.",
    addPhoto: "Seleccionar imagen",
    replacePhoto: "Cambiar imagen",
    formats: "JPG, PNG o WebP · hasta 1600 px tras el procesamiento",
    placementLabel: "¿Dónde irá el tatuaje?",
    placementPlaceholder: "Por ejemplo: antebrazo exterior, hombro izquierdo…",
    generate: "Generar",
    generating: "Preparando tu aproximación…",
    generatingNote: "Las imágenes se procesan temporalmente para esta solicitud.",
    required: "Añade las dos imágenes, indica la zona y acepta el procesamiento con IA para continuar.",
    consent: "Acepto enviar temporalmente estas imágenes a Gemini para generar una aproximación.",
    consentLink: "Lee la política de privacidad.",
    privacyDetailsTitle: "Privacidad de tus imágenes",
    privacyDetailsBody: "Se procesan con Gemini mediante Replit AI Integrations solo para preparar esta propuesta. El sitio no guarda las imágenes originales ni el resultado.",
    uploadError: "No pudimos leer esta imagen. Prueba con un JPG, PNG o WebP.",
    apiError: "La vista previa no está disponible ahora. Inténtalo de nuevo más tarde.",
    noPreviewContinue: "Puedes pedir la consulta por WhatsApp aunque la previsualización no esté disponible; revisaremos el diseño contigo.",
    previewTitle: "02 — UNA PRIMERA LECTURA",
    previewAlt: "Aproximación visual del tatuaje en la zona seleccionada",
    disclaimerFallback: "Esta imagen es una aproximación visual; el diseño final se definirá contigo en el estudio.",
    approximate: "La escala, el ajuste y el resultado son aproximados. La pieza final se adapta a tu anatomía y se define en consulta.",
    temporary: "Tus imágenes se procesan solo para generar esta aproximación. No guardamos las imágenes originales ni el resultado.",
    download: "Descargar aproximación",
    redo: "Probar otras imágenes",
    requestTitle: "03 — HABLEMOS DE FECHAS",
    requestIntro: "Déjame tus datos y una fecha preferida. El estudio revisará la solicitud contigo por WhatsApp.",
    name: "Nombre",
    namePlaceholder: "Tu nombre",
    email: "Correo electrónico",
    optional: "opcional",
    date: "Fecha preferida",
    time: "Hora preferida",
    request: "Solicitar por WhatsApp",
    requestNotice: "Esto es solo una solicitud, no una cita confirmada. El horario queda pendiente de confirmación del estudio.",
    privacy: "Al continuar se abrirá WhatsApp con los datos de tu solicitud. Adjunta allí la aproximación descargada si quieres compartirla.",
  },
  en: {
    title: "An idea on your skin.",
    intro: "Tell me where you imagine the piece. We’ll begin with a visual approximation, then talk through what truly works for you.",
    steps: ["IMAGINE", "VISUALIZE", "LET’S TALK"],
    back: "BACK",
    continue: "CONTINUE",
    retry: "Change images",
    sectionTitle: "01 — YOUR STARTING POINT",
    bodyLabel: "Photo of the area",
    bodyHint: "Visible skin and good light.",
    referenceLabel: "Reference image",
    referenceHint: "A piece or style that inspires you.",
    addPhoto: "Choose image",
    replacePhoto: "Change image",
    formats: "JPG, PNG or WebP · resized to 1600 px maximum",
    placementLabel: "Where would you like the tattoo?",
    placementPlaceholder: "For example: outer forearm, left shoulder…",
    generate: "Generate",
    generating: "Preparing your approximation…",
    generatingNote: "Images are processed temporarily for this request.",
    required: "Add both images, specify the placement, and consent to AI processing to continue.",
    consent: "I agree to send these images temporarily to Gemini to create an approximation.",
    consentLink: "Read the privacy policy.",
    privacyDetailsTitle: "Image privacy",
    privacyDetailsBody: "Images are processed with Gemini through Replit AI Integrations only to prepare this proposal. The site does not store the original images or the result.",
    uploadError: "We couldn’t read this image. Please try a JPG, PNG, or WebP.",
    apiError: "The preview is unavailable right now. Please try again later.",
    noPreviewContinue: "You can still request a WhatsApp consultation while the preview is unavailable; we can review the design together.",
    previewTitle: "02 — A FIRST READING",
    previewAlt: "Visual approximation of the tattoo on the selected area",
    disclaimerFallback: "This is a visual approximation; the final design will be developed with you at the studio.",
    approximate: "Scale, fit, and result are approximate. Your final piece is adapted to your anatomy and decided in consultation.",
    temporary: "Your images are processed only to generate this approximation. Neither the originals nor the result are stored.",
    download: "Download approximation",
    redo: "Try different images",
    requestTitle: "03 — LET’S TALK DATES",
    requestIntro: "Leave your details and a preferred date. The studio will review your request with you on WhatsApp.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email address",
    optional: "optional",
    date: "Preferred date",
    time: "Preferred time",
    request: "Request via WhatsApp",
    requestNotice: "This is a request only, not a confirmed appointment. The time remains pending studio confirmation.",
    privacy: "Continuing opens WhatsApp with your request details. Attach the downloaded approximation there if you’d like to share it.",
  },
} as const;

const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];

function compressImage(file: File): Promise<CompressedImage> {
  return new Promise((resolve, reject) => {
    if (!acceptedTypes.includes(file.type)) {
      reject(new Error("unsupported"));
      return;
    }
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("canvas"));
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(objectUrl);
        if (!blob) {
          reject(new Error("compress"));
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = String(reader.result);
          resolve({
            base64: dataUrl.split(",")[1] ?? "",
            mimeType: "image/jpeg",
            previewUrl: dataUrl,
            fileName: file.name.replace(/\.[^.]+$/, "") || "tattoo-image",
          });
        };
        reader.onerror = () => reject(new Error("read"));
        reader.readAsDataURL(blob);
      }, "image/jpeg", 0.82);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("decode"));
    };
    image.src = objectUrl;
  });
}

function PhotoUpload({
  id,
  title,
  hint,
  image,
  onChange,
  error,
  chooseLabel,
  changeLabel,
  formats,
}: {
  id: string;
  title: string;
  hint: string;
  image: CompressedImage | null;
  onChange: (image: CompressedImage | null) => void;
  error?: string;
  chooseLabel: string;
  changeLabel: string;
  formats: string;
}) {
  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      onChange(await compressImage(file));
    } catch {
      onChange(null);
      event.currentTarget?.setCustomValidity("");
    }
  };

  return (
    <div className="reservation-upload">
      <div className="reservation-upload-head">
        <label htmlFor={id}>{title}</label>
        <span>{hint}</span>
      </div>
      <label className={`reservation-dropzone${image ? " has-image" : ""}`} htmlFor={id}>
        {image ? (
          <img src={image.previewUrl} alt={`${title}: ${image.fileName}`} />
        ) : (
          <span className="reservation-upload-empty">
            <ImagePlus aria-hidden="true" size={25} strokeWidth={1.4} />
            <span>{chooseLabel}</span>
          </span>
        )}
        <span className="reservation-change">{image ? changeLabel : "+"}</span>
      </label>
      <input
        className="reservation-file-input"
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        aria-describedby={`${id}-formats${error ? ` ${id}-error` : ""}`}
        data-testid={`input-${id}`}
      />
      <p className="reservation-upload-meta" id={`${id}-formats`}>{image ? image.fileName : formats}</p>
      {error && <p className="reservation-field-error" id={`${id}-error`} role="alert">{error}</p>}
    </div>
  );
}

export default function ReservationFlow({ language }: ReservationFlowProps) {
  const text = copy[language];
  const previewMutation = useGenerateTattooPreview();
  const [bodyPhoto, setBodyPhoto] = useState<CompressedImage | null>(null);
  const [referencePhoto, setReferencePhoto] = useState<CompressedImage | null>(null);
  const [placement, setPlacement] = useState("");
  const [imageConsent, setImageConsent] = useState(false);
  const [preview, setPreview] = useState<{ src: string; disclaimer: string } | null>(null);
  const [canRequestWithoutPreview, setCanRequestWithoutPreview] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [requestError, setRequestError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const onBodyChange = (image: CompressedImage | null) => {
    setBodyPhoto(image);
    if (!image) setUploadError(text.uploadError);
    else setUploadError("");
    setPreview(null);
    setCanRequestWithoutPreview(false);
    setActiveStep(0);
  };
  const onReferenceChange = (image: CompressedImage | null) => {
    setReferencePhoto(image);
    if (!image) setUploadError(text.uploadError);
    else setUploadError("");
    setPreview(null);
    setCanRequestWithoutPreview(false);
    setActiveStep(0);
  };

  const generatePreview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestError("");
    if (!bodyPhoto || !referencePhoto || placement.trim().length < 2 || !imageConsent) {
      setRequestError(text.required);
      return;
    }
    try {
      const result = await previewMutation.mutateAsync({
        data: {
          bodyPhotoBase64: bodyPhoto.base64,
          bodyPhotoMimeType: bodyPhoto.mimeType,
          referencePhotoBase64: referencePhoto.base64,
          referencePhotoMimeType: referencePhoto.mimeType,
          placement: placement.trim(),
        },
      });
      if (!result?.previewBase64 || !result.mimeType) throw new Error("unavailable");
      setPreview({
        src: `data:${result.mimeType};base64,${result.previewBase64}`,
        disclaimer: result.disclaimer || text.disclaimerFallback,
      });
      setCanRequestWithoutPreview(false);
      setActiveStep(1);
      setTimeout(() => document.getElementById("reservation-result")?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
    } catch {
      setPreview(null);
      setRequestError(text.apiError);
      setCanRequestWithoutPreview(true);
      setActiveStep(1);
    }
  };

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!preview && !canRequestWithoutPreview) return;
    const href = getReservationWhatsAppHref(language, { name: name.trim(), email: email.trim() || undefined, placement: placement.trim(), date, time, hasPreview: Boolean(preview) });
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const resetPreview = () => {
    setPreview(null);
    setCanRequestWithoutPreview(false);
    setRequestError("");
    setActiveStep(0);
  };

  return (
    <div className="reservation-page reservation-embedded">
      <div className="reservation-frame">
        <section className="reservation-hero">
          <div className="reservation-hero-copy">
            <h1>{text.title}</h1>
            <p className="reservation-intro">{text.intro}</p>
          </div>
          <ol className="reservation-steps" aria-label={language === "es" ? "Pasos de la reserva" : "Reservation steps"}>
            {text.steps.map((step, index) => {
              const isAvailable = index === 0 || Boolean(preview || canRequestWithoutPreview);
              return (
                <li key={step}>
                  <button
                    type="button"
                    className="reservation-step-button"
                    aria-current={activeStep === index ? "step" : undefined}
                    aria-label={`${String(index + 1).padStart(2, "0")} ${step}`}
                    disabled={!isAvailable}
                    onClick={() => setActiveStep(index)}
                  >
                    <span>0{index + 1}</span>{step}
                  </button>
                </li>
              );
            })}
          </ol>
        </section>

        <div className="reservation-slider" aria-live="polite">
          {activeStep === 0 && (
            <section className="reservation-process reservation-slide" aria-labelledby="reservation-start-title">
              <div className="reservation-section-heading">
                <span className="reservation-index">01 / 03</span>
                <h2 id="reservation-start-title">{text.sectionTitle}</h2>
              </div>
              <form onSubmit={generatePreview} className="reservation-brief-form">
                <div className="reservation-upload-grid">
                  <PhotoUpload id="body-photo" title={text.bodyLabel} hint={text.bodyHint} image={bodyPhoto} onChange={onBodyChange} error={uploadError && !bodyPhoto ? uploadError : undefined} chooseLabel={text.addPhoto} changeLabel={text.replacePhoto} formats={text.formats} />
                  <PhotoUpload id="reference-photo" title={text.referenceLabel} hint={text.referenceHint} image={referencePhoto} onChange={onReferenceChange} error={uploadError && !referencePhoto ? uploadError : undefined} chooseLabel={text.addPhoto} changeLabel={text.replacePhoto} formats={text.formats} />
                </div>
                <label className="reservation-consent">
                  <input
                    type="checkbox"
                    checked={imageConsent}
                    onChange={(event) => setImageConsent(event.target.checked)}
                    required
                    data-testid="checkbox-image-consent"
                  />
                  <span>{text.consent} <a href="/politica-de-privacidad" target="_blank" rel="noreferrer">{text.consentLink}</a></span>
                </label>
                <details className="reservation-privacy-details">
                  <summary><ShieldCheck size={14} aria-hidden="true" />{text.privacyDetailsTitle}</summary>
                  <p>{text.privacyDetailsBody}</p>
                </details>
                <div className="reservation-placement">
                  <label htmlFor="tattoo-placement">{text.placementLabel}</label>
                  <input id="tattoo-placement" value={placement} onChange={(event) => { setPlacement(event.target.value); setPreview(null); setCanRequestWithoutPreview(false); }} maxLength={180} placeholder={text.placementPlaceholder} required minLength={2} data-testid="input-placement" />
                </div>
                {previewMutation.isPending && <div className="reservation-progress" role="status" aria-live="polite"><LoaderCircle size={18} className="reservation-spinner" />{text.generating}<small>{text.generatingNote}</small></div>}
                <button className="reservation-primary-button reservation-generate-button" type="submit" disabled={previewMutation.isPending} data-testid="button-generate-preview">
                  {previewMutation.isPending ? text.generating : text.generate}
                  {!previewMutation.isPending && <ArrowRight aria-hidden="true" size={17} />}
                </button>
              </form>
            </section>
          )}

          {activeStep === 1 && (
            <section className="reservation-result reservation-slide" id="reservation-result" aria-labelledby="reservation-result-title">
              <div className="reservation-section-heading">
                <span className="reservation-index">02 / 03</span>
                <h2 id="reservation-result-title">{text.previewTitle}</h2>
              </div>
              {preview ? (
                <div className="reservation-preview-layout">
                  <figure className="reservation-preview-figure">
                    <img src={preview.src} alt={text.previewAlt} data-testid="img-generated-preview" />
                    <figcaption>{preview.disclaimer}</figcaption>
                  </figure>
                  <aside className="reservation-preview-aside">
                    <span className="reservation-aside-label">{language === "es" ? "ESTUDIO DE UBICACIÓN / 01" : "PLACEMENT STUDY / 01"}</span>
                    <p>{text.approximate}</p>
                    <p>{text.temporary}</p>
                    <a className="reservation-download" href={preview.src} download={`salvatore-blackwork-preview.${preview.src.startsWith("data:image/png") ? "png" : preview.src.startsWith("data:image/webp") ? "webp" : "jpg"}`} data-testid="link-download-preview">
                      <ArrowDownToLine size={16} aria-hidden="true" />{text.download}
                    </a>
                    <button type="button" className="reservation-reset" onClick={resetPreview} data-testid="button-reset-preview"><RotateCcw size={14} aria-hidden="true" />{text.redo}</button>
                  </aside>
                </div>
              ) : (
                <div className="reservation-preview-unavailable">
                  {requestError && <p className="reservation-alert" role="alert" data-testid="status-preview-error">{requestError}</p>}
                  <p>{text.noPreviewContinue}</p>
                  <button type="button" className="reservation-reset" onClick={resetPreview} data-testid="button-retry-preview">
                    <RotateCcw size={14} aria-hidden="true" />{text.retry}
                  </button>
                </div>
              )}
              <div className="reservation-slide-actions">
                <button type="button" className="reservation-back-button" onClick={() => setActiveStep(0)}><ArrowLeft size={15} aria-hidden="true" />{text.back}</button>
                <button type="button" className="reservation-primary-button" onClick={() => setActiveStep(2)}>{text.continue}<ArrowRight size={17} aria-hidden="true" /></button>
              </div>
            </section>
          )}

          {activeStep === 2 && (
            <section className="reservation-result reservation-slide" aria-labelledby="reservation-talk-title">
              <div className="reservation-section-heading">
                <span className="reservation-index">03 / 03</span>
                <h2 id="reservation-talk-title">{text.requestTitle}</h2>
              </div>
              <div className="reservation-contact-grid">
                <p className="reservation-contact-intro">{text.requestIntro}</p>
                <form className="reservation-contact-form" onSubmit={submitRequest}>
                  <label htmlFor="reservation-name">{text.name}</label>
                  <input id="reservation-name" value={name} onChange={(event) => setName(event.target.value)} placeholder={text.namePlaceholder} autoComplete="name" required data-testid="input-name" />
                  <label htmlFor="reservation-email">{text.email} <span>({text.optional})</span></label>
                  <input id="reservation-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" autoComplete="email" data-testid="input-email" />
                  <div className="reservation-datetime">
                    <div><label htmlFor="reservation-date">{text.date}</label><input id="reservation-date" type="date" min={new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date())} value={date} onChange={(event) => setDate(event.target.value)} required data-testid="input-date" /></div>
                    <div><label htmlFor="reservation-time">{text.time}</label><input id="reservation-time" type="time" value={time} onChange={(event) => setTime(event.target.value)} required data-testid="input-time" /></div>
                  </div>
                  <p className="reservation-confirmation-note">{text.requestNotice}</p>
                  <button className="reservation-primary-button reservation-whatsapp-button" type="submit" data-testid="button-whatsapp-request">{text.request}<ArrowRight size={17} aria-hidden="true" /></button>
                  <p className="reservation-privacy-note">{text.privacy}</p>
                </form>
              </div>
              <div className="reservation-slide-actions">
                <button type="button" className="reservation-back-button" onClick={() => setActiveStep(1)}><ArrowLeft size={15} aria-hidden="true" />{text.back}</button>
              </div>
            </section>
          )}
        </div>

      </div>
    </div>
  );
}
