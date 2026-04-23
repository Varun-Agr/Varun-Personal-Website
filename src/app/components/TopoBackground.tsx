"use client";

import { useRef, useEffect } from "react";

const STEP = 28;
const LEVELS: readonly number[] = [-1.5, -0.9, -0.3, 0.3, 0.9, 1.5];
const ACCENT_RGB = "74, 222, 128";

function field(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.012 + t * 0.25) +
    Math.cos(y * 0.014 - t * 0.22) +
    Math.sin((x + y) * 0.008 + t * 0.15) +
    Math.cos((x - y) * 0.01 - t * 0.18)
  );
}

function alphaForLevel(i: number): number {
  return 0.12 + (0.06 * Math.abs(i - 3)) / 6 + 0.06;
}

export default function TopoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let samples = new Float32Array(0);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / STEP) + 1;
      rows = Math.ceil(height / STEP) + 1;
      samples = new Float32Array(cols * rows);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const sampleField = (t: number) => {
      for (let r = 0; r < rows; r++) {
        const baseY = r * STEP;
        const rowOff = r * cols;
        for (let c = 0; c < cols; c++) {
          samples[rowOff + c] = field(c * STEP, baseY, t);
        }
      }
    };

    const draw = (t: number) => {
      sampleField(t);
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      for (let li = 0; li < LEVELS.length; li++) {
        const level = LEVELS[li];
        ctx.strokeStyle = `rgba(${ACCENT_RGB}, ${alphaForLevel(li)})`;
        ctx.beginPath();

        for (let r = 0; r < rows - 1; r++) {
          const topOff = r * cols;
          const botOff = topOff + cols;
          const y = r * STEP;
          for (let c = 0; c < cols - 1; c++) {
            const tl = samples[topOff + c];
            const tr = samples[topOff + c + 1];
            const br = samples[botOff + c + 1];
            const bl = samples[botOff + c];

            let mask = 0;
            if (tl > level) mask |= 8;
            if (tr > level) mask |= 4;
            if (br > level) mask |= 2;
            if (bl > level) mask |= 1;
            if (mask === 0 || mask === 15) continue;

            const x = c * STEP;
            const pTopX = x + ((level - tl) / (tr - tl)) * STEP;
            const pRightY = y + ((level - tr) / (br - tr)) * STEP;
            const pBottomX = x + ((level - bl) / (br - bl)) * STEP;
            const pLeftY = y + ((level - tl) / (bl - tl)) * STEP;
            const xRight = x + STEP;
            const yBottom = y + STEP;

            switch (mask) {
              case 1:
              case 14:
                ctx.moveTo(x, pLeftY);
                ctx.lineTo(pBottomX, yBottom);
                break;
              case 2:
              case 13:
                ctx.moveTo(pBottomX, yBottom);
                ctx.lineTo(xRight, pRightY);
                break;
              case 3:
              case 12:
                ctx.moveTo(x, pLeftY);
                ctx.lineTo(xRight, pRightY);
                break;
              case 4:
              case 11:
                ctx.moveTo(pTopX, y);
                ctx.lineTo(xRight, pRightY);
                break;
              case 5:
                ctx.moveTo(x, pLeftY);
                ctx.lineTo(pTopX, y);
                ctx.moveTo(pBottomX, yBottom);
                ctx.lineTo(xRight, pRightY);
                break;
              case 10:
                ctx.moveTo(x, pLeftY);
                ctx.lineTo(pBottomX, yBottom);
                ctx.moveTo(pTopX, y);
                ctx.lineTo(xRight, pRightY);
                break;
              case 6:
              case 9:
                ctx.moveTo(pTopX, y);
                ctx.lineTo(pBottomX, yBottom);
                break;
              case 7:
              case 8:
                ctx.moveTo(x, pLeftY);
                ctx.lineTo(pTopX, y);
                break;
            }
          }
        }
        ctx.stroke();
      }
    };

    let frameId = 0;
    const start = performance.now();

    const frame = (tMs: number) => {
      frameId = requestAnimationFrame(frame);
      draw((tMs - start) / 1000);
    };

    if (reduced) {
      draw(0);
    } else {
      frameId = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
