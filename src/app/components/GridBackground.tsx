"use client";

import { useRef, useEffect } from "react";

const GRID_SIZE = 56;
const BASE_ALPHA = 0.035;
const WAVE_PEAK_ALPHA = 0.42;
const WAVE_SPEED = 160;
const WAVE_WIDTH = 90;
const WAVE_DECAY = 5.5;
const WAVE_SPAWN_MIN = 3.2;
const WAVE_SPAWN_MAX = 5.5;
const ALPHA_BUCKETS = 14;
const DOT_BUCKETS = 10;
const DOT_RADIUS = 1.1;

interface Wave {
  cx: number;
  cy: number;
  t0: number;
}

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    const waves: Wave[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = performance.now();
    let nextSpawn = reduced ? Infinity : 1.2;

    const spawnWave = (t: number) => {
      const cols = Math.ceil(width / GRID_SIZE);
      const rows = Math.ceil(height / GRID_SIZE);
      const cx = Math.floor(Math.random() * (cols + 1)) * GRID_SIZE;
      const cy = Math.floor(Math.random() * (rows + 1)) * GRID_SIZE;
      waves.push({ cx, cy, t0: t });
      nextSpawn =
        t + WAVE_SPAWN_MIN + Math.random() * (WAVE_SPAWN_MAX - WAVE_SPAWN_MIN);
    };

    const waveBoost = (mx: number, my: number, t: number): number => {
      let extra = 0;
      for (const w of waves) {
        const age = t - w.t0;
        const radius = age * WAVE_SPEED;
        const dx = mx - w.cx;
        const dy = my - w.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const delta = dist - radius;
        const ring = Math.exp(-(delta * delta) / (WAVE_WIDTH * WAVE_WIDTH));
        const fade = Math.max(0, 1 - age / WAVE_DECAY);
        extra += ring * fade * fade;
      }
      return extra;
    };

    let frameId = 0;

    const draw = (tMs: number) => {
      frameId = requestAnimationFrame(draw);
      const t = (tMs - start) / 1000;

      if (t >= nextSpawn) spawnWave(t);
      for (let i = waves.length - 1; i >= 0; i--) {
        if (t - waves[i].t0 > WAVE_DECAY) waves.splice(i, 1);
      }

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / GRID_SIZE) + 1;
      const rows = Math.ceil(height / GRID_SIZE) + 1;

      // Bucket line segments by alpha to batch strokes
      const lineBuckets: { x0: number; y0: number; x1: number; y1: number }[][] =
        Array.from({ length: ALPHA_BUCKETS }, () => []);
      const dotBuckets: { x: number; y: number }[][] = Array.from(
        { length: DOT_BUCKETS },
        () => []
      );

      const pushSegment = (x0: number, y0: number, x1: number, y1: number) => {
        const mx = (x0 + x1) * 0.5;
        const my = (y0 + y1) * 0.5;
        const boost = waveBoost(mx, my, t);
        const alpha = Math.min(BASE_ALPHA + boost * WAVE_PEAK_ALPHA, 0.55);
        const bucket = Math.min(
          ALPHA_BUCKETS - 1,
          Math.floor((alpha / 0.55) * (ALPHA_BUCKETS - 1))
        );
        lineBuckets[bucket].push({ x0, y0, x1, y1 });
      };

      for (let r = 0; r <= rows; r++) {
        const y = r * GRID_SIZE;
        for (let c = 0; c < cols; c++) {
          const x0 = c * GRID_SIZE;
          pushSegment(x0, y, x0 + GRID_SIZE, y);
        }
      }
      for (let c = 0; c <= cols; c++) {
        const x = c * GRID_SIZE;
        for (let r = 0; r < rows; r++) {
          const y0 = r * GRID_SIZE;
          pushSegment(x, y0, x, y0 + GRID_SIZE);
        }
      }

      // Intersection dots — brighter where waves pass
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = c * GRID_SIZE;
          const y = r * GRID_SIZE;
          const boost = waveBoost(x, y, t);
          if (boost < 0.05) continue;
          const alpha = Math.min(boost * 0.85, 0.85);
          const bucket = Math.min(
            DOT_BUCKETS - 1,
            Math.floor((alpha / 0.85) * (DOT_BUCKETS - 1))
          );
          dotBuckets[bucket].push({ x, y });
        }
      }

      ctx.lineWidth = 1;
      for (let b = 0; b < ALPHA_BUCKETS; b++) {
        const segs = lineBuckets[b];
        if (!segs.length) continue;
        const alpha = ((b + 0.5) / ALPHA_BUCKETS) * 0.55;
        ctx.strokeStyle = `rgba(74, 222, 128, ${alpha})`;
        ctx.beginPath();
        for (const s of segs) {
          ctx.moveTo(s.x0, s.y0);
          ctx.lineTo(s.x1, s.y1);
        }
        ctx.stroke();
      }

      for (let b = 0; b < DOT_BUCKETS; b++) {
        const dots = dotBuckets[b];
        if (!dots.length) continue;
        const alpha = ((b + 0.5) / DOT_BUCKETS) * 0.85;
        ctx.fillStyle = `rgba(74, 222, 128, ${alpha})`;
        ctx.beginPath();
        for (const d of dots) {
          ctx.moveTo(d.x + DOT_RADIUS, d.y);
          ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    };

    frameId = requestAnimationFrame(draw);

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
