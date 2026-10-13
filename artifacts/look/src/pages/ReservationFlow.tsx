import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { ArrowDownToLine, ArrowLeft, ArrowRight, ImagePlus, LoaderCircle, RotateCcw, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
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
    eyebrow: "RESERVA TU PROYECTO",
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
    addPhoto: "Seleccionar o soltar imagen",
    dropHere: "Suelta la imagen aquí",
    replacePhoto: "Cambiar imagen",
    formats: "JPG, PNG o WebP · hasta 1600 px tras el procesamiento",
    placementLabel: "¿Dónde irá el tatuaje?",
    placementPlaceholder: "Por ejemplo: antebrazo exterior, hombro izquierdo…",
    generate: "Generar",
    generating: "Montando la aproximación…",
    generatingNote: "Tus fotos se combinan en este navegador; no se envían a un servicio externo.",
    required: "Añade las dos imágenes, indica la zona y acepta procesarlas localmente para continuar.",
    consent: "Acepto combinar estas imágenes localmente en mi navegador para crear una aproximación.",
    consentLink: "Lee la política de privacidad.",
    privacyDetailsTitle: "Privacidad de tus imágenes",
    privacyDetailsBody: "La aproximación se crea en este navegador. Las imágenes no se envían a un servicio externo ni se guardan en el sitio.",
    uploadError: "No pudimos leer esta imagen. Prueba con un JPG, PNG o WebP.",
    localPreviewError: "No pudimos combinar las imágenes en este navegador. Revisa los archivos e inténtalo de nuevo.",
    noPreviewContinue: "Puedes pedir la consulta por WhatsApp aunque la previsualización no esté disponible; revisaremos el diseño contigo.",
    previewTitle: "02 — UNA PRIMERA LECTURA",
    previewAlt: "Aproximación visual del tatuaje en la zona seleccionada",
    disclaimerFallback: "Montaje visual local aproximado, no generado por IA. El diseño final se definirá contigo en el estudio.",
    approximate: "La escala, el ajuste y el resultado son aproximados. La pieza final se adapta a tu anatomía y se define en consulta.",
    temporary: "Tus imágenes se combinan solo en este navegador. No se envían ni se guardan en un servicio externo.",
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
    eyebrow: "BOOK YOUR PROJECT",
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
    addPhoto: "Choose or drop image",
    dropHere: "Drop image here",
    replacePhoto: "Change image",
    formats: "JPG, PNG or WebP · resized to 1600 px maximum",
    placementLabel: "Where would you like the tattoo?",
    placementPlaceholder: "For example: outer forearm, left shoulder…",
    generate: "Generate",
    generating: "Composing your approximation…",
    generatingNote: "Your photos are combined in this browser and are not sent to an external service.",
    required: "Add both images, specify the placement, and consent to local processing to continue.",
    consent: "I agree to combine these images locally in my browser to create an approximation.",
    consentLink: "Read the privacy policy.",
    privacyDetailsTitle: "Image privacy",
    privacyDetailsBody: "The approximation is created in this browser. Images are not sent to an external service or saved by the site.",
    uploadError: "We couldn’t read this image. Please try a JPG, PNG, or WebP.",
    localPreviewError: "We couldn’t combine the images in this browser. Check the files and try again.",
    noPreviewContinue: "You can still request a WhatsApp consultation while the preview is unavailable; we can review the design together.",
    previewTitle: "02 — A FIRST READING",
    previewAlt: "Visual approximation of the tattoo on the selected area",
    disclaimerFallback: "A local visual mockup, not AI-generated. The final design will be developed with you at the studio.",
    approximate: "Scale, fit, and result are approximate. Your final piece is adapted to your anatomy and decided in consultation.",
    temporary: "Your images are combined only in this browser. They are not sent to or stored by an external service.",
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

function loadPreviewImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("image-decode"));
    image.src = source;
  });
}

function getTattooAnchor(placement: string) {
  const normalized = placement.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (/hombro|shoulder|clavicula|collarbone/.test(normalized)) return { x: 0.68, y: 0.3 };
  if (/antebrazo|forearm|muneca|wrist/.test(normalized)) return { x: 0.34, y: 0.48 };
  if (/brazo|arm|bicep|biceps/.test(normalized)) return { x: 0.68, y: 0.48 };
  if (/pecho|chest|torso/.test(normalized)) return { x: 0.52, y: 0.38 };
  if (/espalda|back/.test(normalized)) return { x: 0.52, y: 0.48 };
  if (/muslo|pantorrilla|pierna|thigh|calf|leg/.test(normalized)) return { x: 0.5, y: 0.62 };
  if (/cuello|neck/.test(normalized)) return { x: 0.5, y: 0.2 };
  return { x: 0.5, y: 0.5 };
}

async function createLocalTattooPreview(
  bodySource: string,
  referenceSource: string,
  placement: string,
): Promise<string> {
  const [bodyImage, referenceImage] = await Promise.all([
    loadPreviewImage(bodySource),
    loadPreviewImage(referenceSource),
  ]);
  const canvas = document.createElement("canvas");
  const scale = Math.min(1, 1600 / Math.max(bodyImage.naturalWidth, bodyImage.naturalHeight));
  canvas.width = Math.max(1, Math.round(bodyImage.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(bodyImage.naturalHeight * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("canvas-unavailable");

  context.drawImage(bodyImage, 0, 0, canvas.width, canvas.height);
  const overlayScale = Math.min(
    (canvas.width * 0.28) / referenceImage.naturalWidth,
    (canvas.height * 0.22) / referenceImage.naturalHeight,
  );
  const overlayWidth = Math.max(1, referenceImage.naturalWidth * overlayScale);
  const overlayHeight = Math.max(1, referenceImage.naturalHeight * overlayScale);
  const anchor = getTattooAnchor(placement);
  context.save();
  context.globalCompositeOperation = "multiply";
  context.globalAlpha = 0.78;
  context.drawImage(
    referenceImage,
    canvas.width * anchor.x - overlayWidth / 2,
    canvas.height * anchor.y - overlayHeight / 2,
    overlayWidth,
    overlayHeight,
  );
  context.restore();
  return canvas.toDataURL("image/jpeg", 0.9);
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
  const [imageConsent, setImageConsent] = useState(false);
  const [preview, setPreview] = useState<{ src: string; disclaimer: string } | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [canRequestWithoutPreview, setCanRequestWithoutPreview] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [requestError, setRequestError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
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
      const src = await createLocalTattooPreview(
        bodyPhoto.previewUrl,
        referencePhoto.previewUrl,
        placement.trim(),
      );
      setPreview({
        src,
        disclaimer: text.disclaimerFallback,
      });
      setCanRequestWithoutPreview(false);
      setActiveStep(1);
      setTimeout(() => document.getElementById("reservation-result")?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
    } catch {
      setPreview(null);
      setRequestError(text.localPreviewError);
      setCanRequestWithoutPreview(true);
      setActiveStep(1);
    } finally {
      setIsGeneratingPreview(false);
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
