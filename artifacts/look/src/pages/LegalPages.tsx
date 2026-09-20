import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SiInstagram, SiTiktok, SiWhatsapp } from "react-icons/si";
import { getInitialLanguage, persistLanguage } from "@/i18n";
import type { Language } from "@/i18n";

const appBasePath = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const legalNav = [
  ["INICIO", "#home-hero"],
  ["ACERCA DE", "#studio-about"],
  ["PORTFOLIO", "#studio-portfolio"],
  ["SERVICIOS", "#studio-services"],
  ["RESERVAS", "#studio-booking"],
  ["CONTACTO", "#studio-contact"],
] as const;

const directHomeHref = `${appBasePath}?skipWelcome=1#home-hero`;

function LegalMobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage());

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    persistLanguage(nextLanguage);
  };

  return (
    <>
      <header className={`mobile-header legal-mobile-header ${isMenuOpen ? "is-menu-open" : ""}`}>
        <div className="mobile-logo-text">SALVATORE BLACKWORK TATTO</div>
        <div className="mobile-header-actions">
          <div className="language-switch" aria-label="Language selector">
            <button
              type="button"
              className={`language-option ${language === "es" ? "is-active" : ""}`}
              aria-pressed={language === "es"}
              onClick={() => changeLanguage("es")}
            >
              ES
            </button>
            <span className="language-divider" aria-hidden="true">/</span>
            <button
              type="button"
              className={`language-option ${language === "en" ? "is-active" : ""}`}
              aria-pressed={language === "en"}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            className="mobile-hamburger"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="legal-mobile-navigation"
          >
            <span className="mobile-hamburger-line" />
            <span className="mobile-hamburger-line" />
            <span className="mobile-hamburger-line" />
          </button>
        </div>
      </header>
      <button
        type="button"
        className={`mobile-menu-backdrop ${isMenuOpen ? "is-visible" : ""}`}
        onClick={() => setIsMenuOpen(false)}
        aria-label="Cerrar menú"
        tabIndex={isMenuOpen ? 0 : -1}
      />
      <div
        id="legal-mobile-navigation"
        className={`mobile-menu-overlay ${isMenuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navegación principal"
        aria-hidden={!isMenuOpen}
      >
        <nav className="mobile-menu-links">
          {legalNav.map(([label, hash]) => (
            <a
              key={label}
              href={`${appBasePath}?skipWelcome=1${hash}`}
              className="mobile-menu-link"
              onClick={() => setIsMenuOpen(false)}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  const footerRef = useRef<HTMLElement>(null);
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage());

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    persistLanguage(nextLanguage);
  };

  useEffect(() => {
    document.title = `${title} — SALVATORE BLACKWORK TATTO`;
    window.scrollTo(0, 0);
    return () => {
      document.title = "SALVATORE BLACKWORK TATTO";
    };
  }, [title]);

  useEffect(() => {
    const footer = footerRef.current;
    const wordmark = footer?.querySelector<HTMLElement>(".footer-wordmark");
    if (!footer || !wordmark) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wordmark.style.backgroundPosition = "0% 0%";
      return;
    }

    const showWordmark = () => {
      gsap.killTweensOf(wordmark);
      gsap.fromTo(
        wordmark,
        { backgroundPosition: "100% 0%" },
        { backgroundPosition: "0% 0%", duration: 1.6, ease: "power3.out" },
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          showWordmark();
        } else {
          gsap.killTweensOf(wordmark);
          wordmark.style.backgroundPosition = "100% 0%";
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(footer);
    return () => {
      observer.disconnect();
      gsap.killTweensOf(wordmark);
    };
  }, []);

  useEffect(() => {
    const content = document.querySelector<HTMLElement>(".legal-content");
    if (!content) return;

    const targets = Array.from(content.querySelectorAll<HTMLElement>("h2, p, li"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      gsap.set(targets, { clearProps: "opacity,transform" });
      return;
    }

    const showText = (element: HTMLElement) => {
      gsap.killTweensOf(element);
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
      });
    };

    const hideText = (element: HTMLElement) => {
      gsap.killTweensOf(element);
      gsap.to(element, {
        opacity: 0,
        y: 14,
        duration: 0.35,
        ease: "power2.in",
      });
    };

    gsap.set(targets, { opacity: 0, y: 14 });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            showText(element);
          } else {
            hideText(element);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      gsap.killTweensOf(targets);
    };
  }, []);

  return (
    <main className="legal-page">
      <header className="legal-header">
        <a className="legal-logo" href={directHomeHref}>SALVATORE BLACKWORK TATTO</a>
        <nav className="legal-main-nav" aria-label="Navegación principal">
          <a href={`${appBasePath}?skipWelcome=1#home-hero`}>INICIO</a>
          <a href={`${appBasePath}?skipWelcome=1#studio-about`}>ACERCA DE</a>
          <a href={`${appBasePath}?skipWelcome=1#studio-portfolio`}>PORTFOLIO</a>
          <a href={`${appBasePath}?skipWelcome=1#studio-services`}>SERVICIOS</a>
          <a href={`${appBasePath}?skipWelcome=1#studio-booking`}>RESERVAS</a>
          <a href={`${appBasePath}?skipWelcome=1#studio-contact`}>CONTACTO</a>
        </nav>
        <div className="legal-header-language">
          <div className="language-switch" aria-label="Language selector">
            <button
              type="button"
              className={`language-option ${language === "es" ? "is-active" : ""}`}
              aria-pressed={language === "es"}
              onClick={() => changeLanguage("es")}
            >
              ES
            </button>
            <span className="language-divider" aria-hidden="true">/</span>
            <button
              type="button"
              className={`language-option ${language === "en" ? "is-active" : ""}`}
              aria-pressed={language === "en"}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
          </div>
        </div>
      </header>
      <LegalMobileHeader />
      <div className="legal-container">
        <a className="legal-inline-back" href={directHomeHref}>← VOLVER AL INICIO</a>
        <h1 className={title === "Términos y Condiciones" ? "legal-title-terms" : undefined}>{title}</h1>
        <p className="legal-updated">Última actualización: {updated}</p>
        <article className="legal-content">{children}</article>
      </div>
      <footer ref={footerRef} className="site-footer legal-site-footer">
        <div className="footer-wordmark" aria-hidden="true">SALVATORE BLACKWORK TATTO</div>
        <div className="footer-center">
          <p className="footer-design-label">ALTERNATIVE DESIGN</p>
          <p className="footer-style-line">ORNAMENTAL . TRIBAL . BLACKWORK</p>
          <div className="footer-socials" aria-label="Redes y contacto">
            <a className="footer-social" href={`${appBasePath}#studio-contact`} aria-label="Instagram">
              <SiInstagram size={16} aria-hidden="true" />
            </a>
            <a className="footer-social" href={`${appBasePath}#studio-contact`} aria-label="WhatsApp">
              <SiWhatsapp size={16} aria-hidden="true" />
            </a>
            <a className="footer-social" href={`${appBasePath}#studio-contact`} aria-label="TikTok">
              <SiTiktok size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="footer-rule" aria-hidden="true" />
          <nav className="footer-legal-nav" aria-label="Enlaces legales">
            <a href={`${appBasePath}terminos-y-condiciones`}>TÉRMINOS Y CONDICIONES</a>
            <div className="footer-policy-row">
              <a href={`${appBasePath}politica-de-cookies`}>POLÍTICA DE COOKIES</a>
              <span aria-hidden="true">·</span>
              <a href={`${appBasePath}politica-de-privacidad`}>POLÍTICA DE PRIVACIDAD</a>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SALVATORE BLACKWORK TATTO</span>
        </div>
      </footer>
    </main>
  );
}

