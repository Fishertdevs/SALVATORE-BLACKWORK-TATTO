import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { StudioHomeSections } from "@/pages/TattooPages";
import { galleryCopy, getInitialLanguage, persistLanguage } from "@/i18n";
import type { Language } from "@/i18n";
import shoesImg from "@assets/Shoes_1777633894262.png";
import tableImg from "@assets/Table_1777633894262.png";
import airpodMaxImg from "@assets/Airpod_max_1777633894262.png";
import airpodImg from "@assets/Airpod_1777633894263.png";
import candleImg from "@assets/candle_1777633894263.png";
import earringsImg from "@assets/Earrings_1777633894263.png";
import mainImg from "@assets/image-Photoroom_(30)_1789700945504.png";
import marqueeStarImg from "@assets/Star1_1777711749898.png";

const ASCII_CHARS = "........:::=+xX#0369";
const FONT_SIZE = 14;
const ASPECT_W = 4;
const ASPECT_H = 5;
const ASCII_COLS = 25;
const CELL_APPEAR_MS = 7;
const SCRAMBLE_COUNT = 10;
const SCRAMBLE_SPEED_MS = 120;

const denseCharIndex = ASCII_CHARS.lastIndexOf(".");
const denseChars = ASCII_CHARS.slice(denseCharIndex + 1).split("");

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function imageToAsciiGrid(
  img: HTMLImageElement,
  cols: number,
  rows: number,
  aw: number,
  ah: number,
) {
  const ia = img.naturalWidth / img.naturalHeight;
  const ta = aw / ah;
  let cx = 0,
    cy = 0,
    cw = img.naturalWidth,
    ch = img.naturalHeight;
  if (ia > ta) {
    cw = img.naturalHeight * ta;
    cx = (img.naturalWidth - cw) / 2;
  } else {
    ch = img.naturalWidth / ta;
    cy = (img.naturalHeight - ch) / 2;
  }
  const sc = document.createElement("canvas");
  sc.width = cols;
  sc.height = rows;
  const sctx = sc.getContext("2d")!;
  sctx.drawImage(img, cx, cy, cw, ch, 0, 0, cols, rows);
  const { data } = sctx.getImageData(0, 0, cols, rows);
  const ag: string[][] = [];
  const bg: number[][] = [];
  for (let r = 0; r < rows; r++) {
    const ar: string[] = [];
    const br: number[] = [];
    for (let c = 0; c < cols; c++) {
      const pi = (r * cols + c) * 4;
      const lum =
        (data[pi]! * 0.299 + data[pi + 1]! * 0.587 + data[pi + 2]! * 0.114) / 255;
      const ci = Math.min(
        ASCII_CHARS.length - 1,
        Math.floor((1 - lum) * ASCII_CHARS.length),
      );
      ar.push(ASCII_CHARS[ci]!);
      br.push(ci);
    }
    ag.push(ar);
    bg.push(br);
  }
  return { asciiGrid: ag, brightnessGrid: bg };
}

function LanguageSwitcher({
  language,
  onChange,
}: {
  language: Language;
  onChange: (language: Language) => void;
}) {
  return (
    <div className="language-switch" aria-label="Language selector">
      <button
        type="button"
        className={`language-option ${language === "es" ? "is-active" : ""}`}
        aria-pressed={language === "es"}
        onClick={() => onChange("es")}
      >
        ES
      </button>
      <span className="language-divider" aria-hidden="true">/</span>
      <button
        type="button"
        className={`language-option ${language === "en" ? "is-active" : ""}`}
        aria-pressed={language === "en"}
        onClick={() => onChange("en")}
      >
        EN
      </button>
    </div>
  );
}

