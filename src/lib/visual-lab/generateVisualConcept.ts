import type { VisualConcept, VisualElement } from "./types";

function buildLeverConcept(): VisualConcept {
  const elements: VisualElement[] = [
    {
      id: "fulcrum",
      label: "Fulcrum",
      description: "The pivot point — the lever rotates around it.",
      color: "#94a3b8",
      shape: "box",
      position: [0, -0.3, 0],
      scale: [0.4, 0.2, 0.4],
      layer: 0,
    },
    {
      id: "beam",
      label: "Lever arm",
      description: "A rigid bar that transfers force.",
      color: "#22d3ee",
      shape: "box",
      position: [0, 0.1, 0],
      scale: [2.2, 0.12, 0.25],
      rotation: [0, 0, 0.15],
      layer: 2,
    },
    {
      id: "load",
      label: "Load",
      description: "The weight you're trying to move.",
      color: "#fb923c",
      shape: "box",
      position: [0.85, 0.55, 0],
      scale: [0.45, 0.45, 0.45],
      layer: 4,
    },
    {
      id: "effort",
      label: "Effort",
      description: "Where you push down — farther from the fulcrum = easier lift!",
      color: "#f97316",
      shape: "sphere",
      position: [-0.9, 0.35, 0],
      scale: [0.35, 0.35, 0.35],
      layer: 6,
    },
  ];

  return {
    title: "How a Lever Works",
    explanation:
      "A lever multiplies your force using a fulcrum. Push down on the long end (effort) and the short end lifts the load — classic mechanical advantage in action.",
    keyConcepts: [
      "Fulcrum = pivot point",
      "Effort arm vs. load arm length",
      "Mechanical advantage",
      "First-class lever layout",
    ],
    visualElements: elements,
    printLayers: buildLayersFromElements(elements, "lever"),
    totalLayers: 8,
    style: "technical",
    encouragement: "Nice! You just printed mechanical advantage.",
  };
}

function buildPhotosynthesisConcept(): VisualConcept {
  const elements: VisualElement[] = [
    {
      id: "leaf",
      label: "Leaf",
      description: "The solar panel of the plant — captures light energy.",
      color: "#22c55e",
      shape: "box",
      position: [0, 0, 0],
      scale: [1.8, 0.08, 1],
      layer: 0,
    },
    {
      id: "chloroplast",
      label: "Chloroplast",
      description: "Tiny green factories where photosynthesis happens.",
      color: "#4ade80",
      shape: "sphere",
      position: [-0.3, 0.15, 0.2],
      scale: [0.35, 0.35, 0.35],
      layer: 2,
    },
    {
      id: "sun",
      label: "Sunlight",
      description: "Energy input — photons power the reaction.",
      color: "#fbbf24",
      shape: "sphere",
      position: [0, 1.2, 0],
      scale: [0.5, 0.5, 0.5],
      layer: 4,
    },
    {
      id: "co2",
      label: "CO₂",
      description: "Carbon dioxide enters through stomata.",
      color: "#94a3b8",
      shape: "sphere",
      position: [-0.8, 0.4, 0],
      scale: [0.25, 0.25, 0.25],
      layer: 5,
    },
    {
      id: "o2",
      label: "O₂",
      description: "Oxygen released as a byproduct — thanks, plants!",
      color: "#22d3ee",
      shape: "sphere",
      position: [0.7, 0.5, 0.3],
      scale: [0.22, 0.22, 0.22],
      layer: 7,
    },
  ];

  return {
    title: "Photosynthesis in a Leaf",
    explanation:
      "Inside chloroplasts, sunlight + water + CO₂ become glucose and oxygen. The leaf is basically a tiny power plant fueled by sunshine.",
    keyConcepts: [
      "Light energy → chemical energy",
      "Chlorophyll captures photons",
      "CO₂ in, O₂ out",
      "Glucose fuels the plant",
    ],
    visualElements: elements,
    printLayers: buildLayersFromElements(elements, "leaf"),
    totalLayers: 8,
    style: "playful",
    encouragement: "You printed a leaf that makes its own food. Wild.",
  };
}

function buildPulleyConcept(): VisualConcept {
  const elements: VisualElement[] = [
    {
      id: "frame",
      label: "Support frame",
      description: "Holds the pulleys in place overhead.",
      color: "#64748b",
      shape: "box",
      position: [0, 1, 0],
      scale: [1.6, 0.1, 0.3],
      layer: 0,
    },
    {
      id: "pulley1",
      label: "Fixed pulley",
      description: "Changes direction of force — doesn't reduce effort alone.",
      color: "#22d3ee",
      shape: "torus",
      position: [-0.4, 0.5, 0],
      scale: [0.5, 0.5, 0.15],
      layer: 2,
    },
    {
      id: "pulley2",
      label: "Movable pulley",
      description: "Attached to the load — shares the weight.",
      color: "#38bdf8",
      shape: "torus",
      position: [0.4, 0, 0],
      scale: [0.45, 0.45, 0.12],
      layer: 4,
    },
    {
      id: "rope",
      label: "Rope",
      description: "Transfers your pull around the wheels.",
      color: "#f1f5f9",
      shape: "cylinder",
      position: [0, 0.25, 0],
      scale: [0.04, 1.2, 0.04],
      rotation: [0, 0, 0.3],
      layer: 5,
    },
    {
      id: "weight",
      label: "Load",
      description: "What you're hoisting — pulleys divide the work.",
      color: "#fb923c",
      shape: "box",
      position: [0.4, -0.6, 0],
      scale: [0.5, 0.5, 0.5],
      layer: 7,
    },
  ];

  return {
    title: "Simple Machines: Pulley System",
    explanation:
      "Pulleys redirect force and, in combinations, reduce how hard you have to pull. More wheels sharing the load = less effort per scout.",
    keyConcepts: [
      "Fixed vs. movable pulley",
      "Rope path matters",
      "Mechanical advantage stacks",
      "Trade distance for force",
    ],
    visualElements: elements,
    printLayers: buildLayersFromElements(elements, "pulley"),
    totalLayers: 8,
    style: "technical",
    encouragement: "Pulley power unlocked. Hoist away!",
  };
}

