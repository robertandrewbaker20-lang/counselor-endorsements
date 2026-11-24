"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function VisualLabHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-between px-6 py-5 md:px-10"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-lab-cyan to-lab-orange text-lg font-bold text-lab-bg shadow-lg glow-cyan">
          P
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-lab-muted">
            AI Merit Badge
          </p>
          <p className="text-sm font-semibold text-lab-text">Visual Lab</p>
        </div>
      </div>

      <Link
        href="/index.html"
        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-lab-muted transition hover:border-lab-cyan/40 hover:text-lab-cyan"
      >
        ← Back to Home
      </Link>
    </motion.header>
  );
}
