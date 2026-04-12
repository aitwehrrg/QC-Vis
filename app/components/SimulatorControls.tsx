"use client";

import { SIM_CONFIG } from "@/app/lib/simulator-engine";

interface SimulatorControlsProps {
  currentStage: number;
  totalStages: number;
  stageTitle: string;
  isPlaying: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function SimulatorControls({
  currentStage,
  totalStages,
  stageTitle,
  isPlaying,
  speed,
  onPlay,
  onPause,
  onStep,
  onReset,
  onSpeedChange,
}: SimulatorControlsProps) {
  return (
    <div className="sim-controls flex-wrap">
      {/* Play / Pause */}
      <button
        className="sim-btn primary"
        onClick={isPlaying ? onPause : onPlay}
        aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
        title={isPlaying ? "Pause (Space)" : "Play (Space)"}
      >
        {isPlaying ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21" />
          </svg>
        )}
      </button>

      {/* Step Forward */}
      <button
        className="sim-btn"
        onClick={onStep}
        disabled={currentStage >= totalStages - 1}
        aria-label="Step forward"
        title="Step forward (→)"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 15 12 5 21" />
          <rect x="17" y="3" width="3" height="18" rx="1" />
        </svg>
      </button>

      {/* Reset */}
      <button
        className="sim-btn"
        onClick={onReset}
        aria-label="Reset simulation"
        title="Reset"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      </button>

      {/* Divider */}
      <div className="w-px h-6 mx-1" style={{ background: "var(--border-subtle)" }} aria-hidden="true" />

      {/* Stage label */}
      <div className="flex-1 min-w-0 px-2">
        <div className="text-xs font-medium truncate" style={{ color: "var(--fg)" }}>
          Stage {currentStage + 1}/{totalStages}
        </div>
        <div className="text-xs truncate" style={{ color: "var(--muted)", fontSize: "0.6875rem" }}>
          {stageTitle}
        </div>
      </div>

      {/* Speed control */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs" style={{ color: "var(--muted)" }}>Speed:</span>
        {SIM_CONFIG.speeds.map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            className="px-1.5 py-0.5 text-xs rounded transition-colors"
            style={{
              background: speed === s ? "var(--accent-muted)" : "transparent",
              color: speed === s ? "var(--accent)" : "var(--muted)",
              border: `1px solid ${speed === s ? "var(--accent)" : "transparent"}`,
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.6875rem",
            }}
            aria-label={`Set speed to ${s}x`}
            aria-pressed={speed === s}
          >
            {s}x
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full mt-2">
        <div
          className="h-1 rounded-full overflow-hidden"
          style={{ background: "var(--border-subtle)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${((currentStage + 1) / totalStages) * 100}%`,
              background: "var(--accent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
