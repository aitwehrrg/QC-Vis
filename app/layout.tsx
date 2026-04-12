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
  title: "Kyber ML-KEM",
  description:
    "A high-performance C++20 implementation of the ML-KEM-768 (FIPS 203) post-quantum key encapsulation mechanism, featuring AEAD (AES-256-GCM) and HKDF-SHA256 for secure messaging.",
  keywords: [
    "post-quantum cryptography",
    "Kyber",
    "ML-KEM",
    "FIPS 203",
    "lattice-based cryptography",
    "key encapsulation",
    "AES-GCM",
    "HKDF",
    "C++20",
    "PQC",
  ],
  authors: [{ name: "Rupak R. Gupta" }, { name: "Abhay Upadhyay" }, { name: "Ghruank Kothare" }],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Kyber ML-KEM",
    description:
      "A high-performance C++20 implementation of the ML-KEM-768 (FIPS 203) post-quantum key encapsulation mechanism.",
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
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