export function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Política de Privacidad"
      updated="enero 2026"
    >
      <p>
        Esta política informa cómo SALVATORE BLACKWORK TATTO, como marca del estudio de tatuaje,
        trata los datos personales de las personas que visitan este sitio, solicitan información o
        se ponen en contacto con el estudio.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable legal, razón social, NIT, domicilio y correo de atención de derechos deben
        ser completados por el titular del estudio antes de la publicación definitiva. Mientras
        tanto, las solicitudes pueden realizarse por los canales de contacto publicados en el sitio.
      </p>

      <h2>2. Marco normativo colombiano</h2>
      <p>
        El tratamiento se realiza de acuerdo con la Ley 1581 de 2012, el Decreto 1074 de 2015 y
        las instrucciones aplicables de la Superintendencia de Industria y Comercio (SIC), además
        de las normas que las modifiquen o sustituyan.
      </p>

      <h2>3. Datos que podemos tratar</h2>
      <ul>
        <li>Nombre, datos de contacto y contenido de las consultas que envíes.</li>
        <li>Información necesaria para gestionar una consulta o solicitud de cita.</li>
        <li>Preferencia de idioma y decisión sobre cookies guardadas localmente en el navegador.</li>
        <li>
          Datos sensibles relacionados con salud, piel, alergias o medicamentos únicamente si los
          proporcionas voluntariamente para valorar la seguridad del servicio. No son obligatorios
          para navegar el sitio.
        </li>
        <li>Información técnica básica necesaria para seguridad, funcionamiento y diagnóstico del sitio.</li>
      </ul>

      <h2>4. Finalidades y base del tratamiento</h2>
      <ul>
        <li>Responder preguntas y solicitudes enviadas por los visitantes.</li>
        <li>Coordinar consultas, disponibilidad y preparación de una cita.</li>
        <li>Prestar el servicio de tatuaje y entregar indicaciones de cuidado posterior.</li>
        <li>Proteger el sitio, prevenir usos abusivos y cumplir obligaciones legales.</li>
        <li>Enviar comunicaciones comerciales solo cuando exista autorización previa.</li>
      </ul>

      <h2>5. Derechos de los titulares</h2>
      <p>
        Puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos; pedir prueba
        de la autorización otorgada; conocer el uso dado a la información; presentar quejas ante
        la SIC cuando corresponda y revocar la autorización cuando no exista un deber legal o
        contractual que impida hacerlo.
      </p>

      <h2>6. Consultas y reclamos</h2>
      <p>
        Para ejercer tus derechos, presenta una solicitud clara indicando tu nombre, medio de
        respuesta, descripción de la petición y documentos que la soporten, a través del canal de
        contacto publicado por el estudio. Las consultas y reclamos se atenderán dentro de los
        términos previstos por la Ley 1581 de 2012 y sus reglamentos.
      </p>

      <h2>7. Seguridad, conservación y terceros</h2>
      <p>
        Se aplican medidas razonables de seguridad y acceso restringido. Los datos se conservarán
        durante el tiempo necesario para cumplir la finalidad informada, obligaciones legales y
        atender posibles responsabilidades. Si se incorporan proveedores de agenda, correo,
        analítica o almacenamiento, deberán ser identificados y actualizados en esta política.
      </p>

      <h2>8. Menores de edad</h2>
      <p>
        El estudio no solicita deliberadamente datos de menores sin la autorización de sus
        representantes legales. Si se identifica un tratamiento no autorizado, se tomarán medidas
        razonables para eliminar o proteger la información.
      </p>

      <h2>9. Cambios</h2>
      <p>
        Esta política puede actualizarse para reflejar cambios legales, operativos o tecnológicos.
        La versión vigente estará disponible en esta página con su fecha de actualización.
      </p>
    </LegalLayout>
  );
}

