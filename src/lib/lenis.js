// The site-wide Lenis instance (set by <SmoothScroll />), so plain helpers
// like scrollToAbout can scroll through it instead of fighting it with
// window.scrollTo.
let instance = null;

export const setLenis = (lenis) => {
  instance = lenis;
};

export const getLenis = () => instance;

// Smooth-scrolls the page to a pixel offset, through Lenis when it's running.
export function scrollToY(top) {
  if (instance) {
    instance.scrollTo(top, { duration: 1.4 });
  } else {
    window.scrollTo({ top, behavior: "smooth" });
  }
}
