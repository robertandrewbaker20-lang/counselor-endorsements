"use client";

import { motion } from "framer-motion";
import type { VisualConcept } from "@/lib/visual-lab/types";

interface ConceptPanelProps {
  concept: VisualConcept;
  visible: boolean;
}

export function ConceptPanel({ concept, visible }: ConceptPanelProps) {
  if (!visible) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card flex flex-col gap-5 p-6 md:p-8"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-lab-cyan">
          Your concept
        </p>
        <h2 className="mt-1 text-2xl font-bold text-lab-text md:text-3xl">
          {concept.title}
        </h2>
      </div>

      <p className="text-base leading-relaxed text-lab-muted">{concept.explanation}</p>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-lab-orange">
          Key ideas
        </h3>
        <ul className="space-y-2">
          {concept.keyConcepts.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex items-start gap-2 text-sm text-lab-text"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lab-cyan" />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl border border-lab-orange/20 bg-lab-orange/10 px-4 py-3 text-sm text-lab-orange"
      >
        {concept.encouragement}
      </motion.p>
    </motion.aside>
  );
}
