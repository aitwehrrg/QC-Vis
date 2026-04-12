import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";
import "katex/dist/katex.min.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QC-Vis — Post-Quantum Cryptography: Ring-LWE / Kyber Protocol Visualizer",
  description:
    "Interactive documentation and visual simulator for an educational Ring-LWE / Kyber-style post-quantum key encapsulation protocol. Explore lattice-based cryptography with step-by-step animations.",
  keywords: [
    "post-quantum cryptography",
    "Ring-LWE",
    "Kyber",
    "ML-KEM",
    "lattice-based cryptography",
    "key encapsulation",
    "cryptography simulator",
    "PQC",
    "education",
  ],
  authors: [{ name: "QC-Vis Project" }],
  openGraph: {
    title: "QC-Vis — Post-Quantum Cryptography Visualizer",
    description:
      "Interactive Ring-LWE / Kyber-style protocol simulator and documentation for learning post-quantum cryptography.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} h-full`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
