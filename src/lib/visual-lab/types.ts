export type ShapeType = "box" | "cylinder" | "sphere" | "torus" | "cone";

export interface VisualElement {
  id: string;
  label: string;
  description: string;
  color: string;
  shape: ShapeType;
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
  /** Layer index when this part appears during printing (0-based) */
  layer: number;
}

export interface PrintLayer {
  index: number;
  label: string;
  /** SVG path or shape hint for the printing animation */
  shapes: Array<{
    type: "rect" | "circle" | "path";
    x: number;
    y: number;
    width?: number;
    height?: number;
    r?: number;
    d?: string;
    fill: string;
  }>;
}

export interface VisualConcept {
  title: string;
  explanation: string;
  keyConcepts: string[];
  visualElements: VisualElement[];
  printLayers: PrintLayer[];
  totalLayers: number;
  style: "technical" | "playful" | "schematic";
  encouragement: string;
}

export type AppPhase =
  | "idle"
  | "generating"
  | "printing"
  | "complete";

export type PrintStage =
  | "heating"
  | "printing"
  | "cooling"
  | "done";
