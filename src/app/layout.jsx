import Header from "../../_components/Header";
import HeaderV2 from "../../_components/HeaderV2";
import Footer from "../../_components/Footer";
import "./globals.css";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import ClientLayout from "../../_components/ClientLayout";
import MobileHeader from "../../_components/MobileHeader";

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
    <html lang="en" className={`${montserrat.variable} ${minecraft.variable}`}>
      <body className="relative min-h-screen flex flex-col items-center antialiased bg-[url('/bg/waterfall.gif')] bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="absolute inset-0 bg-[#242524]/90 pointer-events-none" />

        <div className="relative w-full min-h-screen flex flex-col items-center">
          <div className="hidden md:flex w-full justify-center">
            <Header />
          </div>

          <main className="w-full flex-1 flex justify-center px-4 pt-6 md:pt-26 pb-24 md:pb-0">
            <ClientLayout>{children}</ClientLayout>
          </main>

          <div className="hidden md:block w-full">
            <Footer />
          </div>

          <MobileHeader />
        </div>
      </body>
    </html>
  );
}
