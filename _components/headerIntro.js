// Page-load intro shared by the desktop and mobile headers: the logo draws
// itself (see Logo.jsx) and the nav links drop in one after another while it
// does. Timed to wrap up with the hero title's letter-by-letter entrance
// (~1.8s). The headers live in the root layout, so this only plays once per
// page load, not on client-side navigation.

export const LOGO_DRAW = { delay: 0.2, duration: 1.5 };

// props for the i-th nav item; `from` is the side it slides in from
export const navIntro = (i, from = -14) => ({
  initial: { opacity: 0, y: from },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay: 0.5 + i * 0.12,
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
  },
});
