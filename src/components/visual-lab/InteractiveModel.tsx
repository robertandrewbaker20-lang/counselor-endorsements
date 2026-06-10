"use client";

import { Suspense, useState } from "react";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Html, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import type { VisualElement } from "@/lib/visual-lab/types";

interface InteractiveModelProps {
  elements: VisualElement[];
  visible: boolean;
}

function PartMesh({
  element,
  selected,
  onSelect,
}: {
  element: VisualElement;
  selected: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const color = element.color;
  const emissive = selected ? "#22d3ee" : hovered ? "#fb923c" : "#000000";
  const emissiveIntensity = selected ? 0.4 : hovered ? 0.25 : 0;

  const meshProps = {
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onSelect();
    },
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHovered(true);
      document.body.style.cursor = "pointer";
    },
    onPointerOut: () => {
      setHovered(false);
      document.body.style.cursor = "auto";
    },
    castShadow: true,
    receiveShadow: true,
  };

  const material = (
    <meshStandardMaterial
      color={color}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity}
      metalness={0.3}
      roughness={0.4}
    />
  );

  return (
    <group
      position={element.position}
      rotation={element.rotation ?? [0, 0, 0]}
      scale={element.scale}
    >
      {element.shape === "box" && (
        <mesh {...meshProps}>
          <boxGeometry args={[1, 1, 1]} />
          {material}
        </mesh>
      )}
      {element.shape === "sphere" && (
        <mesh {...meshProps}>
          <sphereGeometry args={[0.5, 24, 24]} />
          {material}
        </mesh>
      )}
      {element.shape === "cylinder" && (
        <mesh {...meshProps}>
          <cylinderGeometry args={[0.5, 0.5, 1, 24]} />
          {material}
        </mesh>
      )}
      {element.shape === "torus" && (
        <mesh {...meshProps}>
          <torusGeometry args={[0.5, 0.15, 16, 32]} />
          {material}
        </mesh>
      )}
      {element.shape === "cone" && (
        <mesh {...meshProps}>
          <coneGeometry args={[0.5, 1, 24]} />
          {material}
        </mesh>
      )}

      {(selected || hovered) && (
        <Html distanceFactor={8} position={[0, 0.8, 0]} center>
          <div className="whitespace-nowrap rounded-lg border border-white/20 bg-black/80 px-3 py-1.5 text-xs text-lab-text backdrop-blur-sm">
            <span className="font-semibold text-lab-cyan">{element.label}</span>
            {selected && (
              <p className="mt-0.5 max-w-[180px] whitespace-normal text-lab-muted">
                {element.description}
              </p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

function Scene({
  elements,
  selectedId,
  onSelect,
}: {
  elements: VisualElement[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[3, 2.5, 4]} fov={45} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[-3, 2, -2]} intensity={0.5} color="#22d3ee" />
      <pointLight position={[3, 1, 2]} intensity={0.4} color="#fb923c" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.8} />
      </mesh>

      <gridHelper args={[6, 12, "#1e293b", "#1e293b"]} position={[0, -0.79, 0]} />

      {elements.map((el) => (
        <PartMesh
          key={el.id}
          element={el}
          selected={selectedId === el.id}
          onSelect={() => onSelect(el.id)}
        />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={2.5}
        maxDistance={8}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate={!selectedId}
        autoRotateSpeed={0.6}
      />
    </>
  );
}

export function InteractiveModel({ elements, visible }: InteractiveModelProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="glass-card glow-orange relative overflow-hidden"
    >
      <div className="absolute left-4 top-4 z-10 rounded-lg border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-lab-muted backdrop-blur-sm">
        Drag to orbit · Click parts to learn
      </div>

      <div className="h-[320px] w-full md:h-[400px]">
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <Scene
              elements={elements}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
            />
          </Suspense>
        </Canvas>
      </div>
    </motion.div>
  );
}
