/**
 * Lattice Engine
 *
 * Pure math module that produces 3D-ready coordinate data from Ring-LWE
 * protocol parameters. Used by the Three.js lattice visualization.
 */

/* ─── Types ───────────────────────────────────────────────────────── */

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface LatticePoint extends Vec3 {
  /** Integer coordinates in the original lattice */
  intCoords: number[];
  /** Whether this point is highlighted */
  highlight?: boolean;
}

export interface BasisVector {
  origin: Vec3;
  direction: Vec3;
  label: string;
  color: string;
  /** LaTeX label for the vector */
  latex: string;
}

export interface ProtocolVector {
  id: string;
  from: Vec3;
  to: Vec3;
  label: string;
  latex: string;
  color: string;
  /** Whether to render as an arrow (true) or a point (false) */
  isArrow: boolean;
  /** Dashed line? */
  dashed?: boolean;
  /** Opacity 0-1 */
  opacity?: number;
}

export interface SceneData {
  latticePoints: LatticePoint[];
  basisVectors: BasisVector[];
  protocolVectors: ProtocolVector[];
  noisyPoints: { clean: Vec3; noisy: Vec3; label: string }[];
  nearestPoint: { target: Vec3; nearest: Vec3; radius: number } | null;
  bounds: number;
}

/* ─── Utility ─────────────────────────────────────────────────────── */

/** Proper modular reduction to [0, m-1] */
function mod(a: number, m: number): number {
  return ((a % m) + m) % m;
}

/** Center-lift: map from [0, q-1] to [-(q-1)/2, (q-1)/2] */
function centerLift(val: number, q: number): number {
  const v = mod(val, q);
  return v > q / 2 ? v - q : v;
}

/** Generate a random integer in [lo, hi] inclusive */
function randInt(lo: number, hi: number): number {
  return lo + Math.floor(Math.random() * (hi - lo + 1));
}

/* ─── Polynomial Arithmetic ───────────────────────────────────────── */

/** Multiply two polynomials in Zq[x]/(x^n + 1) */
export function polyMul(a: number[], b: number[], n: number, q: number): number[] {
  const result = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const idx = i + j;
      if (idx < n) {
        result[idx] = mod(result[idx] + a[i] * b[j], q);
      } else {
        result[idx - n] = mod(result[idx - n] - a[i] * b[j], q);
      }
    }
  }
  return result;
}

/** Add two polynomials mod q */
export function polyAdd(a: number[], b: number[], q: number): number[] {
  return a.map((c, i) => mod(c + b[i], q));
}

/** Subtract two polynomials mod q */
export function polySub(a: number[], b: number[], q: number): number[] {
  return a.map((c, i) => mod(c - b[i], q));
}

/** Generate random polynomial in [0, q-1] */
export function randomPoly(n: number, q: number): number[] {
  return Array.from({ length: n }, () => randInt(0, q - 1));
}

/** Generate small polynomial in {-1, 0, 1} */
export function smallPoly(n: number): number[] {
  return Array.from({ length: n }, () => randInt(-1, 1));
}

/* ─── Protocol Run ────────────────────────────────────────────────── */

export interface LatticeProtocolRun {
  n: number;
  q: number;
  a: number[];
  s: number[];
  e: number[];
  b: number[];
  r: number[];
  e1: number[];
  e2: number[];
  u: number[];
  v: number[];
  sharedKeyA: number[];
  sharedKeyB: number[];
  keysMatch: boolean;
}

/** Run the full Ring-LWE protocol with given parameters */
export function runLatticeProtocol(n: number, q: number): LatticeProtocolRun {
  const a = randomPoly(n, q);
  const s = smallPoly(n);
  const e = smallPoly(n);
  const b = polyAdd(polyMul(a, s, n, q), e, q);

  const r = smallPoly(n);
  const e1 = smallPoly(n);
  const e2 = smallPoly(n);
  const u = polyAdd(polyMul(a, r, n, q), e1, q);
  const v = polyAdd(polyMul(b, r, n, q), e2, q);

  // Rounding: center-lift then threshold at q/4
  const roundCoeff = (c: number) => {
    const centered = centerLift(c, q);
    return Math.abs(centered) <= q / 4 ? 0 : 1;
  };

  const sharedKeyA = v.map(roundCoeff);

  const us = polyMul(u, s, n, q);
  const diff = polySub(v, us, q);
  const sharedKeyB = diff.map(roundCoeff);

  const keysMatch = sharedKeyA.every((bit, i) => bit === sharedKeyB[i]);

  return { n, q, a, s, e, b, r, e1, e2, u, v, sharedKeyA, sharedKeyB, keysMatch };
}

