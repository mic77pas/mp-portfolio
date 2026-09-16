"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import SkillBadge from "../SkillBadge";
import { staggerItem } from "../../src/lib/motion/variants";

export type ProjectCardData = {
  key: string;
  title: string;
  description?: string;
  image: string;
  href?: string;
  onClick?: () => void;
  tags?: string[];
  year?: number | string;
  badge?: string;
};

const cardClassName =
  "group relative flex h-full w-full flex-col overflow-hidden rounded-xl border-2 border-border-subtle bg-surface-1 text-left shadow-md transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring";

function CardShell({
  children,
  href,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cardClassName}>
      {children}
    </button>
  );
}

export default function ProjectCard({ item }: { item: ProjectCardData }) {
  return (
    <motion.div variants={staggerItem()} className="h-full">
      <CardShell href={item.href} onClick={item.onClick}>
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b-2 border-border-subtle">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-0/40 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-20" />
          {item.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-2 py-0.5 font-minecraft text-[10px] text-accent-contrast">
              {item.badge}
            </span>
          )}
          {item.year && (
            <span className="absolute right-3 top-3 rounded-full bg-surface-0/80 px-2 py-0.5 text-[10px] text-text-secondary">
              {item.year}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="font-minecraft text-lg font-bold text-text-primary">
            {item.title}
          </h3>
          {item.description && (
            <p className="line-clamp-2 text-sm text-text-secondary">
              {item.description}
            </p>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {item.tags.slice(0, 4).map((tag) => (
                <SkillBadge key={tag} name={tag} size="sm" />
              ))}
            </div>
          )}
        </div>
      </CardShell>
    </motion.div>
  );
}
