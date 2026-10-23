import SoftwareCard from "./SoftwareCard";

// Every portfolio item (software, design or model) uses the same card:
// preview image, short description, tool pills and title plaque.
export default function PortfolioCard({ item, ...props }) {
  return <SoftwareCard project={item} {...props} />;
}