/* ─── 3D Projection ───────────────────────────────────────────────── */

/**
 * Project an n-dimensional polynomial vector to 3D using selected axes.
 * Uses center-lifted representation for better visual spread.
 */
export function projectTo3D(
  coeffs: number[],
  axes: [number, number, number],
  q: number,
  scale: number = 1
): Vec3 {
  return {
    x: centerLift(coeffs[axes[0]] ?? 0, q) * scale,
    y: centerLift(coeffs[axes[1]] ?? 0, q) * scale,
    z: centerLift(coeffs[axes[2]] ?? 0, q) * scale,
  };
}

/* ─── Lattice Point Generation ────────────────────────────────────── */

/**
 * Generate visible lattice points in the Zq^3 slice.
 * These are all points with integer coordinates in the projected 3D space.
 */
export function generateLatticePoints(
  q: number,
  axes: [number, number, number],
  bounds: number
): LatticePoint[] {
  const points: LatticePoint[] = [];
  const limit = Math.min(bounds, Math.floor(q / 2));

  for (let i = -limit; i <= limit; i++) {
    for (let j = -limit; j <= limit; j++) {
      for (let k = -limit; k <= limit; k++) {
        points.push({
          x: i,
          y: j,
          z: k,
          intCoords: [i, j, k],
        });
      }
    }
  }
  return points;
}

/**
 * Find the nearest lattice point (Babai rounding).
 * In Zq, this is simply rounding each coefficient.
 */
export function findNearestLatticePoint(target: Vec3, q: number): Vec3 {
  const round = (v: number) => {
    const r = Math.round(v);
    const halfQ = Math.floor(q / 2);
    if (r > halfQ) return r - q;
    if (r < -halfQ) return r + q;
    return r;
  };
  return { x: round(target.x), y: round(target.y), z: round(target.z) };
}

/* ─── Scene Data Builder ──────────────────────────────────────────── */

const COLORS = {
  bob: "#2d9f7f",      // teal
  alice: "#6366f1",     // indigo
  eve: "#ef4444",       // red
  public: "#22c55e",    // green
  private: "#f59e0b",   // amber
  noise: "#f43f5e",     // rose
  cipher: "#3b82f6",    // blue
  lattice: "#737373",   // neutral
};

/**
 * Build all 3D scene data for a given protocol stage.
 */
