import Header from "../../_components/Header";
import HeaderV2 from "../../_components/HeaderV2";
import Footer from "../../_components/Footer";
import "./globals.css";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import ClientLayout from "../../_components/ClientLayout";
import HideOnPaths from "../../_components/HideOnPaths";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/SmoothScroll";

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
  return (
    <html lang="en" className={`${montserrat.variable} ${minecraft.variable}`}>
      <body className="relative min-h-screen flex flex-col items-center antialiased">
        <div className="relative w-full min-h-screen flex flex-col items-center">
          <div className="flex w-full justify-center">
            <Header />
          </div>

          <ClientLayout>{children}</ClientLayout>

          <HideOnPaths paths={["/posts"]}>
            <div className="w-full">
              <Footer />
            </div>
          </HideOnPaths>
        </div>
        <SmoothScroll />
        <Analytics />
      </body>
    </html>
  );
}
