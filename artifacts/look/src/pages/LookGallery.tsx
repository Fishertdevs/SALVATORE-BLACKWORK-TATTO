import { useEffect, useRef } from "react";
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
import mainImg from "@assets/Main_1777634895154.png";

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

export default function LookGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const fullSectionRef = useRef<HTMLDivElement>(null);
  const fullContentRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);
  const featuredCardRef = useRef<HTMLDivElement | null>(null);
  const expandedRef = useRef(false);

  useEffect(() => {
    const measureCtx = document.createElement("canvas").getContext("2d")!;
    measureCtx.font = `${FONT_SIZE}px monospace`;
    const charWidth = Math.ceil(measureCtx.measureText("M").width);
    const charHeight = FONT_SIZE;
    const ASCII_ROWS = Math.round(
      ASCII_COLS * (ASPECT_H / ASPECT_W) * (charWidth / charHeight),
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

    // Featured card ASCII effect — uses LEFT crop of 16:9 source
    const runEffectLeftCrop = (
      img: HTMLImageElement,
      canvas: HTMLCanvasElement,
      delay: number,
      onDone?: () => void,
    ) => {
      const targetAspect = ASPECT_W / ASPECT_H;
      const cropW = img.naturalHeight * targetAspect;
      const cropX = 0;
      const cropY = 0;
      const cropH = img.naturalHeight;

      const sc = document.createElement("canvas");
      sc.width = ASCII_COLS;
      sc.height = ASCII_ROWS;
      const sctx = sc.getContext("2d")!;
      sctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, ASCII_COLS, ASCII_ROWS);
      const { data } = sctx.getImageData(0, 0, ASCII_COLS, ASCII_ROWS);

      const ag: string[][] = [];
      const bg: number[][] = [];
      for (let r = 0; r < ASCII_ROWS; r++) {
        const ar: string[] = [];
        const br: number[] = [];
        for (let c = 0; c < ASCII_COLS; c++) {
          const pi = (r * ASCII_COLS + c) * 4;
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
      prepareCanvas(canvas, ASCII_COLS, ASCII_ROWS);
      animateCells(canvas, ag, bg, delay, ASCII_COLS, ASCII_ROWS, onDone);
    };

    if (featuredCard) {
      const featuredImgEl = featuredCard.querySelector("img")!;
      const canvas = document.createElement("canvas");
      featuredCard.appendChild(canvas);
      const run = () =>
        runEffectLeftCrop(featuredImgEl, canvas, 500, () => {
          featuredCard!.classList.add("revealed");
        });
      if (featuredImgEl.complete && featuredImgEl.naturalWidth) {
        run();
      } else {
        featuredImgEl.addEventListener("load", run);
      }
    }

    // Click handler for featured card
    const handleFeaturedClick = () => expandSection();

    if (featuredCard) {
      featuredCard.addEventListener("click", handleFeaturedClick);
      cleanups.push(() => featuredCard!.removeEventListener("click", handleFeaturedClick));
    }

    function expandSection() {
      const fullSection = fullSectionRef.current;
      const fullContent = fullContentRef.current;
      const backBtn = backBtnRef.current;
      const featured = featuredCardRef.current;
      if (!fullSection || !fullContent || !backBtn || !featured) return;
      if (expandedRef.current) return;
      expandedRef.current = true;

      const rect = featured.getBoundingClientRect();
      const fullImg = fullSection.querySelector<HTMLImageElement>("#fullscreen-img");

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
      if (fullImg) gsap.set(fullImg, { objectPosition: "left center" });
      gsap.set(fullContent, { opacity: 0, y: 24 });
      gsap.set(backBtn, { opacity: 0, pointerEvents: "none" });

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
            duration: 0.8,
          },
          0,
        );
      if (fullImg) {
        tl.to(
          fullImg,
          { objectPosition: "center center", duration: 0.8, ease: "expo.inOut" },
          0,
        );
      }
      tl.to(
        fullContent,
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        "-=0.2",
      ).to(
        backBtn,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          onStart: () => {
            backBtn.style.pointerEvents = "all";
          },
        },
        "-=0.15",
      );
    }

    function collapseSection() {
      const fullSection = fullSectionRef.current;
      const fullContent = fullContentRef.current;
      const backBtn = backBtnRef.current;
      const featured = featuredCardRef.current;
      if (!fullSection || !fullContent || !backBtn || !featured) return;
      if (!expandedRef.current) return;

      const rect = featured.getBoundingClientRect();
      const fullImg = fullSection.querySelector<HTMLImageElement>("#fullscreen-img");

      const tl = gsap
        .timeline({
          defaults: { ease: "expo.inOut" },
          onComplete: () => {
            expandedRef.current = false;
            gsap.set(fullSection, {
              opacity: 0,
              pointerEvents: "none",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              borderRadius: "0px",
            });
          },
        })
        .to(backBtn, {
          opacity: 0,
          duration: 0.18,
          ease: "power2.in",
          onStart: () => {
            backBtn.style.pointerEvents = "none";
          },
        })
        .to(fullContent, { opacity: 0, y: 16, duration: 0.22, ease: "power2.in" }, "<")
        .to(
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
        );
      if (fullImg) {
        tl.to(fullImg, { objectPosition: "left center", duration: 0.72 }, "<");
      }
      tl.to(fullSection, { opacity: 0, duration: 0.2 }, "-=0.15")
        .to(gallery, { opacity: 1, duration: 0.35 }, "-=0.2")
        .to(featured, { opacity: 1, duration: 0.25 }, "-=0.2");
    }

    const handleBack = () => collapseSection();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") collapseSection();
    };
    backBtnRef.current?.addEventListener("click", handleBack);
    document.addEventListener("keydown", handleKey);
    cleanups.push(() => backBtnRef.current?.removeEventListener("click", handleBack));
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
        <div id="fullscreen-content" ref={fullContentRef}>
          <h2>Look Into The Future</h2>
          <p>SS 2025 — Eyewear &amp; Apparel Collection</p>
          <button id="fullscreen-cta">Explore Collection →</button>
        </div>
      </div>

      <button id="back-btn" ref={backBtnRef}>
        ← Back
      </button>
    </div>
  );
}
