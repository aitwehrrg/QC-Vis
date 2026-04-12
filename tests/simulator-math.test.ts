import { describe, it, expect } from 'vitest';
import { 
  mod, 
  centerLift, 
  polyAdd, 
  polySub, 
  polyMul, 
  deriveKey, 
  runProtocol,
  q,
  n
} from '../app/lib/simulator-math';

describe('Simulator Math', () => {
  describe('mod', () => {
    it('handles positive numbers', () => {
      expect(mod(5, 3)).toBe(2);
      expect(mod(10, q)).toBe(10);
    });

    it('handles negative numbers', () => {
      expect(mod(-1, q)).toBe(q - 1);
      expect(mod(-q - 1, q)).toBe(q - 1);
    });
  });

  describe('centerLift', () => {
    it('maps values correctly for q=3329', () => {
      expect(centerLift(0)).toBe(0);
      expect(centerLift(1664)).toBe(1664);
      expect(centerLift(1665)).toBe(-1664);
      expect(centerLift(3328)).toBe(-1);
    });
  });

  describe('Polynomial Arithmetic', () => {
    const p1 = [1, 2, 0, 0, 0, 0, 0, 0];
    const p2 = [0, 1, 3, 0, 0, 0, 0, 0];

    it('adds polynomials', () => {
      expect(polyAdd(p1, p2)).toEqual([1, 3, 3, 0, 0, 0, 0, 0]);
    });

    it('subtracts polynomials', () => {
      expect(polySub(p1, p2)).toEqual([1, 1, mod(-3, q), 0, 0, 0, 0, 0]);
    });

    it('multiplies polynomials in the ring Zq[x]/(x^n + 1)', () => {
      // (1 + 2x) * (x + 3x^2) = x + 3x^2 + 2x^2 + 6x^3 = x + 5x^2 + 6x^3
      const a = [1, 2, 0, 0, 0, 0, 0, 0];
      const b = [0, 1, 3, 0, 0, 0, 0, 0];
      const expected = [0, 1, 5, 6, 0, 0, 0, 0];
      expect(polyMul(a, b)).toEqual(expected);

      // Test reduction: x^(n-1) * x = x^n = -1
      const pMax = new Array(n).fill(0);
      pMax[n-1] = 1; // x^(n-1)
      const pX = [0, 1, 0, 0, 0, 0, 0, 0]; // x
      const res = polyMul(pMax, pX);
      const expectedRed = new Array(n).fill(0);
      expectedRed[0] = mod(-1, q);
      expect(res).toEqual(expectedRed);
    });
  });

  describe('Key Derivation', () => {
    it('derives 0 for small values and 1 for large values', () => {
      // q=3329, q/4 = 832.25
      expect(deriveKey([0, 1, 832, 833, 1664, 1665, 2496, 3328])).toEqual([0, 0, 0, 1, 1, 1, 1, 0]);
    });
  });

  describe('Full Protocol', () => {
    it('Alice and Bob reach the same shared secret', () => {
      // Run multiple times to ensure robustness against random noise
      for (let i = 0; i < 50; i++) {
        const data = runProtocol();
        expect(data.keyA).toEqual(data.keyB);
      }
    });
  });
});
