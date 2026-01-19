import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './planetdigital.css';

const DigitalPlanet = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const gridRef = useRef<THREE.LineSegments>(null);

  // Create grid geometry for planet surface
  const gridGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const radius = 2.02; // Slightly larger than the planet
    
    // Create latitude lines
    for (let lat = -Math.PI/2; lat <= Math.PI/2; lat += Math.PI/12) {
      for (let lng = 0; lng < Math.PI * 2; lng += Math.PI/64) {
        const x1 = radius * Math.cos(lat) * Math.cos(lng);
        const y1 = radius * Math.sin(lat);
        const z1 = radius * Math.cos(lat) * Math.sin(lng);
        
        const x2 = radius * Math.cos(lat) * Math.cos(lng + Math.PI/64);
        const y2 = radius * Math.sin(lat);
        const z2 = radius * Math.cos(lat) * Math.sin(lng + Math.PI/64);
        
        vertices.push(x1, y1, z1, x2, y2, z2);
      }
    }
    
    // Create longitude lines
    for (let lng = 0; lng < Math.PI * 2; lng += Math.PI/12) {
      for (let lat = -Math.PI/2; lat < Math.PI/2; lat += Math.PI/64) {
        const x1 = radius * Math.cos(lat) * Math.cos(lng);
        const y1 = radius * Math.sin(lat);
        const z1 = radius * Math.cos(lat) * Math.sin(lng);
        
        const x2 = radius * Math.cos(lat + Math.PI/64) * Math.cos(lng);
        const y2 = radius * Math.sin(lat + Math.PI/64);
        const z2 = radius * Math.cos(lat + Math.PI/64) * Math.sin(lng);
        
        vertices.push(x1, y1, z1, x2, y2, z2);
      }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  // Shader material for the planet
  const planetMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#1a1a2e",
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.95,
      envMapIntensity: 0.8
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Rotate planet
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
      meshRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    }
    
    // Rotate grid
    if (gridRef.current) {
      gridRef.current.rotation.y = time * 0.12;
      gridRef.current.rotation.x = Math.sin(time * 0.07) * 0.1;
    }
  });

  return (
    <group>
      {/* Main Planet */}
      <mesh ref={meshRef} geometry={new THREE.SphereGeometry(2, 64, 32)} material={planetMaterial} />
      
      {/* Grid Lines */}
      <lineSegments ref={gridRef} geometry={gridGeometry}>
        <lineBasicMaterial color="#4a90d9" transparent opacity={0.3} />
      </lineSegments>
      
      {/* Glow Effect */}
      <mesh scale={2.3}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshBasicMaterial
          color="#4a90d9"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#4a90d9" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#4a90d9" />
      <Environment preset="night" />
      <Float
        speed={0.5}
        rotationIntensity={0.1}
        floatIntensity={0.2}
        floatingRange={[-0.1, 0.1]}
      >
        <DigitalPlanet />
      </Float>
    </>
  );
};

export const PlanetDigital = () => {
  return (
    <div className="digital-planet-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="digital-planet-canvas"
        style={{ background: 'transparent' }}
      >00", 0.01
        <fogExp2 attach="fog" args={["#000011", 0.02]} />
        <Scene />
      </Canvas>
      <div className="planet-info">
        <div className="planet-label">DIGITAL CORE</div>
        <div className="planet-stats">
          <div className="stat">STATUS: ACTIVE</div>
          <div className="stat">NODES: 2,847</div>
          <div className="stat">SYNC: 99.7%</div>
        </div>
      </div>
    </div>
  );
};
