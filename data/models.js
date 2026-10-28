// 3D models shown in the Models row and popup (rendered by src/components/ModelView.tsx)
// Optional popup fields:
//   sections    [{ title, body }] text sections (same shape as software projects)
//   parts       [{ image, name }] pieces of the model, shown five to a row
export const models = [
  {
    slug: "donut",
    skills: ["Blender"],
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
    slug: "cyber-truck",
    skills: ["SolidWorks"],
    src: "/models/Car/CarFinal.glb",
    title: "Cyber Truck",
    description:
      "A low-poly version of the Cybertruck, built with modeling techniques taught in SYDE101L as a final project at the University of Waterloo",
    images: ["/models/Car/CarFinal.JPG", "/models/Car/CarExploded.png"],
  },
  {
    slug: "nutcracker",
    skills: ["SolidWorks"],
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
