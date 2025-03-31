import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Photo } from "@/types";
import PhotoCard from "./PhotoCard";
import { cn } from "@/lib/utils";

interface CardStackProps {
  onInfoClick: () => void;
}

export default function CardStack({ onInfoClick }: CardStackProps) {
  const { data: photos = [], isLoading } = useQuery<Photo[]>({
    queryKey: ['/api/photos'],
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<string | null>(null);
  const [exitX, setExitX] = useState<number>(0);

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      setDirection("right");
      setExitX(200);
    } else if (info.offset.x < -100) {
      setDirection("left");
      setExitX(-200);
    }
  };

  useEffect(() => {
    if (direction) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
        setDirection(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [direction, photos.length]);

  const handleSwipeLeft = () => {
    setDirection("left");
    setExitX(-200);
  };

  const handleSwipeRight = () => {
    setDirection("right");
    setExitX(200);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-start pt-4 pb-20 px-4 relative overflow-hidden">
        <div className="w-full max-w-sm h-[500px] bg-white/10 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-start pt-4 pb-20 px-4 relative overflow-hidden">
      <div className="w-full max-w-sm relative h-[500px]">
        {currentIndex < photos.length ? (
          <>
            <AnimatePresence initial={false} mode="wait">
              <motion.div 
                key={currentIndex}
                className="absolute top-0 left-0 w-full"
                initial={{ scale: 0.95, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
                exit={{ 
                  x: exitX, 
                  opacity: 0, 
                  rotate: exitX > 0 ? 30 : -30,
                  transition: { duration: 0.3 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.9}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.05 }}
              >
                <PhotoCard photo={photos[currentIndex]} />
              </motion.div>
            </AnimatePresence>
            
            {/* Background cards effect */}
            {photos.length > currentIndex + 1 && (
              <div 
                className="absolute top-2 left-0 w-full scale-95 opacity-60 z-[-1]"
              >
                <PhotoCard photo={photos[(currentIndex + 1) % photos.length]} disabled />
              </div>
            )}
            
            {/* Swipe buttons */}
            <div className="swipe-buttons absolute -bottom-28 left-0 right-0 flex justify-center items-center space-x-4 z-10 mt-8">
              <button 
                onClick={handleSwipeLeft}
                className="w-14 h-14 flex items-center justify-center bg-white text-destructive rounded-full shadow-lg hover:bg-destructive hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              </button>
              <button 
                onClick={onInfoClick}
                className="w-12 h-12 flex items-center justify-center bg-white text-secondary rounded-full shadow-lg hover:bg-secondary hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              </button>
              <button 
                onClick={handleSwipeRight}
                className="w-14 h-14 flex items-center justify-center bg-white text-success rounded-full shadow-lg hover:bg-success hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
              </button>
            </div>
            
            {/* Photo indicators */}
            <div className="absolute -bottom-8 left-0 right-0">
              <div className="photo-indicators flex items-center justify-center space-x-1 my-4">
                {photos.map((_, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "photo-indicator h-1 rounded-full transition-all duration-300",
                      index === currentIndex 
                        ? "bg-primary w-8" 
                        : "bg-gray-300 w-4"
                    )}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 h-full bg-white rounded-2xl shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-primary mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
            <h2 className="text-2xl font-bold font-poppins mb-4">That's all for now!</h2>
            <p className="text-gray-600 mb-6">You've seen all my photos. Want to start over?</p>
            <button 
              onClick={handleRestart}
              className="bg-primary text-white font-medium rounded-full px-6 py-3 hover:bg-opacity-90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
