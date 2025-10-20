import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { motion } from "motion/react";
import ClientLayout from "../../_components/ClientLayout";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Michael Pasyechnyk",
  description: "Portfolio of Michael Pasyechnyk",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
           <ClientLayout>{children}</ClientLayout>
        </main>
       
        <Footer />
      </body>
    </html>
  );
}
