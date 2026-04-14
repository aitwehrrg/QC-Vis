"use client";

import { useSimulationStore } from "../store";
import { SCENES } from "../scenes";
import LatexBlock, { LatexText } from "../../components/LatexBlock";

export default function Overlay() {
  const {
    currentSceneIndex,
    nextScene,
    prevScene,
    resetSimulation,
    isFreeCamera,
    toggleFreeCamera,
  } = useSimulationStore();

  const scene = SCENES[currentSceneIndex];

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-8 z-10 font-sans">
      {}
      <div className="flex flex-col gap-4 items-start">
        <div className="w-full max-w-[340px] pointer-events-auto bg-surface/95 backdrop-blur-xl p-4 md:p-6 rounded-xl border border-border-subtle shadow-2xl transition-all duration-300">
          <h2 className="text-sm md:text-base font-bold mb-2 md:mb-3 text-foreground tracking-tight border-b border-border-subtle pb-2">
            {scene.title}
          </h2>
          
          <div className="text-[10px] md:text-[11px] text-muted leading-relaxed mb-4 md:mb-5 font-medium">
            <LatexText>{scene.shortExplanation}</LatexText>
          </div>
          
          {scene.equationOverlay && (
            <div className="bg-background/60 p-3 md:p-4 rounded-lg border border-border-subtle/50 flex flex-col items-center overflow-x-auto">
              <div className="w-full min-w-fit">
                <LatexBlock display className="!my-0 scale-75 md:scale-90 origin-center text-foreground">
                  {scene.equationOverlay}
                </LatexBlock>
              </div>
            </div>
          )}
        </div>
      </div>

      {}
      <div className="flex justify-center items-end pointer-events-auto pb-2 md:pb-0">
        <div className="bg-surface/95 backdrop-blur-xl px-3 md:px-5 py-2 md:py-2.5 rounded-full border border-border-subtle shadow-2xl flex items-center gap-2 md:gap-4 overflow-x-auto max-w-[95vw]">
          <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-border-subtle">
            <div className="flex gap-1">
              {SCENES.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    i === currentSceneIndex ? "bg-accent scale-[1.75]" : "bg-border opacity-40"
                  }`} 
                />
              ))}
            </div>
          </div>

          <button
            onClick={prevScene}
            disabled={currentSceneIndex === 0}
            className="p-1.5 text-muted hover:text-accent disabled:opacity-20 transition-colors"
            title="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={nextScene}
            disabled={currentSceneIndex === SCENES.length - 1}
            className="p-1.5 text-muted hover:text-accent disabled:opacity-20 transition-colors"
            title="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="h-5 w-px bg-border-subtle mx-0.5 flex-shrink-0" />

          <button
            onClick={resetSimulation}
            className="text-[8px] md:text-[9px] font-bold text-muted hover:text-accent transition-colors px-1 md:px-2 uppercase tracking-widest whitespace-nowrap"
          >
            Reset
          </button>

          <div className="h-5 w-px bg-border-subtle mx-0.5 flex-shrink-0" />

          <button
            onClick={toggleFreeCamera}
            className={`text-[8px] md:text-[9px] font-bold px-3 md:px-4 py-1.5 rounded-full border transition-all uppercase tracking-widest whitespace-nowrap ${
              isFreeCamera ? "bg-accent/10 text-accent border-accent/30" : "border-border text-muted hover:border-muted"
            }`}
          >
            {isFreeCamera ? "Free" : "Orbit"}
          </button>
        </div>
      </div>
    </div>
  );
}
