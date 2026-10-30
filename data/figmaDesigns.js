const PORTFOLIO = "/projects/figma/portfolio-website";
const LOGOS_FIGMA =
  "https://www.figma.com/design/4HL0PMISdyujo5ShunxHwW/Logos?node-id=75-29&t=gsZNHDn9Kr5JhLA7-1";

// Design items, shown in this order. category "Logo" uses the logo popup
// (square logo beside the header); anything else uses the layout popup (the
// whole Figma page up top). Logos are written up as case studies; every
// case-study field is optional and the popup skips any section that's missing:
//   meta        { role, year } pills under the intro
//   sections    [{ title, body }] text sections (same shape as software projects)
//   process     [{ image, caption }] iteration screenshots, in order; logos
//               show them just before the last section
//   popupImage  logos only: a tight square crop shown beside the header
//   layout      layouts only: { image, label, width, height } a screenshot of
//               the whole Figma page, shown full width up top; width and height
//               are the page's size in Figma (also sets the aspect ratio)
//   website     a live site, linked with a "Visit website" button beside the
//               "View in Figma" one
// Put each logo's images in public/projects/figma/<slug>/.
export const figmaDesigns = [
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    description:
      "Web layout of my current portfolio websites (includes past versions).",
    image: `${PORTFOLIO}/layout-v3.png`,
    category: "Web",
    skills: ["Figma"],
    figmaUrl:
      "https://www.figma.com/design/30To8JEteODVtAxppAilUy/Portfolio?node-id=453-146",
    // the whole V3 page of the Portfolio Figma file
    layout: {
      image: `${PORTFOLIO}/layout-v3.png`,
      label: "V3",
      width: 8431,
      height: 4631,
    },
    // TODO: check the captions describe each version the way you'd put it
    process: [
      { image: `${PORTFOLIO}/v0.png`, caption: "V0: the first layout, built from simple green cards" },
      { image: `${PORTFOLIO}/v1.png`, caption: "V1: a centred hero with the mountain logo and rounded nav" },
      { image: `${PORTFOLIO}/v2.png`, caption: "V2: the pixel font and forest backdrop arrive" },
      { image: `${PORTFOLIO}/v3-home.png`, caption: "V3: the current design, with the MP logo and colour-coded portfolio pages" },
    ],
  },
  {
    slug: "third-eye",
    title: "Third Eye",
    description:
      "A simpler, modern logo for Third Eye Studio, the media agency I'm starting with friends: an eye built around a camera aperture.",
    image: "/projects/figma/third-eye/cover.png",
    popupImage: "/projects/figma/third-eye/logo.png",
    category: "Logo",
    skills: ["Figma"],
    figmaUrl:
      "https://www.figma.com/design/4HL0PMISdyujo5ShunxHwW/Logos?node-id=76-208",
    website: "https://thirdeyestudio.ca",
    meta: { role: "Logo & brand design", year: "2025" },
    sections: [
      {
        title: "Why this design?",
        body: "Third Eye Studio is a media agency I'm starting with a couple of friends. We already had a logo, but it felt dated, so the goal was to simplify and modernise it into a mark that could carry the company forward.",
      },
      {
        title: "Thought process & inspiration",
        body: "A lot of the inspiration came from Allan Peters and the way his designs boil an idea down to a few bold, simple shapes. Every part of the mark means something: the eye stands for vision, its iris is a camera aperture for our videography and media work, and the aperture's three slits represent the three of us who founded the company. Early versions were shiny 3D metal eyes; flattening them and testing different pupils inside the same eye outline is what led to the aperture.",
      },
      {
        title: "What's next",
        body: "The logo is the start of a bigger system. We want Third Eye to grow into an umbrella brand, with other apps under its name, so a matching set of logos that share the eye's shapes and stroke weight is in progress.",
      },
    ],
    process: [
      { image: "/projects/figma/third-eye/01-3d-eye.png", caption: "First pass: shiny 3D metal eye concepts" },
      { image: "/projects/figma/third-eye/02-flat-shapes.png", caption: "Flattening the idea into simple eye and bar shapes" },
      { image: "/projects/figma/third-eye/03-eye-variations.png", caption: "Testing different pupils inside one eye outline" },
      { image: "/projects/figma/third-eye/04-aperture-refinement.png", caption: "Refining the camera-aperture iris and its three slits" },
    ],
  },
  {
    slug: "mp",
    title: "Personal Logo",
    description:
      "My initials, M and P, designed as an ambigram that reads the same upside down, drawn as one flowing stroke. Used across this site and as its favicon.",
    image: "/projects/figma/mp/cover.png",
    popupImage: "/projects/figma/mp/logo.png",
    category: "Logo",
    skills: ["Figma"],
    figmaUrl:
      "https://www.figma.com/design/4HL0PMISdyujo5ShunxHwW/Logos?node-id=154-52",
    meta: { role: "Logo design", year: "2025" },
    sections: [
      {
        title: "Why this design?",
        body: "I wanted a personal mark for my portfolio and socials: something built from my initials, recognisable at favicon size, that still felt hand-drawn rather than corporate.",
      },
      {
        title: "Thought process & inspiration",
        body: "The idea from the start was an ambigram: my initials drawn so the mark reads MP both ways up. Along the way I also tried icon ideas built around mountains and climbing, but kept coming back to pure letterforms. Mirroring and outlining the M and P showed they could share strokes, which led to one continuous line that writes both letters in a single motion and still reads MP when turned upside down. Try hovering on it in the header!",
      },
      {
        title: "What I learned",
        body: "Simplifying was the hardest part. Testing the mark in different weights, greens and drop shadows helped me settle on one flat colour that matches the rest of the site.",
      },
    ],
    // exported from the MP page of the Logos Figma file
    process: [
      { image: "/projects/figma/mp/01-mountain-icons.png", caption: "Mountain and climbing icon ideas" },
      { image: "/projects/figma/mp/02-monogram-badges.png", caption: "Early MP monogram badges" },
      { image: "/projects/figma/mp/03-letterforms.png", caption: "Letterform studies: mirrored, outlined and connected MP shapes" },
      { image: "/projects/figma/mp/04-colour-and-depth.png", caption: "Refining the single-stroke mark in different greens and depths" },
    ],
  },
  {
    slug: "man-made-media",
    title: "Man Made Media",
    // TODO: rewrite the copy below in your own words
    description:
      "Wordmark for Man Made Media, a podcast, built around a stacked title and a vintage microphone.",
    image: "/projects/figma/podcast3.png",
    popupImage: "/projects/figma/man-made-media/logo.png",
    category: "Logo",
    skills: ["Figma"],
    figmaUrl: LOGOS_FIGMA,
    meta: { role: "Logo design", year: "2025" },
    sections: [
      {
        title: "Why this design?",
        body: "Man Made Media needed a logo that felt bold and handmade, something that would read clearly as a tiny podcast thumbnail but still have personality on banners and merch.",
      },
      {
        title: "Thought process & inspiration",
        body: "I started from the name itself: stacking MAN over MADE gave a strong, blocky shape, and running MEDIA vertically down the side let the letters double as the stand of a classic microphone, tying the wordmark back to the podcast.",
      },
      {
        title: "What I learned",
        body: "Designing for small sizes first forced me to simplify. Testing the mark on dark, light and brand-coloured backgrounds early showed which details survived and which needed to go.",
      },
    ],
    process: [
      { image: "/projects/figma/man-made-media/01-wordmark.png", caption: "Refined wordmark with the microphone stand" },
      { image: "/projects/figma/man-made-media/02-lockups.png", caption: "Final lockups: dark, light, small sizes and brand colour" },
    ],
  },
];
