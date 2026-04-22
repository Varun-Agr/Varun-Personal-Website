"use client";

import { useRef, useEffect } from "react";
import { C } from "../theme";

const COL_WIDTH = 180;
const ROW_HEIGHT = 160;
const NODE_JITTER = 9;
const MIN_COLS = 5;
const MIN_ROWS = 3;

const EDGE_ALPHA = 0.08;
const NODE_IDLE_ALPHA = 0.18;
const NODE_ACTIVE_ALPHA = 0.88;
const NODE_IDLE_RADIUS = 2;
const NODE_ACTIVE_RADIUS = 4;
const RING_INNER = 6;
const RING_OUTER = 26;
const RING_ALPHA_SCALE = 0.3;
const GLOW_DECAY = 0.94;

const PACKET_CORE_RADIUS = 2.2;
const PACKET_CORE_ALPHA = 0.95;
const PACKET_HALO_RADIUS = 6;
const PACKET_HALO_ALPHA = 0.25;

// Speed tuning: baseline 0.45 + rand*0.35 scaled by 0.6 -> 0.27..0.48 edge-units/sec.
const PACKET_SPEED_BASE = 0.45 * 0.6;
const PACKET_SPEED_JITTER = 0.35 * 0.6;
// Spawn cadence: one packet every 0.35 / 0.6 s from a random left-column node.
const PACKET_SPAWN_INTERVAL = 0.35 / 0.6;

interface GraphNode {
  x: number;
  y: number;
  col: number;
  row: number;
  glow: number;
  outgoing: number[];
}

interface Edge {
  from: number;
  to: number;
  cp1x: number;
  cp1y: number;
  cp2x: number;
  cp2y: number;
}

interface Packet {
  edge: Edge | null;
  progress: number;
  speed: number;
  nodeIdx: number;
}

