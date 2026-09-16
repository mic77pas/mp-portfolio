import Image from "next/image";

type Milestone = {
  id: string;
  date: string;
  title: string;
  text?: string;
  photo?: string;
  placeholder?: string;
};

export default function WaterlooTimeline({
  milestones,
}: {
  milestones: Milestone[];
}) {
  return (
    <ol className="relative flex flex-col gap-10 border-l-2 border-border-subtle pl-6 md:pl-8">
      {milestones.map((item) => (
        <li key={item.id} className="relative">
          <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-accent bg-surface-0 md:-left-[39px]" />

          <p className="font-minecraft text-xs text-text-muted md:text-sm">
            {item.date}
          </p>
          <h3 className="mt-1 font-minecraft text-lg font-bold text-text-primary md:text-xl">
            {item.title}
          </h3>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start">
            {item.photo && (
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg border border-border-subtle sm:w-56">
                <Image
                  src={item.photo}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <p className="text-sm leading-7 text-text-secondary">
              {item.text || (
                <span className="italic text-text-muted">
                  {item.placeholder}
                </span>
              )}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
