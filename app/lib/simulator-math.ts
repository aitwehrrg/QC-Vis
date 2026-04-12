/**
 * simulator-math.ts
 * Pure polynomial arithmetic and Ring-LWE protocol logic for the simulator.
 * n = 8, q = 17 (Toy parameters)
 */

export const n = 8;
export const q = 17;

/** Modulo function that handles negative numbers correctly */
export function mod(a: number, m: number): number {
  return ((a % m) + m) % m;
}

/** Center-lift a value from [0, q-1] to [-(q-1)/2, (q-1)/2] */
export function centerLift(val: number): number {
  const v = mod(val, q);
  return v > q / 2 ? v - q : v;
}

/** Center-lift a polynomial */
export function polyCenterLift(poly: number[]): number[] {
  return poly.map(centerLift);
}

/** Add two polynomials */
export function polyAdd(a: number[], b: number[]): number[] {
  const res = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    res[i] = mod(a[i] + b[i], q);
  }
  return res;
}

/** Subtract two polynomials */
export function polySub(a: number[], b: number[]): number[] {
  const res = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    res[i] = mod(a[i] - b[i], q);
  }
  return res;
}

/** Multiply two polynomials in Zq[x]/(x^n + 1) */
export function polyMul(a: number[], b: number[]): number[] {
  const res = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const deg = i + j;
      const coeff = (a[i] * b[j]) % q;
      if (deg < n) {
        res[deg] = mod(res[deg] + coeff, q);
      } else {
        // x^deg = x^n * x^(deg-n) = -1 * x^(deg-n)
        res[deg - n] = mod(res[deg - n] - coeff, q);
      }
    }
  }
  return res;
}

/** Generate a random polynomial with coefficients in [0, q-1] */
export function randomPoly(): number[] {
  return Array.from({ length: n }, () => Math.floor(Math.random() * q));
}

/** Generate a small polynomial with coefficients in {-1, 0, 1} */
export function smallPoly(): number[] {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 3) - 1);
}

/** Rounding-based key derivation (KEM) */
export function deriveKey(v: number[]): number[] {
  return v.map((c) => {
    const centered = centerLift(c);
    // If |centered| is closer to q/2 (which is 8.5) than 0, return 1
    return Math.abs(centered) > q / 4 ? 1 : 0;
  });
}

/** Protocol data structure */
export interface ProtocolData {
  a: number[];
  s: number[];
  e: number[];
  b: number[];
  r: number[];
  e1: number[];
  e2: number[];
  u: number[];
  v: number[];
  keyA: number[];
  keyB: number[];
}

/** Run the full protocol and return all intermediate values */
export function runProtocol(): ProtocolData {
  const a = randomPoly();
  const s = smallPoly();
  const e = smallPoly();
  const b = polyAdd(polyMul(a, s), e);

  const r = smallPoly();
  const e1 = smallPoly();
  const e2 = smallPoly();
  const u = polyAdd(polyMul(a, r), e1);
  const v = polyAdd(polyMul(b, r), e2);

  const keyA = deriveKey(v);
  const us = polyMul(u, s);
  const diff = polySub(v, us);
  const keyB = deriveKey(diff);

  return { a, s, e, b, r, e1, e2, u, v, keyA, keyB };
}
