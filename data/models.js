// 3D models shown in the /portfolio "3d" taskbar category. Extracted from the
// data that used to be hardcoded inside src/components/ModelView.tsx so the
// taskbar/category system has a single source of truth for every project type.
const models = [
  {
    slug: "donut",
    title: "Donut",
    category: "3d",
    glbPath: "/models/Donut/FinalDonut.glb",
    description:
      "A classic frosted donut, modeled, textured, and rendered in Blender. This model and scene was part of my first ever course in blender!",
    referenceImages: [
      "/models/Donut/Donut&Coffee1.png",
      "/models/Donut/DonutViewport.png",
      "/models/Donut/Shading.png",
      "/models/Donut/Scene.png",
    ],
  },
  {
    slug: "cyber-truck",
    title: "Cyber Truck",
    category: "3d",
    glbPath: "/models/Car/CarFinal.glb",
    description:
      "A low-poly version of the Cybertruck, built with modeling techniques taught in SYDE101L as a final project at the University of Waterloo",
    referenceImages: [
      "/models/Car/CarFinal.JPG",
      "/models/Car/CarExploded.png",
    ],
  },
  {
    slug: "nutcracker",
    title: "Nutcracker",
    category: "3d",
    glbPath: "/models/Beaver.glb",
    description:
      "A nutcracker beaver figure, built with modeling techniques taught in SYDE101L as a final project at the University of Waterloo",
    referenceImages: [
      "/models/Beaver/FinalModel.jpg",
      "/models/Beaver/BeaverExploded.png",
    ],
  },
];

export { models };
