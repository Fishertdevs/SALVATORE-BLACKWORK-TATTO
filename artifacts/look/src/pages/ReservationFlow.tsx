import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { ArrowDownToLine, ArrowLeft, ArrowRight, ImagePlus, LoaderCircle, RotateCcw, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { getReservationWhatsAppHref, getReservationWhatsAppMessage } from "@/lib/whatsapp";
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
    eyebrow: "RESERVA TU PROYECTO",
    title: "Una idea en tu piel.",
    intro: "Cuéntame dónde imaginas la pieza. Empezaremos por una aproximación visual, y luego conversaremos sobre lo que realmente funciona para ti.",
    steps: ["IMAGINA", "VISUALIZA", "CONVERSEMOS"],
    exit: "Salir",
    back: "VOLVER",
    continue: "CONTINUAR",
    retry: "Cambiar las imágenes",
    sectionTitle: "01 — TU PUNTO DE PARTIDA",
    bodyLabel: "Fotografía de la zona",
    bodyHint: "Piel visible y buena luz.",
    referenceLabel: "Imagen de referencia",
    referenceHint: "Una pieza o estilo que te inspire.",
    addPhoto: "Seleccionar o soltar imagen",
    dropHere: "Suelta la imagen aquí",
    replacePhoto: "Cambiar imagen",
    formats: "JPG, PNG o WebP · hasta 1600 px tras el procesamiento",
    placementLabel: "¿Dónde irá el tatuaje?",
    placementPlaceholder: "Por ejemplo: antebrazo exterior, hombro izquierdo…",
    generate: "Generar",
    generating: "Generando tu aproximación con IA…",
    generatingNote: "Tus fotos se envían temporalmente a Gemini mediante Replit AI Integrations y no se guardan en este sitio.",
    required: "Añade las dos imágenes, indica la zona y acepta enviarlas temporalmente a Gemini.",
    consent: "Acepto enviar temporalmente mis imágenes a Gemini mediante Replit AI Integrations para generar una aproximación.",
    consentLink: "Lee la política de privacidad.",
    privacyDetailsTitle: "Privacidad de tus imágenes",
    privacyDetailsBody: "Las imágenes se envían temporalmente a Gemini mediante Replit AI Integrations solo para generar esta aproximación. Este sitio no las guarda en una base de datos ni en almacenamiento propio.",
    uploadError: "No pudimos leer esta imagen. Prueba con un JPG, PNG o WebP.",
    localPreviewError: "No pudimos generar la aproximación con IA ahora. Inténtalo otra vez o continúa por WhatsApp.",
    noPreviewContinue: "Puedes pedir la consulta por WhatsApp aunque la previsualización no esté disponible; revisaremos el diseño contigo.",
    previewTitle: "02 — UNA PRIMERA LECTURA",
    previewAlt: "Aproximación visual del tatuaje en la zona seleccionada",
    disclaimerFallback: "Previsualización aproximada generada con IA; el diseño final se definirá contigo en el estudio.",
    approximate: "La escala, el ajuste y el resultado son aproximados. La pieza final se adapta a tu anatomía y se define en consulta.",
    temporary: "Las imágenes se envían temporalmente a Gemini para esta generación y este sitio no las guarda.",
    download: "Descargar aproximación",
    redo: "Probar otras imágenes",
    requestTitle: "03 — CONTINUAR POR WHATSAPP",
    requestIntro: "La idea, la zona y los datos opcionales de tamaño y presupuesto irán en una solicitud clara. La fecha se coordina por WhatsApp.",
    designLabel: "Idea o estilo (opcional)",
    designPlaceholder: "Ej. blackwork floral, calavera, ornamental…",
    sizeLabel: "Tamaño aproximado (opcional)",
    sizePlaceholder: "Ej. 12 cm",
    budgetLabel: "Presupuesto estimado en COP (opcional)",
    budgetPlaceholder: "Ej. 500.000",
    request: "Abrir WhatsApp",
    shareFailed: "No se pudo compartir el archivo. Descárgalo y adjúntalo en WhatsApp.",
    requestNotice: "El estudio confirmará disponibilidad por WhatsApp; enviar el mensaje no reserva una cita.",
    privacy: "En móviles compatibles podrás compartir la imagen junto con el mensaje. En otros dispositivos, descárgala y adjúntala en WhatsApp.",
  },
  en: {
    eyebrow: "BOOK YOUR PROJECT",
    title: "An idea on your skin.",
    intro: "Tell me where you imagine the piece. We’ll begin with a visual approximation, then talk through what truly works for you.",
    steps: ["IMAGINE", "VISUALIZE", "LET’S TALK"],
    exit: "Exit",
    back: "BACK",
    continue: "CONTINUE",
    retry: "Change images",
    sectionTitle: "01 — YOUR STARTING POINT",
    bodyLabel: "Photo of the area",
    bodyHint: "Visible skin and good light.",
    referenceLabel: "Reference image",
    referenceHint: "A piece or style that inspires you.",
    addPhoto: "Choose or drop image",
    dropHere: "Drop image here",
    replacePhoto: "Change image",
    formats: "JPG, PNG or WebP · resized to 1600 px maximum",
    placementLabel: "Where would you like the tattoo?",
    placementPlaceholder: "For example: outer forearm, left shoulder…",
    generate: "Generate",
    generating: "Generating your AI approximation…",
    generatingNote: "Your photos are temporarily sent to Gemini through Replit AI Integrations and are not stored by this site.",
    required: "Add both images, specify the placement, and consent to temporarily send them to Gemini.",
    consent: "I agree to temporarily send my images to Gemini through Replit AI Integrations to generate an approximation.",
    consentLink: "Read the privacy policy.",
    privacyDetailsTitle: "Image privacy",
    privacyDetailsBody: "Images are temporarily sent to Gemini through Replit AI Integrations only to generate this approximation. This site does not store them in a database or its own file storage.",
    uploadError: "We couldn’t read this image. Please try a JPG, PNG, or WebP.",
    localPreviewError: "We couldn’t generate the AI approximation right now. Try again or continue on WhatsApp.",
    noPreviewContinue: "You can still request a WhatsApp consultation while the preview is unavailable; we can review the design together.",
    previewTitle: "02 — A FIRST READING",
    previewAlt: "Visual approximation of the tattoo on the selected area",
    disclaimerFallback: "An AI-generated approximation; the final design will be developed with you at the studio.",
    approximate: "Scale, fit, and result are approximate. Your final piece is adapted to your anatomy and decided in consultation.",
    temporary: "Images are sent temporarily to Gemini for this generation and are not stored by this site.",
    download: "Download approximation",
    redo: "Try different images",
    requestTitle: "03 — CONTINUE ON WHATSAPP",
    requestIntro: "Your idea, placement, and optional size and budget details go into a clear request. Coordinate a date on WhatsApp.",
    designLabel: "Idea or style (optional)",
    designPlaceholder: "E.g. floral blackwork, ornamental…",
    sizeLabel: "Approximate size (optional)",
    sizePlaceholder: "E.g. 12 cm",
    budgetLabel: "Estimated budget in COP (optional)",
    budgetPlaceholder: "E.g. 500,000",
    request: "Open WhatsApp",
    shareFailed: "The image could not be shared. Download it and attach it in WhatsApp.",
    requestNotice: "The studio will confirm availability on WhatsApp; sending the message does not book an appointment.",
    privacy: "On supported phones, share the image with the message. On other devices, download it and attach it in WhatsApp.",
  },
} as const;

