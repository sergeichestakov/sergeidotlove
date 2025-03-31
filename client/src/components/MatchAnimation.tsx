import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Photo } from "@/types";

interface MatchAnimationProps {
  isVisible: boolean;
  onClose: () => void;
  matchedPhoto: Photo | null;
}

export default function MatchAnimation({ isVisible, onClose, matchedPhoto }: MatchAnimationProps) {
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);
  
  useEffect(() => {
    if (isVisible) {
      // Create confetti particles
      const newConfetti = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        color: [
          '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', 
          '#FF9A8B', '#A2D2FF', '#FF87AB', '#4A9FFF'
        ][Math.floor(Math.random() * 8)]
      }));
      setConfetti(newConfetti);
      
      // Auto-close after 4 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Confetti */}
          {confetti.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              initial={{ 
                x: `50%`, 
                y: `50%`,
                opacity: 1,
                scale: 0
              }}
              animate={{ 
                x: `${particle.x}%`, 
                y: `${particle.y}%`,
                opacity: [1, 0.8, 0],
                scale: 1
              }}
              transition={{ 
                duration: Math.random() * 2 + 2,
                ease: "easeOut"
              }}
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color
              }}
            />
          ))}
          
          {/* Match content */}
          <motion.div 
            className="bg-gradient-to-b from-primary to-primary/80 rounded-3xl p-6 w-full max-w-md text-center relative z-10"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [0.5, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-4"
            >
              <h2 className="text-white text-4xl font-bold tracking-tight mb-2">
                IT'S A MATCH!
              </h2>
              <div className="h-0.5 w-20 bg-white/30 mx-auto"></div>
            </motion.div>
            
            <div className="flex items-center justify-center mb-6 mt-4">
              {/* "You" generic avatar */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 relative"
              >
                {/* Generic user avatar */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                {/* "You" text */}
                <div className="absolute bottom-0 left-0 right-0 bg-gray-800/70 py-1 text-white text-center text-sm font-medium">
                  You
                </div>
              </motion.div>
              
              {/* Heart icon */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="w-12 h-12 mx-3 bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </motion.div>
              
              {/* Matched person's photo */}
              {matchedPhoto && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg"
                >
                  <img 
                    src={matchedPhoto.src} 
                    alt={matchedPhoto.alt} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </div>
            
            <motion.p 
              className="text-white/80 mb-8 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              You and Sergei have liked each other!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <button 
                onClick={onClose}
                className="bg-white text-primary font-bold rounded-full py-3 px-8 shadow-md hover:bg-opacity-90 transition-colors"
              >
                KEEP SWIPING
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}