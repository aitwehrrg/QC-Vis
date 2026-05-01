import type { Metadata } from "next";
import { Atkinson_Hyperlegible, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";
import "katex/dist/katex.min.css";

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Post-Quantum IRC",
  description:
    "A Proof-of-Concept C++20 implementation of ML-KEM (FIPS 203) messaging, featuring AEAD (AES-256-GCM) and AVX2 acceleration. A student research project from VJTI.",
  keywords: [
    "post-quantum cryptography",
    "ML-KEM",
    "FIPS 203",
    "lattice-based cryptography",
    "key encapsulation",
    "AES-GCM",
    "HKDF",
    "C++20",
    "PQC",
    "AVX2",
  ],
  authors: [{ name: "Rupak R. Gupta" }, { name: "Abhay Upadhyay" }, { name: "Ghruank Kothare" }],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Post-Quantum IRC",
    description:
      "A student research project from VJTI detailing a C++20 proof-of-concept for secure messaging using ML-KEM-768.",
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
      className={`${atkinson.variable} ${jetbrains.variable} h-full`}
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
