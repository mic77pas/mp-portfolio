"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useLayoutEffect } from "react";
import Image from "next/image";

function ModelLoader() {
  return (
    <Html center>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#87a082] border-t-transparent" />
    </Html>
  );
}

function ModelLoaderOverlay() {
  const { active, progress } = useProgress();

  if (!active) return null;

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#1b1b1b]">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#87a082] border-t-transparent" />
      <p className="mt-3 font-minecraft text-sm text-[#ccd8c2]">
        {Math.round(progress)}%
      </p>
    </div>
  );
}

function CenteredModel({
  src,
  material,
}: {
  src: string;
  material?: THREE.MeshStandardMaterialParameters;
}) {
  const { scene } = useGLTF(src);

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial(
          material || {
            color: "#a3a3a3",
            roughness: 0.2,
            metalness: 0.8,
          },
        );
      }
    });
  }, [scene, material]);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);

  return (
    <group position={[0, 0.01, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function ModelTile({
  src,
  hoverSrc,
  title,
  type = "model",
  material,
}: {
  src: string;
  hoverSrc?: string;
  title?: string;
  type?: "model" | "image";
  material?: THREE.MeshStandardMaterialParameters;
}) {
  return (
    <div
      className="group transition-all duration-300 ease-out rounded-xl overflow-hidden bg-[#1b1b1b]
      shadow-[0_6px_4px_rgba(0,0,0,0.5)] cursor-pointer"
    >
      <div className="relative aspect-video w-full">
        {type === "model" ? (
          <>
          <ModelLoaderOverlay />
          <Canvas camera={{ position: [0.22, 0.1, 0.22], fov: 25 }}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[0, 5, 0]} intensity={1} />
            <Environment preset="studio" />

            <Suspense fallback={<ModelLoader />}>
              <CenteredModel src={src} material={material} />
            </Suspense>

            <OrbitControls enableZoom={false} enablePan={false} enableDamping />
          </Canvas></>
        ) : (
          <>
            <Image
              src={src}
              alt={title || "image"}
              fill
              className={`object-cover transition-opacity duration-300 ${
                hoverSrc ? "group-hover:opacity-0" : ""
              }`}
            />

            {hoverSrc && (
              <Image
                src={hoverSrc}
                alt="hover image"
                fill
                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function ModelGrid() {
  const models = [
    {
      src: "/models/Donut&Coffee1.png",
      hoverSrc: "/models/DonutViewport.png",
      title: "Blender Scene",
      type: "image",
    },
    {
      src: "/models/CarFinal.glb",
      title: "Cyber Truck",
      type: "model",
      material: {
        color: "#bebebe",
        roughness: 0.4,
        metalness: 0.9,
      },
    },
    {
      src: "/models/Beaver.glb",
      title: "Nutcracker",
      type: "model",
      material: {
        color: "#503112",
        roughness: 0.6,
        metalness: 0.3,
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {models.map((m) => (
        <ModelTile
          key={m.src}
          src={m.src}
          hoverSrc={m.hoverSrc}
          title={m.title}
          type={m.type as "model" | "image"}
          material={m.material}
        />
      ))}
    </div>
  );
}