"use client";

import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";
import {
  Suspense,
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ModelEntry {
  src: string;
  title: string;
  description: string;
  images: string[];
}

const PLA_WHITE: THREE.MeshStandardMaterialParameters = {
  color: "#807e76",
  roughness: 0.55,
  metalness: 0.05,
};

function ModelLoaderOverlay() {
  const { active, progress } = useProgress();
  if (!active) return null;

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#87a082] border-t-transparent" />
      <p className="mt-3 font-minecraft text-sm text-[#ccd8c2]">
        {Math.round(progress)}%
      </p>
    </div>
  );
}

function CenteredModel({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  const { camera } = useThree();

  // clone so each mounted instance gets its own object —
  // otherwise grid + modal fight over the same cached scene
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial(PLA_WHITE);
      }
    });
  }, [clonedScene]);

  useLayoutEffect(() => {
    // center the model at the origin
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    clonedScene.position.sub(center);

    // re-measure now that it's centered, and get its bounding sphere
    const box2 = new THREE.Box3().setFromObject(clonedScene);
    const sphere = box2.getBoundingSphere(new THREE.Sphere());
    const radius = sphere.radius;

    // push the camera back exactly far enough to frame this model,
    // based on its actual size, not a guessed constant
    const cam = camera as THREE.PerspectiveCamera;
    const fovRad = (cam.fov * Math.PI) / 180;
    const fitPadding = 0.9; // >1 = more breathing room around the model
    const distance = (radius * fitPadding) / Math.sin(fovRad / 2);

    const direction = new THREE.Vector3(0.22, 0.1, 0.22).normalize();
    cam.position.copy(direction.multiplyScalar(distance));
    cam.lookAt(0, 0, 0);
    cam.updateProjectionMatrix();
  }, [clonedScene, camera]);

  return (
    <group position={[0, 0.01, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

function ModelViewer({
  src,
  interactive = true,
  dark = false,
  aspectClass = "aspect-square",
}: {
  src: string;
  interactive?: boolean;
  dark?: boolean;
  aspectClass?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-md ${aspectClass} ${
        interactive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
      }`}
      style={
        dark
          ? {
              backgroundColor: "#0a0a0a",
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }
          : undefined
      }
    >
      <ModelLoaderOverlay />
      <Canvas
        shadows
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
        camera={{ fov: 25 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[0, 5, 0]} intensity={1} />
        <Environment preset="studio" />

        <Suspense fallback={null}>
          <CenteredModel src={src} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          enabled={interactive}
        />
      </Canvas>
    </div>
  );
}

function ImageSlideshow({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-md border border-[#3d4a3a] bg-black/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[index]}
          alt={`${title} reference ${index + 1}`}
          className="h-full w-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-[#ccd8c2] transition hover:bg-black/70"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-[#ccd8c2] transition hover:bg-black/70"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-2 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-4 bg-[#87a082]" : "w-1.5 bg-[#3d4a3a]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ModelModal({
  model,
  onClose,
}: {
  model: ModelEntry;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="modal-scroll relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-y-auto rounded-lg border-2 border-[#60755d] bg-[#1a1f1a] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 rounded-full bg-black/40 p-1.5 text-[#ccd8c2] transition hover:bg-black/60"
        >
          <X size={20} />
        </button>

        <div className="mb-4 w-full">
          <ModelViewer src={model.src} dark aspectClass="aspect-video" />
        </div>

        <h2 className="font-minecraft text-lg text-[#ccd8c2]">{model.title}</h2>
        <p className="mt-2 w-full text-sm leading-relaxed text-[#a8b3a0]">
          {model.description}
        </p>

        <div className="mt-4 w-full">
          <ImageSlideshow images={model.images} title={model.title} />
        </div>
      </div>
    </div>
  );
}

export default function ModelGrid() {
  const [activeModel, setActiveModel] = useState<ModelEntry | null>(null);

  const models: ModelEntry[] = [
    {
      src: "/models/Donut/FinalDonut.glb",
      title: "Donut",
      description:
        "A classic frosted donut, modeled, textured, and rendered in Blender. This model and scene was part of my first ever course in blender!",
      images: [
        "/models/Donut/Donut&Coffee1.png",
        "/models/Donut/DonutViewport.png",
        "/models/Donut/Shading.png",
        "/models/Donut/Scene.png",
      ],
    },
    {
      src: "/models/Car/CarFinal.glb",
      title: "Cyber Truck",
      description:
        "A low-poly version of the Cybertruck, built with modeling techniques taught in SYDE101L as a final project at the University of Waterloo",
      images: ["/models/Car/CarFinal.JPG", "/models/Car/CarExploded.png"],
    },
    {
      src: "/models/Beaver.glb",
      title: "Nutcracker",
      description:
        "A nutcracker beaver figure, built with modeling techniques taught in SYDE101L as a final project at the University of Waterloo",
      images: [
        "/models/Beaver/FinalModel.jpg",
        "/models/Beaver/BeaverExploded.png",
      ],
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 bg-[#1a1f1aa9] border-2 border-[#60755d] rounded-lg p-4 shadow-[0_4px_6px_rgba(0,0,0,0.5)] sm:grid-cols-3">
        {models.map((m) => (
          <button
            key={m.src}
            type="button"
            onClick={() => setActiveModel(m)}
            className="group text-left"
            aria-label={`View ${m.title}`}
          >
            <ModelViewer src={m.src} interactive={false} />
          </button>
        ))}
      </div>

      {activeModel && (
        <ModelModal model={activeModel} onClose={() => setActiveModel(null)} />
      )}
    </>
  );
}
