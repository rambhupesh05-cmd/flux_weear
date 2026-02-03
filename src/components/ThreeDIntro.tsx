import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import storeEntryVideo from "@/assets/store-entry.mp4";

interface ThreeDIntroProps {
  onComplete: () => void;
}

// Logo reveal animation like driptrip
function LogoReveal({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Show intro for 3 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Animated overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2%, transparent 2%),
                            radial-gradient(circle at 75% 75%, white 2%, transparent 2%)`,
          backgroundSize: "50px 50px",
        }} />
      </div>
      
      {/* Main logo container */}
      <div className="relative z-10 text-center">
        {/* Animated bracket lines */}
        <motion.div
          className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-px bg-white/30"
          initial={{ scaleX: 0, originX: 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.div
          className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-px bg-white/30"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        
        {/* FLUX Text with character reveal */}
        <motion.h1
          className="text-8xl md:text-9xl font-light tracking-tighter text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {"FLUX".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        
        {/* Tagline with reveal */}
        <motion.p
          className="mt-6 text-white/50 text-sm md:text-base uppercase tracking-[0.5em] md:tracking-[0.8em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Wear the Future
        </motion.p>
        
        {/* Animated underline */}
        <motion.div
          className="mt-8 h-px bg-white/20 mx-auto"
          initial={{ scaleX: 0, width: 0 }}
          animate={{ scaleX: 1, width: 200 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
        
        {/* Loading dots */}
        <motion.div
          className="mt-12 flex justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/40"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Corner decorations */}
      <motion.div
        className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
      <motion.div
        className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
    </motion.div>
  );
}

// Store entry video animation
function VideoIntro({ onComplete }: { onComplete: () => void }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <video
        ref={videoRef}
        className={`h-full w-full object-cover ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        onCanPlay={() => setVideoLoaded(true)}
        onEnded={onComplete}
        muted
        playsInline
        autoPlay
      >
        <source src={storeEntryVideo} type="video/mp4" />
      </video>
      
      {/* Video overlay gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
      
      {/* Enter store text */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-white/60 text-sm uppercase tracking-[0.4em]">
          Entering Store
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/40"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                delay: i * 0.15 
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Skip button */}
      <motion.button
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-white/50 hover:text-white text-sm uppercase tracking-[0.2em] transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Skip →
      </motion.button>
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

