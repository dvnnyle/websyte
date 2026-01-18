import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface FragmentData {
  position: THREE.Vector3;
  originalPosition: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: THREE.Euler;
  rotationSpeed: THREE.Vector3;
  scale: number;
}

const ExplodingSphere = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const fragmentsRef = useRef<THREE.Mesh[]>([]);
  
  const fragmentCount = 120;
  
  const fragments = useMemo<FragmentData[]>(() => {
    const frags: FragmentData[] = [];
    
    for (let i = 0; i < fragmentCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.8;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      const originalPos = new THREE.Vector3(x, y, z);
      
      // Explosion direction - outward from center with some randomness
      const velocity = originalPos.clone().normalize().multiplyScalar(2 + Math.random() * 3);
      velocity.x += (Math.random() - 0.5) * 2;
      velocity.y += (Math.random() - 0.5) * 2;
      velocity.z += (Math.random() - 0.5) * 2;
      
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
        scale: 0.08 + Math.random() * 0.12,
      });
    }
    
    return frags;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Base rotation when not exploded
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1 * (1 - scrollProgress);
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15 * (1 - scrollProgress);
    }
    
    // Update fragment positions based on scroll
    fragmentsRef.current.forEach((mesh, i) => {
      if (mesh && fragments[i]) {
        const frag = fragments[i];
        
        // Interpolate between original position and exploded position
        const explodedPos = frag.originalPosition.clone().add(
          frag.velocity.clone().multiplyScalar(scrollProgress * 2)
        );
        
        mesh.position.lerpVectors(frag.originalPosition, explodedPos, scrollProgress);
        
        // Add rotation during explosion
        mesh.rotation.x = frag.rotation.x + scrollProgress * frag.rotationSpeed.x;
        mesh.rotation.y = frag.rotation.y + scrollProgress * frag.rotationSpeed.y;
        mesh.rotation.z = frag.rotation.z + scrollProgress * frag.rotationSpeed.z;
        
        // Fade out fragments as they explode
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material) {
          material.opacity = 1 - scrollProgress * 0.7;
        }
      }
    });
  });

  // Create fragment geometry
  const fragmentGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 0);
    return geo;
  }, []);

  return (
    <Float
      speed={2 * (1 - scrollProgress)}
      rotationIntensity={0.5 * (1 - scrollProgress)}
      floatIntensity={1 * (1 - scrollProgress)}
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
          >
            <meshStandardMaterial
              color="#1a1a2e"
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={1}
              envMapIntensity={0.8}
            />
          </mesh>
        ))}
        
        {/* Core glow sphere - fades as it explodes */}
        <mesh scale={1.7 * (1 - scrollProgress * 0.5)}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#4a90d9"
            transparent
            opacity={0.08 * (1 - scrollProgress)}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Outer glow ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={1 + scrollProgress * 0.5}>
          <torusGeometry args={[2.2, 0.01, 16, 100]} />
          <meshBasicMaterial 
            color="#4a90d9" 
            transparent 
            opacity={0.3 * (1 - scrollProgress)} 
          />
        </mesh>
      </group>
    </Float>
  );
};

const ParticleField = ({ scrollProgress }: { scrollProgress: number }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2.5 + Math.random() * 1.5;
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.03;
      
      // Expand particles during scroll
      particlesRef.current.scale.setScalar(1 + scrollProgress * 2);
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#4a90d9"
        transparent
        opacity={0.6 * (1 - scrollProgress * 0.5)}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#4a90d9" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#4a90d9" />
      
      <Environment preset="night" />
      
      <ExplodingSphere scrollProgress={scrollProgress} />
      <ParticleField scrollProgress={scrollProgress} />
    </>
  );
};

export const HeroSphere = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Normalize scroll to 0-1 over the first viewport height
      const progress = Math.min(scrollY / (windowHeight * 0.8), 1);
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
