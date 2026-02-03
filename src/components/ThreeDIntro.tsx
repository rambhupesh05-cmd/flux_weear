import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ThreeDIntroProps {
  onComplete: () => void;
}

/* ----------------------------------------
   LOGO INTRO (Step 1)
---------------------------------------- */

function LogoReveal({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />

      {/* Logo Text */}
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-8xl md:text-9xl font-light tracking-tighter text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {"FLUX".split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.2 + i * 0.08,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-5 text-white/50 text-sm uppercase tracking-[0.5em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Wear the Future
        </motion.p>

        {/* Loading Dots */}
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
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ----------------------------------------
   VIDEO INTRO (Step 2)
---------------------------------------- */

function VideoIntro({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  // Play video only after user interaction (fixes autoplay block)
  useEffect(() => {
    if (!started) return;

    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      console.warn("Autoplay blocked, user interaction required.");
    });
  }, [started]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ENTER BUTTON (Required for Production Browsers) */}
      {!started && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <button
            onClick={() => setStarted(true)}
            className="px-8 py-3 border border-white text-white uppercase tracking-[0.3em] hover:bg-white hover:text-black transition"
          >
            Enter Store
          </button>
        </div>
      )}

      {/* VIDEO */}
      {started && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={onComplete}
        >
          {/* Deployment Safe Path */}
          <source src="/videos/store-entry.mp4" type="video/mp4" />
        </video>
      )}

      {/* Overlay Text */}
      {started && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <p className="text-white/60 text-sm uppercase tracking-[0.3em]">
            Entering Store...
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ----------------------------------------
   MAIN INTRO CONTROLLER
---------------------------------------- */

export default function ThreeDIntro({ onComplete }: ThreeDIntroProps) {
  const [step, setStep] = useState<"logo" | "video">("logo");

  return (
    <AnimatePresence mode="wait">
      {step === "logo" && (
        <LogoReveal key="logo" onComplete={() => setStep("video")} />
      )}

      {step === "video" && (
        <VideoIntro key="video" onComplete={onComplete} />
      )}
    </AnimatePresence>
  );
}
