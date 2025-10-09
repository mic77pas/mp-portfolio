import "./globals.css";
import ClientWrapper from "./_components/ClientWrapper";
import FaultyTerminal from "@/components/FaultyTerminal";
import PixelBlast from "@/components/PixelBlast";
import Dither from "@/components/Dither";
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
      <body className="relative bg-[#131413] text-[var(--foreground)] overflow-x-hidden">
        {/* Background Component */}
        {/* <div className="fixed inset-0 -z-10">
          <Dither
            waveColor={[0.5, 0.8, 0.5]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.25}
            waveFrequency={4}
            waveSpeed={0.05}
          />
        </div> */}
        <div className="fixed inset-0 -z-10">
          <FaultyTerminal
            scale={2.2}
            gridMul={[2, 1]}
            digitSize={1.5}
            timeScale={1}
            pause={false}
            scanlineIntensity={0.3}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={3}
            curvature={0.1}
            tint="#2C5F26"
            mouseReact={true}
            mouseStrength={1}
            pageLoadAnimation={true}
            brightness={0.5}
          />
        </div>

        {/* Page content */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
