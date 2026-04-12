"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import katex from "katex";
import type { LatticeProtocolRun } from "@/app/lib/lattice-engine";

/* ═══════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════ */

interface Vec2 {
  x: number;
  y: number;
}

interface AnimatedVector {
  id: string;
  from: Vec2;
  to: Vec2;
  color: string;
  label: string;
  /** LaTeX label */
  latex: string;
  opacity: number;
  dashed?: boolean;
  /** Whether to draw arrowhead */
  arrow?: boolean;
  /** Line width multiplier */
  width?: number;
}

interface StageScene {
  vectors: AnimatedVector[];
  /** Extra label overlays (not vector-attached) */
  labels: { pos: Vec2; latex: string; color: string; fontSize?: number }[];
  /** Extra info text at bottom */
  infoText?: string;
}

/* ═══════════════════════════════════════════════════════════════════
   Constants — 3blue1brown palette
   ═══════════════════════════════════════════════════════════════════ */

const BG_COLOR = "#1b1b2f";
const GRID_COLOR = "rgba(255,255,255,0.06)";
const GRID_DOT_COLOR = "rgba(255,255,255,0.12)";
const AXIS_COLOR = "rgba(255,255,255,0.18)";

const COLORS = {
  public: "#22c55e",
  private: "#fbbf24",
  noise: "#f43f5e",
  cipher: "#3b82f6",
  alice: "#818cf8",
  bob: "#2dd4bf",
  eve: "#ef4444",
  basis: "rgba(255,255,255,0.35)",
  basisLabel: "rgba(255,255,255,0.55)",
  white: "#e2e8f0",
  muted: "rgba(255,255,255,0.5)",
};

/* ═══════════════════════════════════════════════════════════════════
   Utility
   ═══════════════════════════════════════════════════════════════════ */

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function vec2Lerp(a: Vec2, b: Vec2, t: number): Vec2 {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

/** Center-lift: map from [0, q-1] to [-(q-1)/2, (q-1)/2] */
function centerLift(val: number, q: number): number {
  const v = ((val % q) + q) % q;
  return v > q / 2 ? v - q : v;
}

/** Project polynomial to 2D using first two coefficients (center-lifted) */
function projectTo2D(coeffs: number[], q: number, scale: number = 1): Vec2 {
  return {
    x: centerLift(coeffs[0] ?? 0, q) * scale,
    y: centerLift(coeffs[1] ?? 0, q) * scale,
  };
}

/** Render a KaTeX string to HTML */
function renderLatex(tex: string, displayMode = false): string {
  try {
    return katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: true,
      macros: {
        "\\vect": "\\mathbf{#1}",
        "\\Z": "\\mathbb{Z}",
        "\\Zq": "\\mathbb{Z}_q",
      },
    });
  } catch {
    return tex;
  }
}

/* ═══════════════════════════════════════════════════════════════════
   Canvas Drawing Helpers
   ═══════════════════════════════════════════════════════════════════ */

function drawGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  origin: Vec2,
  unitPx: number
) {
  const halfW = w / 2;
  const halfH = h / 2;
  const maxU = Math.ceil(halfW / unitPx) + 1;
  const maxV = Math.ceil(halfH / unitPx) + 1;

  // Grid lines (very subtle)
  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = 1;
  for (let i = -maxU; i <= maxU; i++) {
    const x = origin.x + i * unitPx;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let j = -maxV; j <= maxV; j++) {
    const y = origin.y - j * unitPx;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Lattice dots
  ctx.fillStyle = GRID_DOT_COLOR;
  for (let i = -maxU; i <= maxU; i++) {
    for (let j = -maxV; j <= maxV; j++) {
      const x = origin.x + i * unitPx;
      const y = origin.y - j * unitPx;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Axes
  ctx.strokeStyle = AXIS_COLOR;
  ctx.lineWidth = 1.5;
  // X-axis
  ctx.beginPath();
  ctx.moveTo(0, origin.y);
  ctx.lineTo(w, origin.y);
  ctx.stroke();
  // Y-axis
  ctx.beginPath();
  ctx.moveTo(origin.x, 0);
  ctx.lineTo(origin.x, h);
  ctx.stroke();
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  origin: Vec2,
  from: Vec2,
  to: Vec2,
  unitPx: number,
  color: string,
  opacity: number,
  dashed: boolean = false,
  lineWidth: number = 2.5,
  drawHead: boolean = true
) {
  const sx = origin.x + from.x * unitPx;
  const sy = origin.y - from.y * unitPx;
  const ex = origin.x + to.x * unitPx;
  const ey = origin.y - to.y * unitPx;

  const dx = ex - sx;
  const dy = ey - sy;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 0.5) return;

  const angle = Math.atan2(dy, dx);
  const headLen = Math.min(14, len * 0.25);
  const headWidth = 7;

  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (dashed) {
    ctx.setLineDash([8, 5]);
  }

  // Shaft: from start to (tip - arrowhead length)
  const shaftEndX = drawHead ? ex - Math.cos(angle) * headLen : ex;
  const shaftEndY = drawHead ? ey - Math.sin(angle) * headLen : ey;

  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(shaftEndX, shaftEndY);
  ctx.stroke();

  if (dashed) {
    ctx.setLineDash([]);
  }

  // Arrowhead — filled triangle aligned with vector direction
  if (drawHead) {
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(
      ex - headLen * Math.cos(angle) + headWidth * Math.sin(angle),
      ey - headLen * Math.sin(angle) - headWidth * Math.cos(angle)
    );
    ctx.lineTo(
      ex - headLen * Math.cos(angle) - headWidth * Math.sin(angle),
      ey - headLen * Math.sin(angle) + headWidth * Math.cos(angle)
    );
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

function drawBasisVectors(
  ctx: CanvasRenderingContext2D,
  origin: Vec2,
  unitPx: number,
  extent: number
) {
  // ê₁ along X
  drawArrow(
    ctx,
    origin,
    { x: 0, y: 0 },
    { x: extent, y: 0 },
    unitPx,
    COLORS.basis,
    0.6,
    false,
    2,
    true
  );
  // ê₂ along Y
  drawArrow(
    ctx,
    origin,
    { x: 0, y: 0 },
    { x: 0, y: extent },
    unitPx,
    COLORS.basis,
    0.6,
    false,
    2,
    true
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Scene Builder — maps stage + protocol run to drawable scene
   ═══════════════════════════════════════════════════════════════════ */

function polyMul(a: number[], b: number[], n: number, q: number): number[] {
  const result = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const idx = i + j;
      if (idx < n) {
        result[idx] = ((result[idx] + a[i] * b[j]) % q + q) % q;
      } else {
        result[idx - n] = ((result[idx - n] - a[i] * b[j]) % q + q) % q;
      }
    }
  }
  return result;
}

function polySub(a: number[], b: number[], q: number): number[] {
  return a.map((c, i) => ((c - b[i]) % q + q) % q);
}

function buildStageScene(
  run: LatticeProtocolRun,
  stage: number,
  scale: number
): StageScene {
  const { n, q } = run;
  const O: Vec2 = { x: 0, y: 0 };
  const proj = (c: number[]) => projectTo2D(c, q, scale);

  const vectors: AnimatedVector[] = [];
  const labels: StageScene["labels"] = [];

  // ── Stage 0: Bob generates keypair ──
  if (stage >= 0) {
    const sPos = proj(run.s);
    const ePos = proj(run.e);
    const aPos = proj(run.a);

    vectors.push({
      id: "a",
      from: O,
      to: aPos,
      color: COLORS.public,
      label: "a",
      latex: "\\mathbf{a}",
      opacity: stage >= 2 ? 0.25 : 0.8,
      arrow: true,
      width: stage >= 2 ? 1.5 : 2.5,
    });
    vectors.push({
      id: "s",
      from: O,
      to: sPos,
      color: COLORS.private,
      label: "s",
      latex: "\\mathbf{s}",
      opacity: stage >= 2 ? 0.2 : 1,
      arrow: true,
    });
    vectors.push({
      id: "e",
      from: O,
      to: ePos,
      color: COLORS.noise,
      label: "e",
      latex: "\\mathbf{e}",
      opacity: stage >= 2 ? 0.2 : 0.9,
      arrow: true,
    });
  }

  // ── Stage 1: Publish public key ──
  if (stage >= 1) {
    const bPos = proj(run.b);
    const asCoeffs = polyMul(run.a, run.s, n, q);
    const asPos = proj(asCoeffs);

    vectors.push({
      id: "as",
      from: O,
      to: asPos,
      color: COLORS.bob,
      label: "a·s",
      latex: "\\mathbf{a} \\cdot \\mathbf{s}",
      opacity: 0.35,
      dashed: true,
      arrow: true,
      width: 1.5,
    });

    // Noise link from as to b
    vectors.push({
      id: "noise-as-b",
      from: asPos,
      to: bPos,
      color: COLORS.noise,
      label: "",
      latex: "+\\mathbf{e}",
      opacity: 0.5,
      dashed: true,
      arrow: true,
      width: 1.5,
    });

    vectors.push({
      id: "b",
      from: O,
      to: bPos,
      color: COLORS.public,
      label: "b",
      latex: "\\mathbf{b}",
      opacity: 1,
      arrow: true,
      width: 3,
    });
  }

  // ── Stage 2: Alice generates ephemeral ──
  if (stage >= 2) {
    const rPos = proj(run.r);
    const e1Pos = proj(run.e1);
    const e2Pos = proj(run.e2);

    vectors.push({
      id: "r",
      from: O,
      to: rPos,
      color: COLORS.alice,
      label: "r",
      latex: "\\mathbf{r}",
      opacity: 1,
      arrow: true,
    });
    vectors.push({
      id: "e1",
      from: O,
      to: e1Pos,
      color: COLORS.noise,
      label: "e₁",
      latex: "\\mathbf{e}_1",
      opacity: 0.7,
      arrow: true,
      width: 2,
    });
    vectors.push({
      id: "e2",
      from: O,
      to: e2Pos,
      color: COLORS.noise,
      label: "e₂",
      latex: "\\mathbf{e}_2",
      opacity: 0.7,
      arrow: true,
      width: 2,
    });
  }

  // ── Stage 3: Compute u, v ──
  if (stage >= 3) {
    const uPos = proj(run.u);
    const vPos = proj(run.v);

    vectors.push({
      id: "u",
      from: O,
      to: uPos,
      color: COLORS.cipher,
      label: "u",
      latex: "\\mathbf{u}",
      opacity: 1,
      arrow: true,
      width: 3,
    });
    vectors.push({
      id: "v",
      from: O,
      to: vPos,
      color: COLORS.cipher,
      label: "v",
      latex: "\\mathbf{v}",
      opacity: 1,
      arrow: true,
      width: 3,
    });
  }

  // ── Stage 4: Shared key rounding ──
  if (stage >= 4) {
    const vPos = proj(run.v);
    const nearX = Math.round(vPos.x);
    const nearY = Math.round(vPos.y);
    vectors.push({
      id: "nearest",
      from: vPos,
      to: { x: nearX, y: nearY },
      color: COLORS.public,
      label: "",
      latex: "",
      opacity: 0.6,
      dashed: true,
      arrow: false,
      width: 1.5,
    });
    labels.push({
      pos: { x: nearX, y: nearY },
      latex: "K_A = \\text{Round}(\\mathbf{v})",
      color: COLORS.public,
      fontSize: 14,
    });
  }

  // ── Stage 5: Encrypt message ──
  if (stage >= 5) {
    labels.push({
      pos: { x: -4, y: 4.5 },
      latex: '\\text{msg} = \\text{"HELLO B"}',
      color: COLORS.white,
      fontSize: 16,
    });
    labels.push({
      pos: { x: -4, y: 3.5 },
      latex: "\\text{ciphertext} = \\text{msg} \\oplus K_A",
      color: COLORS.cipher,
      fontSize: 14,
    });
  }

  // ── Stage 6: Bob decrypts ──
  if (stage >= 6) {
    const diff = polySub(run.v, polyMul(run.u, run.s, n, q), q);
    const diffPos = proj(diff);

    vectors.push({
      id: "diff",
      from: O,
      to: diffPos,
      color: COLORS.bob,
      label: "v−u·s",
      latex: "\\mathbf{v} - \\mathbf{u} \\cdot \\mathbf{s}",
      opacity: 1,
      arrow: true,
      width: 3,
    });

    labels.push({
      pos: { x: 4, y: 4.5 },
      latex: "K_B = \\text{Round}(\\mathbf{v} - \\mathbf{u} \\cdot \\mathbf{s})",
      color: COLORS.bob,
      fontSize: 14,
    });
  }

  // ── Stage 7: Eve fails ──
  if (stage === 7) {
    vectors.push({
      id: "eve-b",
      from: O,
      to: proj(run.b),
      color: COLORS.eve,
      label: "b (Eve sees)",
      latex: "\\mathbf{b}\\;(\\text{Eve sees})",
      opacity: 0.5,
      dashed: true,
      arrow: true,
      width: 2,
    });
    labels.push({
      pos: { x: 0, y: -5 },
      latex:
        "\\text{Eve needs } \\mathbf{s} \\text{ to compute } K \\;—\\; \\textcolor{#ef4444}{\\text{Infeasible!}}",
      color: COLORS.eve,
      fontSize: 16,
    });
  }

  // ── Stage 8: Summary ──
  if (stage === 8) {
    if (run.keysMatch) {
      labels.push({
        pos: { x: 0, y: -5 },
        latex:
          "K_A = K_B \\;\\checkmark \\quad \\text{Protocol succeeds!}",
        color: COLORS.public,
        fontSize: 18,
      });
    } else {
      labels.push({
        pos: { x: 0, y: -5 },
        latex:
          "K_A \\neq K_B \\;\\times \\quad \\text{(Toy parameters — reconciliation needed)}",
        color: COLORS.noise,
        fontSize: 18,
      });
    }
  }

  return { vectors, labels };
}

/* ═══════════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════════ */

interface SimulatorCanvasProps {
  protocolRun: LatticeProtocolRun;
  currentStage: number;
  darkMode?: boolean;
}

export default function SimulatorCanvas({
  protocolRun,
  currentStage,
  darkMode = true,
}: SimulatorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  // Animation state
  const prevStageRef = useRef(currentStage);
  const transitionRef = useRef(1); // 0..1, 1 = fully arrived
  const startTimeRef = useRef(0);
  const TRANSITION_MS = 700;

  // Previous scene data for interpolation
  const prevSceneRef = useRef<StageScene | null>(null);

  // Scale factor for projecting polynomial coords to canvas
  const VECTOR_SCALE = 0.6;
  const GRID_EXTENT = 6;

  // Detect stage change → trigger transition
  useEffect(() => {
    if (currentStage !== prevStageRef.current) {
      prevSceneRef.current = buildStageScene(
        protocolRun,
        prevStageRef.current,
        VECTOR_SCALE
      );
      prevStageRef.current = currentStage;
      transitionRef.current = 0;
      startTimeRef.current = performance.now();
    }
  }, [currentStage, protocolRun]);

  const targetScene = useMemo(
    () => buildStageScene(protocolRun, currentStage, VECTOR_SCALE),
    [protocolRun, currentStage]
  );

  // Label refs for HTML overlay
  const [labelPositions, setLabelPositions] = useState<
    {
      screenX: number;
      screenY: number;
      latex: string;
      color: string;
      fontSize: number;
      opacity: number;
    }[]
  >([]);

  // Main render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    function resize() {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    function frame(now: number) {
      if (!running || !ctx || !canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Unit pixel size (how many px per unit in our coordinate system)
      const unitPx = Math.min(w, h) / (GRID_EXTENT * 2 + 2);
      const origin: Vec2 = { x: w / 2, y: h / 2 };

      // Update transition progress
      if (transitionRef.current < 1) {
        const elapsed = now - startTimeRef.current;
        transitionRef.current = Math.min(elapsed / TRANSITION_MS, 1);
      }
      const t = easeInOutCubic(transitionRef.current);

      // Clear
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, w, h);

      // Draw grid
      drawGrid(ctx, w, h, origin, unitPx);

      // Draw basis vectors
      drawBasisVectors(ctx, origin, unitPx, GRID_EXTENT);

      // Interpolate vectors
      const prevScene = prevSceneRef.current;
      const scene = targetScene;

      for (const vec of scene.vectors) {
        let drawFrom = vec.from;
        let drawTo = vec.to;
        let drawOpacity = vec.opacity;

        if (prevScene && t < 1) {
          const prevVec = prevScene.vectors.find((v) => v.id === vec.id);
          if (prevVec) {
            drawFrom = vec2Lerp(prevVec.from, vec.from, t);
            drawTo = vec2Lerp(prevVec.to, vec.to, t);
            drawOpacity = lerp(prevVec.opacity, vec.opacity, t);
          } else {
            // New vector: fade in
            drawOpacity = vec.opacity * t;
          }
        }

        drawArrow(
          ctx,
          origin,
          drawFrom,
          drawTo,
          unitPx,
          vec.color,
          drawOpacity,
          vec.dashed,
          vec.width ?? 2.5,
          vec.arrow !== false
        );
      }

      // Fade out vectors that were in prev but not in current
      if (prevScene && t < 1) {
        for (const prevVec of prevScene.vectors) {
          if (!scene.vectors.find((v) => v.id === prevVec.id)) {
            drawArrow(
              ctx,
              origin,
              prevVec.from,
              prevVec.to,
              unitPx,
              prevVec.color,
              prevVec.opacity * (1 - t),
              prevVec.dashed,
              prevVec.width ?? 2.5,
              prevVec.arrow !== false
            );
          }
        }
      }

      // Draw nearest-point circle if present
      if (currentStage >= 4) {
        const vPos = projectTo2D(protocolRun.v, protocolRun.q, VECTOR_SCALE);
        const nearX = Math.round(vPos.x);
        const nearY = Math.round(vPos.y);
        const radius =
          Math.sqrt((vPos.x - nearX) ** 2 + (vPos.y - nearY) ** 2) * unitPx;
        const circleOpacity = t < 1 && prevStageRef.current < 4 ? t * 0.2 : 0.2;

        ctx.save();
        ctx.globalAlpha = circleOpacity;
        ctx.strokeStyle = COLORS.public;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(
          origin.x + vPos.x * unitPx,
          origin.y - vPos.y * unitPx,
          Math.max(radius, unitPx * 0.3) * 1.3,
          0,
          Math.PI * 2
        );
        ctx.stroke();
        ctx.setLineDash([]);

        // Nearest point dot
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = COLORS.public;
        ctx.beginPath();
        ctx.arc(
          origin.x + nearX * unitPx,
          origin.y - nearY * unitPx,
          5,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      }

      // Compute label positions for HTML overlay
      const newLabels: typeof labelPositions = [];

      for (const vec of scene.vectors) {
        if (!vec.latex) continue;

        let vecTo = vec.to;
        let vecOpacity = vec.opacity;

        if (prevScene && t < 1) {
          const prevVec = prevScene.vectors.find((v) => v.id === vec.id);
          if (prevVec) {
            vecTo = vec2Lerp(prevVec.to, vec.to, t);
            vecOpacity = lerp(prevVec.opacity, vec.opacity, t);
          } else {
            vecOpacity = vec.opacity * t;
          }
        }

        const sx = origin.x + vecTo.x * unitPx;
        const sy = origin.y - vecTo.y * unitPx;

        newLabels.push({
          screenX: sx + 10,
          screenY: sy - 14,
          latex: vec.latex,
          color: vec.color,
          fontSize: 14,
          opacity: vecOpacity,
        });
      }

      // Extra labels
      for (const lbl of scene.labels) {
        let lblOpacity = 1;
        if (t < 1) {
          lblOpacity = t;
        }
        newLabels.push({
          screenX: origin.x + lbl.pos.x * unitPx,
          screenY: origin.y - lbl.pos.y * unitPx,
          latex: lbl.latex,
          color: lbl.color,
          fontSize: lbl.fontSize ?? 14,
          opacity: lblOpacity,
        });
      }

      // Basis vector labels
      const basisOpacity = 0.55;
      newLabels.push({
        screenX: origin.x + GRID_EXTENT * unitPx + 12,
        screenY: origin.y + 4,
        latex: "\\hat{e}_1",
        color: COLORS.basisLabel,
        fontSize: 14,
        opacity: basisOpacity,
      });
      newLabels.push({
        screenX: origin.x + 10,
        screenY: origin.y - GRID_EXTENT * unitPx - 8,
        latex: "\\hat{e}_2",
        color: COLORS.basisLabel,
        fontSize: 14,
        opacity: basisOpacity,
      });

      setLabelPositions(newLabels);

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [targetScene, protocolRun, currentStage]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: BG_COLOR,
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
      {/* KaTeX label overlays */}
      {labelPositions.map((lbl, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: lbl.screenX,
            top: lbl.screenY,
            color: lbl.color,
            fontSize: `${lbl.fontSize}px`,
            opacity: lbl.opacity,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            textShadow: "0 0 8px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.7)",
            transition: "opacity 0.3s ease",
            transform: "translate(-50%, -50%)",
          }}
          dangerouslySetInnerHTML={{ __html: renderLatex(lbl.latex) }}
        />
      ))}
    </div>
  );
}
