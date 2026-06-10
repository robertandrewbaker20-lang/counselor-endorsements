"use client";

import { motion } from "framer-motion";
import { PROMPT_EXAMPLES } from "@/lib/visual-lab/generateVisualConcept";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function PromptInput({
  value,
  onChange,
  onSubmit,
  disabled,
  isLoading,
}: PromptInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="mx-auto w-full max-w-2xl"
    >
      <label htmlFor="visual-prompt" className="sr-only">
        What do you want to understand visually?
      </label>
      <div className="glass-card glow-cyan overflow-hidden p-1">
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
          <input
            id="visual-prompt"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !disabled && onSubmit()}
            disabled={disabled}
            placeholder='Try "how a lever works" or "water cycle"...'
            className="flex-1 bg-transparent px-2 py-3 text-lg text-lab-text placeholder:text-lab-muted/60 focus:outline-none disabled:opacity-50"
          />
          <motion.button
            type="button"
            onClick={onSubmit}
            disabled={disabled || !value.trim()}
            whileHover={{ scale: disabled ? 1 : 1.03 }}
            whileTap={{ scale: disabled ? 1 : 0.97 }}
            className="rounded-xl bg-gradient-to-r from-lab-cyan to-lab-cyan-dim px-6 py-3 font-semibold text-lab-bg shadow-lg transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-lab-bg/30 border-t-lab-bg" />
                Slicing…
              </span>
            ) : (
              "Print it →"
            )}
          </motion.button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {PROMPT_EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            disabled={disabled}
            onClick={() => onChange(example)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-lab-muted transition hover:border-lab-orange/50 hover:text-lab-orange disabled:opacity-40"
          >
            {example}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
