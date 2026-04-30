"use client";

import { useState, useEffect } from "react";
import Terminal from "./Terminal";

const GHRUANK_LINES = [
  "> ./client 192.168.1.116",
  "Quantum IRC Client (Production)",
  "ML-KEM-768 / AES-256-GCM",
  "Connecting to 192.168.1.116:6667 ...",
  "✓ Authenticated as ghruankkothare",
  "/chat rupakgupta",
  "Requesting rupakgupta's public key...",
  "Performing ML-KEM-768 encapsulation...",
  "✓ KEM sent. Waiting for acknowledgement...",
  "✓ Session established with rupakgupta",
  "[you] encrypted : 6ef7275020b5e83400ce9489cdc...",
  "[you] decrypted : hello rupak",
  "[rupakgupta] encrypted : d710857650dd0f339d58a83...",
  "[rupakgupta] decrypted : hello ghruank from ty it",
  "[you] encrypted : 3090d721f88484766d69dea35c3...",
  "[you] decrypted : how are you",
  "[rupakgupta] encrypted : c622b23ede85efe655d04a0...",
  "[rupakgupta] decrypted : im fine thank you",
];

const RUPAK_LINES = [
  "★ ghruankkothare is starting a secure session...",
  "Performing ML-KEM-768 decapsulation (KEM)...",
  "✓ Session established with ghruankkothare",
  "ML-KEM-768 + HKDF-SHA256 + AES-256-GCM",
  "[ghruankkothare] encrypted : 6ef7275020b5e83400ce9...",
  "[ghruankkothare] decrypted : hello rupak",
  "[you] encrypted : d710857650dd0f339d58a83...",
  "[you] decrypted : hello ghruank from ty it",
  "[ghruankkothare] encrypted : 3090d721f88484766d69...",
  "[ghruankkothare] decrypted : how are you",
  "[you] encrypted : c622b23ede85efe655d04a0...",
  "[you] decrypted : im fine thank you",
];

const SYNC_SEQUENCE = [
  // { g: ghruank_line_count, r: rupak_line_count, delay: ms_to_next_step }
  { g: 5, r: 0, delay: 1000 }, // Setup
  { g: 9, r: 0, delay: 1000 }, // Ghruank sends KEM
  { g: 9, r: 2, delay: 800 },  // Rupak decapsulates
  { g: 9, r: 4, delay: 600 },  // Rupak establishes session
  { g: 10, r: 4, delay: 800 }, // Ghruank establishes session
  { g: 12, r: 4, delay: 1000 }, // Ghruank sends msg
  { g: 12, r: 6, delay: 1000 }, // Rupak receives msg
  { g: 12, r: 8, delay: 1000 }, // Rupak sends reply
  { g: 14, r: 8, delay: 1000 }, // Ghruank receives reply
  { g: 16, r: 8, delay: 1000 }, // Ghruank sends msg
  { g: 16, r: 10, delay: 1000 }, // Rupak receives msg
  { g: 16, r: 12, delay: 1000 }, // Rupak sends reply
  { g: 18, r: 12, delay: 4000 }, // Ghruank receives reply, wait before loop
];

export default function ConversationTerminals() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep((prev) => (prev + 1) % SYNC_SEQUENCE.length);
    }, SYNC_SEQUENCE[step].delay);
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-actor-a"></div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted">ghruankkothare</span>
        </div>
        <Terminal
          title="ghruank@vjti:~"
          user="ghruank"
          hostname="vjti"
          lines={GHRUANK_LINES.slice(0, SYNC_SEQUENCE[step].g)}
          animate={true}
          className="h-[350px]"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-actor-b"></div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted">rupakgupta</span>
        </div>
        <Terminal
          title="rupak@vjti:~"
          user="rupak"
          hostname="vjti"
          lines={RUPAK_LINES.slice(0, SYNC_SEQUENCE[step].r)}
          animate={true}
          className="h-[350px]"
        />
      </div>
    </div>
  );
}
