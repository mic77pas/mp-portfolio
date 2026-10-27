// Posts on the /posts climbing wall. The wall climbs through time: the
// oldest post sits on the start hold at the bottom and each later one is a
// hold further up, so adding a post adds a hold.
//
// `when` places the post on the timeline (ISO year-month, or year-month-day
// when the exact date is known); the list is sorted by it below, so order
// in this file doesn't matter. `date` is what the card shows. `kind` is the
// small label on the card and `icon` picks its icon (event | community |
// program | work | stage | life; see ICONS in _components/posts/PostCard.jsx).
//
// `display` picks how the card shows its photos (the first photo is the
// main shot):
//   big-polaroid  one large taped polaroid hanging off the side (1 photo)
//   polaroids     two portrait polaroids fanned out of the corner (2)
//   landscape     torn-edge banner across the top, a snap pinned on (1-2)
//   filmstrip     a strip of film frames across the card (1-3)
//   stack         a messy pile of prints that fans out on hover (1-3)
//   split         a tall photo down one side, text beside it (1)
//   portrait      a tall taped portrait polaroid beside the text (1)
//   none          text only
// Posts with no photos yet show "photo soon" in each spot. To preview a
// layout on every card, open /posts?display=filmstrip (or any of the above).
const posts = [
  {
    id: "tedxuw-2024",
    display: "landscape",
    when: "2024-10-06",
    kind: "Event",
    icon: "event",
    title: "TEDxUW 2024 Conference",
    date: "Oct 6, 2024",
    photos: [{ src: "/posts/tedxevent.jpg", alt: "The TEDxUW 2024 stage" }],
    text: "TEDxUW was my first real taste of a large-scale conference experience at Waterloo. Volunteering with the production team was an absolute blast, from helping run the event behind the scenes to connecting with so many inspiring people across the TEDx community, and it’s something I’ll always look back on as a defining early experience.",
  },
  {
    id: "velocity-ambassador",
    display: "polaroids",
    when: "2025-04-02",
    kind: "Community",
    icon: "community",
    title: "Velocity Ambassador Experience",
    date: "April 2, 2025",
    photos: [
      { src: "/posts/velocity1.jpg", alt: "Michael in front of the Velocity wall" },
      { src: "/posts/velocity2.jpeg", alt: "Michael smiling at Velocity" },
    ],
    text: "Being a Velocity Ambassador has been an amazing way to dive into Waterloo’s startup ecosystem and connect with driven founders across campus. From helping run the Velocity Pitch Competition to sharing upcoming events with students, I’ve loved getting to play a small part in supporting innovators and entrepreneurs at Waterloo.",
  },
  {
    id: "env-to-eng",
    display: "landscape",
    when: "2025-08-24",
    kind: "Program transfer",
    icon: "program",
    title: "ENV to ENG Transition",
    date: "August 24, 2025",
    photos: [
      { src: "/posts/weng.jpg", alt: "The Waterloo Engineering sign lit up in purple" },
      { src: "/posts/weng2.jpg", alt: "A red stairwell in an engineering building" },
    ],
    text: "My first year in Geomatics introduced me to mapping, spatial data, and technology, a field I hadn’t expected but learned so much from. I soon realized I wanted to merge that problem-solving with design and systems thinking, which led me to Systems Design Engineering. It’s been a rewarding transition, and I’m excited to explore how technology and design can create impact.",
  },

  // ── placeholders: photos and full write-ups still to come ───────────────
  {
    id: "waterloo-geomatics",
    display: "big-polaroid",
    when: "2024-09",
    kind: "New chapter",
    icon: "program",
    title: "Starting at Waterloo in Geomatics",
    date: "Sep 2024",
    photos: [],
    text: "Started at the University of Waterloo in Geomatics, my first dive into mapping, spatial data and GIS. Full write-up coming soon.",
  },
  {
    id: "ipserlab-internship",
    display: "big-polaroid",
    when: "2025-05",
    kind: "Internship",
    icon: "work",
    title: "First Internship at IpserLab",
    date: "Summer 2025",
    photos: [],
    text: "My first internship, as a software engineer intern at IpserLab, building React and TypeScript features for early-stage MVPs. Full write-up coming soon.",
  },
  {
    id: "tedxuw-2025",
    display: "filmstrip",
    // during the fall term, before it wrapped up (exact date TBD)
    when: "2025-10",
    kind: "Event",
    icon: "event",
    title: "Production Manager, TEDxUW 2025",
    date: "Fall 2025",
    photos: [],
    text: "Back at TEDxUW a year later, this time as production manager for the 2025 conference. Full write-up coming soon.",
  },
  {
    id: "syde-1a",
    display: "big-polaroid",
    // end of the fall 2025 term
    when: "2025-12",
    kind: "Term complete",
    icon: "program",
    title: "SYDE 1A Finished",
    date: "Fall 2025",
    photos: [],
    text: "Wrapped up 1A, my first term in Systems Design Engineering. Full write-up coming soon.",
  },
  {
    id: "parkusher-coop",
    display: "split",
    when: "2026-01",
    kind: "Co-op",
    icon: "work",
    title: "First Co-op at Parkusher",
    date: "Winter 2026",
    photos: [],
    text: "Started my first co-op term at Parkusher. Full write-up coming soon.",
  },
  {
    id: "engplay-2026",
    display: "stack",
    // during the spring term, before 1B wrapped up
    when: "2026-06",
    kind: "Event",
    icon: "stage",
    title: "EngPlay",
    date: "Spring 2026",
    photos: [],
    text: "EngPlay, during the spring 2026 term. Full write-up coming soon.",
  },
  {
    id: "syde-1b",
    display: "portrait",
    // end of the spring 2026 term
    when: "2026-08",
    kind: "Term complete",
    icon: "program",
    title: "SYDE 1B Finished",
    date: "Spring 2026",
    photos: [],
    text: "Wrapped up 1B, and with it my first year of Systems Design Engineering. Full write-up coming soon.",
  },
  {
    id: "avante-coop",
    display: "polaroids",
    when: "2026-09",
    kind: "Co-op",
    icon: "work",
    title: "Co-op at Avante",
    date: "Fall 2026",
    photos: [],
    text: "My current co-op term, at Avante. Full write-up coming soon.",
  },
  {
    id: "vercel-ship-sf",
    display: "polaroids",
    when: "2026-10-15",
    kind: "Event",
    icon: "event",
    title: "Vercel Ship SF",
    date: "Oct 15, 2026",
    photos: [],
    text: "Vercel Ship in San Francisco. Full write-up coming soon.",
  },
];

// oldest first
posts.sort((a, b) => a.when.localeCompare(b.when));

export default posts;
