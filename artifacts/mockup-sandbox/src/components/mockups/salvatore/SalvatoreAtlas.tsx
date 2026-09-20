import { FormEvent, useMemo, useState } from "react";
import "./SalvatoreAtlas.css";

type Language = "ES" | "EN";
type Filter = "ALL" | "ORNAMENTAL" | "GEOMETRIC" | "DOTWORK";

type Piece = {
  id: string;
  number: string;
  title: string;
  type: Exclude<Filter, "ALL">;
  placement: string;
  size: string;
  image: string;
  note: string;
};

const pieces: Piece[] = [
  {
    id: "black-flame",
    number: "BW—01",
    title: "Black Flame",
    type: "ORNAMENTAL",
    placement: "Upper arm / sternum",
    size: "12—18 cm",
    image: "/__mockup/images/salvatore-atlas-hero.png",
    note: "A dense central form held open by a fine-line halo.",
  },
  {
    id: "thorn-study",
    number: "BW—04",
    title: "Thorn Study",
    type: "DOTWORK",
    placement: "Rib / outer calf",
    size: "10—16 cm",
    image: "/__mockup/images/salvatore-atlas-detail.png",
    note: "Slow gradients, sharp points, and a little more skin than ink.",
  },
  {
    id: "iron-veil",
    number: "BW—07",
    title: "Iron Veil",
    type: "GEOMETRIC",
    placement: "Back / thigh",
    size: "18—30 cm",
    image: "/__mockup/images/salvatore-atlas-ritual.png",
    note: "A measured composition that follows the body's own architecture.",
  },
];

const copy = {
  ES: {
    eyebrow: "ATLAS DE PIEZAS / 2026",
    title: "Tinta que\nencuentra forma.",
    intro:
      "Un índice vivo de proyectos blackwork. Elige una dirección, mira cómo se comporta sobre el cuerpo y abre una conversación.",
    works: "selección abierta",
    book: "iniciar consulta",
    filters: ["ALL", "ORNAMENTAL", "GEOMETRIC", "DOTWORK"] as Filter[],
    selected: "pieza seleccionada",
    placement: "zona",
    scale: "escala",
    note: "nota de estudio",
    details: "ver ficha",
    back: "volver al atlas",
    drawerTitle: "Hablemos de tu pieza.",
    drawerCopy:
      "Cuéntame dónde vive, qué quieres que conserve y cuándo te gustaría sentarnos a dibujarla.",
    name: "tu nombre",
    email: "tu email",
    message: "zona, idea o referencia",
    send: "enviar consulta",
    sent: "Consulta recibida. Te escribo en 48 h.",
    availability: "próximas sesiones",
    availabilityValue: "abril — mayo 2026",
    close: "cerrar",
  },
  EN: {
    eyebrow: "PIECE ATLAS / 2026",
    title: "Ink finding\nits form.",
    intro:
      "A living index of blackwork projects. Choose a direction, see how it follows the body, and start a conversation.",
    works: "open selection",
    book: "start a consultation",
    filters: ["ALL", "ORNAMENTAL", "GEOMETRIC", "DOTWORK"] as Filter[],
    selected: "selected piece",
    placement: "placement",
    scale: "scale",
    note: "studio note",
    details: "view sheet",
    back: "back to atlas",
    drawerTitle: "Let's shape your piece.",
    drawerCopy:
      "Tell me where it lives, what it should hold on to, and when you would like to sit down and draw it.",
    name: "your name",
    email: "your email",
    message: "placement, idea or reference",
    send: "send enquiry",
    sent: "Enquiry received. I will write back within 48 h.",
    availability: "next sessions",
    availabilityValue: "April — May 2026",
    close: "close",
  },
};