export function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Política de Cookies"
      updated="enero 2026"
    >
      <p>
        Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo
        cuando los visita. Permiten que el sitio recuerde sus preferencias y mejoran su experiencia
        de navegación.
      </p>

      <h2>¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo
        cuando los visita. Permiten que el sitio recuerde sus preferencias y mejoran su experiencia
        de navegación.
      </p>

      <h2>Cookies que utilizamos</h2>
      <p>
        Este sitio web utiliza únicamente cookies esenciales para su funcionamiento correcto. No
        utilizamos cookies de seguimiento o publicidad de terceros.
      </p>

      <h2>Cookies esenciales</h2>
      <p>
        Estas cookies son necesarias para que el sitio web funcione correctamente e incluyen
        preferencias de idioma y consentimiento de cookies. No pueden ser desactivadas.
      </p>

      <h2>Control de cookies</h2>
      <p>
        Puede gestionar las cookies a través de la configuración de su navegador. Tenga en cuenta
        que deshabilitar las cookies esenciales puede afectar el funcionamiento del sitio web.
      </p>

      <h2>Más información</h2>
      <p>
        Para obtener más información sobre cómo utilizamos las cookies, no dude en contactarnos a
        través de los canales disponibles en nuestro sitio.
      </p>
    </LegalLayout>
  );
}

export function TermsPage() {
  return (
    <LegalLayout
      title="Términos y Condiciones"
      updated="enero 2026"
    >
      <p>
        Estos términos establecen las reglas generales de uso del sitio de SALVATORE BLACKWORK
        TATTO y de las solicitudes de información o cita realizadas a través de sus canales.
      </p>

      <h2>1. Aceptación</h2>
      <p>
        La navegación y el uso del sitio implican la lectura y aceptación de estos términos. Si no
        estás de acuerdo, debes abstenerte de utilizarlo.
      </p>

      <h2>2. Servicio y citas</h2>
      <p>
        El contenido del sitio es informativo y no garantiza disponibilidad, precio o aceptación de
        una cita. Una reserva solo queda confirmada cuando el estudio la acepta expresamente por
        sus canales oficiales y comunica sus condiciones.
      </p>

      <h2>3. Información del visitante</h2>
      <p>
        Quien envía una solicitud debe entregar información veraz, actualizada y suficiente para
        recibir respuesta. No se deben enviar datos de terceros sin autorización.
      </p>

      <h2>4. Propiedad intelectual</h2>
      <p>
        El nombre, identidad visual, fotografías, textos y diseños publicados pertenecen a sus
        respectivos titulares. No pueden copiarse, modificarse, distribuirse o utilizarse
        comercialmente sin autorización previa.
      </p>

      <h2>5. Uso permitido</h2>
      <p>
        Está prohibido usar el sitio para actividades ilícitas, enviar contenido malicioso,
        intentar acceder a áreas no autorizadas o afectar su disponibilidad y seguridad.
      </p>

      <h2>6. Limitaciones</h2>
      <p>
        El estudio procura mantener la información actualizada, pero puede corregir errores,
        cambiar contenidos o suspender temporalmente el sitio por mantenimiento. Las decisiones
        clínicas o de seguridad relacionadas con una pieza deben revisarse directamente con el
        profesional responsable.
      </p>

      <h2>7. Ley aplicable</h2>
      <p>
        Estos términos se interpretan conforme a las leyes de la República de Colombia, sin
        perjuicio de los derechos irrenunciables que correspondan a los consumidores.
      </p>

      <h2>8. Cambios y contacto</h2>
      <p>
        El estudio puede actualizar estos términos. La versión vigente estará disponible en esta
        página. Para dudas, utiliza los canales de contacto publicados por SALVATORE BLACKWORK TATTO.
      </p>
    </LegalLayout>
  );
}