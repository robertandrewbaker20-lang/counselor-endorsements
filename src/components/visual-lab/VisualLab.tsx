"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateVisualConcept } from "@/lib/visual-lab/generateVisualConcept";
import type { AppPhase, VisualConcept } from "@/lib/visual-lab/types";
import { VisualLabHeader } from "./VisualLabHeader";
import { PromptInput } from "./PromptInput";
import { ConceptPanel } from "./ConceptPanel";
import { PrinterView } from "./PrinterView";
import { InteractiveModel } from "./InteractiveModel";
import { ActionButtons } from "./ActionButtons";

const STYLES: VisualConcept["style"][] = ["technical", "playful", "schematic"];

export function VisualLab() {
  const [prompt, setPrompt] = useState("");
  const [phase, setPhase] = useState<AppPhase>("idle");
  const [concept, setConcept] = useState<VisualConcept | null>(null);
  const [styleIndex, setStyleIndex] = useState(0);
  const [printRun, setPrintRun] = useState(0);

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim() || phase === "generating") return;

    setPhase("generating");
    try {
      const result = await generateVisualConcept(prompt);
      result.style = STYLES[styleIndex % STYLES.length];
      setConcept(result);
      setPrintRun((n) => n + 1);
      setPhase("printing");
    } catch {
      setPhase("idle");
    }
  }, [prompt, phase, styleIndex]);

  const handlePrintComplete = useCallback(() => {
    setPhase("complete");
  }, []);

  const handlePrintAnother = useCallback(() => {
    if (!concept) return;
    setPrintRun((n) => n + 1);
    setPhase("printing");
  }, [concept]);

  const handleChangeStyle = useCallback(() => {
    if (!concept) return;
    const next = (styleIndex + 1) % STYLES.length;
    setStyleIndex(next);
    setConcept({ ...concept, style: STYLES[next] });
    setPrintRun((n) => n + 1);
    setPhase("printing");
  }, [concept, styleIndex]);

  const handleStartOver = useCallback(() => {
    setPhase("idle");
    setConcept(null);
    setPrompt("");
  }, []);

  const showWorkspace = concept && phase !== "idle" && phase !== "generating";
  const showModel = phase === "complete";
  const showPrinter = phase === "printing";

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-lab-cyan/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-lab-orange/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 md:px-8">
        <VisualLabHeader />

        {/* Hero */}
        <section className="py-8 text-center md:py-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-lab-cyan"
          >
            Prompt & Print
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl font-extrabold tracking-tight md:text-6xl"
          >
            <span className="text-gradient-molten">Visual Lab</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-lg text-lab-muted"
          >
            Type what you want to understand. Watch the printer build it layer by
            layer — then explore your model in 3D.
          </motion.p>

          <div className="mt-10">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleSubmit}
              disabled={phase === "generating" || phase === "printing"}
              isLoading={phase === "generating"}
            />
          </div>
        </section>

        {/* Workspace */}
        <AnimatePresence mode="wait">
          {showWorkspace && concept && (
            <motion.section
              key="workspace"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-8"
            >
              <ConceptPanel concept={concept} visible={!!concept} />

              <div className="flex flex-col gap-6">
                {showPrinter && (
                  <PrinterView
                    key={printRun}
                    concept={concept}
                    isPrinting={phase === "printing"}
                    onPrintComplete={handlePrintComplete}
                  />
                )}
                {showModel && (
                  <InteractiveModel
                    elements={concept.visualElements}
                    visible={showModel}
                  />
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <div className="mt-10">
          <ActionButtons
            visible={phase === "complete"}
            onPrintAnother={handlePrintAnother}
            onChangeStyle={handleChangeStyle}
            onStartOver={handleStartOver}
          />
        </div>
      </div>
    </div>
  );
}
