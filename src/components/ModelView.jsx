"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useLayoutEffect } from "react";

function CenteredModel() {
  const { scene } = useGLTF("/models/CarFinal.glb");

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);

  return <primitive object={scene} />;
}

export default function ModelViewer() {
  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden bg-[#1b1b1b] shadow-lg">
      <Canvas camera={{ position: [0.3, 0.15, 0.3], fov: 25 }}>
        <ambientLight intensity={0} />
        <directionalLight position={[0, 5, 0]} intensity={1} />

        <Environment preset="studio" />

        <CenteredModel />

        <OrbitControls
          target={[0, 0, 0]}
          enableZoom={false}
          enablePan={false}
          enableDamping
        />
      </Canvas>
    </div>
  );
}
