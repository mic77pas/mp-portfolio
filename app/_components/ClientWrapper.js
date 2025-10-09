"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import { Montserrat } from "next/font/google"; // Import font here if used within this component

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ClientWrapper({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`${montserrat.className} antialiased flex flex-col min-h-screen`}
    >
      <Header />
      <motion.main
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
