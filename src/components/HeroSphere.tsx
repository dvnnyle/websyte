import { useRef, useMemo, useEffect } from 'react'; // Grunnleggende React-hooks
import { Canvas, useFrame } from '@react-three/fiber'; // Canvas og animasjonsloop (React Three Fiber)
import { Float, Cloud } from '@react-three/drei'; // Drei-hjelpere (Float, Cloud)
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
  collisionOffset: THREE.Vector3;
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
  const restitution = 0.45;
  const radiusFactor = 1.05;
  const DAMP_LAMBDA = 1.4;
  const SCROLL_INTENSITY = 0.65;
  const ROTATION_RESPONSE = 0.65;

  const fragments = useMemo<FragmentData[]>(() => {
    const frags: FragmentData[] = [];
    const superCount = 1 + Math.floor(Math.random() * 5);
    const superPositions: THREE.Vector3[] = [];
    const superMinSeparation = 0.9;
    for (let k = 0; k < superCount; k++) {
      let tries = 0;
      let originalPos = new THREE.Vector3();
      while (tries < 25) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
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
      const velocity = originalPos.clone().normalize().multiplyScalar(1.2 + Math.random() * 0.8);
      velocity.x += (Math.random() - 0.5) * 0.4;
      velocity.y += (Math.random() - 0.5) * 0.4;
      velocity.z += (Math.random() - 0.5) * 0.4;
      const scale = (0.48 + Math.random() * 0.22) * 0.65;
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
        scale,
        phase: Math.random() * Math.PI * 2,
        floatAmplitude: 0.08 + Math.random() * 0.1,
        floatFrequency: 0.35 + Math.random() * 0.25,
        lastTarget: originalPos.clone(),
        explodeMultiplier: 0.9,
        opacityFactor: 1.0,
        isOuter: false,
        collisionOffset: new THREE.Vector3(),
      });
    }
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
      const rScale = Math.random();
      const scale = rScale < 0.15
        ? 0.16 + Math.random() * 0.12
        : rScale < 0.35
          ? 0.03 + Math.random() * 0.05
          : 0.08 + Math.random() * 0.12;
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
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6
        ),
        scale,
        phase: Math.random() * Math.PI * 2,
        floatAmplitude: 0.15 + Math.random() * 0.25,
        floatFrequency: 0.6 + Math.random() * 0.6,
        lastTarget: originalPos.clone(),
        explodeMultiplier: 1.1,
        opacityFactor: 1.0,
        isOuter: false,
        collisionOffset: new THREE.Vector3(),
      });
    }
    for (let i = 0; i < outerCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3.6 + Math.random() * 0.8;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      const originalPos = new THREE.Vector3(x, y, z);
      const velocity = originalPos.clone().normalize().multiplyScalar(0.6 + Math.random() * 0.6);
      velocity.x += (Math.random() - 0.5) * 0.6;
      velocity.y += (Math.random() - 0.5) * 0.6;
      velocity.z += (Math.random() - 0.5) * 0.6;
      const rScaleOuter = Math.random();
      const scaleOuter = rScaleOuter < 0.8
        ? 0.02 + Math.random() * 0.04
        : 0.05 + Math.random() * 0.06;
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
        scale: scaleOuter,
        phase: Math.random() * Math.PI * 2,
        floatAmplitude: 0.06 + Math.random() * 0.1,
        floatFrequency: 0.3 + Math.random() * 0.5,
        lastTarget: originalPos.clone(),
        explodeMultiplier: 0.6,
        opacityFactor: 0.3,
        isOuter: true,
        collisionOffset: new THREE.Vector3(),
      });
    }
    return frags;
  }, []);

  const fragmentGeometry = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);

  const elasticOut = (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  };

  useFrame((state, delta) => {
    const dt = (typeof delta === 'number' ? delta : 0.016);
    const sp = THREE.MathUtils.damp(smoothProgressRef.current, scrollRef.current, DAMP_LAMBDA, dt);
    const spScaled = Math.min(1, sp * SCROLL_INTENSITY);
    smoothProgressRef.current = sp;
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.08 * (1 - spScaled);
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12 * (1 - spScaled);
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.8) * (0.03 + spScaled * 0.03);
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
      mesh.position.lerpVectors(frag.originalPosition, explodedPos, spScaled);
      const normal = tmpNorm.current.copy(frag.originalPosition).normalize();
      const floatOffset = normal.multiplyScalar(
        Math.sin(t * frag.floatFrequency + frag.phase) * frag.floatAmplitude * (0.3 + spScaled * 0.22)
      );
      mesh.position.add(floatOffset);
      mesh.position.add(frag.collisionOffset);
      const movementSpeed = mesh.position.distanceTo(frag.lastTarget) / dt;
      frag.lastTarget.copy(mesh.position);
      const movementIntensity = Math.min(movementSpeed / 1.5, 1);
      const scalePulse = 1 + Math.sin(t * (frag.floatFrequency * 0.9) + frag.phase) * 0.06;
      mesh.scale.setScalar(frag.scale * scalePulse);
      const rotScale = ROTATION_RESPONSE * (spScaled * spScaled);
      mesh.rotation.x = frag.rotation.x + rotScale * frag.rotationSpeed.x;
      mesh.rotation.y = frag.rotation.y + rotScale * frag.rotationSpeed.y;
      mesh.rotation.z = frag.rotation.z + rotScale * frag.rotationSpeed.z;
      frag.collisionOffset.multiplyScalar(0.96);
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

    const cellMap: Record<string, number[]> = {};
    const getKey = (p: THREE.Vector3) => {
      const cx = Math.floor(p.x / cellSize);
      const cy = Math.floor(p.y / cellSize);
      const cz = Math.floor(p.z / cellSize);
      return `${cx}|${cy}|${cz}`;
    };
    fragmentsRef.current.forEach((mesh, i) => {
      if (!mesh || !fragments[i]) return;
      const key = getKey(mesh.position);
      (cellMap[key] ||= []).push(i);
    });
    const tryResolvePair = (i: number, j: number) => {
      const mi = fragmentsRef.current[i];
      const mj = fragmentsRef.current[j];
      if (!mi || !mj) return;
      const fi = fragments[i];
      const fj = fragments[j];
      if (!fi || !fj) return;
      const ri = (mi.scale.x || fi.scale || 0.1) * radiusFactor;
      const rj = (mj.scale.x || fj.scale || 0.1) * radiusFactor;
      const pi = tmpPos.current.copy(mi.position);
      const pj = tmpVel.current.copy(mj.position);
      const deltaVec = tmpNorm.current.copy(pi).sub(pj);
      const dist = deltaVec.length();
      const minDist = ri + rj;
      if (dist <= 1e-6) {
        deltaVec.set((Math.random()-0.5)*0.01, (Math.random()-0.5)*0.01, (Math.random()-0.5)*0.01);
      }
      if (dist < minDist) {
        const n = deltaVec.normalize();
        const overlap = minDist - dist;
        const miMass = Math.max(0.08, ri * ri);
        const mjMass = Math.max(0.08, rj * rj);
        const vi = fi.velocity;
        const vj = fj.velocity;
        const relVel = tmpPos.current.copy(vi).sub(vj);
        const vRelN = relVel.dot(n);
        if (vRelN < 0) {
          const j = -(1 + restitution) * vRelN / (1/miMass + 1/mjMass);
          const impulseSoft = j * 0.3;
          vi.addScaledVector(n, (impulseSoft / miMass));
          vj.addScaledVector(n, -(impulseSoft / mjMass));
        }
        const k = 2.0;
        const repulse = Math.min(overlap, 0.6) * k * dt;
        vi.addScaledVector(n, (repulse / miMass));
        vj.addScaledVector(n, -(repulse / mjMass));
        const biasEach = Math.min(overlap, 0.25) * 0.08;
        fi.collisionOffset.addScaledVector(n, biasEach);
        fj.collisionOffset.addScaledVector(n, -biasEach);
        mi.position.addScaledVector(n, biasEach);
        mj.position.addScaledVector(n, -biasEach);
        fi.velocity.multiplyScalar(0.995);
        fj.velocity.multiplyScalar(0.995);
      }
    };
    const neighborOffsets: Array<[number, number, number]> = [];
    for (let ox = -1; ox <= 1; ox++) {
      for (let oy = -1; oy <= 1; oy++) {
        for (let oz = -1; oz <= 1; oz++) {
          neighborOffsets.push([ox, oy, oz]);
        }
      }
    }
    const iterations = 2;
    for (let iter = 0; iter < iterations; iter++) {
      Object.keys(cellMap).forEach((key) => {
        const [cx, cy, cz] = key.split('|').map(Number);
        const indices: number[] = [];
        neighborOffsets.forEach(([ox,oy,oz]) => {
          const nk = `${cx+ox}|${cy+oy}|${cz+oz}`;
          const arr = cellMap[nk];
          if (arr) indices.push(...arr);
        });
        for (let a = 0; a < indices.length; a++) {
          for (let b = a + 1; b < indices.length; b++) {
            tryResolvePair(indices[a], indices[b]);
          }
        }
      });
    }
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
        <pointLight position={[0, 0, 0]} intensity={0.35} distance={0} decay={2} color="#9c9c9c" castShadow />
      </group>
    </Float>
  );
};

const Scene = ({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) => {
  return (
    <>
      <ambientLight intensity={0.18} />
      <directionalLight position={[5, 6, 4]} intensity={0.65} color="#00000000" castShadow />
      <directionalLight position={[-4, -5, -6]} intensity={0.35} color="#00000000" castShadow />
      <Cloud position={[0, 0, 0]} scale={[5, 5, 5]} opacity={0.08} speed={0.18} color="#818181" segments={28} />
      <ExplodingSphere scrollRef={scrollRef} />
      <pointLight position={[0, 0, 0]} intensity={0.35} distance={0} decay={2} color="#000000" castShadow />
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

