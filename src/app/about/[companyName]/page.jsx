import { notFound } from "next/navigation";
import career from "../../../../data/career";
import ClientPage from "./ClientPage";

export async function generateMetadata({ params }) {
  const { companyName } = params;
  const selected = career.find(
    (c) => c.name.toLowerCase() === companyName.toLowerCase()
  );

  if (!selected) {
    return { title: "Not Found / Michael Pasyechnyk" };
  }

  const formattedName =
    selected.name.charAt(0).toUpperCase() + selected.name.slice(1);

  return { title: `${formattedName} / Michael Pasyechnyk` };
}

export default function CompanyPage({ params }) {
  const { companyName } = params;
  const selected = career.find(
    (career) => career.name.toLowerCase() === companyName.toLowerCase()
  );

  if (!selected) return notFound();

  return <ClientPage selected={selected} />;
}
