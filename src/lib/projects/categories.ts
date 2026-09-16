import { Box, Code2, Palette, Sparkles, type LucideIcon } from "lucide-react";

export type CategoryId = "software" | "design" | "3d" | "other";

export interface Category {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
}

export const CATEGORIES: Category[] = [
  { id: "software", label: "Software", icon: Code2 },
  { id: "design", label: "Design", icon: Palette },
  { id: "3d", label: "3D Modelling", icon: Box },
  { id: "other", label: "Other", icon: Sparkles },
];

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((category) => category.id === id);
}
