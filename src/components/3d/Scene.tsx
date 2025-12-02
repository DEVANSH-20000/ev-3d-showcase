import { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Stars } from "@react-three/drei";
import * as THREE from "three";
import EVCarModel from "./EVCarModel";

interface SceneProps {
  viewMode: "exterior" | "interior";
  autoRotate: boolean;
  accentColor: string;
  onResetCamera?: () => void;
  resetTrigger?: number;
}

const Scene = ({ viewMode, autoRotate, accentColor, resetTrigger }: SceneProps) => {
  const controlsRef = useRef<any>(null);

  // Camera presets based on view mode
  const cameraPresets = {
    exterior: {
      position: new THREE.Vector3(5, 3, 5),
      target: new THREE.Vector3(0, 0, 0),
    },
    interior: {
      position: new THREE.Vector3(-0.3, 0.5, 0.8),
      target: new THREE.Vector3(0, 0.3, -1),
    },
  };

  // Reset camera when resetTrigger changes
  useEffect(() => {
    if (controlsRef.current && resetTrigger !== undefined) {
      const preset = cameraPresets[viewMode];
      controlsRef.current.object.position.copy(preset.position);
      controlsRef.current.target.copy(preset.target);
      controlsRef.current.update();
    }
  }, [resetTrigger]);

  // Update camera position when view mode changes
  useEffect(() => {
    if (controlsRef.current) {
      const preset = cameraPresets[viewMode];
      
      // Animate camera transition
      const startPos = controlsRef.current.object.position.clone();
      const startTarget = controlsRef.current.target.clone();
      const endPos = preset.position;
      const endTarget = preset.target;
      
      let progress = 0;
      const animate = () => {
        progress += 0.05;
        if (progress <= 1) {
          controlsRef.current.object.position.lerpVectors(startPos, endPos, progress);
          controlsRef.current.target.lerpVectors(startTarget, endTarget, progress);
          controlsRef.current.update();
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [viewMode]);

  return (
    <Canvas
      shadows
      camera={{ 
        position: [5, 3, 5], 
        fov: viewMode === "interior" ? 65 : 50,
        near: 0.1,
        far: 1000
      }}
      gl={{ 
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2
      }}
    >
      {/* Background */}
      <color attach="background" args={["#050816"]} />
      
      {/* Stars for exterior view */}
      {viewMode === "exterior" && (
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      )}

      {/* Fog for depth */}
      <fog attach="fog" args={["#050816", 10, 50]} />

      {/* Lighting Setup */}
      <ambientLight intensity={0.3} />
      
      {/* Key Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Fill Light */}
      <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#4488ff" />
      
      {/* Rim Light */}
      <directionalLight position={[0, 5, -8]} intensity={0.6} color="#00d4ff" />

      {/* Accent Spotlights */}
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={1}
        intensity={0.5}
        color={accentColor}
        castShadow
      />

      {/* Environment for reflections */}
      <Environment preset="night" />

      {/* Main Content */}
      <Suspense fallback={<LoadingFallback />}>
        <EVCarModel viewMode={viewMode} accentColor={accentColor} />
      </Suspense>

      {/* Ground for exterior */}
      {viewMode === "exterior" && (
        <>
          <ContactShadows
            position={[0, -0.49, 0]}
            opacity={0.6}
            scale={20}
            blur={2}
            far={4}
          />
          
          {/* Reflective Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial 
              color="#050816" 
              metalness={0.9} 
              roughness={0.4}
            />
          </mesh>

          {/* Grid Lines */}
          <gridHelper 
            args={[50, 50, "#0a2540", "#0a2540"]} 
            position={[0, -0.49, 0]} 
          />
        </>
      )}

      {/* Orbit Controls */}
      <OrbitControls
        ref={controlsRef}
        autoRotate={autoRotate && viewMode === "exterior"}
        autoRotateSpeed={0.5}
        enablePan={viewMode === "exterior"}
        enableZoom={true}
        minDistance={viewMode === "interior" ? 0.3 : 3}
        maxDistance={viewMode === "interior" ? 2 : 15}
        minPolarAngle={viewMode === "interior" ? 0.5 : 0.2}
        maxPolarAngle={viewMode === "interior" ? 2.5 : Math.PI / 2 - 0.1}
        dampingFactor={0.05}
        enableDamping
      />
    </Canvas>
  );
};

// Loading Fallback Component
const LoadingFallback = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00d4ff" wireframe />
    </mesh>
  );
};

export default Scene;
