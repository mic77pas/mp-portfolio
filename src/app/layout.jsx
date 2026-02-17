import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { motion } from "motion/react";
import ClientLayout from "../../_components/ClientLayout";
import localFont from "next/font/local";

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
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.className} ${minecraft.variable}`}>
      <body className="relative min-h-screen flex flex-col items-center antialiased bg-[url('/bg/waterfall.gif')] bg-cover bg-center bg-no-repeat bg-fixed">
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#242524]/90 pointer-events-none" />

        {/* Content */}
        <div className="relative w-full max-w-5xl min-h-screen flex flex-col items-center">
          <Header />
          <main className="flex-1 w-full p-4 pt-26 flex justify-center">
            <ClientLayout>{children}</ClientLayout>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
