export function ProjectSection({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border-2 border-border-subtle bg-surface-1 px-5 pb-2">
      <h2 className="font-minecraft text-2xl text-accent mb-3">{title}</h2>
      <div className="font-minecraft text-sm leading-7 text-text-secondary">
        {children}
      </div>
    </section>
  );
}
