import type { ReactNode } from "react";
import { useEffect } from "react";
import { SiInstagram, SiTiktok, SiWhatsapp } from "react-icons/si";

const appBasePath = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  useEffect(() => {
    document.title = `${title} — SALVATORE BLACKWORK TATTO`;
    window.scrollTo(0, 0);
    return () => {
      document.title = "SALVATORE BLACKWORK TATTO";
    };
  }, [title]);

  return (
    <main className="legal-page">
      <header className="legal-header">
        <a className="legal-logo" href={appBasePath}>SALVATORE BLACKWORK TATTO</a>
        <nav className="legal-main-nav" aria-label="Navegación principal">
          <a href={`${appBasePath}#home-hero`}>INICIO</a>
          <a href={`${appBasePath}#studio-about`}>ACERCA DE</a>
          <a href={`${appBasePath}#studio-portfolio`}>PORTFOLIO</a>
          <a href={`${appBasePath}#studio-services`}>SERVICIOS</a>
          <a href={`${appBasePath}#studio-booking`}>RESERVAS</a>
          <a href={`${appBasePath}#studio-contact`}>CONTACTO</a>
        </nav>
        <a className="legal-back-link" href={appBasePath}>Volver al estudio</a>
      </header>
      <div className="legal-container">
        <p className="legal-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="legal-updated">Última actualización: {updated}</p>
        <div className="legal-disclaimer" role="note">
          <strong>Información general:</strong> este documento es una plantilla informativa y no
          constituye asesoramiento legal. El titular debe revisar y completar sus datos antes de
          publicarlo de forma definitiva.
        </div>
        <article className="legal-content">{children}</article>
      </div>
      <footer className="site-footer legal-site-footer">
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
      eyebrow="SALVATORE BLACKWORK TATTO / PRIVACIDAD"
      title="Política de Privacidad y Tratamiento de Datos"
      updated="20 de septiembre de 2026"
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
      eyebrow="SALVATORE BLACKWORK TATTO / COOKIES"
      title="Política de Cookies"
      updated="20 de septiembre de 2026"
    >
      <p>
        Esta política explica cómo este sitio utiliza cookies y tecnologías similares, incluido el
        almacenamiento local del navegador, para funcionar y recordar las preferencias de quienes
        lo visitan.
      </p>

      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Son pequeños archivos o identificadores que un sitio guarda en el navegador para recordar
        una sesión, una preferencia o información técnica. El almacenamiento local cumple una
        función similar, aunque técnicamente no es una cookie.
      </p>

      <h2>2. Tecnologías utilizadas actualmente</h2>
      <div className="legal-table" role="table" aria-label="Tecnologías utilizadas">
        <div className="legal-table-row legal-table-head" role="row">
          <span role="columnheader">Tecnología</span>
          <span role="columnheader">Finalidad</span>
          <span role="columnheader">Duración</span>
        </div>
        <div className="legal-table-row" role="row">
          <span>Preferencia de idioma</span>
          <span>Recordar si prefieres español o inglés.</span>
          <span>Persistente hasta borrado</span>
        </div>
        <div className="legal-table-row" role="row">
          <span>Consentimiento de cookies</span>
          <span>Recordar tu decisión sobre cookies no esenciales.</span>
          <span>Persistente hasta borrado</span>
        </div>
      </div>
      <p>
        Actualmente el sitio no activa cookies de publicidad, perfiles de navegación ni analítica
        de terceros sin una acción afirmativa del visitante. Si se agregan nuevas herramientas,
        esta tabla deberá actualizarse antes de activarlas.
      </p>

      <h2>3. Gestión del consentimiento</h2>
      <p>
        Al entrar por primera vez verás un banner que permite aceptar todas las categorías,
        rechazar las no esenciales o configurar tu elección. Puedes borrar los datos del sitio
        desde la configuración del navegador para volver a ver el banner.
      </p>

      <h2>4. Cookies de terceros</h2>
      <p>
        No se deben incorporar píxeles publicitarios, herramientas de analítica, mapas, videos
        incrustados u otros servicios que instalen cookies sin identificarlos en esta política y
        obtener el consentimiento que corresponda.
      </p>

      <h2>5. Marco colombiano</h2>
      <p>
        Cuando las cookies o tecnologías similares se relacionen con datos personales, su uso se
        administrará conforme a la Ley 1581 de 2012, el Decreto 1074 de 2015 y las instrucciones
        de la SIC, respetando información previa, finalidad, seguridad y derechos del titular.
      </p>

      <h2>6. Contacto y cambios</h2>
      <p>
        Si tienes preguntas sobre esta política o deseas ejercer tus derechos, utiliza los canales
        de contacto publicados por el estudio. La política puede cambiar cuando se incorporen
        nuevas tecnologías o cambie la normativa aplicable.
      </p>
    </LegalLayout>
  );
}

export function TermsPage() {
  return (
    <LegalLayout
      eyebrow="SALVATORE BLACKWORK TATTO / TÉRMINOS"
      title="Términos y Condiciones"
      updated="20 de septiembre de 2026"
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