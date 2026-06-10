"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PrintStage, VisualConcept } from "@/lib/visual-lab/types";

interface PrinterViewProps {
  concept: VisualConcept;
  isPrinting: boolean;
  onPrintComplete: () => void;
}

const STAGE_MESSAGES: Record<PrintStage, string> = {
  heating: "Heating nozzle…",
  printing: "Printing",
  cooling: "Cooling print…",
  done: "Print complete!",
};

const LAYER_DURATION_MS = 650;
const HEATING_MS = 1200;
const COOLING_MS = 900;

export function PrinterView({ concept, isPrinting, onPrintComplete }: PrinterViewProps) {
  const [stage, setStage] = useState<PrintStage>("heating");
  const [currentLayer, setCurrentLayer] = useState(0);
  const [extruderX, setExtruderX] = useState(30);

  const totalLayers = concept.totalLayers;
  const progress = useMemo(() => {
    if (stage === "heating") return 0.08;
    if (stage === "cooling") return 0.95;
    if (stage === "done") return 1;
    return 0.15 + (currentLayer / totalLayers) * 0.75;
  }, [stage, currentLayer, totalLayers]);

  const statusText = useMemo(() => {
    if (stage === "printing") {
      return `${STAGE_MESSAGES.printing} layer ${currentLayer + 1}/${totalLayers}…`;
    }
    return STAGE_MESSAGES[stage];
  }, [stage, currentLayer, totalLayers]);

  useEffect(() => {
    if (!isPrinting) {
      setStage("heating");
      setCurrentLayer(0);
      setExtruderX(30);
      return;
    }

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, ms: number) => {
      timeouts.push(setTimeout(() => !cancelled && fn(), ms));
    };

    schedule(() => setStage("printing"), HEATING_MS);

    for (let i = 0; i < totalLayers; i++) {
      schedule(
        () => {
          setCurrentLayer(i);
          setExtruderX(25 + ((i * 37) % 50));
        },
        HEATING_MS + i * LAYER_DURATION_MS
      );
    }

    schedule(
      () => setStage("cooling"),
      HEATING_MS + totalLayers * LAYER_DURATION_MS
    );

    schedule(
      () => {
        setStage("done");
        onPrintComplete();
      },
      HEATING_MS + totalLayers * LAYER_DURATION_MS + COOLING_MS
    );

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [isPrinting, totalLayers, onPrintComplete]);

  const visibleLayers = concept.printLayers.filter((l) => l.index <= currentLayer);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card relative overflow-hidden p-4 md:p-6"
    >
      {/* Status bar */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              stage === "done"
                ? "bg-green-400"
                : stage === "cooling"
                  ? "bg-lab-cyan"
                  : "animate-pulse bg-lab-orange"
            }`}
          />
          <p className="font-mono text-xs text-lab-muted md:text-sm">{statusText}</p>
        </div>
        <p className="font-mono text-xs text-lab-cyan">{Math.round(progress * 100)}%</p>
      </div>

      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-lab-cyan via-lab-orange to-lab-orange-hot"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Printer SVG scene */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 to-lab-bg">
        <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="molten" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Printer frame */}
          <g opacity="0.9">
            <rect x="60" y="40" width="8" height="200" fill="#334155" rx="2" />
            <rect x="332" y="40" width="8" height="200" fill="#334155" rx="2" />
            <rect x="60" y="40" width="280" height="8" fill="#475569" rx="2" />
            <rect x="60" y="232" width="280" height="8" fill="#475569" rx="2" />
            <line x1="68" y1="48" x2="332" y2="48" stroke="#1e293b" strokeWidth="4" />
          </g>

          {/* X rail */}
          <motion.line
            x1="80"
            y1="55"
            x2="320"
            y2="55"
            stroke="#64748b"
            strokeWidth="3"
            animate={{ opacity: isPrinting ? 1 : 0.5 }}
          />

          {/* Extruder carriage */}
          <motion.g
            animate={{ x: extruderX }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <rect x="100" y="48" width="36" height="22" fill="#1e293b" rx="4" />
            <rect x="112" y="70" width="12" height="18" fill="#475569" rx="2" />
            {/* Nozzle glow */}
            <AnimatePresence>
              {(stage === "printing" || stage === "heating") && (
                <motion.circle
                  cx="118"
                  cy="92"
                  r="6"
                  fill="url(#molten)"
                  filter="url(#glow)"
                  initial={{ opacity: 0, r: 3 }}
                  animate={{ opacity: [0.6, 1, 0.6], r: [5, 7, 5] }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                />
              )}
            </AnimatePresence>
            {/* Molten drip */}
            {stage === "printing" && (
              <motion.line
                x1="118"
                y1="94"
                x2="118"
                y2="110"
                stroke="url(#molten)"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{ opacity: [0.3, 1, 0.3], y2: [108, 115, 108] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              />
            )}
          </motion.g>

          {/* Print bed */}
          <rect x="85" y="210" width="230" height="6" fill="#1e293b" rx="1" />
          <rect
            x="90"
            y="200"
            width="220"
            height="10"
            fill="#0f172a"
            stroke="#334155"
            strokeWidth="1"
            rx="2"
          />

          {/* Layer buildup */}
          <g transform="translate(90, 198)">
            {visibleLayers.map((layer) =>
              layer.shapes.map((shape, si) => (
                <motion.rect
                  key={`${layer.index}-${si}`}
                  x={shape.x}
                  y={-layer.index * 7 - (shape.y - 80)}
                  width={shape.width ?? 20}
                  height={shape.height ?? 6}
                  fill={shape.fill}
                  rx="1"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ transformOrigin: `${shape.x}px ${-layer.index * 7}px` }}
                />
              ))
            )}
          </g>

          {/* Particles while printing */}
          {stage === "printing" &&
            Array.from({ length: 6 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={118 + extruderX}
                cy={100 + i * 8}
                r="1.5"
                fill="#22d3ee"
                initial={{ opacity: 0.8, y: 0 }}
                animate={{ opacity: 0, y: 20 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: i * 0.12,
                }}
              />
            ))}
        </svg>

        {/* Screen overlay */}
        <div className="absolute bottom-3 left-3 rounded-lg border border-white/10 bg-black/50 px-3 py-1.5 font-mono text-[10px] text-lab-cyan backdrop-blur-sm md:text-xs">
          MK-Scout · {concept.style.toUpperCase()} · 0.2mm
        </div>
      </div>
    </motion.div>
  );
}
