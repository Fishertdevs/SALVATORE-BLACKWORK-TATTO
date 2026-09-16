import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import phoneImg from "@assets/Phone_1777633894261.png";
import shoesImg from "@assets/Shoes_1777633894262.png";
import tableImg from "@assets/Table_1777633894262.png";
import airpodMaxImg from "@assets/Airpod_max_1777633894262.png";
import airpodImg from "@assets/Airpod_1777633894263.png";
import candleImg from "@assets/candle_1777633894263.png";
import chairImg from "@assets/Chair_1777633894263.png";
import earringsImg from "@assets/Earrings_1777633894263.png";
import glasses2Img from "@assets/Glasses_2_1777634693808.png";
import nailImg from "@assets/Nail_1777634693809.png";
import glasses1Img from "@assets/Glasses_1_1777634693810.png";
import mainImg from "@assets/hero_new_image_1777693117619.png";
import marqueeStarImg from "@assets/Star1_1777711749898.png";

const productVideoMp4 = `${import.meta.env.BASE_URL}product-video.mp4`;
const productVideoWebm = `${import.meta.env.BASE_URL}product-video.webm`;

const ASCII_CHARS = "........:::=+xX#0369";
const FONT_SIZE = 14;
const ASPECT_W = 4;
const ASPECT_H = 5;
const ASCII_COLS = 25;
const IMAGE_STAGGER_MS = 70;
const CELL_APPEAR_MS = 2;
const SCRAMBLE_COUNT = 10;
const SCRAMBLE_SPEED_MS = 100;

const TOTAL_CARDS = 12;
const FEATURED_INDEX = 4;
const portraitImages = [
  phoneImg,
  shoesImg,
  tableImg,
  airpodMaxImg,
  airpodImg,
  candleImg,
  chairImg,
  earringsImg,
  glasses2Img,
  nailImg,
  glasses1Img,
];

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

