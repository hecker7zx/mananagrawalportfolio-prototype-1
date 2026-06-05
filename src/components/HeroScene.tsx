import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, Sphere, Torus } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";

function Knot() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.13 + mouse.y * 0.35;
    ref.current.rotation.y = t * 0.18 + mouse.x * 0.55;
  });
  return (
    <mesh ref={ref} position={[0.3, 0, -0.5]}>
      <torusKnotGeometry args={[1.05, 0.30, 240, 32]} />
      <MeshTransmissionMaterial
        thickness={1.1}
        roughness={0.04}
        transmission={1}
        ior={1.4}
        chromaticAberration={0.06}
        backside
        samples={8}
        resolution={512}
        distortion={0.25}
        distortionScale={0.35}
        temporalDistortion={0.07}
        color="#ffffff"
        attenuationColor="#b8aaff"
        attenuationDistance={0.5}
      />
    </mesh>
  );
}

function Floaters() {
  const group = useRef<Group>(null);
  useFrame(({ mouse, clock }) => {
    if (!group.current) return;
    group.current.rotation.y += (mouse.x * 0.3 - group.current.rotation.y) * 0.03;
    group.current.rotation.x += (-mouse.y * 0.2 - group.current.rotation.x) * 0.03;
    // Slow continuous drift
    group.current.position.y = Math.sin(clock.getElapsedTime() * 0.25) * 0.08;
  });
  return (
    <group ref={group}>
      {/* Chrome sphere — left */}
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.2}>
        <Sphere args={[0.52, 64, 64]} position={[-3.2, 1.0, -0.8]}>
          <meshPhysicalMaterial
            color="#e0e0e8"
            metalness={1}
            roughness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>
      </Float>

      {/* Dark pill / capsule — bottom right */}
      <Float speed={1.0} rotationIntensity={0.4} floatIntensity={1.1}>
        <mesh position={[3.4, -1.2, -0.3]} rotation={[0.4, 0.2, 1.2]}>
          <capsuleGeometry args={[0.22, 1.4, 8, 32]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.18} />
        </mesh>
      </Float>

      {/* Iridescent icosahedron — top right */}
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[2.8, 1.8, -1.8]}>
          <icosahedronGeometry args={[0.52, 0]} />
          <meshPhysicalMaterial
            color="#d0c8ff"
            metalness={0.6}
            roughness={0.08}
            clearcoat={1}
            iridescence={1}
            iridescenceIOR={1.4}
          />
        </mesh>
      </Float>

      {/* Thin orbital ring 1 */}
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.9}>
        <Torus args={[1.7, 0.013, 16, 240]} position={[0, 0, 0]} rotation={[1.5, 0.3, 0]}>
          <meshBasicMaterial color="#1a1a2e" transparent opacity={0.6} />
        </Torus>
      </Float>

      {/* Thin orbital ring 2 */}
      <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.8}>
        <Torus args={[2.2, 0.009, 16, 240]} position={[0, 0, 0]} rotation={[0.6, 1.2, 0]}>
          <meshBasicMaterial color="#1a1a2e" transparent opacity={0.4} />
        </Torus>
      </Float>

      {/* Small accent sphere — lower left */}
      <Float speed={1.8} rotationIntensity={0.7} floatIntensity={1.4}>
        <Sphere args={[0.22, 32, 32]} position={[-2.5, -1.6, 0.2]}>
          <meshPhysicalMaterial
            color="#c8b8ff"
            metalness={0.5}
            roughness={0.1}
            clearcoat={1}
          />
        </Sphere>
      </Float>

      {/* Tiny chrome dot — top left */}
      <Float speed={2.2} rotationIntensity={1} floatIntensity={1.6}>
        <Sphere args={[0.14, 32, 32]} position={[-1.8, 2.2, 0.5]}>
          <meshPhysicalMaterial color="#ffffff" metalness={1} roughness={0.05} />
        </Sphere>
      </Float>
    </group>
  );
}

/** Animated point-light that orbits the scene for dynamic reflections */
function OrbLight() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.x = Math.sin(t * 0.4) * 5;
    ref.current.position.y = Math.cos(t * 0.3) * 3;
    ref.current.position.z = Math.cos(t * 0.4) * 3 + 2;
  });
  return <pointLight ref={ref} intensity={2.5} color="#c8b8ff" distance={12} />;
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} />
        <directionalLight position={[-5, -3, -2]} intensity={0.5} color="#c8d8ff" />
        <OrbLight />
        <Environment preset="studio" />
        <Floaters />
        <Knot />
      </Suspense>
    </Canvas>
  );
}
