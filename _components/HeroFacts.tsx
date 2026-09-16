// Compact "who/where/status" chips for the landing-page hero (spec section
// 2). Education and current/recent role are already covered by the
// IconLink row on the landing page, so this only adds the two facts that
// aren't shown anywhere else: location and availability.
export default function HeroFacts() {
  return (
    <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-1 px-3 py-1.5 font-minecraft text-xs text-text-secondary md:text-sm">
        <span className="text-text-muted">based in</span>
        {/* No location has been provided yet — replace with a real value. */}
        <span className="italic text-text-muted">[Add current location]</span>
      </span>

      <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-1 px-3 py-1.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-available opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-status-available" />
        </span>
        <span className="font-minecraft text-xs text-text-secondary md:text-sm">
          Open to co-op opportunities for Fall 2026
        </span>
      </span>
    </div>
  );
}
