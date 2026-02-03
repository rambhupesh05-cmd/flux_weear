import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ThreeDIntroProps {
  onComplete: () => void;
}

// Smooth fade-through animation
function SmoothTransition({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.h1
          className="text-8xl md:text-9xl font-light tracking-tighter text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          FLUX
        </motion.h1>
      </motion.div>
      
      <motion.div
        className="fixed inset-0 z-50 flex items-end justify-center pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <p className="text-white/50 text-sm uppercase tracking-[0.3em]">
          Entering Store
        </p>
      </motion.div>
    </>
  );
}

export default function ThreeDIntro({ onComplete }: ThreeDIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SmoothTransition onComplete={onComplete} />
    </motion.div>
  );
}