function MobileLookGallery({
  language,
  onLanguageChange,
}: {
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  const copy = galleryCopy[language];
  const navHrefs = ["#home-hero", "#studio-about", "#studio-portfolio", "#studio-services", "#studio-booking", "#studio-contact"];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isWelcomeReady, setIsWelcomeReady] = useState(false);

  const welcomeRef = useRef<HTMLDivElement>(null);
  const welcomeImgRef = useRef<HTMLImageElement>(null);
  const mobileHeroImageRef = useRef<HTMLDivElement>(null);
  const mobileHeroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Handle body scroll locking
    if (isMenuOpen || showWelcome) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, showWelcome]);

  useEffect(() => {
    // Handle header scroll style
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const welcomeElement = welcomeRef.current;
    const welcomeImage = welcomeImgRef.current;
    const heroImageFrame = mobileHeroImageRef.current;
    if (!isWelcomeReady || !showWelcome || !welcomeElement || !welcomeImage || !heroImageFrame) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setShowWelcome(false);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(welcomeImage, {
        opacity: 0,
        scale: 0.28,
        filter: "blur(18px) grayscale(1)",
        clipPath: "inset(12%)"
      }, {
        opacity: 1,
        scale: 0.42,
        filter: "blur(10px) grayscale(1)",
        clipPath: "inset(8%)",
        duration: 1.2,
        ease: "power2.out",
      })
      .to(welcomeImage, {
        scale: 1,
        filter: "blur(0px) grayscale(1)",
        clipPath: "inset(0%)",
        duration: 5.3,
        ease: "power2.out",
      })
      .to(welcomeImage, {
        filter: "blur(0px) grayscale(0)",
        duration: 0.9,
        ease: "power2.inOut",
      })
      .to({}, { duration: 0.6 })
      .add(() => {
        const start = welcomeImage.getBoundingClientRect();
        const destination = heroImageFrame.getBoundingClientRect();
        gsap.set(welcomeImage, {
          position: "fixed",
          top: start.top,
          left: start.left,
          width: start.width,
          height: start.height,
          maxWidth: "none",
          margin: 0,
        });
        gsap.to(welcomeElement, {
          backgroundColor: "rgba(255, 255, 255, 0)",
          duration: 2.4,
          ease: "expo.inOut",
        });
        gsap.to(welcomeImage, {
          top: destination.top,
          left: destination.left,
          width: destination.width,
          height: destination.height,
          filter: "blur(0px) grayscale(0)",
          duration: 2.4,
          ease: "expo.inOut",
          onComplete: () => setShowWelcome(false),
        });
      });
    });

    return () => ctx.revert();
  }, [isWelcomeReady, showWelcome]);

  useEffect(() => {
    const hero = mobileHeroRef.current;
    if (showWelcome || !hero) return;

    const ctx = gsap.context(() => {
      const title = hero.querySelector(".mobile-hero-title");
      const keywords = hero.querySelector(".mobile-hero-kicker");
      const actions = hero.querySelectorAll(".mobile-hero-side-action");
      const elements = [title, keywords, ...Array.from(actions)].filter(Boolean);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(elements, { clipPath: "inset(0px 0% 0px 0px)" });
        return;
      }

      const reveal = {
        clipPath: "inset(0px 0% 0px 0px)",
        duration: 1.2,
        ease: "power3.out",
      };
      const tl = gsap.timeline();
      if (title) tl.to(title, reveal, 0.8);
      if (keywords) tl.to(keywords, reveal, 1.3);
      tl.to(actions, reveal, 1.8);
    }, hero);

    return () => ctx.revert();
  }, [showWelcome]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <div className="mobile-look-root">
      {/* WELCOME REVEAL */}
      {showWelcome && (
        <div className="mobile-welcome-overlay" ref={welcomeRef} data-testid="mobile-welcome-overlay">
          <img
            src={mainImg}
            alt="SALVATORE BLACKWORK TATTO"
            className="mobile-welcome-img"
            ref={welcomeImgRef}
            onLoad={() => setIsWelcomeReady(true)}
            onError={() => setShowWelcome(false)}
          />
        </div>
      )}

      {/* HEADER WITH HAMBURGER */}
      <header className={`mobile-header ${isScrolled ? 'is-scrolled' : ''} ${isMenuOpen ? 'is-menu-open' : ''}`} data-testid="mobile-header">
        <div className="mobile-logo-text">SALVATORE BLACKWORK TATTO</div>
        <div className="mobile-header-actions">
          <LanguageSwitcher language={language} onChange={onLanguageChange} />
          <button
            type="button"
            className="mobile-hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen
              ? (language === "es" ? "Cerrar menú" : "Close menu")
              : (language === "es" ? "Abrir menú" : "Open menu")}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            data-testid="button-menu-toggle"
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
        aria-label={language === "es" ? "Cerrar menú" : "Close menu"}
        tabIndex={isMenuOpen ? 0 : -1}
      />

      {/* MENU OVERLAY */}
      <div
        id="mobile-navigation"
        className={`mobile-menu-overlay ${isMenuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={language === "es" ? "Navegación principal" : "Main navigation"}
        aria-hidden={!isMenuOpen}
        data-testid="mobile-menu-overlay"
      >
        <nav className="mobile-menu-links">
          {copy.nav.map((label, index) => (
            <a
              key={label}
              href={navHrefs[index]}
              className="mobile-menu-link"
              onClick={() => setIsMenuOpen(false)}
              tabIndex={isMenuOpen ? 0 : -1}
              data-testid={`link-mobile-nav-${index}`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* HERO */}
      <section className="mobile-home-hero" id="home-hero" ref={mobileHeroRef}>
        <div className="mobile-hero-title-wrap">
          <div className="mobile-hero-heading">
            <h1 className="mobile-hero-title">
              <span>SALVATORE</span>
              <span>BLACKWORK TATTO</span>
            </h1>
            <p className="mobile-hero-kicker">{copy.mobileHeroStyles}</p>
          </div>
        </div>

        <div className="mobile-hero-image-frame" ref={mobileHeroImageRef}>
          <img
            src={mainImg}
            alt="SALVATORE BLACKWORK TATTO"
            className={`mobile-hero-image ${showWelcome ? "is-welcome-active" : ""}`}
          />

          <div className={`mobile-hero-actions ${showWelcome ? "is-welcome-active" : ""}`}>
            <a href="#studio-booking" className="mobile-hero-side-action">{copy.heroLeftAction}</a>
            <a href="#studio-portfolio" className="mobile-hero-side-action">{copy.heroRightAction}</a>
          </div>
        </div>
      </section>

      {/* WELCOME TEXT */}
      <section className="mobile-welcome-section" aria-labelledby="mobile-welcome-title">
        <h2
          id="mobile-welcome-title"
          className="mobile-welcome-title"
          data-delay="0s"
          data-reveal-to="inset(0 0% 0 0)"
        >
          {copy.welcomeTitle}
        </h2>
        <div
          className="mobile-welcome-label"
          data-delay="0.25s"
          data-reveal-to="inset(0 0% 0 0)"
        >
          {copy.featuredLabel}
        </div>
        <p
          className="mobile-welcome-copy"
          data-delay="0.5s"
          data-reveal-to="inset(0 0% 0 0)"
        >
          {copy.featuredParagraphs.join(" ")}
        </p>
      </section>

      {/* ARCHIVE — vertical single column */}
      <div style={{ backgroundColor: "#FFFFFF", padding: "0 24px 64px" }}>
        <header className="archive-header" aria-label={copy.cultureMarquee.join(" · ")}>
          <div className="archive-marquee-track">
            {[...copy.cultureMarquee, ...copy.cultureMarquee].map((label, i) => (
              <span className="archive-marquee-item" key={`${label}-${i}`}>
                {label}
                <img
                  src={marqueeStarImg}
                  alt=""
                  aria-hidden="true"
                  className="archive-marquee-sep"
                />
              </span>
            ))}
          </div>
        </header>

        {[
          { img: tableImg, code: "BW-01" },
          { img: shoesImg, code: "BW-04" },
          { img: candleImg, code: "BW-02" },
          { img: earringsImg, code: "BW-05" },
          { img: airpodImg, code: "BW-03" },
          { img: airpodMaxImg, code: "BW-06" },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <div style={{ width: "100%", aspectRatio: "4/5", overflow: "hidden", marginBottom: 12 }}>
              <img src={item.img} alt={copy.archiveWorks[i][1]} style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block"
              }} />
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
            }}>
              <span style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: 11, letterSpacing: "0.1em", color: "#999",
              }}>{item.code}</span>
              <span style={{
                fontFamily: "'Beautique Display', sans-serif",
                fontSize: 16, letterSpacing: "0.06em", color: "#000",
                textTransform: "uppercase",
              }}>{copy.archiveWorks[i][0]}</span>
            </div>
          </div>
        ))}
      </div>

      <StudioHomeSections language={language} />

      {/* FOOTER */}
      <div style={{ backgroundColor: "#0a0a0a", color: "#ffffff", padding: "48px 24px 32px" }}>
        <p style={{
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 11, letterSpacing: "0.18em",
          textTransform: "uppercase", color: "#E63027", margin: "0 0 12px",
        }}>{copy.footerJournal}</p>
        <h2 style={{
          fontFamily: "'Beautique Display', serif",
          fontSize: "clamp(28px, 8vw, 48px)",
          fontWeight: 400, textTransform: "uppercase",
          color: "#ffffff", lineHeight: 1.05, margin: "0 0 32px",
        }}>{copy.footerMark[0]}<br />{copy.footerMark[1]} <em style={{ color: "#E63027", fontStyle: "italic" }}>{copy.footerMark[2]}</em>.</h2>

        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.4)", marginBottom: 48 }}>
          <input type="email" placeholder={copy.emailPlaceholder} style={{
            flex: 1, background: "transparent", border: "none",
            color: "#ffffff", fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: 12, letterSpacing: "0.16em", padding: "12px 0", outline: "none",
          }} />
          <button style={{
            background: "transparent", border: "none", color: "#ffffff",
            fontSize: 14, cursor: "pointer", padding: "12px 0 12px 12px",
          }}>{copy.subscribe}</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 16px", marginBottom: 48 }}>
          {copy.footerColumns.map(([title, items]) => (
            <div key={title}>
              <h3 style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: 11, fontWeight: 500, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "#E63027", marginBottom: 12,
              }}>{title}</h3>
              {items.map(item => (
                <a key={item} href="#" style={{
                  display: "block", fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: 13, fontWeight: 300,
                  color: "rgba(255,255,255,0.7)", textDecoration: "none", marginBottom: 8,
                }}>{item}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          fontFamily: "'Beautique Display', sans-serif",
          fontSize: "clamp(48px, 15vw, 80px)",
          fontWeight: 400, textAlign: "center",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.12)",
          letterSpacing: "-0.02em", lineHeight: 0.85,
          padding: "32px 0", userSelect: "none",
        }}>SALVATORE BLACKWORK TATTO</div>

        <div style={{
          paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.12)",
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 10, letterSpacing: "0.15em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
        }}>© 2026 SALVATORE BLACKWORK TATTO — ALL RIGHTS RESERVED</div>
      </div>

    </div>
  );
}

export default function LookGallery() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768,
  );
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage());
  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    persistLanguage(nextLanguage);
  };
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const copy = galleryCopy[language];
  const navHrefs = ["#home-hero", "#studio-about", "#studio-portfolio", "#studio-services", "#studio-booking", "#studio-contact"];
  const galleryRef = useRef<HTMLDivElement>(null);
  const fullSectionRef = useRef<HTMLDivElement>(null);
  const fullContentRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const featuredCardRef = useRef<HTMLDivElement | null>(null);
  const expandedRef = useRef(false);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const heroEpsRef = useRef<HTMLDivElement>(null);
  const heroLookRef = useRef<HTMLDivElement>(null);
  const heroFutureRef = useRef<HTMLDivElement>(null);
  const heroFutureDescRef = useRef<HTMLParagraphElement>(null);
  const heroTopTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = fullSectionRef.current;
    const archiveImages = Array.from(
      document.querySelectorAll<HTMLElement>(".archive-section .archive-img"),
    );
    const featuredTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".product-video-section .featured-welcome-title, .product-video-section .featured-label, .product-video-section .featured-about-text p, .mobile-welcome-section .mobile-welcome-title, .mobile-welcome-section .mobile-welcome-label, .mobile-welcome-section .mobile-welcome-copy",
      ),
    );
    const footerTargets = Array.from(
      document.querySelectorAll<HTMLElement>(".site-footer .footer-wordmark"),
    );
    const targets: { el: HTMLElement; threshold: number }[] = [
      ...archiveImages.map((el) => ({ el, threshold: 0.1 })),
      ...featuredTargets.map((el) => ({ el, threshold: 0.15 })),
      ...footerTargets.map((el) => ({ el, threshold: 0.2 })),
    ];
    if (!targets.length) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      for (const { el } of targets) {
        const to = el.dataset.revealTo ?? "inset(0 0% 0 0)";
        el.style.transition = "none";
        el.style.clipPath = to;
      }
      return;
    }
    const revealed = new WeakSet<HTMLElement>();
    const reveal = (el: HTMLElement) => {
      if (revealed.has(el)) return;
      revealed.add(el);
      const delay = el.dataset.delay ?? "0s";
      const duration = el.dataset.duration ?? "1s";
      const prop = el.dataset.revealProperty ?? "clip-path";
      const to = el.dataset.revealTo ?? "inset(0 0% 0 0)";
      el.style.transition = `${prop} ${duration} cubic-bezier(0.76, 0, 0.24, 1) ${delay}`;
      if (prop === "background-position") {
        el.style.backgroundPosition = to;
      } else {
        el.style.clipPath = to;
      }
    };
    const thresholdFor = new WeakMap<HTMLElement, number>();
    targets.forEach((t) => thresholdFor.set(t.el, t.threshold));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const minRatio = thresholdFor.get(el) ?? 0.1;
          if (!entry.isIntersecting || entry.intersectionRatio < minRatio) continue;
          reveal(el);
          observer.unobserve(el);
        }
      },
      { threshold: [0.1, 0.15, 0.2] },
    );
    targets.forEach(({ el }) => observer.observe(el));
    const checkAll = () => {
      const vh = window.innerHeight;
      for (const { el, threshold } of targets) {
        if (revealed.has(el)) continue;
        const rect = el.getBoundingClientRect();
        const visible =
          Math.max(0, Math.min(vh, rect.bottom) - Math.max(0, rect.top));
        const ratio = rect.height ? visible / rect.height : 0;
        if (ratio >= threshold) {
          reveal(el);
          observer.unobserve(el);
        }
      }
    };
    root?.addEventListener("scroll", checkAll, { passive: true });
    const rafId = requestAnimationFrame(checkAll);
    return () => {
      cancelAnimationFrame(rafId);
      root?.removeEventListener("scroll", checkAll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const measureCtx = document.createElement("canvas").getContext("2d")!;
    measureCtx.font = `${FONT_SIZE}px monospace`;
    const charWidth = Math.ceil(measureCtx.measureText("M").width);
    const charHeight = FONT_SIZE;
    const ASCII_ROWS = Math.round(
      ASCII_COLS * (ASPECT_H / ASPECT_W) * (charWidth / charHeight),
    );
    const FEATURED_ASCII_COLS = 50;
    const FEATURED_ASCII_ROWS = Math.round(
      FEATURED_ASCII_COLS * (9 / 16) * (charWidth / charHeight),
    );

    const gallery = galleryRef.current;
    if (!gallery) return;
    gallery.innerHTML = "";

    const cleanups: Array<() => void> = [];
    const intervals: number[] = [];
    const timeouts: number[] = [];

    let featuredCard: HTMLDivElement | null = null;

    const prepareCanvas = (canvas: HTMLCanvasElement, cols: number, rows: number) => {
      const dpr = 2;
      canvas.width = cols * charWidth * dpr;
      canvas.height = rows * charHeight * dpr;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawChar = (
      ctx: CanvasRenderingContext2D,
      col: number,
      row: number,
      char: string,
    ) => {
      ctx.fillStyle = "#111";
      ctx.fillRect(col * charWidth, row * charHeight, charWidth, charHeight);
      ctx.fillStyle = "#c8c8c8";
      ctx.fillText(char, col * charWidth, row * charHeight);
    };

    const animateCells = (
      canvas: HTMLCanvasElement,
      ag: string[][],
      bg: number[][],
      delay: number,
      cols: number,
      rows: number,
      onDone?: () => void,
    ) => {
      const dpr = 2;
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${charHeight}px monospace`;
      ctx.textBaseline = "top";
      const total = cols * rows;
      const state: Array<number | null> = new Array(total).fill(null);
      let settled = 0;
      const order = shuffle(Array.from({ length: total }, (_, i) => i));

      const done = () => {
        canvas.closest(".img")?.classList.add("revealed");
        onDone?.();
      };

      order.forEach((ci, i) => {
        const t = window.setTimeout(() => {
          const r = Math.floor(ci / cols),
            c = ci % cols;
          const dark = bg[r]![c]! > denseCharIndex;
          if (!dark) {
            drawChar(ctx, c, r, ag[r]![c]!);
            state[ci] = 0;
            settled++;
            if (settled === total) done();
          } else {
            drawChar(
              ctx,
              c,
              r,
              denseChars[Math.floor(Math.random() * denseChars.length)]!,
            );
            state[ci] = SCRAMBLE_COUNT;
          }
        }, delay + i * CELL_APPEAR_MS);
        timeouts.push(t);
      });

      const tick = window.setInterval(() => {
        let still = false;
        for (let ci = 0; ci < total; ci++) {
          const rem = state[ci];
          if (rem === null || rem === 0) continue;
          still = true;
          const r = Math.floor(ci / cols),
            c = ci % cols;
          if (rem === 1) {
            drawChar(ctx, c, r, ag[r]![c]!);
            state[ci] = 0;
            settled++;
            if (settled === total) done();
          } else {
            drawChar(
              ctx,
              c,
              r,
              denseChars[Math.floor(Math.random() * denseChars.length)]!,
            );
            state[ci] = rem - 1;
          }
        }
        if (!still && settled === total) {
          clearInterval(tick);
        }
      }, SCRAMBLE_SPEED_MS);
      intervals.push(tick);
    };

    const runEffect = (
      img: HTMLImageElement,
      canvas: HTMLCanvasElement,
      delay: number,
      onDone?: () => void,
    ) => {
      const { asciiGrid, brightnessGrid } = imageToAsciiGrid(
        img,
        ASCII_COLS,
        ASCII_ROWS,
        ASPECT_W,
        ASPECT_H,
      );
      prepareCanvas(canvas, ASCII_COLS, ASCII_ROWS);
      animateCells(canvas, asciiGrid, brightnessGrid, delay, ASCII_COLS, ASCII_ROWS, onDone);
    };

    // The welcome screen intentionally contains only the hero's ASCII card.
    const div = document.createElement("div");
    div.className = "img featured intro-featured";
    const img = document.createElement("img");
    img.id = "featured-img-el";
    img.src = mainImg;
    div.appendChild(img);
    gallery.appendChild(div);
    featuredCard = div;

    featuredCardRef.current = featuredCard;

    if (featuredCard) {
      const featuredImgEl = featuredCard.querySelector("img")!;
      const run = () => {
        gsap.set(featuredCard, {
          opacity: 0,
          scale: 0.28,
          filter: "blur(18px) grayscale(1)",
          clipPath: "inset(12% 12% 12% 12%)",
          transformOrigin: "50% 50%",
        });
        gsap.to(featuredCard, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px) grayscale(0)",
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 6.5,
          ease: "power2.out",
          onComplete: () => {
          featuredCard!.classList.add("revealed");
            const revealTimer = window.setTimeout(() => {
              expandSection();
            }, 600);
            timeouts.push(revealTimer);
          },
        });
      };
      if (featuredImgEl.complete && featuredImgEl.naturalWidth) {
        run();
      } else {
        featuredImgEl.addEventListener("load", run);
      }
    }

    function expandSection() {
      const fullSection = fullSectionRef.current;
      const fullContent = fullContentRef.current;
      const navbar = navbarRef.current;
      const featured = featuredCardRef.current;
      const heroImage = fullSection?.querySelector<HTMLImageElement>("#home-hero");
      if (!fullSection || !fullContent || !featured) return;
      if (expandedRef.current) return;
      expandedRef.current = true;
      activeTimelineRef.current?.kill();

      const rect = featured.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const finalHeroWidth = Math.min(viewportWidth * 0.55, 820);

      // The welcome mosaic must sit behind the expanding hero. Leaving it
      // above the hero makes its images remain visible as a ghost overlay.
      gsap.set(gallery, { zIndex: 90 });
      if (heroImage) {
        // Start the real hero image with the exact same frame as the intro
        // card, then animate its crop and position instead of swapping frames.
        gsap.set(heroImage, {
          width: rect.width,
          height: rect.height,
          top: "50%",
          left: "50%",
          margin: 0,
          transform: "translate(-50%, -50%)",
          objectPosition: "center center",
        });
      }
      gsap.set(fullSection, {
        opacity: 1,
        pointerEvents: "all",
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
        borderRadius: "4px",
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
      });
      gsap.set(fullContent, { opacity: 1, y: 0 });
      if (navbar) gsap.set(navbar, { y: "-100%", autoAlpha: 0 });
      const heroOverlays = [
        heroTopTitleRef.current,
        heroEpsRef.current,
        heroLookRef.current,
        heroFutureRef.current,
        heroFutureDescRef.current,
        ...Array.from(fullContent.querySelectorAll<HTMLElement>(".hero-side-action, .hero-image-keywords")),
      ].filter((el): el is HTMLElement => el !== null);
      gsap.set(heroOverlays, { clipPath: "inset(0 100% 0 0)" });

      const ZOOM_DURATION = 2.4;
      const tl = gsap
        .timeline({ defaults: { ease: "expo.inOut" } })
        .to(gallery, { opacity: 0.12, duration: 1.1 }, 0)
        .to(featured, { opacity: 0, duration: 0.8 }, 0)
        .to(
          fullSection,
          {
            width: "100vw",
            height: "100vh",
            left: 0,
            top: 0,
            borderRadius: "0px",
            duration: ZOOM_DURATION,
          },
          0,
        )
        .to(gallery, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        }, ZOOM_DURATION - 0.35);
      if (heroImage) {
        tl.to(
          heroImage,
          {
            width: finalHeroWidth,
            height: viewportHeight,
            duration: ZOOM_DURATION,
          },
          0,
        );
      }
      activeTimelineRef.current = tl;
      if (navbar) {
        tl.to(
          navbar,
          { y: "0%", autoAlpha: 1, duration: 1.1, ease: "expo.out" },
          ZOOM_DURATION - 0.5,
        );
      }
      const REVEAL_DURATION = 1.2;
      const REVEAL_EASE = "power3.out";
      const REVEAL_FROM = { clipPath: "inset(0px 100% 0px 0px)" };
      const REVEAL_TO = {
        clipPath: "inset(0px 0% 0px 0px)",
        duration: REVEAL_DURATION,
        ease: REVEAL_EASE,
      };
      if (heroTopTitleRef.current) {
        tl.fromTo(heroTopTitleRef.current, REVEAL_FROM, REVEAL_TO, ZOOM_DURATION + 0.8);
      }
      if (heroEpsRef.current) {
        tl.fromTo(heroEpsRef.current, REVEAL_FROM, REVEAL_TO, ZOOM_DURATION + 1.3);
      }
      if (heroLookRef.current) {
        tl.fromTo(heroLookRef.current, REVEAL_FROM, REVEAL_TO, ZOOM_DURATION + 1.8);
      }
      if (heroFutureRef.current) {
        tl.fromTo(heroFutureRef.current, REVEAL_FROM, REVEAL_TO, ZOOM_DURATION + 2.3);
      }
      if (heroFutureDescRef.current) {
        tl.fromTo(heroFutureDescRef.current, REVEAL_FROM, REVEAL_TO, ZOOM_DURATION + 2.8);
      }
      const heroActions = fullContent.querySelectorAll<HTMLElement>(".hero-side-action");
      if (heroActions.length) {
        tl.fromTo(heroActions, REVEAL_FROM, REVEAL_TO, ZOOM_DURATION + 3.3);
      }
      const heroKeywords = fullContent.querySelector<HTMLElement>(".hero-image-keywords");
      if (heroKeywords) {
        tl.fromTo(heroKeywords, REVEAL_FROM, REVEAL_TO);
      }
      tl.eventCallback("onComplete", () => {
        gallery?.style.setProperty("opacity", "0");
        gallery?.style.setProperty("pointer-events", "none");
        gallery?.style.setProperty("z-index", "110");
        fullSection.style.overflowY = "auto";
        if (heroImage) {
          gsap.set(heroImage, { clearProps: "width,height,top,left,margin,transform" });
        }
      });
    }

    function collapseSection() {
      const fullSection = fullSectionRef.current;
      const fullContent = fullContentRef.current;
      const navbar = navbarRef.current;
      const featured = featuredCardRef.current;
      if (!fullSection || !fullContent || !featured) return;
      if (!expandedRef.current) return;
      activeTimelineRef.current?.kill();

      // Reset scroll so the collapse animation always originates from the hero,
      // not from wherever the user scrolled to inside the archive.
      fullSection.scrollTop = 0;

      const rect = featured.getBoundingClientRect();

      const heroOverlays = [
        heroEpsRef.current,
        heroLookRef.current,
        heroFutureRef.current,
        heroFutureDescRef.current,
      ].filter((el): el is HTMLImageElement | HTMLParagraphElement => el !== null);

      const tl = gsap
        .timeline({
          defaults: { ease: "expo.inOut" },
          onComplete: () => {
            expandedRef.current = false;
            activeTimelineRef.current = null;
            gsap.set(fullSection, {
              opacity: 0,
              pointerEvents: "none",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              borderRadius: "0px",
            });
            gsap.set(heroOverlays, { clipPath: "inset(0 100% 0 0)" });
            gallery?.style.setProperty("pointer-events", "auto");
            gallery?.style.setProperty("opacity", "1");
            gallery?.style.setProperty("z-index", "110");
          },
        })
        .to(heroOverlays, {
          clipPath: "inset(0 100% 0 0)",
          duration: 0.35,
          ease: "power2.in",
          stagger: 0.04,
        });
      if (navbar) {
        tl.to(
          navbar,
          { y: "-100%", autoAlpha: 0, duration: 0.35, ease: "power2.in" },
          "<",
        );
      }
      tl.to(
        fullSection,
        {
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top,
          borderRadius: "4px",
          duration: 0.72,
        },
        "-=0.05",
      )
        .to(fullSection, { opacity: 0, duration: 0.2 }, "-=0.15")
        .to(gallery, { opacity: 1, duration: 0.35 }, "-=0.2")
        .to(featured, { opacity: 1, duration: 0.25 }, "-=0.2");
      activeTimelineRef.current = tl;
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") collapseSection();
    };
    document.addEventListener("keydown", handleKey);
    cleanups.push(() => document.removeEventListener("keydown", handleKey));

    return () => {
      intervals.forEach((id) => clearInterval(id));
      timeouts.forEach((id) => clearTimeout(id));
      cleanups.forEach((fn) => fn());
    };
  }, []);

  if (isMobile) {
    return <MobileLookGallery language={language} onLanguageChange={handleLanguageChange} />;
  }

  return (
    <div className="look-root">
      <div id="gallery-layer" ref={galleryRef} />

      <div id="fullscreen-section" ref={fullSectionRef}>
        <img id="home-hero" src={mainImg} alt="" />
        <nav id="hero-navbar" ref={navbarRef}>
          <div className="nav-left">
            <span className="nav-logo">SALVATORE BLACKWORK TATTO</span>
          </div>
          <div className="nav-right">
            <ul className="nav-links">
              {copy.nav.map((label, index) => (
                <li key={label}>
                  <a href={navHrefs[index]}>{label}</a>
                </li>
              ))}
            </ul>
            <LanguageSwitcher language={language} onChange={handleLanguageChange} />
          </div>
        </nav>
        <div id="fullscreen-content" ref={fullContentRef}>
          <div className="hero-top-title" ref={heroTopTitleRef}>SALVATORE BLACKWORK TATTO</div>
          <div className="hero-side hero-side-left">
            <div className="hero-side-title" ref={heroEpsRef} aria-label={copy.heroLeftTitle.join(" ")}>
              {copy.heroLeftTitle.join(" ")}
            </div>
            <p className="hero-side-desc" ref={heroLookRef}>{copy.heroLeftDescription}</p>
            <a className="hero-side-action" href="#studio-booking">{copy.heroLeftAction}</a>
          </div>
          <div className="hero-side hero-side-right">
            <div className="hero-side-title" ref={heroFutureRef} aria-label={copy.heroRightTitle.join(" ")}>
              {copy.heroRightTitle.join(" ")}
            </div>
            <p className="hero-side-desc" ref={heroFutureDescRef}>{copy.heroRightDescription}</p>
            <a className="hero-side-action" href="#studio-portfolio">{copy.heroRightAction}</a>
          </div>
          <div className="hero-image-keywords">{copy.mobileHeroStyles}</div>
        </div>

        <section className="product-video-section" aria-label="Salvatore Blackwork studio welcome">
          <h2
            className="featured-welcome-title"
            data-delay="0s"
            data-reveal-to="inset(0 0% 0 0)"
          >
            {copy.welcomeTitle}
          </h2>
          <div className="featured-label" data-delay="0s" data-reveal-to="inset(0 0% 0% 0)">
            {copy.featuredLabel}
          </div>
          <div className="featured-grid">
            <div className="featured-about-text">
              <p data-delay="0.2s">{copy.featuredParagraphs.join(" ")}</p>
            </div>
          </div>
        </section>
        <section className="archive-section">
          <header className="archive-header" aria-label={copy.cultureMarquee.join(" · ")}>
            <div className="archive-marquee-track">
              {[...copy.cultureMarquee, ...copy.cultureMarquee].map((label, i) => (
                <span
                  key={i}
                  className="archive-marquee-item"
                  aria-hidden={i >= 4}
                >
                  {label}
                  <img
                    src={marqueeStarImg}
                    alt=""
                    aria-hidden="true"
                    className="archive-marquee-sep"
                  />
                </span>
              ))}
            </div>
          </header>
          <div className="archive-grid">
            <div className="archive-col archive-col-1">
              <figure className="archive-item">
                <div className="archive-img" data-delay="0.5s">
                  <img src={tableImg} alt={copy.archiveWorks[0][1]} />
                </div>
                <figcaption className="archive-caption">
                  <span className="archive-caption-code">BW-01</span>
                  <span className="archive-caption-name">{copy.archiveWorks[0][0]}</span>
                </figcaption>
              </figure>
              <figure className="archive-item">
                <div className="archive-img" data-delay="0.5s">
                  <img src={shoesImg} alt={copy.archiveWorks[1][1]} />
                </div>
                <figcaption className="archive-caption">
                  <span className="archive-caption-code">BW-04</span>
                  <span className="archive-caption-name">{copy.archiveWorks[1][0]}</span>
                </figcaption>
              </figure>
            </div>
            <div className="archive-col archive-col-2">
              <figure className="archive-item">
                <div className="archive-img" data-delay="0.7s">
                  <img src={candleImg} alt={copy.archiveWorks[2][1]} />
                </div>
                <figcaption className="archive-caption">
                  <span className="archive-caption-code">BW-02</span>
                  <span className="archive-caption-name">{copy.archiveWorks[2][0]}</span>
                </figcaption>
              </figure>
              <figure className="archive-item">
                <div className="archive-img" data-delay="0.7s">
                  <img src={earringsImg} alt={copy.archiveWorks[3][1]} />
                </div>
                <figcaption className="archive-caption">
                  <span className="archive-caption-code">BW-05</span>
                  <span className="archive-caption-name">{copy.archiveWorks[3][0]}</span>
                </figcaption>
              </figure>
            </div>
            <div className="archive-col archive-col-3">
              <figure className="archive-item">
                <div className="archive-img" data-delay="0.9s">
                  <img src={airpodImg} alt={copy.archiveWorks[4][1]} />
                </div>
                <figcaption className="archive-caption">
                  <span className="archive-caption-code">BW-03</span>
                  <span className="archive-caption-name">{copy.archiveWorks[4][0]}</span>
                </figcaption>
              </figure>
              <figure className="archive-item">
                <div className="archive-img" data-delay="0.9s">
                  <img src={airpodMaxImg} alt={copy.archiveWorks[5][1]} />
                </div>
                <figcaption className="archive-caption">
                  <span className="archive-caption-code">BW-06</span>
                  <span className="archive-caption-name">{copy.archiveWorks[5][0]}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <StudioHomeSections language={language} />

        <footer className="site-footer" aria-label="Site footer">
          <div className="footer-top">
            <div className="footer-cta">
              <p className="footer-eyebrow">{copy.footerEyebrow}</p>
              <h2 className="footer-headline">
                {copy.footerHeadline[0]}<br />{copy.footerHeadline[1]} <em>{copy.footerHeadline[2]}</em>.
              </h2>
              <form
                className="footer-form"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter signup"
              >
                <input
                  type="email"
                  className="footer-input"
                  placeholder={copy.emailPlaceholder}
                  aria-label={language === "es" ? "Dirección de email" : "Email address"}
                />
                <button type="submit" className="footer-submit" aria-label={language === "es" ? "Suscribirse" : "Subscribe"}>
                  {copy.subscribe}
                </button>
              </form>
            </div>

            <nav className="footer-nav" aria-label="Footer navigation">
              {copy.footerColumns.map(([title, items]) => (
                <div className="footer-col" key={title}>
                  <h3 className="footer-col-title">{title}</h3>
                  <ul>
                    {items.map((item) => <li key={item}><a href="#">{item}</a></li>)}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div
            className="footer-wordmark"
            aria-hidden="true"
            data-delay="0.1s"
            data-duration="1.6s"
            data-reveal-property="background-position"
            data-reveal-to="0% 0%"
          >
            SALVATORE BLACKWORK TATTO
          </div>

          <div className="footer-bottom">
            <span>© 2026 SALVATORE BLACKWORK TATTO — {language === "es" ? "TODOS LOS DERECHOS RESERVADOS" : "ALL RIGHTS RESERVED"}</span>
            <span>{copy.footerTagline}</span>
            <span>{copy.footerAppointment}</span>
          </div>
        </footer>
      </div>

    </div>
  );
}
