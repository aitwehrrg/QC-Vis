/**
 * Ring-LWE Cryptographic Engine
 *
 * A minimal educational implementation of Ring-LWE / Kyber-style
 * key encapsulation for demonstration purposes.
 *
 * WARNING: This is NOT production cryptography.
 * - No constant-time guarantees
 * - Toy parameters (n=8, q=17)
 * - No CCA transform (Fujisaki–Okamoto)
 * - No hardened RNG
 * - Simplified reconciliation
 */

import { PARAMS } from "./constants";

const { n, q } = PARAMS;

/* ─── Utility ──────────────────────────────────────────────────────── */

/** Proper modular reduction to [0, q-1] */
export function mod(a: number, m: number): number {
  return ((a % m) + m) % m;
}

/** Generate a random integer in [lo, hi] inclusive */
function randInt(lo: number, hi: number): number {
  return lo + Math.floor(Math.random() * (hi - lo + 1));
}

/* ─── Polynomial Arithmetic in Zq[x]/(x^n + 1) ───────────────────── */

/**
 * Multiply two polynomials in Zq[x]/(x^n + 1).
 * Uses schoolbook multiplication with negacyclic reduction.
 */
export function polyMul(a: number[], b: number[]): number[] {
  const result = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const idx = i + j;
      if (idx < n) {
        result[idx] = mod(result[idx] + a[i] * b[j], q);
      } else {
        // x^n ≡ -1, so x^(n+k) ≡ -x^k
        result[idx - n] = mod(result[idx - n] - a[i] * b[j], q);
      }
    }
  }
  return result;
}

/** Add two polynomials mod q */
export function polyAdd(a: number[], b: number[]): number[] {
  return a.map((coeff, i) => mod(coeff + b[i], q));
}

/** Subtract two polynomials mod q */
export function polySub(a: number[], b: number[]): number[] {
  return a.map((coeff, i) => mod(coeff - b[i], q));
}

/* ─── Random Generation ───────────────────────────────────────────── */

/** Generate a random polynomial with coefficients in [0, q-1] */
export function generatePublicA(): number[] {
  return Array.from({ length: n }, () => randInt(0, q - 1));
}

/** Generate a small secret polynomial with coefficients in {-1, 0, 1} */
export function generateSecret(): number[] {
  return Array.from({ length: n }, () => randInt(-1, 1));
}

/** Generate a small error polynomial with coefficients in {-1, 0, 1} */
export function generateError(): number[] {
  return Array.from({ length: n }, () => randInt(-1, 1));
}

/* ─── Key Generation ───────────────────────────────────────────────── */

export interface KeyPair {
  publicKey: { a: number[]; b: number[] };
  secretKey: { s: number[] };
  noise: { e: number[] };
}

/**
 * Generate a keypair.
 * B chooses secret s, error e, random a, computes b = a*s + e mod q
 */
export function keyGen(
  fixedA?: number[],
  fixedS?: number[],
  fixedE?: number[]
): KeyPair {
  const a = fixedA ? fixedA.map((c) => mod(c, q)) : generatePublicA();
  const s = fixedS ? [...fixedS] : generateSecret();
  const e = fixedE ? [...fixedE] : generateError();
  const b = polyAdd(polyMul(a, s), e);
  return {
    publicKey: { a, b },
    secretKey: { s },
    noise: { e },
  };
}

/* ─── Encapsulation ────────────────────────────────────────────────── */

export interface EncapsulationResult {
  u: number[];
  v: number[];
  sharedKey: number[];
  ephemeral: { r: number[]; e1: number[]; e2: number[] };
}

/**
 * A encapsulates a shared secret using B's public key.
 * A generates ephemeral r, e1, e2:
 *   u = a*r + e1
 *   v = b*r + e2
 * Shared key is derived from v (rounded).
 */
export function encapsulate(
  publicKey: { a: number[]; b: number[] },
  fixedR?: number[],
  fixedE1?: number[],
  fixedE2?: number[]
): EncapsulationResult {
  const r = fixedR ? [...fixedR] : generateSecret();
  const e1 = fixedE1 ? [...fixedE1] : generateError();
  const e2 = fixedE2 ? [...fixedE2] : generateError();

  const u = polyAdd(polyMul(publicKey.a, r), e1);
  const v = polyAdd(polyMul(publicKey.b, r), e2);

  // Derive shared key by rounding v to nearest {0, floor(q/2)}
  const sharedKey = v.map((coeff) => {
    const half = Math.floor(q / 2);
    return Math.abs(coeff) < Math.abs(coeff - half) &&
      Math.abs(coeff) < Math.abs(coeff - q)
      ? 0
      : 1;
  });

  return { u, v, sharedKey, ephemeral: { r, e1, e2 } };
}

