import Link from "next/link";
import PortfolioRail from "../cards/PortfolioRail";
import { allPortfolioItems } from "../../data/portfolioGroups";

export default function ProjectsPreview() {
  return (
    <section className="flex flex-col gap-5 w-full">
      <div className="flex items-end justify-between font-minecraft font-bold">
        <h2 className="text-[20px] text-[#c1dab6]">Projects</h2>
        <Link
          href="/portfolio"
          className="text-[14px] text-white transition-colors duration-200 hover:text-[#c1dab6]"
        >
          View All
        </Link>
      </div>

      <PortfolioRail items={allPortfolioItems} />
    </section>
  );
}
