import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import storeEntryVideo from "@/assets/store-entry.mp4";

interface IntroScreenProps {
  onEnterComplete: () => void;
}

const IntroScreen = ({ onEnterComplete }: IntroScreenProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Preload video
  useEffect(() => {
    const video = document.createElement('video');
    video.src = storeEntryVideo;
    video.load();
    
    // Auto-start after short delay
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoCanPlay = () => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  const handleVideoEnd = () => {
    onEnterComplete();
  };

  // Simple fade-in animation for logo
  const logoVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!showVideo ? (
        // Simple logo screen
        <motion.div
          key="logo"
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-display-xl text-white font-light tracking-tighter"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            FLUX
          </motion.h1>
          
          <motion.p
            className="mt-6 text-white/50 text-sm uppercase tracking-[0.4em]"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            Wear the Future
          </motion.p>
          
          {/* Animated dots */}
          <motion.div
            className="flex gap-2 mt-12"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white/40"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.15 
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      ) : (
        // Store Entry Video Animation
        <motion.div
          key="video"
          className="fixed inset-0 z-50 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Video with smooth playback */}
          <video
            ref={videoRef}
            className={`h-full w-full object-cover ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            onCanPlay={handleVideoCanPlay}
            onEnded={handleVideoEnd}
            muted
            playsInline
            autoPlay
          >
            <source src={storeEntryVideo} type="video/mp4" />
          </video>
          
          {/* Video overlay */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Loading indicator while video loads */}
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 border-3 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}
          
          {/* Skip button */}
          <motion.button
            onClick={onEnterComplete}
            className="absolute bottom-8 right-8 group flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span>Skip</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;

