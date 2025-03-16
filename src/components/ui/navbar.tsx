"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // スクロール位置に応じてナビゲーションバーのスタイルを変更
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md py-2"
          : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center"
        >
          <span className="text-2xl font-bold text-white">未来のインテリア</span>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden md:flex items-center space-x-8"
        >
          {["ホーム", "コレクション", "ショーケース", "体験", "コンタクト"].map(
            (item, index) => (
              <a
                key={index}
                href={`#${index === 0 ? "" : item}`}
                className="text-white/80 hover:text-white transition-colors"
              >
                {item}
              </a>
            )
          )}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center space-x-4"
        >
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 hidden md:flex"
          >
            ログイン
          </Button>
          <Button className="bg-white text-black hover:bg-white/90 rounded-full">
            体験を予約
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