function buildWaterCycleConcept(): VisualConcept {
  const elements: VisualElement[] = [
    {
      id: "ocean",
      label: "Ocean",
      description: "Huge reservoir — sun evaporates surface water.",
      color: "#0ea5e9",
      shape: "box",
      position: [0, -0.8, 0],
      scale: [2.5, 0.3, 1.2],
      layer: 0,
    },
    {
      id: "vapor",
      label: "Evaporation",
      description: "Water rises as invisible vapor.",
      color: "#67e8f9",
      shape: "sphere",
      position: [-0.5, 0.2, 0],
      scale: [0.3, 0.3, 0.3],
      layer: 2,
    },
    {
      id: "cloud",
      label: "Cloud",
      description: "Vapor cools and condenses into droplets.",
      color: "#e2e8f0",
      shape: "sphere",
      position: [0, 0.8, 0],
      scale: [0.9, 0.5, 0.6],
      layer: 4,
    },
    {
      id: "rain",
      label: "Precipitation",
      description: "Droplets get heavy and fall as rain.",
      color: "#38bdf8",
      shape: "cone",
      position: [0.3, 0.1, 0],
      scale: [0.15, 0.4, 0.15],
      layer: 6,
    },
    {
      id: "mountain",
      label: "Land",
      description: "Runoff returns water to rivers and the sea.",
      color: "#78716c",
      shape: "cone",
      position: [-0.8, -0.3, 0],
      scale: [0.8, 0.6, 0.8],
      layer: 3,
    },
  ];

  return {
    title: "The Water Cycle",
    explanation:
      "Water never disappears — it loops. Evaporation lifts it, clouds store it, precipitation delivers it, and runoff sends it home to the ocean.",
    keyConcepts: [
      "Evaporation from heat",
      "Condensation in clouds",
      "Precipitation returns water",
      "Collection & runoff",
    ],
    visualElements: elements,
    printLayers: buildLayersFromElements(elements, "water"),
    totalLayers: 8,
    style: "playful",
    encouragement: "The cycle never stops — and now you've seen it in 3D.",
  };
}

function buildLayersFromElements(
  elements: VisualElement[],
  theme: string
): VisualConcept["printLayers"] {
  const layers: VisualConcept["printLayers"] = [];
  const maxLayer = Math.max(...elements.map((e) => e.layer), 7);

  for (let i = 0; i <= maxLayer; i++) {
    const partsAtLayer = elements.filter((e) => e.layer === i);
    const shapes = partsAtLayer.map((el, idx) => ({
      type: "rect" as const,
      x: 40 + idx * 25 + (theme === "lever" ? el.position[0] * 30 : 0),
      y: 80 - i * 8,
      width: 20 + el.scale[0] * 15,
      height: 6 + el.scale[1] * 20,
      fill: el.color,
    }));

    if (shapes.length === 0) {
      shapes.push({
        type: "rect",
        x: 50 + (i % 3) * 15,
        y: 80 - i * 8,
        width: 30,
        height: 4,
        fill: `hsl(${180 + i * 12}, 70%, 55%)`,
      });
    }

    layers.push({
      index: i,
      label: partsAtLayer[0]?.label ?? `Layer ${i + 1}`,
      shapes,
    });
  }

  return layers;
}

function matchConcept(prompt: string): VisualConcept {
  const lower = prompt.toLowerCase();

  if (lower.includes("lever") || lower.includes("fulcrum")) {
    return { ...buildLeverConcept(), title: "How a Lever Works" };
  }
  if (lower.includes("photo") || lower.includes("leaf") || lower.includes("chloro")) {
    return { ...buildPhotosynthesisConcept(), title: "Photosynthesis in a Leaf" };
  }
  if (lower.includes("pulley") || lower.includes("simple machine")) {
    return { ...buildPulleyConcept(), title: "Simple Machines: Pulley System" };
  }
  if (lower.includes("water") || lower.includes("cycle") || lower.includes("rain")) {
    return { ...buildWaterCycleConcept(), title: "The Water Cycle" };
  }

  // Default: lever with customized title
  const base = buildLeverConcept();
  const title =
    prompt.trim().length > 3
      ? prompt.trim().replace(/^\w/, (c) => c.toUpperCase())
      : base.title;

  return { ...base, title };
}

/**
 * Generates a structured visual concept from a scout's learning prompt.
 *
 * // TODO: Replace this mock with real LLM call using Vercel AI SDK or fetch to /api/generate
 * // Expected flow:
 * // 1. POST { prompt } to /api/generate
 * // 2. Parse structured JSON (title, explanation, visualElements, etc.)
 * // 3. Validate with zod schema before returning
 */
export async function generateVisualConcept(prompt: string): Promise<VisualConcept> {
  // Simulate network + model latency for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 1400 + Math.random() * 600));

  const concept = matchConcept(prompt);

  // Slight variation on re-print
  if (Math.random() > 0.5) {
    concept.encouragement =
      concept.encouragement + " Ready to explore — click any part!";
  }

  return concept;
}

export const PROMPT_EXAMPLES = [
  "how a lever works",
  "photosynthesis in a leaf",
  "simple machines pulley system",
  "water cycle",
];
