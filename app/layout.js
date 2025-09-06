import "./globals.css";
import ClientWrapper from "./_components/ClientWrapper";
// import DarkModeToggle from "./_components/DarkModeToggle";

export const metadata = {
  title: {
    template: "%s / Michael Pasyechnyk",
    default: "Michael Pasyechnyk",
  },
  description:
    "My portfolio website built using React.js and Next.js, showcasing my skills, experience, and other information for potential employers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      {/* The new Client Component wrapper is used here */}
      {/* <ClientWrapper><body className="starry-bg">{children}</body></ClientWrapper> */}
      <ClientWrapper>{children}</ClientWrapper>
    </html>
  );
}
