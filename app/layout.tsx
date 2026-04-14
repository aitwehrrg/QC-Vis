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
  title: "ML-KEM Stack",
  description:
    "A high-performance C++20 implementation of ML-KEM (FIPS 203) supporting all parameter sets, featuring AEAD (AES-256-GCM) and AVX2 acceleration.",
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
    title: "ML-KEM PQC Stack",
    description:
      "A high-performance C++20 implementation of the ML-KEM (FIPS 203) post-quantum key encapsulation mechanism.",
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
