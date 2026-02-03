import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import storeEntryVideo from "@/assets/store-entry.mp4";

interface ThreeDIntroProps {
  onComplete: () => void;
}

// Optimized Logo reveal animation
function LogoReveal({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
      />
      
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-8xl md:text-9xl font-light tracking-tighter text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {"FLUX".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.p
          className="mt-4 text-white/50 text-sm uppercase tracking-[0.5em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          Wear the Future
        </motion.p>
        
        <motion.div
          className="mt-8 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/40"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function VideoIntro({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        onComplete();
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        onEnded={onComplete}
        muted
        playsInline
        autoPlay
      >
        <source src={storeEntryVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <p className="text-white/60 text-sm uppercase tracking-[0.3em]">
          Entering Store
        </p>
      </div>
    </motion.div>
  );
}

export default function ThreeDIntro({ onComplete }: ThreeDIntroProps) {
  const [step, setStep] = useState<"logo" | "video">("logo");

  const handleLogoComplete = () => {
    setStep("video");
  };

  const handleVideoComplete = () => {
    onComplete();
  };

  return (
    <AnimatePresence mode="wait">
      {step === "logo" && (
        <LogoReveal key="logo" onComplete={handleLogoComplete} />
      )}
      {step === "video" && (
        <VideoIntro key="video" onComplete={handleVideoComplete} />
      )}
    </AnimatePresence>
  );
}

