// The MP ambigram. mp-logo.svg is a single flat fill, so it's used as a mask
// over the palette's title colour (see globals.css) and follows palette swaps.
export default function Logo({ className = "" }) {
  return (
    <span
      role="img"
      aria-label="Logo"
      className={`block bg-(--pal-title) mask-[url('/logos/mp-logo.svg')] mask-size-[100%_100%] mask-no-repeat ${className}`}
    />
  );
}
