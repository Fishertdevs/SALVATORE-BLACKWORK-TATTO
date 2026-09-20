import { useState } from "react";

const CONSENT_KEY = "salvatore-cookie-consent";
const appBasePath = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

type ConsentChoice = "accepted" | "rejected" | "configured";

function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "rejected" || value === "configured"
    ? value
    : null;
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentChoice | null>(() => readConsent());
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  if (consent) return null;

  const saveConsent = (choice: ConsentChoice) => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    setConsent(choice);
  };

  return (
    <aside className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title">
      <div className="cookie-banner-copy">
        <p className="cookie-banner-eyebrow">PRIVACIDAD Y COOKIES</p>
        <h2 id="cookie-banner-title">Tu privacidad importa</h2>
        <p>
          Usamos almacenamiento esencial para recordar tu idioma y tu decisión sobre cookies.
          No activamos cookies de análisis o publicidad sin tu autorización.
        </p>
        <a href={`${appBasePath}politica-de-cookies`}>Leer la Política de Cookies</a>
      </div>

      {isConfiguring && (
        <div className="cookie-settings" aria-label="Configuración de cookies">
          <label className="cookie-setting-row">
            <span>
              <strong>Cookies esenciales</strong>
              <small>Necesarias para guardar preferencias básicas del sitio.</small>
            </span>
            <input type="checkbox" checked disabled aria-label="Cookies esenciales activas" />
          </label>
          <label className="cookie-setting-row">
            <span>
              <strong>Cookies de análisis</strong>
              <small>No se activan actualmente. Puedes dejar tu preferencia guardada.</small>
            </span>
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(event) => setAnalyticsEnabled(event.target.checked)}
              aria-label="Activar cookies de análisis"
            />
          </label>
        </div>
      )}

      <div className="cookie-banner-actions">
        <button type="button" className="cookie-button cookie-button-secondary" onClick={() => saveConsent("rejected")}>
          Rechazar no esenciales
        </button>
        <button
          type="button"
          className="cookie-button cookie-button-secondary"
          onClick={() => setIsConfiguring((current) => !current)}
        >
          {isConfiguring ? "Ocultar opciones" : "Configurar"}
        </button>
        {isConfiguring ? (
          <button type="button" className="cookie-button cookie-button-primary" onClick={() => saveConsent("configured")}>
            Guardar selección
          </button>
        ) : (
          <button type="button" className="cookie-button cookie-button-primary" onClick={() => saveConsent("accepted")}>
            Aceptar todas
          </button>
        )}
      </div>
    </aside>
  );
}