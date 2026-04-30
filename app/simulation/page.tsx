"use client";

import dynamic from "next/dynamic";
import Navigation from "../components/Navigation";
import Overlay from "./components/Overlay";

const SimulatorScene = dynamic(() => import("./components/SimulatorScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-background text-accent font-mono text-xs uppercase tracking-widest">
      Loading...
    </div>
  ),
});

export default function SimulationPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navigation />
      
      <main className="flex-1 relative bg-[#050505]">
        <SimulatorScene />
        <Overlay />
      </main>
    </div>
  );
}