const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];
const acceptedImageName = /\.(jpe?g|png|webp)$/i;

function observeReservationEntrance(
  target: HTMLElement,
  root: Element | null,
  onVisibilityChange: (visible: boolean) => void,
) {
  let visible: boolean | null = null;
  let checkScheduled = false;
  const updateVisibility = () => {
    const rootRect = root?.getBoundingClientRect();
    const bounds = rootRect ?? {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    };
    const rect = target.getBoundingClientRect();
    const visibleWidth = Math.max(0, Math.min(rect.right, bounds.right) - Math.max(rect.left, bounds.left));
    const visibleHeight = Math.max(0, Math.min(rect.bottom, bounds.bottom) - Math.max(rect.top, bounds.top));
    const visibleRatio = (visibleWidth * visibleHeight) / Math.max(1, rect.width * rect.height);
    const nextVisible = visibleRatio >= 0.12;
    if (nextVisible === visible) return;
    visible = nextVisible;
    onVisibilityChange(visible);
  };
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
  observer?.observe(target);
  root?.addEventListener("scroll", scheduleVisibilityCheck, { passive: true });
  window.addEventListener("scroll", scheduleVisibilityCheck, { passive: true });
  window.addEventListener("resize", scheduleVisibilityCheck);
  updateVisibility();

  return () => {
    observer?.disconnect();
    root?.removeEventListener("scroll", scheduleVisibilityCheck);
    window.removeEventListener("scroll", scheduleVisibilityCheck);
    window.removeEventListener("resize", scheduleVisibilityCheck);
  };
}

