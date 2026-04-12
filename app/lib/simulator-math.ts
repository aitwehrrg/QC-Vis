export const n = 8;
export const q = 3329;

export function mod(a: number, m: number): number {
  return ((a % m) + m) % m;
}

export function centerLift(val: number): number {
  const v = mod(val, q);
  return v > q / 2 ? v - q : v;
}

export function polyCenterLift(poly: number[]): number[] {
  return poly.map(centerLift);
}

export function polyAdd(a: number[], b: number[]): number[] {
  const res = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    res[i] = mod(a[i] + b[i], q);
  }
  return res;
}

export function polySub(a: number[], b: number[]): number[] {
  const res = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    res[i] = mod(a[i] - b[i], q);
  }
  return res;
}

export function polyMul(a: number[], b: number[]): number[] {
  const res = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const deg = i + j;
      const coeff = (a[i] * b[j]) % q;
      if (deg < n) {
        res[deg] = mod(res[deg] + coeff, q);
      } else {
        
        res[deg - n] = mod(res[deg - n] - coeff, q);
      }
    }
  }
  return res;
}

export function randomPoly(): number[] {
  return Array.from({ length: n }, () => Math.floor(Math.random() * q));
}

export function smallPoly(): number[] {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 3) - 1);
}

export function deriveKey(v: number[]): number[] {
  return v.map((c) => {
    const centered = centerLift(c);
    return Math.abs(centered) > q / 4 ? 1 : 0;
  });
}

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

export function runProtocol(): ProtocolData {
  const a = randomPoly();
  const s = smallPoly();
  const e = smallPoly();
  const b = polyAdd(polyMul(a, s), e);

  const r = smallPoly();
  const e1 = smallPoly();
  const e2 = smallPoly();
  const u = polyAdd(polyMul(a, r), e1);
  
  
  const msg = Array.from({ length: n }, () => Math.round(Math.random()));
  const msgShifted = msg.map(b => b * Math.floor(q / 2));
  
  const v = polyAdd(polyAdd(polyMul(b, r), e2), msgShifted);

  const keyA = msg; 
  const us = polyMul(u, s);
  const diff = polySub(v, us); 
  const keyB = deriveKey(diff);
  return { a, s, e, b, r, e1, e2, u, v, keyA, keyB };
}
