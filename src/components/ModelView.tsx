"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useLayoutEffect } from "react";

function CenteredModel({ src }: { src: string }) {
  const { scene } = useGLTF(src);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);

  return <primitive object={scene} />;
}

function ModelTile({ src, title }: { src: string; title?: string }) {
  return (
    <div
      className="group
    transition-all duration-300 ease-out hover:border-[#aabeaa] rounded-xl overflow-hidden bg-[#1b1b1b] shadow-lg border border-white/10"
    >
      <div className="aspect-video w-full">
        <Canvas camera={{ position: [0.22, 0.1, 0.22], fov: 25 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[0, 5, 0]} intensity={1} />
          <Environment preset="studio" />
          <CenteredModel src={src} />
          <OrbitControls enableZoom={false} enablePan={false} enableDamping />
        </Canvas>
      </div>
      {title ? (
        <div
          className="text-[20px] pt-2 pb-3 font-minecraft font-black bg-[#738d73]/90 backdrop-blur-sm
    text-[#262b26]
    border border-transparent
    transition-all duration-300 ease-out
    group-hover:bg-[#2c332c]/70
    group-hover:text-white
    group-hover:border-t-[#aabeaa] rounded-b-lg "
        >
          {title}
        </div>
      ) : null}
    </div>
  );
}

export default function ModelGrid() {
  const models = [
    { src: "/models/CarFinal.glb", title: "Car" },
    { src: "/models/Beaver.glb", title: "Nutcracker" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {models.map((m) => (
        <ModelTile key={m.src} src={m.src} title={m.title} />
      ))}
    </div>
  );
}
