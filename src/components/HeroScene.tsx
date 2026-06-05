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
    ref.current.rotation.x = t * 0.1 + mouse.y * 0.3;
    ref.current.rotation.y = t * 0.15 + mouse.x * 0.5;
  });
  return (
    <mesh ref={ref} position={[1.2, 0, -0.8]}>
      <torusKnotGeometry args={[0.95, 0.28, 220, 32]} />
      <MeshTransmissionMaterial
        thickness={1.2}
        roughness={0.03}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.08}
        backside
        samples={8}
        resolution={512}
        distortion={0.3}
        distortionScale={0.4}
        temporalDistortion={0.06}
        color="#1a1a2e"
        attenuationColor="#8b5cf6"
        attenuationDistance={0.6}
      />
    </mesh>
  );
}

function Floaters() {
  const group = useRef<Group>(null);
  useFrame(({ mouse, clock }) => {
    if (!group.current) return;
    group.current.rotation.y += (mouse.x * 0.25 - group.current.rotation.y) * 0.02;
    group.current.rotation.x += (-mouse.y * 0.15 - group.current.rotation.x) * 0.02;
    group.current.position.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.06;
  });
  return (
    <group ref={group}>
      {/* Chrome sphere */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
        <Sphere args={[0.45, 64, 64]} position={[-3, 0.8, -1]}>
          <meshPhysicalMaterial
            color="#2a2a3e"
            metalness={1}
            roughness={0.05}
            clearcoat={1}
            envMapIntensity={2}
          />
        </Sphere>
      </Float>

      {/* Orbital ring */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.7}>
        <Torus args={[1.6, 0.012, 16, 200]} position={[0.5, 0, 0]} rotation={[1.4, 0.3, 0]}>
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
        </Torus>
      </Float>

      {/* Second ring */}
      <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.6}>
        <Torus args={[2.1, 0.008, 16, 200]} position={[0.5, 0, 0]} rotation={[0.5, 1.1, 0]}>
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
        </Torus>
      </Float>

      {/* Small accent dot */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
        <Sphere args={[0.18, 32, 32]} position={[2.8, 1.5, -1.5]}>
          <meshPhysicalMaterial color="#8b5cf6" metalness={0.4} roughness={0.1} clearcoat={1} emissive="#8b5cf6" emissiveIntensity={0.3} />
        </Sphere>
      </Float>

      {/* Tiny cyan dot */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.4}>
        <Sphere args={[0.12, 32, 32]} position={[-2, -1.3, 0.5]}>
          <meshPhysicalMaterial color="#06b6d4" metalness={0.5} roughness={0.08} emissive="#06b6d4" emissiveIntensity={0.2} />
        </Sphere>
      </Float>
    </group>
  );
}

function RimLight() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.x = Math.sin(t * 0.3) * 4;
    ref.current.position.z = Math.cos(t * 0.3) * 3 + 1;
  });
  return <pointLight ref={ref} intensity={3} color="#8b5cf6" distance={10} />;
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-4, -2, -3]} intensity={0.3} color="#06b6d4" />
        <RimLight />
        <Environment preset="night" />
        <Floaters />
        <Knot />
      </Suspense>
    </Canvas>
  );
}
