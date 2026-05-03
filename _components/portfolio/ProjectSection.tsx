export function ProjectSection({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border-2 border-[#6a8366] bg-[#1a1b1a] px-5 pb-2">
      <h2 className="font-minecraft text-2xl text-[#90AD8F] mb-3">{title}</h2>
      <div className="font-minecraft text-sm leading-7">{children}</div>
    </section>
  );
}
