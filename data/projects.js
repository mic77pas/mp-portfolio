const projects = [
  {
    id: 10,
    title: "Wild Oasis Website",
    description:
      "Hotel booking site (connected with `The Wild Oasis`) utilizing the Next.js 'app' router, react server components, server actions, and authentication with NextAuth ",
    image: "/projects/wild-oasis-website.png",
    gif: "https://github.com/user-attachments/assets/83ec42ae-fafd-41aa-9733-22183891128c",
    github: "https://github.com/mic77pas/ReactApps",
    tech: ["React", "Front-End", "UX"],
  },
  {
    id: 9,
    title: "The Wild Oasis",
    description:
      "Hotel management site w/ bookings, cabin editing, and user settings, utlizing react query, styled componenets, reack hook form, supabase, advanced compound component patterns, authentication, charts, dark mode, and professional application planning/development",
    image: "/projects/wild-oasis.png",
    gif: "https://github.com/user-attachments/assets/7c284a36-a955-41ae-9c54-f727ee5f0cc3",
    github: "https://github.com/mic77pas/ReactApps",
    tech: ["React", "Full-Stack Development", "UX"],
  },
  {
    id: 8,
    title: "Fast React Pizza",
    description:
      "Pizza menu/ordering site with a search order, cart overview, and order tracker, practising React router data loading, redux/redux toolkit, thunks, and Tailwind CSS",
    image: "/projects/fast-react-pizza.png",
    gif: "https://github.com/user-attachments/assets/ce0f51ed-7646-46da-aeaa-fb381694c83f",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 7,
    title: "WorldWise",
    description:
      "World map travelling tracker practising React Router, Context API, memo/useMemo, useCallback, and the Leaflet library",
    image: "/projects/worldwise.png",
    gif: "https://github.com/user-attachments/assets/afb36b0a-9260-4dcf-9a07-0d3d6a32b4db",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 6,
    title: "The React Quiz",
    description:
      "Multiple-choice react-based quiz w/ points and timer, practising the useReducer hook",
    image: "/projects/react-quiz.png",
    gif: "https://github.com/user-attachments/assets/8131133e-5243-4e26-abf4-612c8de0799f",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 5,
    title: "Classy Weather",
    description: "Simple weather app utilizing react class components",
    image: "/projects/classy-weather.png",
    gif: "https://github.com/user-attachments/assets/81be5636-ed43-492b-9a2c-f8e9a9383bb4",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 4,
    title: "usePopcorn",
    description:
      "Movie rating gallery with built-in search and movie stats, practising useEffect, data fetching, and custom hooks",
    image: "/projects/usePopcorn.png",
    gif: "https://github.com/user-attachments/assets/f519dd1a-1116-445b-87ca-2a0fef584b05",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 3,
    title: "Eat-N-Split",
    description:
      "Money splitting application to track expenses with friends practising React components",
    image: "/projects/eat-n-split.png",
    gif: "https://github.com/user-attachments/assets/c9d2ca19-1ec1-4db1-acab-f5f191dbebd9",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 2,
    title: "Travel List",
    description:
      "Travel 'to-do' list with sorting and packing status practising useState and other state management concepts",
    image: "/projects/travel-list.png",
    gif: "https://github.com/user-attachments/assets/65f3a3b0-c9a7-4cca-ad27-83409d24e80a",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 1,
    title: "React Pizza Graphic",
    description:
      "Simple menu graphic made with react components, props, and JSX",
    image: "/projects/react-pizza.png",
    gif: "https://github.com/user-attachments/assets/6576e93c-5790-4168-8392-d05318becbff",
    github: "https://github.com/mic77pas/ReactApps",
  },
  {
    id: 11,
    title: "Google Mimic",
    description:
      "Simple HTML/CSS project mimicking Google's UI/UX and usability, includes regular/image/advanced search and 'Feeling Lucky' option",
    image: "/projects/google.png",
    gif: "/projects/google.gif",
    github: "https://github.com/mic77pas/CS50-WebProjects",
  },
  {
    id: 12,
    title: "Wiki",
    description:
      "Markdown-based encyclopedia that supports viewing existing pages, searching for articles, creating and editing entries, and viewing random articles. Designed with a clean interface and secure content editing, leveraging Django for server-side logic and content rendering",
    image: "/projects/wiki.png",
    gif: "/projects/wiki.gif",
    github: "https://github.com/mic77pas/CS50-WebProjects",
  },
  {
    id: 13,
    title: "Social Network",
    description:
      "A Twitter-style social platform where users can create and edit posts, follow/unfollow users, like/unlike posts, and view a personalized feed of followed users. Utilizes Django for backend logic and JavaScript for dynamic front-end interactions including live updates and pagination.",
    image: "/projects/network.png",
    gif: "/projects/network.gif",
    github: "https://github.com/mic77pas/CS50-WebProjects",
  },
  {
    id: 14,
    title: "E-Commerce",
    description:
      "A Django-powered auction platform where users can post product listings with images and descriptions, place bids on active listings, comment on items, add items to a personal watchlist, close auctions and view winner results. Implements user authentication and dynamic listing updates using Django’s ORM and templating engine.",
    image: "/projects/commerce.png",
    gif: "/projects/commerce.gif",
    github: "https://github.com/mic77pas/CS50-WebProjects",
  },
  {
    id: 16,
    title: "Mail",
    description:
      "A single-page application that mimics Gmail functionality to compose, send, read, and archive emails, mark messages as read/unread, view inbox, sent mail, and archived folders. Implemented using JavaScript fetch API and a Django backend for asynchronous communication.",
    image: "/projects/mail.png",
    gif: "/projects/mail.gif",
    github: "https://github.com/mic77pas/CS50-WebProjects",
  },
  {
    id: 17,
    title: "Resume Builder",
    description:
      "A modern resume builder that allows users to create, edit, and export professional resumes (with optional AI-assist). Features include real-time content editing, dynamic section management, and a clean export-ready layout. Designed as a capstone project to integrate full-stack development and product thinking.",
    image: "/projects/resume.png",
    gif: "/projects/resume.gif",
    github: "https://github.com/mic77pas/CS50-WebProjects",
  },
  // add more projects...
];

export default projects;
