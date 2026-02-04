import { useRef, useMemo, useEffect, useState } from 'react'; // Grunnleggende React-hooks
import { Canvas, useFrame } from '@react-three/fiber'; // Canvas og animasjonsloop (React Three Fiber)
import { Float, Cloud } from '@react-three/drei'; // Drei-hjelpere (Float, Cloud)
import * as THREE from 'three'; // Three.js kjerne


interface FragmentData {
  position: THREE.Vector3;
  originalPosition: THREE.Vector3;
  startPosition: THREE.Vector3;
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
  fadeInDelay: number;
}

const ExplodingSphere = ({ scrollRef, mobileYOffset, isMobile }: { scrollRef: React.MutableRefObject<number>, mobileYOffset: number, isMobile: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const fragmentsRef = useRef<THREE.Mesh[]>([]);

  const innerCount = 120;
  const outerCount = 60;
  // Fjernet ubrukt smoothProgressRef
  const tmpPos = useRef(new THREE.Vector3());
  const tmpVel = useRef(new THREE.Vector3());
  const tmpNorm = useRef(new THREE.Vector3());
  // Fjernet ubrukt cellSize og DAMP_LAMBDA
  const SCROLL_INTENSITY = 0.45;
  // Fjernet ubrukt ROTATION_RESPONSE
  const EXPLOSION_DISTANCE = 1.2; // Øk spredningsavstand ved scroll

  // Seeded tilfeldig for deterministisk fragmentgenerering på tvers av oppdateringer
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
      // Start position is far outside, moving inward
      const startPos = originalPos.clone().normalize().multiplyScalar(8 + rand() * 4);
      frags.push({
        position: originalPos.clone(),
        originalPosition: originalPos.clone(),
        startPosition: startPos,
        velocity,
        rotation: new THREE.Euler(
          rand() * Math.PI * 2,
          rand() * Math.PI * 2,
          rand() * Math.PI * 2
        ),
        rotationSpeed: new THREE.Vector3(
          (rand() - 0.5) * 3 * (rand() < 0.08 ? 6 : rand() < 0.18 ? 4 : rand() < 0.35 ? 2 : 1), // Multi-tier speed: 8% ultra-fast (6x), 10% very fast (4x), 17% fast (2x)
          (rand() - 0.5) * 3 * (rand() < 0.08 ? 6 : rand() < 0.18 ? 4 : rand() < 0.35 ? 2 : 1),
          (rand() - 0.5) * 3 * (rand() < 0.08 ? 6 : rand() < 0.18 ? 4 : rand() < 0.35 ? 2 : 1)
        ),
        scale,
        phase: rand() * Math.PI * 2,
        floatAmplitude: 0.08 + rand() * 0.1,
        floatFrequency: 0.35 + rand() * 0.25,
        lastTarget: originalPos.clone(),
        explodeMultiplier: 1.3,
        opacityFactor: 1.0,
        isOuter: false,
        fadeInDelay: k * 0.05,
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
      // Start position is far outside
      const startPos = originalPos.clone().normalize().multiplyScalar(8 + rand() * 4);
      frags.push({
        position: originalPos.clone(),
        originalPosition: originalPos.clone(),
        startPosition: startPos,
        velocity,
        rotation: new THREE.Euler(
          rand() * Math.PI * 2,
          rand() * Math.PI * 2,
          rand() * Math.PI * 2
        ),
        rotationSpeed: new THREE.Vector3(
          (rand() - 0.5) * 6 * (rand() < 0.05 ? 5 : rand() < 0.15 ? 3 : rand() < 0.3 ? 2 : 1), // Multi-tier speed: 5% ultra-fast (5x), 10% very fast (3x), 15% fast (2x)
          (rand() - 0.5) * 6 * (rand() < 0.05 ? 5 : rand() < 0.15 ? 3 : rand() < 0.3 ? 2 : 1),
          (rand() - 0.5) * 6 * (rand() < 0.05 ? 5 : rand() < 0.15 ? 3 : rand() < 0.3 ? 2 : 1)
        ),
        scale,
        phase: rand() * Math.PI * 2,
        floatAmplitude: 0.15 + rand() * 0.25,
        floatFrequency: 0.6 + rand() * 0.6,
        lastTarget: originalPos.clone(),
        explodeMultiplier: 1.8,
        opacityFactor: 1.0,
        isOuter: false,
        fadeInDelay: (superCount + i) * 0.008,
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
      // Start position for outer fragments
      const startPos = originalPos.clone().normalize().multiplyScalar(10 + rand() * 3);
      frags.push({
        position: originalPos.clone(),
        originalPosition: originalPos.clone(),
        startPosition: startPos,
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
        fadeInDelay: (superCount + innerCount + i) * 0.008,
      });
    }
    return frags;
  }, []);

  const fragmentGeometry = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);

  // Fjernet ubrukt starGeometry

  const elasticOut = (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  };

  useFrame((state) => {
    // Begrens delta for å forhindre inkonsekvent oppførsel under ytelsesfall
    // Fjernet ubrukt dt
    const spScaled = Math.min(1, scrollRef.current * SCROLL_INTENSITY);
    if (groupRef.current) {
      const tt = state.clock.elapsedTime;
      // Kontinuerlig en-retnings rotasjon (ingen oscillasjon)
      groupRef.current.rotation.x = tt * 0.04;
      groupRef.current.rotation.y = tt * 0.06;
      groupRef.current.rotation.z = tt * 0.02;
      // Hold skala jevn (ingen pulsering)
      groupRef.current.scale.set(1, 1, 1);
    }
    const t = state.clock.elapsedTime;
    fragmentsRef.current.forEach((mesh, i) => {
      if (!mesh || !fragments[i]) return;
      const frag = fragments[i];
      
      // Calculate individual fade-in progress for this fragment
      const fadeInStart = frag.fadeInDelay;
      const fadeInDuration = 0.6;
      const individualFadeIn = Math.min(Math.max((t - fadeInStart) / fadeInDuration, 0), 1);
      
      // Smooth easing for the assembly animation
      const easeProgress = individualFadeIn < 0.5 
        ? 2 * individualFadeIn * individualFadeIn 
        : 1 - Math.pow(-2 * individualFadeIn + 2, 2) / 2;
      
      // Move from start position (outside) to original position (sphere)
      const assembledPos = tmpPos.current.copy(frag.startPosition).lerp(frag.originalPosition, easeProgress);
      
      // Then apply explosion based on scroll
      const explodeFactor = elasticOut(spScaled) * (frag.explodeMultiplier ?? 1);
      const explodedPos = tmpVel.current.copy(frag.originalPosition).add(
        tmpNorm.current.copy(frag.velocity).multiplyScalar(explodeFactor * EXPLOSION_DISTANCE)
      );
      const clampedScroll = Math.min(spScaled, 1);
      mesh.position.copy(assembledPos).lerp(explodedPos, clampedScroll);
      const normal = tmpNorm.current.copy(frag.originalPosition).normalize();
      // Fjern oscillerende flyt; hold posisjon jevn (eksplosjon håndterer spredning)
      const floatOffsetAmount = 0;
      mesh.position.add(normal.multiplyScalar(floatOffsetAmount));
      frag.lastTarget.copy(mesh.position);
      const movementIntensity = 0.5; // Fast hastighet for materialrespons
      const scalePulse = 1; // Ingen frem-og-tilbake skalering
      // mesh.scale.setScalar(frag.scale * scalePulse); // Moved below to include fade-in scale
      // En-retnings kontinuerlig rotasjon med begrensede, per-fragment hastigheter
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
      
      // Add pop-in scale animation
      const scaleMultiplier = individualFadeIn < 1 ? Math.pow(individualFadeIn, 0.5) : 1;
      mesh.scale.setScalar(frag.scale * scalePulse * scaleMultiplier);
      
      const matAny = mesh.material as any;
      if (matAny) {
        // Combine fade in with scroll fade out
        const opacityVal = individualFadeIn * (1 - spScaled * 0.7) * (frag.opacityFactor ?? 1);
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
        <group ref={groupRef} position={[0, isMobile ? mobileYOffset : -0.2, 0]} scale={1.1}>
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
                color={frag.isOuter ? "#2a2a2a" : "#2b2b2b"}
                emissive={"#1a1a1a"}
                emissiveIntensity={0.3}
                metalness={0.4}
                roughness={0.6}
                clearcoat={0.9}
                clearcoatRoughness={0.35}
                specularIntensity={0.6}
                specularColor={"#ffffff"}
                flatShading
                transparent
                opacity={0}
                envMapIntensity={0.4}
            />
          </mesh>
        ))}
        <ambientLight intensity={0.1} color="#703600" />
      </group>
      {/* Punktlys litt utenfor sentrum for å eliminere sentral radial - utenfor gruppe så den ikke roterer */}
      <pointLight position={isMobile ? [0, mobileYOffset, 0] : [0.1, -0.1, 0.2]} intensity={6} distance={20} decay={1.5} color="#510080" />
    </Float>
    </>
  );
};

const Scene = ({ scrollRef, mobileYOffset, isMobile }: { scrollRef: React.MutableRefObject<number>, mobileYOffset: number, isMobile: boolean }) => {
  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[5, 6, 4]} intensity={0.2} color="#555555" castShadow />
      <directionalLight position={[-4, -5, -6]} intensity={0.15} color="#707070" castShadow />
      <Cloud position={[0, 0, -10]} scale={[8, 8, 8]} opacity={0.28} speed={0.35} color="#999999" segments={40} />

      <ExplodingSphere scrollRef={scrollRef} mobileYOffset={mobileYOffset} isMobile={isMobile} />
    </> 
  );
};

export const HeroSphere = () => {
  const scrollRef = useRef(0);
  
  // Mobildeteksjon for responsiv kamera
  const [isMobile, setIsMobile] = useState(false);
  const [mobileYOffset, setMobileYOffset] = useState(0);
  
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobileDevice = width <= 768;
      setIsMobile(isMobileDevice);
      
      if (isMobileDevice) {
        // Calculate Y offset based on viewport aspect ratio
        const aspectRatio = height / width;
        // For tall screens (like iPhone 14 Pro Max), move sphere down slightly
        // For shorter screens (like landscape or iPad mini), move up more
        const baseOffset = aspectRatio > 1.8 ? 0.3 : aspectRatio > 1.5 ? 0.6 : 1.0;
        setMobileYOffset(baseOffset);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobilresponsive kamerainnstillinger - zoom ut
  const cameraPosition = isMobile ? [0, 0, 9] as [number, number, number] : [0, 0, 6] as [number, number, number];
  const cameraFov = isMobile ? 60 : 45;

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
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 1 }}>
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%', background: '#0a0a0a' }}
      >
        <fogExp2 attach="fog" args={["#0f0f0f", 0.01]} />
        <Scene scrollRef={scrollRef} mobileYOffset={mobileYOffset} isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