function compressImage(file: File): Promise<CompressedImage> {
  return new Promise((resolve, reject) => {
    if (!acceptedTypes.includes(file.type) && !acceptedImageName.test(file.name)) {
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

function dataUrlToFile(dataUrl: string, fileName: string): File {
  const [metadata, encoded] = dataUrl.split(",", 2);
  const mimeType = metadata.match(/^data:(.+);base64$/)?.[1] ?? "image/png";
  const bytes = Uint8Array.from(atob(encoded ?? ""), (character) => character.charCodeAt(0));
  return new File([bytes], fileName, { type: mimeType });
}

function PhotoUpload({
  id,
  title,
  hint,
  image,
  onChange,
  error,
  chooseLabel,
  dropHere,
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
  dropHere: string;
  changeLabel: string;
  formats: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const dragDepth = useRef(0);

  const processFile = async (file?: File) => {
    if (!file) return;
    try {
      onChange(await compressImage(file));
    } catch {
      onChange(null);
    }
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    void processFile(file);
  };
  const hasFiles = (event: DragEvent<HTMLLabelElement>) =>
    Array.from(event.dataTransfer.types).includes("Files") ||
    Array.from(event.dataTransfer.items).some((item) => item.kind === "file");
  const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (hasFiles(event)) {
      dragDepth.current += 1;
      setIsDragging(true);
    }
  };
  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (hasFiles(event)) event.dataTransfer.dropEffect = "copy";
  };
  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    if (!isDragging) return;
    event.preventDefault();
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setIsDragging(false);
  };
  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dragDepth.current = 0;
    setIsDragging(false);
    void processFile(event.dataTransfer.files[0]);
  };

  return (
    <div className="reservation-upload">
      <div className="reservation-upload-head">
        <label htmlFor={id}>{title}</label>
        <span>{hint}</span>
      </div>
      <label
        className={`reservation-dropzone${image ? " has-image" : ""}${isDragging ? " is-dragging" : ""}`}
        htmlFor={id}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image ? (
          <>
            <img src={image.previewUrl} alt={`${title}: ${image.fileName}`} />
            {isDragging && <span className="reservation-drop-overlay">{dropHere}</span>}
          </>
        ) : (
          <span className="reservation-upload-empty">
            <ImagePlus aria-hidden="true" size={25} strokeWidth={1.4} />
            <span>{isDragging ? dropHere : chooseLabel}</span>
          </span>
        )}
        <span className="reservation-change">{image ? changeLabel : "+"}</span>
      </label>
      <input
        className="reservation-file-input"
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
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
  const [bodyPhoto, setBodyPhoto] = useState<CompressedImage | null>(null);
  const [referencePhoto, setReferencePhoto] = useState<CompressedImage | null>(null);
  const [placement, setPlacement] = useState("");
  const [designIdea, setDesignIdea] = useState("");
  const [tattooSize, setTattooSize] = useState("");
  const [budget, setBudget] = useState("");
  const [imageConsent, setImageConsent] = useState(false);
  const [preview, setPreview] = useState<{ src: string; disclaimer: string } | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [canRequestWithoutPreview, setCanRequestWithoutPreview] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [requestError, setRequestError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [hasOpenedStepContent, setHasOpenedStepContent] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".reservation-embedded .reservation-hero");
    const title = hero?.querySelector<HTMLElement>("h1");
    const intro = hero?.querySelector<HTMLElement>(".reservation-intro");
    const steps = hero
      ? Array.from(hero.querySelectorAll<HTMLElement>(".reservation-steps li"))
      : [];
    if (!hero || !title || !intro || steps.length === 0 || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const root = document.getElementById("fullscreen-section");
    const titleHidden = { clipPath: "inset(0 100% 0 0)" };
    const introHidden = { autoAlpha: 0, y: 16, filter: "blur(6px)" };
    const stepsHidden = { autoAlpha: 0, x: -12 };
    let timeline: gsap.core.Timeline | undefined;
    const play = (isVisible: boolean) => {
      timeline?.kill();
      gsap.killTweensOf([title, intro, ...steps]);
      if (isVisible) {
        timeline = gsap.timeline()
          .fromTo(title, titleHidden, {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.9,
            ease: "power3.out",
            overwrite: true,
          })
          .fromTo(intro, introHidden, {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.72,
            ease: "power4.out",
            overwrite: true,
          }, "-=.48")
          .fromTo(steps, stepsHidden, {
            autoAlpha: 1,
            x: 0,
            duration: 0.48,
            stagger: 0.1,
            ease: "power3.out",
            overwrite: true,
          }, "-=.3");
      } else {
        gsap.set(title, titleHidden);
        gsap.set(intro, introHidden);
        gsap.set(steps, stepsHidden);
      }
    };

    const stopObserving = observeReservationEntrance(hero, root, play);
    return () => {
      stopObserving();
      timeline?.kill();
      gsap.killTweensOf([title, intro, ...steps]);
      gsap.set([title, intro, ...steps], { clearProps: "all" });
    };
  }, [language]);

  useEffect(() => {
    const slide = document.querySelector<HTMLElement>(".reservation-embedded .reservation-slide");
    if (!slide || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const heading = slide.querySelector<HTMLElement>(".reservation-section-heading");
    const content = Array.from(
      slide.querySelectorAll<HTMLElement>(
        ".reservation-upload, .reservation-consent, .reservation-privacy-details, .reservation-placement, .reservation-generate-button, .reservation-preview-layout, .reservation-preview-unavailable, .reservation-contact-grid, .reservation-slide-actions",
      ),
    );
    if (!heading) return undefined;

    const hiddenContent = {
      autoAlpha: 0,
      y: 18,
      rotateX: -5,
      filter: "blur(7px)",
      transformPerspective: 900,
      transformOrigin: "50% 0%",
    };
    const hiddenHeading = { clipPath: "inset(0 100% 0 0)" };
    let timeline: gsap.core.Timeline | undefined;
    const play = (isVisible: boolean) => {
      timeline?.kill();
      gsap.killTweensOf([heading, ...content]);
      if (isVisible) {
        timeline = gsap.timeline()
          .fromTo(heading, hiddenHeading, {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.72,
            ease: "power3.out",
            overwrite: true,
          })
          .fromTo(content, hiddenContent, {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.72,
            stagger: { each: 0.11, from: "start" },
            ease: "power4.out",
            overwrite: true,
          }, "-=.24");
      } else {
        gsap.set(heading, hiddenHeading);
        gsap.set(content, hiddenContent);
      }
    };

    const stopObserving = observeReservationEntrance(
      slide,
      document.getElementById("fullscreen-section"),
      play,
    );
    return () => {
      stopObserving();
      timeline?.kill();
      gsap.killTweensOf([heading, ...content]);
      gsap.set([heading, ...content], { clearProps: "all" });
    };
  }, [activeStep, hasOpenedStepContent, language]);

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
    setIsGeneratingPreview(true);
    try {
      const response = await fetch("/api/reservations/tattoo-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bodyPhotoBase64: bodyPhoto.base64,
          bodyPhotoMimeType: bodyPhoto.mimeType,
          referencePhotoBase64: referencePhoto.base64,
          referencePhotoMimeType: referencePhoto.mimeType,
          placement: placement.trim(),
        }),
      });
      const result = await response.json() as {
        previewBase64?: string;
        mimeType?: string;
        disclaimer?: string;
        error?: string;
      };
      if (!response.ok || !result.previewBase64 || !result.mimeType) {
        throw new Error(result.error || text.localPreviewError);
      }
      setPreview({
        src: `data:${result.mimeType};base64,${result.previewBase64}`,
        disclaimer: result.disclaimer || text.disclaimerFallback,
      });
      setCanRequestWithoutPreview(false);
      setActiveStep(1);
      setTimeout(() => document.getElementById("reservation-result")?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
    } catch (error) {
      setPreview(null);
      setRequestError(error instanceof Error ? error.message : text.localPreviewError);
      setCanRequestWithoutPreview(true);
      setActiveStep(1);
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  const openWhatsAppRequest = () => {
    if (!preview && !canRequestWithoutPreview) return;
    const details = {
      placement: placement.trim(),
      designIdea: designIdea.trim(),
      tattooSize: tattooSize.trim(),
      budget: budget.trim(),
      hasPreview: Boolean(preview),
    };
    const message = getReservationWhatsAppMessage(language, details);
    if (preview && typeof navigator.share === "function" && typeof navigator.canShare === "function") {
      const file = dataUrlToFile(preview.src, "salvatore-blackwork-tattoo-approximation.png");
      if (navigator.canShare({ files: [file] })) {
        void navigator.share({
          files: [file],
          title: language === "es" ? "Solicitud de cita" : "Appointment request",
          text: message,
        }).catch((error: unknown) => {
          if (error instanceof DOMException && error.name === "AbortError") return;
          setRequestError(text.shareFailed);
        });
        return;
      }
    }
    const href = getReservationWhatsAppHref(language, details);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const resetPreview = () => {
    setPreview(null);
    setCanRequestWithoutPreview(false);
    setRequestError("");
    setActiveStep(0);
  };

  const exitStepOne = () => {
    setHasOpenedStepContent(false);
    setActiveStep(0);
    window.setTimeout(() => {
      document.querySelector(".reservation-embedded .reservation-hero")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
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
            {text.steps.map((step, index) => {
              const isAvailable = index === 0 || Boolean(preview || canRequestWithoutPreview);
              return (
                <li key={step}>
                  <button
                    type="button"
                    className="reservation-step-button"
                    aria-current={activeStep === index ? "step" : undefined}
                    aria-expanded={hasOpenedStepContent && activeStep === index}
                    aria-controls="reservation-step-content"
                    aria-label={`${String(index + 1).padStart(2, "0")} ${step}`}
                    disabled={!isAvailable}
                    onClick={() => {
                      const shouldReveal = !hasOpenedStepContent;
                      setHasOpenedStepContent(true);
                      setActiveStep(index);
                      if (shouldReveal) {
                        window.setTimeout(() => {
                          document.getElementById("reservation-start-title")?.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest",
                          });
                        }, 80);
                      }
                    }}
                  >
                    <span>0{index + 1}</span>{step}
                  </button>
                </li>
              );
            })}
          </ol>
        </section>

        <div
          className={`reservation-slider${hasOpenedStepContent ? "" : " is-overview"}`}
          id="reservation-step-content"
          aria-live="polite"
        >
          {hasOpenedStepContent && activeStep === 0 && (
            <section className="reservation-process reservation-slide" aria-labelledby="reservation-start-title">
              <div className="reservation-section-heading">
                <span className="reservation-index">01 / 03</span>
                <h2 id="reservation-start-title">{text.sectionTitle}</h2>
                <button type="button" className="reservation-exit-button" onClick={exitStepOne}>
                  <ArrowLeft size={14} aria-hidden="true" />{text.exit}
                </button>
              </div>
              <form onSubmit={generatePreview} className="reservation-brief-form">
                <div className="reservation-upload-grid">
                  <PhotoUpload id="body-photo" title={text.bodyLabel} hint={text.bodyHint} image={bodyPhoto} onChange={onBodyChange} error={uploadError && !bodyPhoto ? uploadError : undefined} chooseLabel={text.addPhoto} dropHere={text.dropHere} changeLabel={text.replacePhoto} formats={text.formats} />
                  <PhotoUpload id="reference-photo" title={text.referenceLabel} hint={text.referenceHint} image={referencePhoto} onChange={onReferenceChange} error={uploadError && !referencePhoto ? uploadError : undefined} chooseLabel={text.addPhoto} dropHere={text.dropHere} changeLabel={text.replacePhoto} formats={text.formats} />
                </div>
                <div className="reservation-consent-row">
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
                </div>
                <div className="reservation-placement-action-row">
                  <div className="reservation-placement">
                    <label htmlFor="tattoo-placement">{text.placementLabel}</label>
                    <input id="tattoo-placement" value={placement} onChange={(event) => { setPlacement(event.target.value); setPreview(null); setCanRequestWithoutPreview(false); }} maxLength={180} placeholder={text.placementPlaceholder} required minLength={2} data-testid="input-placement" />
                  </div>
                  <button className="reservation-primary-button reservation-generate-button" type="submit" disabled={isGeneratingPreview} data-testid="button-generate-preview">
                    {isGeneratingPreview ? text.generating : text.generate}
                    {!isGeneratingPreview && <ArrowRight aria-hidden="true" size={17} />}
                  </button>
                </div>
                <div className="reservation-project-details">
                  <div className="reservation-project-idea">
                    <label htmlFor="tattoo-idea">{text.designLabel}</label>
                    <input id="tattoo-idea" value={designIdea} onChange={(event) => setDesignIdea(event.target.value)} maxLength={180} placeholder={text.designPlaceholder} />
                  </div>
                  <div>
                    <label htmlFor="tattoo-size">{text.sizeLabel}</label>
                    <input id="tattoo-size" value={tattooSize} onChange={(event) => setTattooSize(event.target.value)} maxLength={60} placeholder={text.sizePlaceholder} />
                  </div>
                  <div>
                    <label htmlFor="tattoo-budget">{text.budgetLabel}</label>
                    <input id="tattoo-budget" value={budget} onChange={(event) => setBudget(event.target.value)} maxLength={60} inputMode="decimal" placeholder={text.budgetPlaceholder} />
                  </div>
                </div>
                {isGeneratingPreview && <div className="reservation-progress" role="status" aria-live="polite"><LoaderCircle size={18} className="reservation-spinner" />{text.generating}<small>{text.generatingNote}</small></div>}
              </form>
            </section>
          )}

          {hasOpenedStepContent && activeStep === 1 && (
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

          {hasOpenedStepContent && activeStep === 2 && (
            <section className="reservation-result reservation-slide" aria-labelledby="reservation-talk-title">
              <div className="reservation-section-heading">
                <span className="reservation-index">03 / 03</span>
                <h2 id="reservation-talk-title">{text.requestTitle}</h2>
              </div>
              <div className="reservation-contact-grid">
                <p className="reservation-contact-intro">{text.requestIntro}</p>
                <div className="reservation-contact-form reservation-contact-quick">
                  <p className="reservation-confirmation-note">{text.requestNotice}</p>
                    {requestError && <p className="reservation-alert" role="alert">{requestError}</p>}
                  <button className="reservation-primary-button reservation-whatsapp-button" type="button" onClick={openWhatsAppRequest} data-testid="button-whatsapp-request">{text.request}<ArrowRight size={17} aria-hidden="true" /></button>
                  <p className="reservation-privacy-note">{text.privacy}</p>
                </div>
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