/* ─── Decapsulation ────────────────────────────────────────────────── */

export interface DecapsulationResult {
  sharedKey: number[];
  intermediate: number[];
}

/**
 * B decapsulates using their secret key s.
 *   v - u*s ≈ b*r + e2 - (a*r + e1)*s
 *           = (a*s+e)*r + e2 - a*r*s - e1*s
 *           = e*r + e2 - e1*s   (small if errors are small)
 * Then round to recover shared key.
 */
export function decapsulate(
  u: number[],
  v: number[],
  secretKey: { s: number[] }
): DecapsulationResult {
  const us = polyMul(u, secretKey.s);
  const intermediate = polySub(v, us);

  const sharedKey = intermediate.map((coeff) => {
    const half = Math.floor(q / 2);
    return Math.abs(coeff) < Math.abs(coeff - half) &&
      Math.abs(coeff) < Math.abs(coeff - q)
      ? 0
      : 1;
  });

  return { sharedKey, intermediate };
}

/* ─── Message Encryption (XOR-based demo) ──────────────────────────── */

/**
 * Encrypt a message using the shared key.
 * Converts message to binary, XORs with repeated key bits.
 */
export function encryptMessage(message: string, key: number[]): string {
  const msgBits = message
    .split("")
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");

  const keyBits = key.join("").repeat(Math.ceil(msgBits.length / key.length));

  const cipherBits = msgBits
    .split("")
    .map((b, i) => (parseInt(b) ^ parseInt(keyBits[i])).toString())
    .join("");

  // Convert to hex for display
  let hex = "";
  for (let i = 0; i < cipherBits.length; i += 4) {
    hex += parseInt(cipherBits.slice(i, i + 4), 2).toString(16);
  }
  return "0x" + hex;
}

/**
 * Decrypt ciphertext using the shared key.
 */
export function decryptMessage(cipherHex: string, key: number[]): string {
  const hex = cipherHex.startsWith("0x") ? cipherHex.slice(2) : cipherHex;
  const cipherBits = hex
    .split("")
    .map((h) => parseInt(h, 16).toString(2).padStart(4, "0"))
    .join("");

  const keyBits = key
    .join("")
    .repeat(Math.ceil(cipherBits.length / key.length));

  const msgBits = cipherBits
    .split("")
    .map((b, i) => (parseInt(b) ^ parseInt(keyBits[i])).toString())
    .join("");

  let message = "";
  for (let i = 0; i < msgBits.length; i += 8) {
    const byte = msgBits.slice(i, i + 8);
    if (byte.length === 8) {
      const code = parseInt(byte, 2);
      if (code > 0) message += String.fromCharCode(code);
    }
  }
  return message;
}

/* ─── Full Protocol Run ────────────────────────────────────────────── */

export interface ProtocolRun {
  keyPair: KeyPair;
  encap: EncapsulationResult;
  decap: DecapsulationResult;
  message: string;
  ciphertext: string;
  decrypted: string;
  keysMatch: boolean;
}

/**
 * Run the entire protocol end-to-end.
 */
export function runProtocol(
  message: string = "HELLO B",
  fixed?: {
    a?: number[];
    s?: number[];
    e?: number[];
    r?: number[];
    e1?: number[];
    e2?: number[];
  }
): ProtocolRun {
  const keyPair = keyGen(fixed?.a, fixed?.s, fixed?.e);
  const encap = encapsulate(
    keyPair.publicKey,
    fixed?.r,
    fixed?.e1,
    fixed?.e2
  );
  const decap = decapsulate(encap.u, encap.v, keyPair.secretKey);

  const keysMatch = encap.sharedKey.every(
    (bit, i) => bit === decap.sharedKey[i]
  );

  const ciphertext = encryptMessage(message, encap.sharedKey);
  const decrypted = keysMatch
    ? decryptMessage(ciphertext, decap.sharedKey)
    : "[KEY MISMATCH — decryption failed]";

  return { keyPair, encap, decap, message, ciphertext, decrypted, keysMatch };
}
