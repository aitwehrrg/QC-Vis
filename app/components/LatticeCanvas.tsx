"use client";

import { useMemo } from "react";

interface LatticeCanvasProps {
  /** Grid dimension (gridSize × gridSize points) */
  gridSize?: number;
  /** Whether to show noise perturbations */
  showNoise?: boolean;
  /** Noise magnitude (0 to 1) */
  noiseMagnitude?: number;
  /** Which points to highlight as noisy */
  noisyIndices?: number[];
  /** Animation trigger */
  animate?: boolean;
  /** Height of the SVG in px */
  height?: number;
}

export default function LatticeCanvas({
  gridSize = 8,
  showNoise = false,
  noiseMagnitude = 0.3,
  noisyIndices,
  animate = false,
  height = 280,
}: LatticeCanvasProps) {
  const padding = 30;
  const width = height; // square

  // Generate points & noise offsets
  const points = useMemo(() => {
    const spacing = (width - 2 * padding) / (gridSize - 1);
    const result: {
      x: number;
      y: number;
      nx: number;
      ny: number;
      isNoisy: boolean;
      idx: number;
    }[] = [];

    // Use a seeded-ish deterministic noise
    let seed = 42;
    const pseudoRand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed / 2147483647) * 2 - 1; // -1 to 1
    };

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const idx = row * gridSize + col;
        const x = padding + col * spacing;
        const y = padding + row * spacing;
        const isNoisy = noisyIndices
          ? noisyIndices.includes(idx)
          : Math.abs(pseudoRand()) < 0.4;
        const nx = isNoisy ? pseudoRand() * spacing * noiseMagnitude : 0;
        const ny = isNoisy ? pseudoRand() * spacing * noiseMagnitude : 0;
        result.push({ x, y, nx, ny, isNoisy, idx });
      }
    }
    return result;
  }, [gridSize, width, noiseMagnitude, noisyIndices]);

  return (
    <div className="flex flex-col items-center">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="max-w-xs"
        role="img"
        aria-label="Lattice point cloud showing clean grid points and their noisy perturbations"
      >
        <title>Lattice Visualization</title>

        {/* Grid lines (very subtle) */}
        {Array.from({ length: gridSize }).map((_, i) => {
          const spacing = (width - 2 * padding) / (gridSize - 1);
          const pos = padding + i * spacing;
          return (
            <g key={`grid-${i}`}>
              <line
                x1={padding}
                y1={pos}
                x2={width - padding}
                y2={pos}
                className="lattice-line"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <line
                x1={pos}
                y1={padding}
                x2={pos}
                y2={height - padding}
                className="lattice-line"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </g>
          );
        })}

        {/* Noise displacement lines */}
        {showNoise &&
          points
            .filter((p) => p.isNoisy)
            .map((p) => (
              <line
                key={`line-${p.idx}`}
                x1={p.x}
                y1={p.y}
                x2={p.x + p.nx}
                y2={p.y + p.ny}
                stroke="var(--color-value-noise-text)"
                strokeWidth="1"
                opacity="0.5"
                className={animate ? "lattice-point" : ""}
              />
            ))}

        {/* Clean lattice points */}
        {points.map((p) => (
          <circle
            key={`clean-${p.idx}`}
            cx={p.x}
            cy={p.y}
            r={3}
            className="lattice-point lattice-point-clean"
            opacity={showNoise && p.isNoisy ? 0.3 : 0.8}
          />
        ))}

        {/* Noisy points */}
        {showNoise &&
          points
            .filter((p) => p.isNoisy)
            .map((p) => (
              <circle
                key={`noisy-${p.idx}`}
                cx={p.x + p.nx}
                cy={p.y + p.ny}
                r={3.5}
                className="lattice-point lattice-point-noisy"
                opacity="0.9"
              />
            ))}
      </svg>

      {/* Labels */}
      <div className="flex gap-6 mt-3 text-xs" style={{ color: "var(--muted)" }}>
        <div className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          Clean lattice point
        </div>
        {showNoise && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "var(--color-value-noise-text)" }}
            />
            Noisy perturbation
          </div>
        )}
      </div>
    </div>
  );
}
