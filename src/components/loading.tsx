"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <motion.div
          className="relative h-24 w-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 外側のリング */}
          <motion.div
            className="absolute top-0 left-0 h-full w-full rounded-full border-2 border-white/20"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />

          {/* 内側の回転する要素 */}
          <motion.div
            className="absolute top-0 left-0 h-full w-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 h-8 w-2 bg-white/80 rounded-full left-1/2 transform -translate-x-1/2 origin-bottom" />
          </motion.div>

          {/* 中央の球体 */}
          <motion.div
            className="absolute top-1/2 left-1/2 h-8 w-8 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-white"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-6 text-white/80 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          未来の空間を読み込み中...
        </motion.p>
      </div>
    </div>
  );
}
