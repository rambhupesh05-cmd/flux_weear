import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ThreeDIntroProps {
  onComplete: () => void;
}

/* ----------------------------------------
   CSS ANIMATIONS (Better mobile performance)
---------------------------------------- */
const cssAnimations = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
.animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
.animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
.animate-pulse { animation: pulse 1.2s ease-in-out infinite; }
`;

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
    <>
      <style>{cssAnimations}</style>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden touch-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />

        {/* Logo Text */}
        <div className="relative z-10 text-center px-4">
          {/* Simplified animation - just show the logo without individual letter animations */}
          <motion.h1
            className="text-5xl sm:text-7xl md:text-9xl font-light tracking-tighter text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {"FLUX"}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-4 sm:mt-5 text-white/50 text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.5em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Wear the Future
          </motion.p>

          {/* Loading Dots - CSS animated for better performance */}
          <div
            className="mt-6 sm:mt-8 flex justify-center gap-2"
            style={{ opacity: 0, animation: 'fadeIn 0.3s ease-out 0.8s forwards' }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/40"
                style={{
                  animation: `pulse 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ----------------------------------------
   VIDEO INTRO (Step 2)
---------------------------------------- */

function VideoIntro({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Play video only after user interaction (fixes autoplay block)
  useEffect(() => {
    if (!started) return;

    const video = videoRef.current;
    if (!video) return;

    // Set fallback timeout
    const fallbackTimeout = setTimeout(() => {
      setShowFallback(true);
    }, 3000);

    // Try to play video
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          clearTimeout(fallbackTimeout);
        })
        .catch(() => {
          clearTimeout(fallbackTimeout);
          setShowFallback(true);
        });
    }

    return () => clearTimeout(fallbackTimeout);
  }, [started]);

  const handleEnter = () => {
    setStarted(true);
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* ENTER BUTTON */}
      {!started && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50 touch-none">
          <button
            onClick={handleEnter}
            className="px-8 py-4 sm:px-10 sm:py-3 border border-white text-white uppercase tracking-[0.2em] text-sm sm:text-base touch-manipulation active:bg-white active:text-black transition-all"
          >
            Enter Store
          </button>
        </div>
      )}

      {/* VIDEO */}
      {started && !showFallback && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          onEnded={onComplete}
          style={{ maxHeight: '100vh' }}
        >
          <source src="/videos/store-entry.mp4" type="video/mp4" />
        </video>
      )}

      {/* Fallback Message */}
      {showFallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <button
            onClick={handleSkip}
            className="px-8 py-4 border border-white text-white uppercase tracking-[0.2em] text-sm touch-manipulation active:bg-white active:text-black transition-all"
          >
            Enter Store →
          </button>
        </div>
      )}

      {/* Overlay Text */}
      {started && !showFallback && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <p className="text-white/60 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em]">
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

  const handleLogoComplete = () => {
    setStep("video");
  };

  return (
    <AnimatePresence mode="wait">
      {step === "logo" && (
        <LogoReveal key="logo" onComplete={handleLogoComplete} />
      )}

      {step === "video" && (
        <VideoIntro key="video" onComplete={onComplete} />
      )}
    </AnimatePresence>
  );
}

