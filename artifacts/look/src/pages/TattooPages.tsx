import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link } from "wouter";
import mainImg from "@assets/hero_new_image_1777693117619.png";
import tableImg from "@assets/Table_1777633894262.png";
import chairImg from "@assets/Chair_1777633894263.png";
import glasses1Img from "@assets/Glasses_1_1777634693810.png";

const CREAM = "#FFF8C9";
const RED = "#E63027";

const navItems = [
  ["/inicio", "INICIO"],
  ["/acerca-de", "ACERCA DE"],
  ["/portfolio", "PORTFOLIO"],
  ["/servicios", "SERVICIOS"],
  ["/reservas", "RESERVAS"],
  ["/contacto", "CONTACTO"],
] as const;

function TattooHeader() {
  return (
    <header className="tattoo-header">
      <Link href="/inicio" className="tattoo-brand">
        SALVATORE BLACKWORK TATTO
      </Link>
      <span className="tattoo-header-note">ESTUDIO PRIVADO / BY APPOINTMENT</span>
      <nav className="tattoo-nav" aria-label="Navegación principal">
        {navItems.map(([href, label]) => (
          <Link key={href} href={href} className="tattoo-nav-link">
            <span>+</span>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

function TattooFooter() {
  return (
    <footer className="tattoo-page-footer">
      <div>
        <p className="tattoo-eyebrow">SALVATORE BLACKWORK TATTO</p>
        <h2>INK WITH<br /><em>intention</em>.</h2>
      </div>
      <div className="tattoo-footer-links">
        {navItems.slice(0, 4).map(([href, label]) => (
          <Link key={href} href={href}>{label}</Link>
        ))}
      </div>
      <div className="tattoo-footer-bottom">
        <span>© 2026 SALVATORE BLACKWORK TATTO</span>
        <span>ALL WORK BY APPOINTMENT</span>
        <Link href="/contacto">CONTACTAR EL ESTUDIO →</Link>
      </div>
    </footer>
  );
}

function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="tattoo-page" style={{ backgroundColor: CREAM }}>
      <TattooHeader />
      <main>
        <section className="tattoo-page-intro">
          <p className="tattoo-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="tattoo-page-lede">{intro}</p>
        </section>
        {children}
      </main>
      <TattooFooter />
    </div>
  );
}

export function HomePage() {
  return (
    <PageShell
      eyebrow="SALVATORE BLACKWORK TATTO / 001"
      title={<>BLACKWORK<br /><em>tatto</em> STUDIO</>}
      intro="A private tattoo studio for deliberate blackwork, custom pieces, and permanent visual language."
    >
      <section className="tattoo-home-feature">
        <div className="tattoo-home-image">
          <img src={mainImg} alt="Salvatore Blackwork Tatto studio portrait" />
        </div>
        <div className="tattoo-home-copy">
          <p className="tattoo-eyebrow">THE STUDIO</p>
          <h2>Bold lines.<br /><em>Quiet force.</em></h2>
          <p>
            Salvatore Blackwork Tatto creates considered work with a focus on
            contrast, movement, and the relationship between ink and skin.
          </p>
          <Link className="tattoo-text-link" href="/portfolio">VER PORTFOLIO <span>↗</span></Link>
        </div>
      </section>
      <section className="tattoo-home-manifesto">
        <p className="tattoo-eyebrow">MANIFIESTO</p>
        <h2>THE BODY IS<br /><em>the canvas.</em></h2>
        <Link className="tattoo-red-link" href="/reservas">INICIAR UNA CONSULTA →</Link>
      </section>
    </PageShell>
  );
}

export function AboutPage() {
  return (
    <PageShell
      eyebrow="ACERCA DE / 002"
      title={<>THE HAND<br /><em>behind</em> the ink.</>}
      intro="A studio built around patience, precision, and tattoos that feel inseparable from the person wearing them."
    >
      <section className="tattoo-split-section">
        <div className="tattoo-split-image">
          <img src={chairImg} alt="Detalle del estudio Salvatore Blackwork" />
        </div>
        <div className="tattoo-editorial-copy">
          <p className="tattoo-eyebrow">SALVATORE / BLACKWORK</p>
          <p>
            The studio works in the language of blackwork: dense shadow,
            controlled negative space, and lines that stay clear over time.
            Every design begins with a conversation rather than a catalogue.
          </p>
          <p>
            From the first sketch to the final aftercare note, the process is
            personal, focused, and made around the body in front of us.
          </p>
        </div>
      </section>
      <section className="tattoo-number-grid">
        <div><strong>01</strong><span>LISTEN<br />FIRST</span></div>
        <div><strong>02</strong><span>DRAW<br />WITH PURPOSE</span></div>
        <div><strong>03</strong><span>LEAVE<br />A MARK</span></div>
      </section>
    </PageShell>
  );
}

export function PortfolioPage() {
  const works = [
    ["BW—01", "BLACK FLAME", tableImg],
    ["BW—02", "THORN STUDY", chairImg],
    ["BW—03", "VOID SCRIPT", glasses1Img],
  ] as const;

  return (
    <PageShell
      eyebrow="PORTFOLIO / 003"
      title={<>SELECTED<br /><em>blackwork</em>.</>}
      intro="A selection of studies, custom compositions, and pieces made in the studio."
    >
      <section className="tattoo-portfolio-grid">
        {works.map(([code, name, image], index) => (
          <article className={`tattoo-work-card tattoo-work-${index + 1}`} key={code}>
            <div className="tattoo-work-image">
              <img src={image} alt={name} />
            </div>
            <div className="tattoo-work-meta">
              <span>{code}</span>
              <strong>{name}</strong>
            </div>
          </article>
        ))}
      </section>
      <div className="tattoo-centered-cta">
        <p>Every custom piece begins with an idea.</p>
        <Link className="tattoo-red-link" href="/reservas">CUÉNTANOS LA TUYA →</Link>
      </div>
    </PageShell>
  );
}

export function ServicesPage() {
  const services = [
    ["01", "CUSTOM BLACKWORK", "Diseños construidos desde cero alrededor de tu idea, tu anatomía y tu ritmo."],
    ["02", "SMALL STUDIES", "Piezas más pequeñas para comenzar una colección de tinta con intención."],
    ["03", "LARGE COMPOSITIONS", "Proyectos de mayor escala pensados para moverse con el cuerpo y el tiempo."],
    ["04", "CONSULTATION", "Una conversación clara para definir concepto, ubicación, tamaño y proceso."],
  ];

  return (
    <PageShell
      eyebrow="SERVICIOS / 004"
      title={<>THE WORK<br /><em>in detail.</em></>}
      intro="No hay una fórmula única. Cada proyecto se construye con el nivel de detalle y tiempo que necesita."
    >
      <section className="tattoo-services-list">
        {services.map(([number, name, description]) => (
          <article key={number} className="tattoo-service-row">
            <span>{number}</span>
            <h2>{name}</h2>
            <p>{description}</p>
            <span className="tattoo-service-arrow">↗</span>
          </article>
        ))}
      </section>
      <section className="tattoo-dark-callout">
        <p className="tattoo-eyebrow">THE SALVATORE METHOD</p>
        <h2>PRECISION<br /><em>over noise.</em></h2>
        <Link className="tattoo-light-link" href="/acerca-de">CONOCER EL ESTUDIO →</Link>
      </section>
    </PageShell>
  );
}

export function BookingPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <PageShell
      eyebrow="RESERVAS / 005"
      title={<>START WITH<br /><em>an idea.</em></>}
      intro="Cuéntanos qué quieres llevar en la piel. Revisamos cada propuesta personalmente."
    >
      <section className="tattoo-form-section">
        <div className="tattoo-form-aside">
          <p className="tattoo-eyebrow">ANTES DE ESCRIBIR</p>
          <p>Incluye referencias visuales, tamaño aproximado, ubicación y cualquier detalle que sientas importante.</p>
          <p>Respondemos las solicitudes de lunes a viernes.</p>
        </div>
        {sent ? (
          <div className="tattoo-form-success">
            <p className="tattoo-eyebrow">RECIBIDO / 005</p>
            <h2>Tu idea ya está<br /><em>en el estudio.</em></h2>
            <p>Gracias por escribir. Te contactaremos para continuar la conversación.</p>
            <button type="button" onClick={() => setSent(false)}>ENVIAR OTRA CONSULTA →</button>
          </div>
        ) : (
          <form className="tattoo-form" onSubmit={handleSubmit}>
            <label>Tu nombre<input required name="name" placeholder="NOMBRE COMPLETO" /></label>
            <label>Tu email<input required type="email" name="email" placeholder="EMAIL" /></label>
            <label>Cuéntanos tu idea<textarea required name="idea" rows={5} placeholder="IDEA, UBICACIÓN, TAMAÑO..." /></label>
            <button type="submit">ENVIAR CONSULTA <span>↗</span></button>
          </form>
        )}
      </section>
    </PageShell>
  );
}

export function ContactPage() {
  return (
    <PageShell
      eyebrow="CONTACTO / 006"
      title={<>COME<br /><em>say hello.</em></>}
      intro="Para consultas, colaboraciones y preguntas sobre el estudio, escríbenos."
    >
      <section className="tattoo-contact-grid">
        <div>
          <p className="tattoo-eyebrow">EMAIL</p>
          <a className="tattoo-contact-link" href="mailto:hello@salvatoreblackwork.tattoo">HELLO@SALVATOREBLACKWORK.TATTOO</a>
        </div>
        <div>
          <p className="tattoo-eyebrow">SOCIAL</p>
          <a className="tattoo-contact-link" href="#">@SALVATOREBLACKWORK</a>
        </div>
        <div>
          <p className="tattoo-eyebrow">HORARIO</p>
          <p className="tattoo-contact-text">LUN — VIE<br />BY APPOINTMENT</p>
        </div>
        <div>
          <p className="tattoo-eyebrow">RESERVAS</p>
          <Link className="tattoo-red-link" href="/reservas">INICIAR CONSULTA →</Link>
        </div>
      </section>
      <section className="tattoo-contact-statement">
        <img src={mainImg} alt="" />
        <h2>MAKE IT<br /><em>permanent.</em></h2>
      </section>
    </PageShell>
  );
}