import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulation | Post-Quantum IRC",
};

export default function SimulationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
