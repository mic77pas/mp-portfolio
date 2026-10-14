import { projects } from "./projects";
import { figmaDesigns } from "./figmaDesigns";
import { models } from "./models";

// Every portfolio item tagged with its `kind`, which picks the card style and
// popup layout. The home page shows them all in one rail; /portfolio shows one
// rail per group.
export const portfolioGroups = [
  {
    kind: "software",
    title: "Software",
    items: projects.map((p) => ({ ...p, kind: "software" })),
  },
  {
    kind: "design",
    title: "Design",
    items: figmaDesigns.map((d) => ({ ...d, kind: "design" })),
  },
  {
    kind: "model",
    title: "Models",
    items: models.map((m) => ({ ...m, kind: "model", image: m.images[0] })),
  },
];

export const allPortfolioItems = portfolioGroups.flatMap((g) => g.items);