export function buildSceneData(
  run: LatticeProtocolRun,
  stage: number,
  axes: [number, number, number],
  bounds: number
): SceneData {
  const { n, q } = run;
  const scale = 1;

  // Project all protocol vectors to 3D
  const proj = (coeffs: number[]) => projectTo3D(coeffs, axes, q, scale);

  // Lattice points — only show for small bounds to avoid lag
  const latticePoints = bounds <= 4
    ? generateLatticePoints(q, axes, bounds)
    : generateLatticePoints(q, axes, 3);

  // Build basis vectors (standard basis in the projected space)
  const basisVectors: BasisVector[] = [];
  const protocolVectors: ProtocolVector[] = [];
  const noisyPoints: SceneData["noisyPoints"] = [];
  let nearestPoint: SceneData["nearestPoint"] = null;

  const origin: Vec3 = { x: 0, y: 0, z: 0 };

  // ── Stage-dependent content ──

  // Stage 0+: Bob's basis setup — show a, s, e
  if (stage >= 0) {
    const sPos = proj(run.s);
    const ePos = proj(run.e);
    const aPos = proj(run.a);

    basisVectors.push({
      origin, direction: aPos,
      label: "a", latex: "\\mathbf{a}", color: COLORS.public,
    });

    if (stage >= 0) {
      protocolVectors.push({
        id: "s", from: origin, to: sPos,
        label: "s", latex: "\\mathbf{s}", color: COLORS.private,
        isArrow: true, opacity: stage >= 2 ? 0.3 : 1,
      });
      protocolVectors.push({
        id: "e", from: origin, to: ePos,
        label: "e", latex: "\\mathbf{e}", color: COLORS.noise,
        isArrow: true, opacity: stage >= 2 ? 0.3 : 1,
      });
    }
  }

  // Stage 1+: b = a·s + e published
  if (stage >= 1) {
    const bPos = proj(run.b);
    const asPos = proj(polyMul(run.a, run.s, n, q));

    // Show a·s as intermediate
    protocolVectors.push({
      id: "as", from: origin, to: asPos,
      label: "a·s", latex: "\\mathbf{a} \\cdot \\mathbf{s}", color: COLORS.bob,
      isArrow: true, dashed: true, opacity: 0.5,
    });

    // Show e being added to a·s → b
    noisyPoints.push({
      clean: asPos, noisy: bPos, label: "e adds noise",
    });

    protocolVectors.push({
      id: "b", from: origin, to: bPos,
      label: "b", latex: "\\mathbf{b} = \\mathbf{a} \\cdot \\mathbf{s} + \\mathbf{e}", color: COLORS.public,
      isArrow: true,
    });
  }

  // Stage 2+: Alice's ephemeral values
  if (stage >= 2) {
    const rPos = proj(run.r);
    const e1Pos = proj(run.e1);
    const e2Pos = proj(run.e2);

    protocolVectors.push({
      id: "r", from: origin, to: rPos,
      label: "r", latex: "\\mathbf{r}", color: COLORS.alice,
      isArrow: true,
    });
    protocolVectors.push({
      id: "e1", from: origin, to: e1Pos,
      label: "e₁", latex: "\\mathbf{e}_1", color: COLORS.noise,
      isArrow: true, opacity: 0.7,
    });
    protocolVectors.push({
      id: "e2", from: origin, to: e2Pos,
      label: "e₂", latex: "\\mathbf{e}_2", color: COLORS.noise,
      isArrow: true, opacity: 0.7,
    });
  }

  // Stage 3+: u and v computation
  if (stage >= 3) {
    const uPos = proj(run.u);
    const vPos = proj(run.v);
    const arPos = proj(polyMul(run.a, run.r, n, q));
    const brPos = proj(polyMul(run.b, run.r, n, q));

    protocolVectors.push({
      id: "ar", from: origin, to: arPos,
      label: "a·r", latex: "\\mathbf{a} \\cdot \\mathbf{r}", color: COLORS.alice,
      isArrow: true, dashed: true, opacity: 0.4,
    });

    noisyPoints.push({ clean: arPos, noisy: uPos, label: "e₁ adds noise" });
    noisyPoints.push({ clean: brPos, noisy: vPos, label: "e₂ adds noise" });

    protocolVectors.push({
      id: "u", from: origin, to: uPos,
      label: "u", latex: "\\mathbf{u} = \\mathbf{a} \\cdot \\mathbf{r} + \\mathbf{e}_1", color: COLORS.cipher,
      isArrow: true,
    });
    protocolVectors.push({
      id: "v", from: origin, to: vPos,
      label: "v", latex: "\\mathbf{v} = \\mathbf{b} \\cdot \\mathbf{r} + \\mathbf{e}_2", color: COLORS.cipher,
      isArrow: true,
    });
  }

  // Stage 4+: Shared key via rounding (nearest lattice point)
  if (stage >= 4) {
    const vPos = proj(run.v);
    const nearest = findNearestLatticePoint(vPos, q);
    const dist = Math.sqrt(
      (vPos.x - nearest.x) ** 2 +
      (vPos.y - nearest.y) ** 2 +
      (vPos.z - nearest.z) ** 2
    );
    nearestPoint = { target: vPos, nearest, radius: dist * 1.2 };
  }

  // Stage 6+: Decapsulation — show v - u·s
  if (stage >= 6) {
    const diff = polySub(run.v, polyMul(run.u, run.s, n, q), q);
    const diffPos = proj(diff);

    protocolVectors.push({
      id: "diff", from: origin, to: diffPos,
      label: "v−u·s", latex: "\\mathbf{v} - \\mathbf{u} \\cdot \\mathbf{s}", color: COLORS.bob,
      isArrow: true,
    });
  }

  // Stage 7: Eve's view — ghost the private vectors
  if (stage === 7) {
    // Private vectors are already low opacity from stage >= 2
    // Add Eve's "attempted" projection
    protocolVectors.push({
      id: "eve-attempt", from: origin,
      to: proj(run.b), // Eve can see b but not decompose it
      label: "Eve sees b", latex: "\\mathbf{b} = \\mathbf{a} \\cdot \\mathbf{s} + \\mathbf{e}\\ (\\text{but } \\mathbf{s}, \\mathbf{e} \\text{ unknown})",
      color: COLORS.eve, isArrow: true, dashed: true, opacity: 0.6,
    });
  }

  return { latticePoints, basisVectors, protocolVectors, noisyPoints, nearestPoint, bounds };
}
