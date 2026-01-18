import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Cloud } from '@react-three/drei';
// postprocessing disabled
import * as THREE from 'three';


interface FragmentData {
  position: THREE.Vector3;
  originalPosition: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: THREE.Euler;
  rotationSpeed: THREE.Vector3;
  scale: number;
  phase: number;
  floatAmplitude: number;
  floatFrequency: number;
  lastTarget: THREE.Vector3;
  explodeMultiplier: number;
  opacityFactor: number;
  isOuter?: boolean;
}

const ExplodingSphere = ({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) => {
  const groupRef = useRef<THREE.Group>(null);
  const fragmentsRef = useRef<THREE.Mesh[]>([]);
  // Core sphere removed
  const innerCount = 120;
  const outerCount = 32; // subtle background extras
  // Global scroll tuning: lower gain and heavier smoothing for calmer motion
  const SCROLL_GAIN = 0.45; // overall movement multiplier (lower = slower)
  const DAMP_LAMBDA = 1.5;  // lower lambda = smoother/slow approach
  const smoothProgressRef = useRef(0);
  // Reuse temp vectors to reduce per-frame allocations (avoid GC stutter)
  const tmpPos = useRef(new THREE.Vector3());
  const tmpVel = useRef(new THREE.Vector3());
  const tmpNorm = useRef(new THREE.Vector3());

  const fragments = useMemo<FragmentData[]>(() => {
    const frags: FragmentData[] = [];
    // Super-sized hero shards (a few very large pieces for contrast)
    const superCount = 6;
    for (let i = 0; i < superCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.6;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      const originalPos = new THREE.Vector3(x, y, z);
      // Heavier feel: lower velocity and rotation speeds
      const velocity = originalPos.clone().normalize().multiplyScalar(1.2 + Math.random() * 0.8);
      velocity.x += (Math.random() - 0.5) * 0.8;
      velocity.y += (Math.random() - 0.5) * 0.8;
      velocity.z += (Math.random() - 0.5) * 0.8;
      const scale = 0.42 + Math.random() * 0.18; // super large
      frags.push({
        position: originalPos.clone(),
        originalPosition: originalPos.clone(),
        velocity,
        rotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 2.2,
          (Math.random() - 0.5) * 2.2,
          (Math.random() - 0.5) * 2.2
        ),
        scale,
        phase: Math.random() * Math.PI * 2,
        floatAmplitude: 0.08 + Math.random() * 0.12, // gentler float
        floatFrequency: 0.45 + Math.random() * 0.4,
        lastTarget: originalPos.clone(),
        explodeMultiplier: 0.9,
        opacityFactor: 1.0,
        isOuter: false,
      });
    }
    // Inner sphere shards
    for (let i = 0; i < innerCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.8;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      const originalPos = new THREE.Vector3(x, y, z);
      const velocity = originalPos.clone().normalize().multiplyScalar(2 + Math.random() * 3);
      velocity.x += (Math.random() - 0.5) * 2;
      velocity.y += (Math.random() - 0.5) * 2;
      velocity.z += (Math.random() - 0.5) * 2;
      // Mixed size distribution: some big hero shards, some tiny, many medium
      const rScale = Math.random();
      const scale = rScale < 0.10
        ? 0.15 + Math.random() * 0.08   // fewer big shards (non-super)
        : rScale < 0.35
          ? 0.03 + Math.random() * 0.05 // tiny shards
          : 0.08 + Math.random() * 0.12; // medium shards
      frags.push({
        position: originalPos.clone(),
        originalPosition: originalPos.clone(),
        velocity,
        rotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ),
        scale,
        phase: Math.random() * Math.PI * 2,
        floatAmplitude: 0.15 + Math.random() * 0.25,
        floatFrequency: 0.6 + Math.random() * 0.6,
        lastTarget: originalPos.clone(),
        explodeMultiplier: 1.2,
        opacityFactor: 1.0,
        isOuter: false,
      });
    }
    // Outer halo extras (subtle background actors)
    for (let i = 0; i < outerCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3.6 + Math.random() * 0.8; // sit well outside the sphere
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      const originalPos = new THREE.Vector3(x, y, z);
      const velocity = originalPos.clone().normalize().multiplyScalar(0.6 + Math.random() * 0.6);
      velocity.x += (Math.random() - 0.5) * 0.6;
      velocity.y += (Math.random() - 0.5) * 0.6;
      velocity.z += (Math.random() - 0.5) * 0.6;
      // Outer extras: mostly tiny, occasional small-medium
      const rScaleOuter = Math.random();
      const scaleOuter = rScaleOuter < 0.8
        ? 0.02 + Math.random() * 0.04 // tiny
        : 0.05 + Math.random() * 0.06; // small-medium
      frags.push({
        position: originalPos.clone(),
        originalPosition: originalPos.clone(),
        velocity,
        rotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3
        ),
        scale: scaleOuter,
        phase: Math.random() * Math.PI * 2,
        floatAmplitude: 0.06 + Math.random() * 0.1,
        floatFrequency: 0.3 + Math.random() * 0.5,
        lastTarget: originalPos.clone(),
        explodeMultiplier: 0.6, // slower/minimal drift on explosion
        opacityFactor: 0.3, // much subtler visuals
        isOuter: true,
      });
    }
    return frags;
  }, []);

  // Shared fragment geometry
  const fragmentGeometry = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);

  const elasticOut = (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  };

  useFrame((state, delta) => {
    const dt = (typeof delta === 'number' ? delta : 0.016);
    const sp = THREE.MathUtils.damp(smoothProgressRef.current, scrollRef.current, DAMP_LAMBDA, dt);
    const spScaled = Math.min(1, sp * SCROLL_GAIN);
    smoothProgressRef.current = sp;
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.08 * (1 - spScaled);
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12 * (1 - spScaled);
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.8) * (0.03 + spScaled * 0.02);
      groupRef.current.scale.set(breathe, breathe, breathe);
    }
    const t = state.clock.elapsedTime;
    fragmentsRef.current.forEach((mesh, i) => {
      if (!mesh || !fragments[i]) return;
      const frag = fragments[i];
      const explodeFactor = elasticOut(spScaled) * (frag.explodeMultiplier ?? 1);
      const explodedPos = tmpPos.current.copy(frag.originalPosition).add(
        tmpVel.current.copy(frag.velocity).multiplyScalar(explodeFactor)
      );
      mesh.position.lerpVectors(frag.originalPosition, explodedPos, sp);
      const normal = tmpNorm.current.copy(frag.originalPosition).normalize();
      const floatOffset = normal.multiplyScalar(
        Math.sin(t * frag.floatFrequency + frag.phase) * frag.floatAmplitude * (0.35 + spScaled * 0.4)
      );
      mesh.position.add(floatOffset);
      const movementSpeed = mesh.position.distanceTo(frag.lastTarget) / dt;
      frag.lastTarget.copy(mesh.position);
      const movementIntensity = Math.min(movementSpeed / 1.5, 1);
      const scalePulse = 1 + Math.sin(t * (frag.floatFrequency * 0.9) + frag.phase) * 0.06;
      mesh.scale.setScalar(frag.scale * scalePulse);
      mesh.rotation.x = frag.rotation.x + spScaled * frag.rotationSpeed.x * 0.7;
      mesh.rotation.y = frag.rotation.y + spScaled * frag.rotationSpeed.y * 0.7;
      mesh.rotation.z = frag.rotation.z + spScaled * frag.rotationSpeed.z * 0.7;
      const matAny = mesh.material as any;
      if (matAny) {
        const opacityVal = (1 - spScaled * 0.7) * (frag.opacityFactor ?? 1);
        if (matAny.uniforms) {
          const sh = matAny as THREE.ShaderMaterial;
          if (sh.uniforms.uOpacity) sh.uniforms.uOpacity.value = opacityVal;
          if (sh.uniforms.uTime) sh.uniforms.uTime.value = t;
          if (sh.uniforms.uMove) sh.uniforms.uMove.value = movementIntensity;
          if (sh.uniforms.uCamPos) sh.uniforms.uCamPos.value.copy((state.camera as THREE.Camera as any).position);
        } else {
          (matAny as THREE.MeshStandardMaterial).opacity = opacityVal;
          // Ensure emissive glow is off
          (matAny as THREE.MeshStandardMaterial).emissiveIntensity = 0;
          const phys = matAny as unknown as THREE.MeshPhysicalMaterial;
          if ('iridescence' in phys) {
            const baseMin = 200;
            const baseMax = 1200;
            const thickness = baseMin + (baseMax - baseMin) * movementIntensity;
            phys.iridescence = 0.75 + 0.25 * movementIntensity;
            phys.iridescenceThicknessRange = [baseMin, thickness];
            if ('transmission' in phys) {
              phys.transmission = 0.12 + 0.18 * movementIntensity;
            }
          }
        }
      }
    });
  });

  return (
    <Float
      speed={1.8}
      rotationIntensity={0.5}
      floatIntensity={1.0}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef}>
        {fragments.map((frag, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) fragmentsRef.current[i] = el;
            }}
            position={frag.originalPosition}
            scale={frag.scale}
            geometry={fragmentGeometry}
            castShadow
            receiveShadow
          >
            <meshPhysicalMaterial
              color={frag.isOuter ? "#000000" : "#000000"}
              metalness={0.1}
              roughness={0.58}
              clearcoat={1}
              clearcoatRoughness={0.18}
              specularIntensity={0.6}
              specularColor={"#ffffff"}
              flatShading
              transparent
              opacity={frag.isOuter ? 0.35 : 1}
              envMapIntensity={0}
            />
          </mesh>
        ))}
        {/* Core sphere removed per request */}
        {/* Central sphere light restored at 40%; infinite range for visibility */}
        <pointLight position={[0, 0, 0]} intensity={0.35} distance={0} decay={2} color="#ffffff" castShadow />
        {/* Atmosphere shells removed per request */}
      </group>
    </Float>
  );
};

// ParticleField removed per request (no small particles)

const Scene = ({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) => {
  return (
    <>
      <ambientLight intensity={0.18} />
      <directionalLight position={[5, 6, 4]} intensity={0.65} color="#ffffff" castShadow />
      <directionalLight position={[-4, -5, -6]} intensity={0.35} color="#ffffff" castShadow />
      {/* Off-axis cool point light for subtle highlights */}
      <pointLight position={[0.8, 0.5, 3]} intensity={0.06} color="#a1b8ff" />
      {/* Removed Environment to avoid colored reflections */}
      <Cloud position={[0, 0, 0]} scale={[5, 5, 5]} opacity={0.08} speed={0.18} color="#aeb2b9" segments={28} />
      <ExplodingSphere scrollRef={scrollRef} />
      {/* Bloom disabled */}
    </>
  );
};

export const HeroSphere = () => {
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      const scrollable = Math.max(1, docHeight - windowHeight);
      const progress = Math.min(scrollY / scrollable, 1);
      scrollRef.current = progress;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <fogExp2 attach="fog" args={["#000000", 0.03]} />
        <Scene scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
};

