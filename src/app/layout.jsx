import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import "./globals.css";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import ClientLayout from "../../_components/ClientLayout";
import MobileHeader from "../../_components/MobileHeader";
import ThemeToggle from "../../_components/ThemeToggle";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "../lib/theme/ThemeProvider";
import { ThemeScript } from "../lib/theme/ThemeScript";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const minecraft = localFont({
  src: [
    {
      path: "../../public/fonts/minecraft/MinecraftRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/minecraft/MinecraftBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/minecraft/MinecraftItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/minecraft/MinecraftBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/minecraft/MinecraftTen.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-minecraft",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Michael Pasyechnyk",
    template: "Michael Pasyechnyk / %s",
    description: "Enter the world of Michael Pasyechnyk",
  },
};

export default function RootLayout({ children }) {
  // bg-[url('/bg/waterfall.gif')]
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${minecraft.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="relative min-h-screen flex flex-col items-center antialiased bg-cover bg-center bg-no-repeat bg-fixed">
        <ThemeProvider>
          <div className="absolute inset-0 bg-surface-0/90 pointer-events-none" />

          <div className="relative w-full min-h-screen flex flex-col items-center">
            <Header />

            <main className="w-full flex-1 flex justify-center md:px-4 md:pt-24 pb-12 md:pb-0">
              <ClientLayout>{children}</ClientLayout>
            </main>

            <div className="hidden md:block w-full">
              <Footer />
            </div>

            <MobileHeader />

            <ThemeToggle className="fixed right-4 bottom-28 md:bottom-4 z-200 shadow-lg" />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