function MobileLookGallery() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div style={{ width: "100%", backgroundColor: "#0a0a0a", color: "#ffffff", overflowX: "hidden" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px",
        background: "rgba(245,245,245,0.95)",
        backdropFilter: "blur(4px)",
      }}>
        <span style={{
          fontFamily: "'Beautique Display', 'Helvetica Neue', sans-serif",
          fontSize: 18, color: "#1a1a1a", letterSpacing: "0.04em", textTransform: "uppercase",
        }}>SALVATORE BLACKWORK TATTO</span>
        <button onClick={() => setMenuOpen(true)} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", gap: 5,
          padding: 8,
        }}>
          <span style={{ display: "block", width: 22, height: 1.5, backgroundColor: "#1a1a1a" }} />
          <span style={{ display: "block", width: 22, height: 1.5, backgroundColor: "#1a1a1a" }} />
        </button>
      </nav>
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, backgroundColor: "#ffffff",
          zIndex: 100, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 40,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position: "absolute", top: 20, right: 24,
            background: "none", border: "none",
            fontSize: 32, color: "#1a1a1a", cursor: "pointer", lineHeight: 1,
          }}>×</button>
          <span style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: 10, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#999",
          }}>BY APPOINTMENT</span>
          {[["+ PORTFOLIO", "#"], ["+ STUDIO", "#"], ["+ BOOKING", "#"]].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: "'Beautique Display', 'Helvetica Neue', sans-serif",
              fontSize: 32, fontWeight: 400, color: "#1a1a1a",
              textDecoration: "none", letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}>{label}</a>
          ))}
        </div>
      )}

      {/* HERO */}
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <img src={mainImg} alt="SALVATORE BLACKWORK TATTO" style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block"
        }} />
        <div style={{ position: "absolute", bottom: "15vh", left: 24, right: 24 }}>
          <p style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: 11, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#E63027", margin: "0 0 8px",
          }}>SALVATORE — BLACKWORK</p>
          <p style={{
            fontFamily: "'Beautique Display', serif",
            fontSize: "clamp(40px, 10vw, 72px)",
            fontWeight: 400, color: "#E63027",
            lineHeight: 1, margin: 0, textTransform: "uppercase",
          }}>BLACKWORK<br />TATTO</p>
        </div>
      </div>

      {/* FEATURED TEXT */}
      <div style={{ backgroundColor: "#ffffff", color: "#1a1a1a", padding: "48px 24px" }}>
        <p style={{
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 14, fontWeight: 300, lineHeight: 1.6, color: "#1a1a1a", margin: "0 0 16px",
        }}>
          SALVATORE BLACKWORK TATTO works where ink, shadow, and skin meet.
          Every tattoo is drawn with intention, built from bold contrast and finished
          with a precise, personal hand.
        </p>
        <p style={{
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 14, fontWeight: 300, lineHeight: 1.6, color: "#1a1a1a", margin: 0,
        }}>
          Custom blackwork for people who want their story to stay permanently visible.
        </p>
      </div>

      {/* PRODUCT VIDEO */}
      <div style={{ backgroundColor: "#ffffff", padding: "0 24px 48px" }}>
        <div style={{ width: "100%", aspectRatio: "3/4", overflow: "hidden" }}>
          <video autoPlay loop muted playsInline style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block"
          }}>
            <source src={productVideoWebm} type="video/webm" />
            <source src={productVideoMp4} type="video/mp4" />
          </video>
        </div>
        <h3 style={{
          fontFamily: "'Beautique Display', serif",
          fontSize: "clamp(24px, 6vw, 40px)",
          fontWeight: 400, color: "#000000",
          lineHeight: 1.1, textTransform: "uppercase",
          margin: "24px 0 0",
        }}>BLACKWORK PIECE 01 —<br />WHERE INK BECOMES ARCHITECTURE</h3>
      </div>

      {/* ARCHIVE — vertical single column */}
      <div style={{ backgroundColor: "#ffffff", padding: "0 24px 64px" }}>
        <p style={{
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 11, letterSpacing: "0.15em",
          textTransform: "uppercase", color: "#1a1a1a",
          borderTop: "1px solid #e0e0e0", paddingTop: 24, marginBottom: 32,
        }}>SALVATORE BLACKWORK TATTO — SELECTED WORKS — 2026</p>

        {[
          { img: tableImg, code: "BW-01", name: "BLACK FLAME" },
          { img: shoesImg, code: "BW-04", name: "NOCTURNAL FORM" },
          { img: candleImg, code: "BW-02", name: "THORN STUDY" },
          { img: earringsImg, code: "BW-05", name: "RITUAL MARK" },
          { img: airpodImg, code: "BW-03", name: "VOID SCRIPT" },
          { img: airpodMaxImg, code: "BW-06", name: "IRON VEIL" },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <div style={{ width: "100%", aspectRatio: "4/5", overflow: "hidden", marginBottom: 12 }}>
              <img src={item.img} alt={item.name} style={{
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
              }}>{item.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ backgroundColor: "#0a0a0a", color: "#ffffff", padding: "48px 24px 32px" }}>
        <p style={{
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 11, letterSpacing: "0.18em",
          textTransform: "uppercase", color: "#E63027", margin: "0 0 12px",
        }}>BLACKWORK JOURNAL — N° 01</p>
        <h2 style={{
          fontFamily: "'Beautique Display', serif",
          fontSize: "clamp(28px, 8vw, 48px)",
          fontWeight: 400, textTransform: "uppercase",
          color: "#ffffff", lineHeight: 1.05, margin: "0 0 32px",
        }}>MAKE YOUR MARK<br />IN THE <em style={{ color: "#E63027", fontStyle: "italic" }}>archive</em>.</h2>

        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.4)", marginBottom: 48 }}>
          <input type="email" placeholder="ENTER YOUR EMAIL" style={{
            flex: 1, background: "transparent", border: "none",
            color: "#ffffff", fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: 12, letterSpacing: "0.16em", padding: "12px 0", outline: "none",
          }} />
          <button style={{
            background: "transparent", border: "none", color: "#ffffff",
            fontSize: 14, cursor: "pointer", padding: "12px 0 12px 12px",
          }}>→</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 16px", marginBottom: 48 }}>
          {([
            ["+ STUDIO", ["About Salvatore", "Blackwork", "Process", "Aftercare"]],
            ["+ BOOKING", ["Consultation", "Availability", "Preparation", "FAQ"]],
            ["+ SUPPORT", ["Contact", "Care guide", "Policies", "FAQ"]],
            ["+ CONNECT", ["Instagram", "Are.na", "Tumblr", "Spotify"]],
          ] as [string, string[]][]).map(([title, items]) => (
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
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return <MobileLookGallery />;

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

  useEffect(() => {
    const root = fullSectionRef.current;
    const archiveImages = Array.from(
      document.querySelectorAll<HTMLElement>(".archive-section .archive-img"),
    );
    const featuredTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".product-video-section .featured-label, .product-video-section .featured-about-text p, .product-video-section .featured-headline",
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

    // Build cards
    for (let i = 0; i < TOTAL_CARDS; i++) {
      const div = document.createElement("div");
      if (i === FEATURED_INDEX) {
        div.className = "img featured";
        const img = document.createElement("img");
        img.id = "featured-img-el";
        img.src = mainImg;
        div.appendChild(img);
        featuredCard = div;
      } else {
        const seedIdx = i < FEATURED_INDEX ? i : i - 1;
        div.className = "img";
        const img = document.createElement("img");
        img.className = "ascii-reveal";
        img.src = portraitImages[seedIdx]!;
        div.appendChild(img);
      }
      gallery.appendChild(div);
    }

    featuredCardRef.current = featuredCard;

    // Run ASCII effect for portraits
    gallery.querySelectorAll<HTMLImageElement>("img.ascii-reveal").forEach((img, i) => {
      const canvas = document.createElement("canvas");
      img.closest(".img")!.appendChild(canvas);
      const delay = i * IMAGE_STAGGER_MS;
      const run = () => runEffect(img, canvas, delay);
      if (img.complete && img.naturalWidth) {
        run();
      } else {
        img.addEventListener("load", run);
      }
    });

    // Featured card ASCII effect — 16:9 grid, source covered (cropped) to fit
    const runEffectLeftCrop = (
      img: HTMLImageElement,
      canvas: HTMLCanvasElement,
      delay: number,
      onDone?: () => void,
    ) => {
      const cols = FEATURED_ASCII_COLS;
      const rows = FEATURED_ASCII_ROWS;
      const targetAspect = 16 / 9;
      const srcAspect = img.naturalWidth / img.naturalHeight;
      let cropW = img.naturalWidth;
      let cropH = img.naturalHeight;
      let cropX = 0;
      let cropY = 0;
      if (srcAspect > targetAspect) {
        cropW = img.naturalHeight * targetAspect;
        cropX = (img.naturalWidth - cropW) / 2;
      } else {
        cropH = img.naturalWidth / targetAspect;
        cropY = (img.naturalHeight - cropH) / 2;
      }

      const sc = document.createElement("canvas");
      sc.width = cols;
      sc.height = rows;
      const sctx = sc.getContext("2d")!;
      sctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cols, rows);
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
      prepareCanvas(canvas, cols, rows);
      animateCells(canvas, ag, bg, delay, cols, rows, onDone);
    };

    if (featuredCard) {
      const featuredImgEl = featuredCard.querySelector("img")!;
      const canvas = document.createElement("canvas");
      featuredCard.appendChild(canvas);
      const run = () =>
        runEffectLeftCrop(featuredImgEl, canvas, 500, () => {
          featuredCard!.classList.add("revealed");
          // Tự động expand sau 0.4s
          const t = window.setTimeout(() => {
            expandSection();
          }, 400);
          timeouts.push(t);
        });
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
      if (!fullSection || !fullContent || !featured) return;
      if (expandedRef.current) return;
      expandedRef.current = true;
      activeTimelineRef.current?.kill();

      const rect = featured.getBoundingClientRect();

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
        heroEpsRef.current,
        heroLookRef.current,
        heroFutureRef.current,
        heroFutureDescRef.current,
      ].filter((el): el is HTMLImageElement | HTMLParagraphElement => el !== null);
      gsap.set(heroOverlays, { clipPath: "inset(0 100% 0 0)" });

      const ZOOM_DURATION = 0.8;
      const tl = gsap
        .timeline({ defaults: { ease: "expo.inOut" } })
        .to(gallery, { opacity: 0.12, duration: 0.5 }, 0)
        .to(featured, { opacity: 0, duration: 0.2 }, 0)
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
        );
      activeTimelineRef.current = tl;
      if (navbar) {
        tl.to(
          navbar,
          { y: "0%", autoAlpha: 1, duration: 0.55, ease: "expo.out" },
          ZOOM_DURATION - 0.3,
        );
      }
      const REVEAL_DURATION = 0.85;
      const REVEAL_EASE = "power3.out";
      const REVEAL_FROM = { clipPath: "inset(0px 100% 0px 0px)" };
      const REVEAL_TO = {
        clipPath: "inset(0px 0% 0px 0px)",
        duration: REVEAL_DURATION,
        ease: REVEAL_EASE,
      };
      if (heroEpsRef.current) {
        tl.fromTo(heroEpsRef.current, REVEAL_FROM, REVEAL_TO, ZOOM_DURATION + 0.5);
      }
      if (heroLookRef.current) {
        tl.fromTo(heroLookRef.current, REVEAL_FROM, REVEAL_TO, ZOOM_DURATION + 0.7);
      }
      if (heroFutureRef.current) {
        tl.fromTo(heroFutureRef.current, REVEAL_FROM, REVEAL_TO, ZOOM_DURATION + 0.9);
      }
      if (heroFutureDescRef.current) {
        tl.fromTo(heroFutureDescRef.current, REVEAL_FROM, REVEAL_TO, ZOOM_DURATION + 1.1);
      }
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

  return (
    <div className="look-root">
      <div id="gallery-layer" ref={galleryRef} />

      <div id="fullscreen-section" ref={fullSectionRef}>
        <img id="fullscreen-img" src={mainImg} alt="" />
        <nav id="hero-navbar" ref={navbarRef}>
          <div className="nav-left">
            <span className="nav-logo">SALVATORE BLACKWORK TATTO</span>
            <span>BY APPOINTMENT</span>
          </div>
          <div className="nav-right">
            <ul className="nav-links">
              <li>
                <span className="nav-plus">+</span>
                <span>PORTFOLIO</span>
              </li>
              <li>
                <span className="nav-plus">+</span>
                <span>STUDIO</span>
              </li>
              <li>
                <span className="nav-plus">+</span>
                <span>BOOKING</span>
              </li>
            </ul>
            <span className="nav-menu">MENU</span>
            <button className="nav-burger" aria-label="Open menu">
              <span />
              <span />
            </button>
          </div>
        </nav>
        <div id="fullscreen-content" ref={fullContentRef}>
          <div className="hero-left">
            <div className="hero-eps" ref={heroEpsRef} aria-label="Salvatore Blackwork">
              SALVATORE — BLACKWORK
            </div>
            <div className="hero-look" ref={heroLookRef} aria-label="Blackwork Tatto">
              BLACKWORK<br />TATTO
            </div>
          </div>
          <div className="hero-future-wrap">
            <div className="hero-future" ref={heroFutureRef} aria-label="Ink is architecture">
              INK IS<br />ARCHITECTURE
            </div>
            <p className="hero-future-desc" ref={heroFutureDescRef}>
              Blackwork tattoos built from deep contrast, deliberate linework,
              and a point of view that belongs only to you.
            </p>
          </div>
        </div>

        <section className="product-video-section" aria-label="Salvatore Blackwork featured tattoo">
          <div className="featured-label" data-delay="0s" data-reveal-to="inset(0 0% 0% 0)">
            SALVATORE BLACKWORK TATTO / FEATURED WORK
          </div>
          <div className="featured-grid">
            <div className="featured-col-left" aria-hidden="true" />
            <div className="featured-about-text">
              <p data-delay="0.2s">
                SALVATORE BLACKWORK TATTO operates at the intersection of ink,
                anatomy, and visual language. Each piece is composed to move with
                the body and hold its meaning for a lifetime.
              </p>
              <p data-delay="0.35s">
                The studio is driven by one idea: a tattoo should feel inevitable on
                the skin. From first sketch to final needle pass, every line serves
                the person wearing it.
              </p>
            </div>
          </div>
          <div className="product-video-wrap">
            <video
              className="product-video"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src={productVideoWebm} type="video/webm" />
              <source src={productVideoMp4} type="video/mp4" />
            </video>
          </div>
          <h3 className="featured-headline" data-delay="0s" data-reveal-to="inset(0 0% 0% 0)">BLACKWORK PIECE 01 — WHERE INK BECOMES ARCHITECTURE</h3>
        </section>
        <section className="archive-section">
          <header className="archive-header" aria-label="Salvatore Blackwork Tatto — selected works — 2026">
            <div className="archive-marquee-track">
              {[
                "SALVATORE BLACKWORK TATTO",
                "SELECTED WORKS 2026",
                "BY APPOINTMENT",
                "SALVATORE BLACKWORK TATTO",
                "SALVATORE BLACKWORK TATTO",
                "SELECTED WORKS 2026",
                "BY APPOINTMENT",
                "SALVATORE BLACKWORK TATTO",
              ].map((label, i) => (
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
                  <img src={tableImg} alt="Chrome table" />
                </div>
                <figcaption className="archive-caption">
                  <span className="archive-caption-code">BW-01</span>
                  <span className="archive-caption-name">BLACK FLAME</span>
                </figcaption>
              </figure>
              <figure className="archive-item">
                <div className="archive-img" data-delay="0.5s">
                  <img src={shoesImg} alt="Chrome heels" />
                </div>
                <figcaption className="archive-caption">
                  <span className="archive-caption-code">BW-04</span>
                  <span className="archive-caption-name">NOCTURNAL FORM</span>
                </figcaption>
              </figure>
            </div>
            <div className="archive-col archive-col-2">
              <figure className="archive-item">
                <div className="archive-img" data-delay="0.7s">
                  <img src={candleImg} alt="Chrome candle holder" />
                </div>
                <figcaption className="archive-caption">
                  <span className="archive-caption-code">BW-02</span>
                  <span className="archive-caption-name">THORN STUDY</span>
                </figcaption>
              </figure>
              <figure className="archive-item">
                <div className="archive-img" data-delay="0.7s">
                  <img src={earringsImg} alt="Sculptural ear cuff" />
                </div>
                <figcaption className="archive-caption">
                  <span className="archive-caption-code">BW-05</span>
                  <span className="archive-caption-name">RITUAL MARK</span>
                </figcaption>
              </figure>
            </div>
            <div className="archive-col archive-col-3">
              <figure className="archive-item">
                <div className="archive-img" data-delay="0.9s">
                  <img src={airpodImg} alt="Translucent case" />
                </div>
                <figcaption className="archive-caption">
                  <span className="archive-caption-code">BW-03</span>
                  <span className="archive-caption-name">VOID SCRIPT</span>
                </figcaption>
              </figure>
              <figure className="archive-item">
                <div className="archive-img" data-delay="0.9s">
                  <img src={airpodMaxImg} alt="Sculptural headphones" />
                </div>
                <figcaption className="archive-caption">
                  <span className="archive-caption-code">BW-06</span>
                  <span className="archive-caption-name">IRON VEIL</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <footer className="site-footer" aria-label="Site footer">
          <div className="footer-top">
            <div className="footer-cta">
              <p className="footer-eyebrow">NEWSLETTER — N° 01</p>
              <h2 className="footer-headline">
                BECOME PART<br />OF THE <em>archive</em>.
              </h2>
              <form
                className="footer-form"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter signup"
              >
                <input
                  type="email"
                  className="footer-input"
                  placeholder="ENTER YOUR EMAIL"
                  aria-label="Email address"
                />
                <button type="submit" className="footer-submit" aria-label="Subscribe">
                  SUBSCRIBE →
                </button>
              </form>
            </div>

            <nav className="footer-nav" aria-label="Footer navigation">
              <div className="footer-col">
                <h3 className="footer-col-title">+ STUDIO</h3>
                <ul>
                  <li><a href="#">About Salvatore</a></li>
                  <li><a href="#">Blackwork</a></li>
                  <li><a href="#">Process</a></li>
                  <li><a href="#">Aftercare</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h3 className="footer-col-title">+ BOOKING</h3>
                <ul>
                  <li><a href="#">Consultation</a></li>
                  <li><a href="#">Availability</a></li>
                  <li><a href="#">Preparation</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h3 className="footer-col-title">+ SUPPORT</h3>
                <ul>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Care guide</a></li>
                  <li><a href="#">Policies</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h3 className="footer-col-title">+ CONNECT</h3>
                <ul>
                  <li><a href="#">Instagram</a></li>
                  <li><a href="#">Are.na</a></li>
                  <li><a href="#">Tumblr</a></li>
                  <li><a href="#">Spotify</a></li>
                </ul>
              </div>
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
            <span>© 2026 SALVATORE BLACKWORK TATTO — ALL RIGHTS RESERVED</span>
            <span>BLACKWORK TATTO / INK IS ARCHITECTURE</span>
            <span>BY APPOINTMENT</span>
          </div>
        </footer>
      </div>

    </div>
  );
}
