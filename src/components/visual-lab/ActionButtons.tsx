"use client";

import { motion } from "framer-motion";

interface ActionButtonsProps {
  visible: boolean;
  onPrintAnother: () => void;
  onChangeStyle: () => void;
  onStartOver: () => void;
}

export function ActionButtons({
  visible,
  onPrintAnother,
  onChangeStyle,
  onStartOver,
}: ActionButtonsProps) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap justify-center gap-3"
    >
      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onPrintAnother}
        className="rounded-xl border border-lab-cyan/40 bg-lab-cyan/10 px-5 py-2.5 text-sm font-medium text-lab-cyan transition hover:bg-lab-cyan/20"
      >
        Print another version
      </motion.button>
      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onChangeStyle}
        className="rounded-xl border border-lab-orange/40 bg-lab-orange/10 px-5 py-2.5 text-sm font-medium text-lab-orange transition hover:bg-lab-orange/20"
      >
        Try a different style
      </motion.button>
      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onStartOver}
        className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-lab-muted transition hover:text-lab-text"
      >
        Start over
      </motion.button>
    </motion.div>
  );
}