export function SalvatoreAtlas() {
  const [language, setLanguage] = useState<Language>("ES");
  const [filter, setFilter] = useState<Filter>("ALL");
  const [selectedId, setSelectedId] = useState<string>(pieces[0].id);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeCopy = copy[language];

  const visiblePieces = useMemo(
    () => (filter === "ALL" ? pieces : pieces.filter((piece) => piece.type === filter)),
    [filter],
  );
  const selectedPiece = pieces.find((piece) => piece.id === selectedId) ?? pieces[0];

  function handleFilter(nextFilter: Filter) {
    setFilter(nextFilter);
    const firstMatch = nextFilter === "ALL"
      ? pieces[0]
      : pieces.find((piece) => piece.type === nextFilter);
    if (firstMatch) setSelectedId(firstMatch.id);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="atlas-shell">
      <header className="atlas-topbar">
        <button className="atlas-wordmark" type="button" onClick={() => setFilter("ALL")}>
          <span>Salvatore</span>
          <small>Blackwork Tatto</small>
        </button>
        <nav className={`atlas-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <a href="#atlas">Atlas</a>
          <a href="#method">Method</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="atlas-top-actions">
          <div className="atlas-language" aria-label="Language">
            <button className={language === "ES" ? "is-active" : ""} type="button" onClick={() => setLanguage("ES")}>ES</button>
            <span>/</span>
            <button className={language === "EN" ? "is-active" : ""} type="button" onClick={() => setLanguage("EN")}>EN</button>
          </div>
          <button
            className="atlas-menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className="atlas-layout" id="atlas">
        <aside className="atlas-rail">
          <div className="atlas-rail-index">01—03</div>
          <div className="atlas-rail-rule" />
          <p className="atlas-rail-copy">Blackwork /<br />body architecture</p>
          <div className="atlas-rail-bottom">
            <span className="atlas-vertical-label">MADRID · ES</span>
            <span className="atlas-crosshair">+</span>
          </div>
        </aside>

        <section className="atlas-main">
          <div className="atlas-intro">
            <div>
              <p className="atlas-eyebrow">{activeCopy.eyebrow}</p>
              <h1>{activeCopy.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
            </div>
            <p className="atlas-intro-copy">{activeCopy.intro}</p>
          </div>

          <div className="atlas-toolbar">
            <div className="atlas-filter-list" role="tablist" aria-label="Filter pieces">
              {activeCopy.filters.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="tab"
                  aria-selected={filter === option}
                  className={filter === option ? "is-active" : ""}
                  onClick={() => handleFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <span className="atlas-selection-count">0{visiblePieces.length} / {activeCopy.works}</span>
          </div>

          <div className="atlas-catalogue">
            <div className="atlas-piece-list">
              {visiblePieces.map((piece) => (
                <button
                  key={piece.id}
                  type="button"
                  className={`atlas-piece-row ${selectedId === piece.id ? "is-selected" : ""}`}
                  onClick={() => setSelectedId(piece.id)}
                >
                  <span className="atlas-piece-number">{piece.number}</span>
                  <span className="atlas-piece-name">{piece.title}</span>
                  <span className="atlas-piece-type">{piece.type}</span>
                  <span className="atlas-piece-arrow">↗</span>
                </button>
              ))}
            </div>

            <article className="atlas-feature">
              <div className="atlas-image-wrap">
                <img src={selectedPiece.image} alt={`${selectedPiece.title} blackwork study`} />
                <span className="atlas-image-stamp">SBT / {selectedPiece.number}</span>
                <span className="atlas-image-mark">+</span>
              </div>
              <div className="atlas-feature-meta">
                <div>
                  <p className="atlas-feature-kicker">{activeCopy.selected}</p>
                  <h2>{selectedPiece.title}</h2>
                </div>
                <button type="button" onClick={() => setIsBookingOpen(true)}>{activeCopy.details} <span>↗</span></button>
              </div>
            </article>
          </div>

          <div className="atlas-info-grid" id="method">
            <div className="atlas-info-label">
              <span>02</span>
              <span>{activeCopy.note}</span>
            </div>
            <p>{selectedPiece.note}</p>
            <dl>
              <div><dt>{activeCopy.placement}</dt><dd>{selectedPiece.placement}</dd></div>
              <div><dt>{activeCopy.scale}</dt><dd>{selectedPiece.size}</dd></div>
            </dl>
          </div>

          <footer className="atlas-footer" id="contact">
            <span>© SBT—26</span>
            <span>Ink is architecture.</span>
            <button type="button" onClick={() => setIsBookingOpen(true)}>{activeCopy.book} <span>→</span></button>
          </footer>
        </section>
      </div>

      <aside className={`atlas-booking ${isBookingOpen ? "is-open" : ""}`} aria-hidden={!isBookingOpen}>
        <div className="atlas-booking-head">
          <span>03 / {activeCopy.availability}</span>
          <button type="button" onClick={() => { setIsBookingOpen(false); setSubmitted(false); }} aria-label={activeCopy.close}>×</button>
        </div>
        <div className="atlas-booking-body">
          <p className="atlas-eyebrow">SBT / CONSULTATION</p>
          <h2>{activeCopy.drawerTitle}</h2>
          <p className="atlas-booking-copy">{activeCopy.drawerCopy}</p>
          <div className="atlas-availability"><span>{activeCopy.availability}</span><strong>{activeCopy.availabilityValue}</strong></div>
          {submitted ? (
            <div className="atlas-success" role="status">
              <span>+</span>
              <p>{activeCopy.sent}</p>
              <button type="button" onClick={() => setSubmitted(false)}>send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label><span>{activeCopy.name}</span><input name="name" required autoComplete="name" /></label>
              <label><span>{activeCopy.email}</span><input name="email" required type="email" autoComplete="email" /></label>
              <label><span>{activeCopy.message}</span><textarea name="message" required rows={3} /></label>
              <button className="atlas-submit" type="submit">{activeCopy.send}<span>↗</span></button>
            </form>
          )}
        </div>
      </aside>
      {isBookingOpen && <button className="atlas-overlay" type="button" aria-label={activeCopy.close} onClick={() => setIsBookingOpen(false)} />}
    </main>
  );
}

export default SalvatoreAtlas;