import SoftwareCard from "./SoftwareCard";
import MediaCard from "./MediaCard";

// Picks the card style for a portfolio item based on its `kind`.
export default function PortfolioCard({ item, ...props }) {
  return item.kind === "software" ? (
    <SoftwareCard project={item} {...props} />
  ) : (
    <MediaCard item={item} {...props} />
  );
}
