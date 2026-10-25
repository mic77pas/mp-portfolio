const PLACEHOLDER = "/projects/figma/placeholder.png";
const LOGOS_FIGMA =
  "https://www.figma.com/design/4HL0PMISdyujo5ShunxHwW/Logos?node-id=75-29&t=gsZNHDn9Kr5JhLA7-1";

// Design items. Logos are written up as case studies; every case-study field
// is optional and the popup skips any section that's missing:
//   meta        { client, role, year } pills under the intro
//   sections    [{ title, body }] text sections (same shape as software projects)
//   process     [{ image, caption }] iteration screenshots, in order
// Put each logo's images in public/projects/figma/<slug>/.
export const figmaDesigns = [
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    description:
      "Web layout of my current portfolio websites (includes past versions).",
    image: "/projects/figma/website.png",
    category: "Web",
    skills: ["Figma"],
    figmaUrl:
      "https://www.figma.com/design/30To8JEteODVtAxppAilUy/Portfolio?node-id=329-2&t=MTWCMn280voxMc7C-1",
  },
  {
    slug: "man-made-media",
    title: "Man Made Media",
    // TODO: rewrite the copy below in your own words
    description:
      "Wordmark for Man Made Media, a podcast, built around a stacked title and a vintage microphone.",
    image: "/projects/figma/podcast3.png",
    category: "Logo",
    skills: ["Figma"],
    figmaUrl: LOGOS_FIGMA,
    meta: { client: "Man Made Media (podcast)", role: "Logo design", year: "2025" },
    sections: [
      {
        title: "The brief",
        body: "Man Made Media needed a logo that felt bold and handmade, something that would read clearly as a tiny podcast thumbnail but still have personality on banners and merch.",
      },
      {
        title: "Thought process",
        body: "I started from the name itself: stacking MAN over MADE gave a strong, blocky shape, and running MEDIA vertically down the side let the letters double as the stand of a classic microphone, tying the wordmark back to the podcast.",
      },
      {
        title: "What I learned",
        body: "Designing for small sizes first forced me to simplify. Testing the mark on dark, light and brand-coloured backgrounds early showed which details survived and which needed to go.",
      },
    ],
    process: [
      { image: PLACEHOLDER, caption: "Early sketches and rough wordmark ideas" },
      { image: "/projects/figma/podcast2.png", caption: "Refined wordmark with the microphone stand" },
      { image: "/projects/figma/podcast.png", caption: "Final lockups: dark, light, small sizes and brand colour" },
    ],
  },
  {
    slug: "mp",
    title: "MP",
    // TODO: rewrite the copy below in your own words
    description:
      "My personal monogram: a single flowing stroke that draws an M and a P, used across this site and as its favicon.",
    image: "/projects/figma/mp/cover.png",
    category: "Logo",
    skills: ["Figma"],
    figmaUrl:
      "https://www.figma.com/design/4HL0PMISdyujo5ShunxHwW/Logos?node-id=154-52",
    meta: { client: "Personal brand", role: "Logo design", year: "2025" },
    sections: [
      {
        title: "The brief",
        body: "I wanted a personal mark for my portfolio and socials: something recognisable at favicon size that still felt hand-drawn rather than corporate.",
      },
      {
        title: "Thought process",
        body: "I started with icon ideas built around mountains and climbing, then moved to pure letterforms. Mirroring and outlining the M and P showed they could share strokes, which led to one continuous line that writes both letters in a single motion.",
      },
      {
        title: "What I learned",
        body: "Simplifying was the hardest part. Testing the mark in different weights, greens and drop shadows helped me settle on one flat colour that matches the rest of the site.",
      },
    ],
    // TODO: check the order matches how the logo actually evolved
    process: [
      { image: "/projects/figma/mp/01-monogram-explorations.png", caption: "Early monogram badges, plus mountain and climbing icon ideas" },
      { image: "/projects/figma/mp/02-letterforms.png", caption: "Letterform studies: mirrored, outlined and connected MP shapes" },
      { image: "/projects/figma/mp/03-colour-and-depth.png", caption: "Refining the single-stroke mark in different greens and depths" },
    ],
  },
  {
    slug: "third-eye",
    title: "ThirdEye",
    // TODO: rewrite the copy below in your own words (who ThirdEye is for, what it does)
    description:
      "Logo and icon set for ThirdEye: an eye built around a camera aperture, with matching film and community icons.",
    image: "/projects/figma/third-eye/cover.png",
    category: "Logo",
    skills: ["Figma"],
    figmaUrl:
      "https://www.figma.com/design/4HL0PMISdyujo5ShunxHwW/Logos?node-id=76-208",
    meta: { client: "ThirdEye", role: "Logo & icon design", year: "2025" },
    sections: [
      {
        title: "The brief",
        body: "ThirdEye needed a mark that hinted at film and vision, and that could sit alongside a small family of matching icons.",
      },
      {
        title: "Thought process",
        body: "Early versions were shiny, 3D metal eyes. I flattened them into simple shapes, tried a dozen different pupils inside the same eye outline, and landed on a camera aperture as the iris, which ties the eye back to filmmaking.",
      },
      {
        title: "What I learned",
        body: "Designing the logo as part of an icon set (eye, clapperboard, community) forced every piece to share the same stroke weight and shapes, which made the final mark much more consistent.",
      },
    ],
    process: [
      { image: "/projects/figma/third-eye/01-3d-eye.png", caption: "First pass: shiny 3D metal eye concepts" },
      { image: "/projects/figma/third-eye/02-flat-shapes.png", caption: "Flattening the idea into simple leaf and bar shapes" },
      { image: "/projects/figma/third-eye/03-eye-variations.png", caption: "Testing different pupils inside one eye outline" },
      { image: "/projects/figma/third-eye/04-aperture-refinement.png", caption: "Refining the camera-aperture iris" },
      { image: "/projects/figma/third-eye/05-icon-family.png", caption: "The final mark alongside its matching icon set" },
    ],
  },
];
