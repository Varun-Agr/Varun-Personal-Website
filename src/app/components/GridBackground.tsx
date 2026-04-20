"use client";

import { useRef, useEffect } from "react";

const GRID_SIZE = 56;
const BASE_ALPHA = 0.035;
const WAVE_PEAK_ALPHA = 0.42;
const WAVE_WIDTH = 110;
const SWEEP_DURATION = 5.0;
const WAVE_GAP = 2.0;
const TILT_DEG = 20;
const ALPHA_BUCKETS = 14;
const DOT_BUCKETS = 10;
const DOT_RADIUS = 1.1;
const MAX_ALPHA = 0.55;
const MAX_DOT_ALPHA = 0.85;

// Wavefront is tilted TILT_DEG° off vertical; its propagation normal
// therefore points mostly in +x with a small +y component.
const TILT_RAD = (TILT_DEG * Math.PI) / 180;
const NX = Math.cos(TILT_RAD);
const NY = Math.sin(TILT_RAD);

interface Wave {
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
    let nextSpawn = reduced ? Infinity : 0.6;

    const spawnWave = (t: number) => {
      waves.push({ t0: t });
      nextSpawn = t + SWEEP_DURATION + WAVE_GAP;
    };

    const waveBoost = (x: number, y: number, t: number): number => {
      // Wavefront travels from s = -WAVE_WIDTH to s = sMax + WAVE_WIDTH over SWEEP_DURATION.
      // sMax corresponds to the far corner along the propagation axis.
      const sMax = NX * width + NY * height;
      const travel = sMax + 2 * WAVE_WIDTH;
      const s = NX * x + NY * y;
      let extra = 0;
      for (const w of waves) {
        const age = t - w.t0;
        if (age < 0) continue;
        const progress = age / SWEEP_DURATION;
        if (progress > 1.25) continue;
        const frontPos = -WAVE_WIDTH + progress * travel;
        const delta = s - frontPos;
        const ring = Math.exp(-(delta * delta) / (WAVE_WIDTH * WAVE_WIDTH));
        let fade = 1;
        if (progress < 0.06) fade = progress / 0.06;
        else if (progress > 1.0) fade = Math.max(0, 1 - (progress - 1.0) / 0.25);
        extra += ring * fade;
      }
      return extra;
    };

    let frameId = 0;

    const draw = (tMs: number) => {
      frameId = requestAnimationFrame(draw);
      const t = (tMs - start) / 1000;

      if (t >= nextSpawn) spawnWave(t);
      for (let i = waves.length - 1; i >= 0; i--) {
        if (t - waves[i].t0 > SWEEP_DURATION + 0.4) waves.splice(i, 1);
      }

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / GRID_SIZE) + 1;
      const rows = Math.ceil(height / GRID_SIZE) + 1;

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
        const alpha = Math.min(BASE_ALPHA + boost * WAVE_PEAK_ALPHA, MAX_ALPHA);
        const bucket = Math.min(
          ALPHA_BUCKETS - 1,
          Math.floor((alpha / MAX_ALPHA) * (ALPHA_BUCKETS - 1))
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

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = c * GRID_SIZE;
          const y = r * GRID_SIZE;
          const boost = waveBoost(x, y, t);
          if (boost < 0.05) continue;
          const alpha = Math.min(boost * MAX_DOT_ALPHA, MAX_DOT_ALPHA);
          const bucket = Math.min(
            DOT_BUCKETS - 1,
            Math.floor((alpha / MAX_DOT_ALPHA) * (DOT_BUCKETS - 1))
          );
          dotBuckets[bucket].push({ x, y });
        }
      }

      ctx.lineWidth = 1;
      for (let b = 0; b < ALPHA_BUCKETS; b++) {
        const segs = lineBuckets[b];
        if (!segs.length) continue;
        const alpha = ((b + 0.5) / ALPHA_BUCKETS) * MAX_ALPHA;
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
        const alpha = ((b + 0.5) / DOT_BUCKETS) * MAX_DOT_ALPHA;
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
