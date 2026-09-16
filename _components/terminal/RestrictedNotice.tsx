import { Info } from "lucide-react";

export default function RestrictedNotice() {
  return (
    <p className="flex items-center gap-1.5 text-center text-xs text-text-muted">
      <Info size={13} className="shrink-0" />
      This is a scripted recreation of two specific programs — it plays back
      fixed output, not a live Python interpreter, and can&apos;t run
      anything else.
    </p>
  );
}
