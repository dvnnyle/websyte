import { useRef, useMemo, useEffect } from 'react'; // Grunnleggende React-hooks
import { Canvas, useFrame } from '@react-three/fiber'; // Canvas og animasjonsloop (React Three Fiber)
import { Float, Cloud, Html } from '@react-three/drei'; // Drei-hjelpere (Float, Cloud, Html)
import * as THREE from 'three'; // Three.js kjerne


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
  const innerCount = 120;
  const outerCount = 32;
  const smoothProgressRef = useRef(0);
  const tmpPos = useRef(new THREE.Vector3());
  const tmpVel = useRef(new THREE.Vector3());
  const tmpNorm = useRef(new THREE.Vector3());
  const cellSize = 0.9;
  const DAMP_LAMBDA = 1.5; // Lower for consistent scroll response from start
  const SCROLL_INTENSITY = 0.45;
  const ROTATION_RESPONSE = 0.35;
  const EXPLOSION_DISTANCE = 1.2; // Increase spread distance on scroll

  // Seeded random for deterministic fragment generation across refreshes
  const mulberry32 = (a: number) => {
    return () => {
      let t = (a += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const fragments = useMemo<FragmentData[]>(() => {
    const rand = mulberry32(123456789);
    const frags: FragmentData[] = [];
    const superCount = 1 + Math.floor(rand() * 5);
    const superPositions: THREE.Vector3[] = [];
    const superMinSeparation = 0.9;
    for (let k = 0; k < superCount; k++) {
      let tries = 0;
      let originalPos = new THREE.Vector3();
      while (tries < 25) {
        const theta = rand() * Math.PI * 2;
        const phi = Math.acos(2 * rand() - 1);
        const radius = 2.0;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        originalPos.set(x, y, z);
        const tooClose = superPositions.some(p => p.distanceTo(originalPos) < superMinSeparation);
        if (!tooClose) break;
        tries++;
      }
      superPositions.push(originalPos.clone());
      const velocity = originalPos.clone().normalize().multiplyScalar(1.2 + rand() * 0.8);
      velocity.x += (rand() - 0.5) * 0.4;
      velocity.y += (rand() - 0.5) * 0.4;
      velocity.z += (rand() - 0.5) * 0.4;
      const scale = (0.48 + rand() * 0.22) * 0.65;
      frags.push({
        position: originalPos.clone(),
        originalPosition: originalPos.clone(),
        velocity,
        rotation: new THREE.Euler(
          rand() * Math.PI * 2,
          rand() * Math.PI * 2,
          rand() * Math.PI * 2
        ),
        rotationSpeed: new THREE.Vector3(
          (rand() - 0.5) * 3,
          (rand() - 0.5) * 3,
          (rand() - 0.5) * 3
        ),
        scale,
        phase: rand() * Math.PI * 2,
        floatAmplitude: 0.08 + rand() * 0.1,
        floatFrequency: 0.35 + rand() * 0.25,
        lastTarget: originalPos.clone(),
        explodeMultiplier: 1.3,
        opacityFactor: 1.0,
        isOuter: false,
      });
    }
    for (let i = 0; i < innerCount; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const radius = 1.8;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      const originalPos = new THREE.Vector3(x, y, z);
      const velocity = originalPos.clone().normalize().multiplyScalar(2 + rand() * 3);
      velocity.x += (rand() - 0.5) * 2;
      velocity.y += (rand() - 0.5) * 2;
      velocity.z += (rand() - 0.5) * 2;
      const rScale = rand();
      const scale = rScale < 0.15
        ? 0.16 + rand() * 0.12
        : rScale < 0.35
          ? 0.03 + rand() * 0.05
          : 0.08 + rand() * 0.12;
      frags.push({
        position: originalPos.clone(),
        originalPosition: originalPos.clone(),
        velocity,
        rotation: new THREE.Euler(
          rand() * Math.PI * 2,
          rand() * Math.PI * 2,
          rand() * Math.PI * 2
        ),
        rotationSpeed: new THREE.Vector3(
          (rand() - 0.5) * 6,
          (rand() - 0.5) * 6,
          (rand() - 0.5) * 6
        ),
        scale,
        phase: rand() * Math.PI * 2,
        floatAmplitude: 0.15 + rand() * 0.25,
        floatFrequency: 0.6 + rand() * 0.6,
        lastTarget: originalPos.clone(),
        explodeMultiplier: 1.8,
        opacityFactor: 1.0,
        isOuter: false,
      });
    }
    for (let i = 0; i < outerCount; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const radius = 3.6 + Math.random() * 0.8;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      const originalPos = new THREE.Vector3(x, y, z);
      const velocity = originalPos.clone().normalize().multiplyScalar(0.6 + rand() * 0.6);
      velocity.x += (rand() - 0.5) * 0.6;
      velocity.y += (rand() - 0.5) * 0.6;
      velocity.z += (rand() - 0.5) * 0.6;
      const rScaleOuter = rand();
      const scaleOuter = rScaleOuter < 0.8
        ? 0.02 + rand() * 0.04
        : 0.05 + rand() * 0.06;
      frags.push({
        position: originalPos.clone(),
        originalPosition: originalPos.clone(),
        velocity,
        rotation: new THREE.Euler(
          rand() * Math.PI * 2,
          rand() * Math.PI * 2,
          rand() * Math.PI * 2
        ),
        rotationSpeed: new THREE.Vector3(
          (rand() - 0.5) * 2.2,
          (rand() - 0.5) * 2.2,
          (rand() - 0.5) * 2.2
        ),
        scale: scaleOuter,
        phase: rand() * Math.PI * 2,
        floatAmplitude: 0.06 + rand() * 0.1,
        floatFrequency: 0.3 + rand() * 0.5,
        lastTarget: originalPos.clone(),
        explodeMultiplier: 1.0,
        opacityFactor: 0.3,
        isOuter: true,
      });
    }
    return frags;
  }, []);

  const fragmentGeometry = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);

  // Create simple 2D star shape
  const starGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.2;
    const points = 4;
    
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.lineTo(outerRadius, 0);
    
    const geometry = new THREE.ShapeGeometry(shape);
    return geometry;
  }, []);

  const elasticOut = (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  };

  useFrame((state, delta) => {
    // Clamp delta to prevent inconsistent behavior during performance dips
    const dt = Math.min(typeof delta === 'number' ? delta : 0.016, 0.1);
    const spScaled = Math.min(1, scrollRef.current * SCROLL_INTENSITY);
    if (groupRef.current) {
      const tt = state.clock.elapsedTime;
      // Continuous one-direction rotation (no oscillation)
      groupRef.current.rotation.x = tt * 0.08;
      groupRef.current.rotation.y = tt * 0.12;
      groupRef.current.rotation.z = tt * 0.04;
      // Keep scale steady (no breathing)
      groupRef.current.scale.set(1, 1, 1);
    }
    const t = state.clock.elapsedTime;
    fragmentsRef.current.forEach((mesh, i) => {
      if (!mesh || !fragments[i]) return;
      const frag = fragments[i];
      const explodeFactor = elasticOut(spScaled) * (frag.explodeMultiplier ?? 1);
      const explodedPos = tmpPos.current.copy(frag.originalPosition).add(
        tmpVel.current.copy(frag.velocity).multiplyScalar(explodeFactor * EXPLOSION_DISTANCE)
      );
      const clampedScroll = Math.min(spScaled, 1);
      mesh.position.copy(frag.originalPosition).lerp(explodedPos, clampedScroll);
      const normal = tmpNorm.current.copy(frag.originalPosition).normalize();
      // Remove oscillatory float; keep position steady (explosion handles spread)
      const floatOffsetAmount = 0;
      mesh.position.add(normal.multiplyScalar(floatOffsetAmount));
      frag.lastTarget.copy(mesh.position);
      const movementIntensity = 0.5; // Fixed speed for material response
      const scalePulse = 1; // No back-and-forth scaling
      mesh.scale.setScalar(frag.scale * scalePulse);
      // One-direction continuous rotation with bounded, per-fragment speeds
      const TWO_PI = Math.PI * 2;
      const baseSpeedX = 0.35;
      const baseSpeedY = 0.5;
      const baseSpeedZ = 0.42;
      const speedX = baseSpeedX * (0.3 + Math.min(1, Math.abs(frag.rotationSpeed.x) / 6));
      const speedY = baseSpeedY * (0.3 + Math.min(1, Math.abs(frag.rotationSpeed.y) / 6));
      const speedZ = baseSpeedZ * (0.3 + Math.min(1, Math.abs(frag.rotationSpeed.z) / 6));
      const dirX = Math.sign(frag.rotationSpeed.x) || 1;
      const dirY = Math.sign(frag.rotationSpeed.y) || 1;
      const dirZ = Math.sign(frag.rotationSpeed.z) || 1;
      mesh.rotation.x = (frag.rotation.x + t * speedX * dirX) % TWO_PI;
      mesh.rotation.y = (frag.rotation.y + t * speedY * dirY) % TWO_PI;
      mesh.rotation.z = (frag.rotation.z + t * speedZ * dirZ) % TWO_PI;
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
    <>
      <Float
        speed={0}
        rotationIntensity={0}
        floatIntensity={0}
        floatingRange={[0, 0]}
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
                color={frag.isOuter ? "#2a2a2a" : "#4a4a4a"}
                emissive={"#1a1a1a"}
                emissiveIntensity={0.3}
                metalness={0.2}
                roughness={0.5}
                clearcoat={0.6}
                clearcoatRoughness={0.35}
                specularIntensity={0.6}
                specularColor={"#ffffff"}
                flatShading
                transparent
                opacity={frag.isOuter ? 0.5 : 1}
                envMapIntensity={0.4}
            />
          </mesh>
        ))}
        {/* Removed rotating point light to avoid inconsistent highlights */}
      </group>
    </Float>
    </>
  );
};

const Scene = ({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) => {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={0.8} color="#555555" castShadow />
      <directionalLight position={[-4, -5, -6]} intensity={0.6} color="#444444" castShadow />
      <Cloud position={[0, 0, 0]} scale={[5, 5, 5]} opacity={0.15} speed={0.18} color="#777777" segments={28} />
      <ExplodingSphere scrollRef={scrollRef} />
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
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%', background: '#0a0a0a' }}
      >
        <fogExp2 attach="fog" args={["#0f0f0f", 0.01]} />
        <Scene scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
};