const accentChannels = hexToRgb(C.accent);

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgba(a: number): string {
  const [r, g, b] = accentChannels;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function bezierPoint(
  t: number,
  ax: number,
  ay: number,
  e: Edge,
  bx: number,
  by: number,
): [number, number] {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  const x =
    mt2 * mt * ax + 3 * mt2 * t * e.cp1x + 3 * mt * t2 * e.cp2x + t2 * t * bx;
  const y =
    mt2 * mt * ay + 3 * mt2 * t * e.cp1y + 3 * mt * t2 * e.cp2y + t2 * t * by;
  return [x, y];
}

export default function PipelinesBackground() {
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
    let nodes: GraphNode[] = [];
    let edges: Edge[] = [];
    const packets: Packet[] = [];
    let leftColumn: number[] = [];
    let spawnAccumulator = 0;
    let lastBuildWidth = -1;

    const buildGraph = () => {
      cols = Math.max(MIN_COLS, Math.floor(width / COL_WIDTH));
      const rows = Math.max(MIN_ROWS, Math.floor(height / ROW_HEIGHT));
      nodes = [];
      edges = [];
      packets.length = 0;
      leftColumn = [];

      const xStep = cols > 1 ? width / (cols - 1) : width;
      const yStep = rows > 1 ? height / (rows - 1) : height;

      const indexOf = (c: number, r: number) => c * rows + r;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const baseX = c * xStep;
          const baseY = r * yStep;
          const jx = (Math.random() * 2 - 1) * NODE_JITTER;
          const jy = (Math.random() * 2 - 1) * NODE_JITTER;
          nodes.push({
            x: baseX + jx,
            y: baseY + jy,
            col: c,
            row: r,
            glow: 0,
            outgoing: [],
          });
          if (c === 0) leftColumn.push(indexOf(c, r));
        }
      }

      for (let c = 0; c < cols - 1; c++) {
        for (let r = 0; r < rows; r++) {
          const fromIdx = indexOf(c, r);
          const from = nodes[fromIdx];
          for (let dr = -1; dr <= 1; dr++) {
            const nr = r + dr;
            if (nr < 0 || nr >= rows) continue;
            const toIdx = indexOf(c + 1, nr);
            const to = nodes[toIdx];
            const dx = to.x - from.x;
            const edge: Edge = {
              from: fromIdx,
              to: toIdx,
              cp1x: from.x + dx * 0.45,
              cp1y: from.y,
              cp2x: to.x - dx * 0.45,
              cp2y: to.y,
            };
            edges.push(edge);
            from.outgoing.push(edges.length - 1);
          }
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (width !== lastBuildWidth) {
        buildGraph();
        lastBuildWidth = width;
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawnPacket = (fromNodeIdx?: number) => {
      if (!leftColumn.length || !edges.length) return;
      const startIdx =
        fromNodeIdx ??
        leftColumn[Math.floor(Math.random() * leftColumn.length)];
      const start = nodes[startIdx];
      if (!start.outgoing.length) return;
      const edgeIdx =
        start.outgoing[Math.floor(Math.random() * start.outgoing.length)];
      packets.push({
        edge: edges[edgeIdx],
        progress: 0,
        speed: PACKET_SPEED_BASE + Math.random() * PACKET_SPEED_JITTER,
        nodeIdx: startIdx,
      });
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = rgba(EDGE_ALPHA);
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const e of edges) {
        const from = nodes[e.from];
        const to = nodes[e.to];
        ctx.moveTo(from.x, from.y);
        ctx.bezierCurveTo(e.cp1x, e.cp1y, e.cp2x, e.cp2y, to.x, to.y);
      }
      ctx.stroke();

      ctx.fillStyle = rgba(NODE_IDLE_ALPHA);
      ctx.beginPath();
      for (const n of nodes) {
        ctx.moveTo(n.x + NODE_IDLE_RADIUS, n.y);
        ctx.arc(n.x, n.y, NODE_IDLE_RADIUS, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    let frameId = 0;
    let lastT = performance.now();

    const frame = (tMs: number) => {
      frameId = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (tMs - lastT) / 1000);
      lastT = tMs;

      spawnAccumulator += dt;
      while (spawnAccumulator >= PACKET_SPAWN_INTERVAL) {
        spawnAccumulator -= PACKET_SPAWN_INTERVAL;
        spawnPacket();
      }

      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        if (!p.edge) {
          packets.splice(i, 1);
          continue;
        }
        p.progress += p.speed * dt;
        while (p.progress >= 1) {
          const currentEdge: Edge | null = p.edge;
          if (!currentEdge) break;
          const arrived: GraphNode = nodes[currentEdge.to];
          arrived.glow = 1;
          p.nodeIdx = currentEdge.to;
          if (arrived.col >= cols - 1 || !arrived.outgoing.length) {
            p.edge = null;
            break;
          }
          const nextEdgeIdx =
            arrived.outgoing[
              Math.floor(Math.random() * arrived.outgoing.length)
            ];
          p.edge = edges[nextEdgeIdx];
          p.progress -= 1;
        }
      }

      for (const n of nodes) {
        if (n.glow > 0) {
          n.glow *= GLOW_DECAY;
          if (n.glow < 0.01) n.glow = 0;
        }
      }

      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = rgba(EDGE_ALPHA);
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const e of edges) {
        const from = nodes[e.from];
        const to = nodes[e.to];
        ctx.moveTo(from.x, from.y);
        ctx.bezierCurveTo(e.cp1x, e.cp1y, e.cp2x, e.cp2y, to.x, to.y);
      }
      ctx.stroke();

      for (const n of nodes) {
        if (n.glow <= 0) continue;
        const ringRadius = RING_INNER + (RING_OUTER - RING_INNER) * (1 - n.glow);
        ctx.beginPath();
        ctx.arc(n.x, n.y, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(n.glow * RING_ALPHA_SCALE);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (const n of nodes) {
        const radius =
          NODE_IDLE_RADIUS +
          (NODE_ACTIVE_RADIUS - NODE_IDLE_RADIUS) * n.glow;
        const alpha =
          NODE_IDLE_ALPHA + (NODE_ACTIVE_ALPHA - NODE_IDLE_ALPHA) * n.glow;
        ctx.fillStyle = rgba(alpha);
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of packets) {
        if (!p.edge) continue;
        const from = nodes[p.edge.from];
        const to = nodes[p.edge.to];
        const [px, py] = bezierPoint(
          Math.max(0, Math.min(1, p.progress)),
          from.x,
          from.y,
          p.edge,
          to.x,
          to.y,
        );
        ctx.fillStyle = rgba(PACKET_HALO_ALPHA);
        ctx.beginPath();
        ctx.arc(px, py, PACKET_HALO_RADIUS, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(PACKET_CORE_ALPHA);
        ctx.beginPath();
        ctx.arc(px, py, PACKET_CORE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (reduced) {
      drawStatic();
    } else {
      frameId = requestAnimationFrame((t) => {
        lastT = t;
        frame(t);
      });
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
