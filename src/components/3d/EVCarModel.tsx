import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface EVCarModelProps {
  viewMode: "exterior" | "interior";
  accentColor: string;
}

const EVCarModel = ({ viewMode, accentColor }: EVCarModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const wheelFL = useRef<THREE.Mesh>(null);
  const wheelFR = useRef<THREE.Mesh>(null);
  const wheelBL = useRef<THREE.Mesh>(null);
  const wheelBR = useRef<THREE.Mesh>(null);

  // Convert hex color to THREE color
  const color = useMemo(() => new THREE.Color(accentColor), [accentColor]);
  const bodyColor = useMemo(() => new THREE.Color("#1a1a2e"), []);
  const glassColor = useMemo(() => new THREE.Color("#0a1520"), []);
  const interiorColor = useMemo(() => new THREE.Color("#2a2a3a"), []);

  // Subtle wheel rotation animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    [wheelFL, wheelFR, wheelBL, wheelBR].forEach((wheel) => {
      if (wheel.current) {
        wheel.current.rotation.x = time * 0.5;
      }
    });
  });

  if (viewMode === "interior") {
    return <InteriorView accentColor={accentColor} />;
  }

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Car Body - Main Structure */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.5, 1.8]} />
        <meshStandardMaterial color={bodyColor} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Lower Body */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[4.2, 0.3, 1.9]} />
        <meshStandardMaterial color={bodyColor} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Cabin / Greenhouse */}
      <mesh position={[0.2, 0.85, 0]} castShadow>
        <boxGeometry args={[2.2, 0.6, 1.6]} />
        <meshStandardMaterial color={bodyColor} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Windows - Front */}
      <mesh position={[-0.7, 0.85, 0]} rotation={[0, 0, Math.PI * 0.1]}>
        <boxGeometry args={[0.5, 0.55, 1.55]} />
        <meshStandardMaterial 
          color={glassColor} 
          metalness={0.9} 
          roughness={0.1} 
          transparent 
          opacity={0.7} 
        />
      </mesh>

      {/* Windows - Rear */}
      <mesh position={[1.1, 0.85, 0]} rotation={[0, 0, -Math.PI * 0.08]}>
        <boxGeometry args={[0.4, 0.5, 1.55]} />
        <meshStandardMaterial 
          color={glassColor} 
          metalness={0.9} 
          roughness={0.1} 
          transparent 
          opacity={0.7} 
        />
      </mesh>

      {/* Windows - Sides */}
      <mesh position={[0.2, 0.85, 0.81]}>
        <boxGeometry args={[1.8, 0.45, 0.05]} />
        <meshStandardMaterial 
          color={glassColor} 
          metalness={0.9} 
          roughness={0.1} 
          transparent 
          opacity={0.7} 
        />
      </mesh>
      <mesh position={[0.2, 0.85, -0.81]}>
        <boxGeometry args={[1.8, 0.45, 0.05]} />
        <meshStandardMaterial 
          color={glassColor} 
          metalness={0.9} 
          roughness={0.1} 
          transparent 
          opacity={0.7} 
        />
      </mesh>

      {/* Hood - Sleek Front */}
      <mesh position={[-1.6, 0.45, 0]} rotation={[0, 0, -Math.PI * 0.02]} castShadow>
        <boxGeometry args={[0.9, 0.3, 1.7]} />
        <meshStandardMaterial color={bodyColor} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Front Bumper */}
      <mesh position={[-2.1, 0.25, 0]} castShadow>
        <boxGeometry args={[0.2, 0.4, 1.9]} />
        <meshStandardMaterial color={bodyColor} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rear Section */}
      <mesh position={[1.8, 0.45, 0]} castShadow>
        <boxGeometry args={[0.5, 0.4, 1.7]} />
        <meshStandardMaterial color={bodyColor} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Rear Bumper */}
      <mesh position={[2.1, 0.25, 0]} castShadow>
        <boxGeometry args={[0.2, 0.4, 1.9]} />
        <meshStandardMaterial color={bodyColor} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-2.05, 0.35, 0.65]}>
        <boxGeometry args={[0.1, 0.15, 0.3]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
      <mesh position={[-2.05, 0.35, -0.65]}>
        <boxGeometry args={[0.1, 0.15, 0.3]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>

      {/* DRL Light Bar */}
      <mesh position={[-2.05, 0.45, 0]}>
        <boxGeometry args={[0.05, 0.03, 1.2]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>

      {/* Tail Lights */}
      <mesh position={[2.05, 0.4, 0.65]}>
        <boxGeometry args={[0.1, 0.1, 0.3]} />
        <meshStandardMaterial 
          color="#ff0033" 
          emissive="#ff0033" 
          emissiveIntensity={1} 
        />
      </mesh>
      <mesh position={[2.05, 0.4, -0.65]}>
        <boxGeometry args={[0.1, 0.1, 0.3]} />
        <meshStandardMaterial 
          color="#ff0033" 
          emissive="#ff0033" 
          emissiveIntensity={1} 
        />
      </mesh>

      {/* Tail Light Bar */}
      <mesh position={[2.05, 0.4, 0]}>
        <boxGeometry args={[0.05, 0.05, 1.0]} />
        <meshStandardMaterial 
          color="#ff0033" 
          emissive="#ff0033" 
          emissiveIntensity={0.8} 
        />
      </mesh>

      {/* Wheels */}
      <Wheel ref={wheelFL} position={[-1.3, 0, 0.9]} />
      <Wheel ref={wheelFR} position={[-1.3, 0, -0.9]} />
      <Wheel ref={wheelBL} position={[1.3, 0, 0.9]} />
      <Wheel ref={wheelBR} position={[1.3, 0, -0.9]} />

      {/* Accent Lines */}
      <mesh position={[0, 0.35, 0.96]}>
        <boxGeometry args={[3.5, 0.02, 0.02]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.35, -0.96]}>
        <boxGeometry args={[3.5, 0.02, 0.02]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>

      {/* Ground Shadow */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 3]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </group>
  );
};

// Wheel Component
const Wheel = ({ position }: { position: [number, number, number] } & { ref?: React.Ref<THREE.Mesh> }) => {
  return (
    <group position={position}>
      {/* Tire */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.35, 0.12, 16, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      {/* Rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
        <meshStandardMaterial color="#333340" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Rim Center */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
        <meshStandardMaterial color="#00d4ff" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Spokes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh 
          key={i} 
          rotation={[Math.PI / 2, 0, (Math.PI * 2 * i) / 5]} 
          position={[0, 0.075, 0]}
        >
          <boxGeometry args={[0.03, 0.02, 0.2]} />
          <meshStandardMaterial color="#444455" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

// Interior View Component
const InteriorView = ({ accentColor }: { accentColor: string }) => {
  const color = useMemo(() => new THREE.Color(accentColor), [accentColor]);
  
  return (
    <group position={[0, 0, 0]}>
      {/* Dashboard */}
      <mesh position={[0, 0.3, -1.5]} castShadow>
        <boxGeometry args={[2.5, 0.3, 0.4]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Center Screen */}
      <mesh position={[0, 0.45, -1.4]}>
        <boxGeometry args={[0.8, 0.4, 0.05]} />
        <meshStandardMaterial 
          color="#0a1520" 
          emissive={color} 
          emissiveIntensity={0.3} 
        />
      </mesh>

      {/* Screen Border Glow */}
      <mesh position={[0, 0.45, -1.38]}>
        <boxGeometry args={[0.85, 0.45, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>

      {/* Instrument Cluster */}
      <mesh position={[-0.5, 0.35, -1.35]}>
        <boxGeometry args={[0.4, 0.2, 0.05]} />
        <meshStandardMaterial 
          color="#0a1520" 
          emissive={color} 
          emissiveIntensity={0.2} 
        />
      </mesh>

      {/* Steering Wheel */}
      <group position={[-0.5, 0.2, -1.0]}>
        <mesh rotation={[Math.PI * 0.4, 0, 0]}>
          <torusGeometry args={[0.18, 0.025, 16, 32]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.6} roughness={0.5} />
        </mesh>
        {/* Steering Center */}
        <mesh position={[0, 0.05, 0.1]} rotation={[Math.PI * 0.4, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.03, 16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Steering Spokes */}
        <mesh position={[0, 0.03, 0.05]} rotation={[Math.PI * 0.4, 0, 0]}>
          <boxGeometry args={[0.35, 0.02, 0.02]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.6} roughness={0.5} />
        </mesh>
      </group>

      {/* Center Console */}
      <mesh position={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.5, 0.4, 1.5]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Gear Selector */}
      <mesh position={[0, 0.25, -0.3]}>
        <cylinderGeometry args={[0.05, 0.04, 0.1, 16]} />
        <meshStandardMaterial color="#333340" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Cup Holders */}
      <mesh position={[0.12, 0.21, 0.1]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.05, 16]} />
        <meshStandardMaterial color="#0a0a15" metalness={0.3} roughness={0.8} />
      </mesh>
      <mesh position={[-0.12, 0.21, 0.1]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.05, 16]} />
        <meshStandardMaterial color="#0a0a15" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Driver Seat */}
      <group position={[-0.5, 0, 0.3]}>
        {/* Seat Base */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[0.5, 0.15, 0.6]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Seat Back */}
        <mesh position={[0, 0.45, 0.25]} rotation={[0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.48, 0.6, 0.12]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Headrest */}
        <mesh position={[0, 0.8, 0.28]} castShadow>
          <boxGeometry args={[0.25, 0.18, 0.08]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>

      {/* Passenger Seat */}
      <group position={[0.5, 0, 0.3]}>
        <mesh position={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[0.5, 0.15, 0.6]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.3} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.45, 0.25]} rotation={[0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.48, 0.6, 0.12]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.3} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.8, 0.28]} castShadow>
          <boxGeometry args={[0.25, 0.18, 0.08]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>

      {/* Floor */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.5, 3]} />
        <meshStandardMaterial color="#0a0a15" metalness={0.2} roughness={0.9} />
      </mesh>

      {/* Roof Interior */}
      <mesh position={[0, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 3]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.2} roughness={0.9} />
      </mesh>

      {/* Side Panels */}
      <mesh position={[-1.2, 0.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3, 1.3]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.8} />
      </mesh>
      <mesh position={[1.2, 0.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[3, 1.3]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Door Handles */}
      <mesh position={[-1.15, 0.4, 0.5]}>
        <boxGeometry args={[0.02, 0.04, 0.15]} />
        <meshStandardMaterial color="#333340" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[1.15, 0.4, 0.5]}>
        <boxGeometry args={[0.02, 0.04, 0.15]} />
        <meshStandardMaterial color="#333340" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Ambient Interior Lighting */}
      <mesh position={[0, 0.3, -1.48]}>
        <boxGeometry args={[2.0, 0.01, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
      <mesh position={[-1.18, 0.05, 0]}>
        <boxGeometry args={[0.01, 0.01, 2.5]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.18, 0.05, 0]}>
        <boxGeometry args={[0.01, 0.01, 2.5]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

export default EVCarModel;
