import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import type { Group } from "three";
import { FadeIn, SectionLabel } from "./Section";

const skills = [
  { name: "HTML", angle: 0, r: 2.2, level: "Mastery" },
  { name: "CSS", angle: 45, r: 2.4, level: "Mastery" },
  { name: "JavaScript", angle: 90, r: 2.6, level: "Expert" },
  { name: "WordPress", angle: 140, r: 2.3, level: "Expert" },
  { name: "Canva", angle: 190, r: 2.5, level: "Advanced" },
  { name: "Photoshop", angle: 240, r: 2.4, level: "Advanced" },
  { name: "Illustrator", angle: 295, r: 2.3, level: "Advanced" },
];

function Galaxy({ onHover }: { onHover: (s: typeof skills[number] | null) => void }) {
  const group = useRef<Group>(null);
  useFrame(({ mouse, clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.12 + mouse.x * 0.3;
    group.current.rotation.x = mouse.y * 0.2;
  });
  return (
    <group ref={group}>
      {/* Core */}
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshPhysicalMaterial color="#0a0a0a" metalness={0.7} roughness={0.2} clearcoat={1} />
      </mesh>
      {/* Orbit rings */}
      {[1.6, 2.2, 2.8].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, i * 0.4, 0]}>
          <torusGeometry args={[r, 0.005, 12, 200]} />
          <meshBasicMaterial color="#111111" transparent opacity={0.25} />
        </mesh>
      ))}
      {skills.map((s) => {
        const a = (s.angle * Math.PI) / 180;
        const x = Math.cos(a) * s.r;
        const z = Math.sin(a) * s.r;
        const y = Math.sin(a * 2) * 0.4;
        return (
          <Float key={s.name} speed={1.5} rotationIntensity={0.6} floatIntensity={0.6}>
            <group position={[x, y, z]}>
              <mesh
                onPointerOver={() => onHover(s)}
                onPointerOut={() => onHover(null)}
              >
                <sphereGeometry args={[0.22, 32, 32]} />
                <meshPhysicalMaterial color="#ffffff" metalness={0.4} roughness={0.15} clearcoat={1} />
              </mesh>
              <Text
                position={[0, 0.45, 0]}
                fontSize={0.14}
                color="#111111"
                anchorX="center"
                anchorY="middle"
              >
                {s.name}
              </Text>
            </group>
          </Float>
        );
      })}
    </group>
  );
}

export function SkillsGalaxy() {
  const [hovered, setHovered] = useState<typeof skills[number] | null>(null);

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
      <SectionLabel index="02 / Skills">Capabilities Matrix</SectionLabel>

      <div className="grid gap-10 md:grid-cols-12">
        <FadeIn>
          <div className="md:col-span-4">
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              An orbiting toolkit.
            </h2>
            <p className="mt-6 max-w-md text-foreground/70">
              Every node is a craft I use to shape ideas into shippable, premium
              digital products. Move your cursor through the galaxy.
            </p>
            <div className="mt-10 glass rounded-2xl p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">Probe</div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-display text-2xl font-semibold">
                  {hovered?.name ?? "Idle"}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                  {hovered?.level ?? "Hover a node"}
                </span>
              </div>
              <div className="mt-4 h-px w-full bg-foreground/10" />
              <div className="mt-3 grid grid-cols-7 gap-1">
                {skills.map((s) => (
                  <div
                    key={s.name}
                    className="h-1 rounded-full bg-foreground/20"
                    style={{ opacity: hovered?.name === s.name ? 1 : 0.3 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative md:col-span-8">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-white to-[oklch(0.94_0_0)]">
              <div className="absolute inset-0 grid-lines opacity-50" />
              <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[4, 4, 4]} intensity={1.2} />
                  <Galaxy onHover={setHovered} />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
