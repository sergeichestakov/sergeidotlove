import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Photo } from "@/types";
import PhotoCard from "./PhotoCard";
import MatchAnimation from "./MatchAnimation";
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
  const [showMatch, setShowMatch] = useState(false);
  const [lastMatchedPhoto, setLastMatchedPhoto] = useState<Photo | null>(null);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Reference to track the previous index for animation purposes
  const prevIndexRef = useRef(currentIndex);

  // Preload all images on component mount
  useEffect(() => {
    if (photos.length > 0 && !imagesPreloaded) {
      // Create an array to track loaded images
      const imagePromises = photos.map((photo) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = photo.src;
        });
      });

      // When all images are loaded, update state
      Promise.all(imagePromises).then(() => {
        setImagesPreloaded(true);
      });
    }
  }, [photos, imagesPreloaded]);

  // Update the prevIndexRef whenever currentIndex changes
  useEffect(() => {
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Handle card being dragged and released
  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isTransitioning) return; // Prevent multiple transitions

    if (info.offset.x > 100) {
      // Swiped right - trigger the same logic as the like button
      handleSwipeRight();
    } else if (info.offset.x < -100) {
      // Swiped left - trigger the same logic as the X button
      handleSwipeLeft();
    }
  };

  // Handles what happens after a normal swipe (direction is set)
  // Special cases for the last card are handled directly in handleDragEnd and handleSwipeRight
  useEffect(() => {
    if (!direction) return; // Only run when a direction is set (after swipe)
    
    // Short delay to allow the card exit animation to start
    const timer = setTimeout(() => {
      // Process normal card transitions
      if (currentIndex === photos.length - 1) {
        // Last card swiped left - go to end screen
        setCurrentIndex(photos.length);
      } else {
        // Normal case - go to next card
        setCurrentIndex(prev => prev + 1);
      }
      
      // Reset swipe state with slight delay to allow animations
      setTimeout(() => {
        setDirection(null);
        setIsTransitioning(false);
      }, 100);
    }, 300); // Delay matches the card exit animation
    
    return () => clearTimeout(timer);
  }, [direction, photos.length, currentIndex]);

  const handleSwipeLeft = () => {
    if (isTransitioning) return; // Prevent multiple transitions
    
    setDirection("left");
    setExitX(-200);
    setIsTransitioning(true);
  };

  // Handle clicking the "like" button
  const handleSwipeRight = () => {
    if (isTransitioning) return; // Prevent multiple transitions
    
    // Special case: last card - trigger match
    if (currentIndex === photos.length - 1) {
      console.log("Last card swiped right via BUTTON - showing match!");
      
      // Store photo for match screen
      if (photos[currentIndex]) {
        setLastMatchedPhoto(photos[currentIndex]);
      }
      
      // Apply animation first (extra large for dramatic effect)
      setExitX(1000);
      setIsTransitioning(true);
      
      // Wait for card to animate out, then show match
      setTimeout(() => {
        setShowMatch(true); // Show match animation
        setCurrentIndex(photos.length); // Move to end screen behind the scenes
        setIsTransitioning(false);
      }, 300);
    } else {
      // Normal card - regular behavior
      if (photos[currentIndex]) {
        setLastMatchedPhoto(photos[currentIndex]);
      }
      
      setDirection("right");
      setExitX(200);
      setIsTransitioning(true);
    }
  };

  const handleRestart = () => {
    // Reset all states when restarting
    setCurrentIndex(0);
    setDirection(null);
    setExitX(0);
    setIsTransitioning(false);
  };

  if (isLoading || !imagesPreloaded) {
    return (
      <div className="flex-1 flex flex-col items-center justify-start pt-4 pb-20 px-4 relative overflow-hidden">
        <div className="w-full max-w-sm h-[500px] bg-white/10 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  const handleCloseMatch = () => {
    setShowMatch(false);
    // Make sure we stay on the "That's all for now!" screen
    setCurrentIndex(photos.length);
  };

  // Calculate the next card index (for preview)
  // Only show the next card preview if we're not in a transition
  const nextIndex = !isTransitioning && currentIndex + 1 < photos.length ? currentIndex + 1 : null;


  return (
    <div className="flex-1 flex flex-col items-center justify-start pt-2 pb-16 sm:pt-4 sm:pb-20 px-4 relative overflow-hidden">
      {/* Match Animation */}
      <MatchAnimation 
        isVisible={showMatch} 
        onClose={handleCloseMatch} 
        matchedPhoto={lastMatchedPhoto} 
      />
      
      <div className="w-full max-w-sm relative h-[480px] sm:h-[500px]">
        {currentIndex < photos.length ? (
          <>
            {/* Next card (background preview) - only show when not transitioning */}
            {nextIndex !== null && (
              <div 
                className="absolute top-0 left-0 w-full scale-[0.92] -z-10 opacity-60"
                style={{ pointerEvents: 'none' }}
              >
                <PhotoCard photo={photos[nextIndex]} disabled={true} />
              </div>
            )}
            
            {/* Current card with exit animation */}
            <AnimatePresence initial={false} mode="wait">
              <motion.div 
                key={currentIndex}
                className="absolute top-0 left-0 w-full z-10"
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
                exit={{ 
                  x: exitX, 
                  opacity: 0, 
                  rotate: exitX > 0 ? 30 : -30,
                  transition: { duration: 0.3 }
                }}
                drag={!isTransitioning ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.9}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.05 }}
                onDrag={(_, info) => {
                  // Update drag state for the badges in PhotoCard
                  const currentCard = document.querySelector('.current-card');
                  if (currentCard) {
                    // Set custom attribute to communicate drag amount to PhotoCard
                    currentCard.setAttribute('data-drag-x', info.offset.x.toString());
                    
                    // Show like/nope badges based on drag direction
                    if (info.offset.x > 50) {
                      currentCard.classList.add('drag-right');
                      currentCard.classList.remove('drag-left');
                    } else if (info.offset.x < -50) {
                      currentCard.classList.add('drag-left');
                      currentCard.classList.remove('drag-right');
                    } else {
                      currentCard.classList.remove('drag-right', 'drag-left');
                    }
                  }
                }}
              >
                <PhotoCard photo={photos[currentIndex]} className="current-card" />
              </motion.div>
            </AnimatePresence>
            
            {/* Swipe buttons */}
            <div className="swipe-buttons absolute -bottom-24 sm:-bottom-32 left-0 right-0 flex justify-center items-center space-x-3 sm:space-x-4 z-10">
              <button 
                onClick={handleSwipeLeft}
                disabled={isTransitioning}
                className="w-14 h-14 sm:w-14 sm:h-14 flex items-center justify-center bg-white text-destructive rounded-full shadow-lg hover:bg-destructive hover:text-white transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              </button>
              <button 
                onClick={onInfoClick}
                className="w-12 h-12 sm:w-12 sm:h-12 flex items-center justify-center bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-600 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              </button>
              <button 
                onClick={handleSwipeRight}
                disabled={isTransitioning}
                className="w-14 h-14 sm:w-14 sm:h-14 flex items-center justify-center bg-white text-success rounded-full shadow-lg hover:bg-green-600 hover:text-white transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
              </button>
            </div>
            
            {/* Photo indicators - positioned 4px above the bottom of the card */}
            <div className="absolute bottom-1 left-0 right-0 z-30">
              <div className="photo-indicators flex items-center justify-center space-x-1">
                {photos.map((_, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "photo-indicator h-1 rounded-full transition-all duration-300",
                      index === currentIndex 
                        ? "bg-white w-8" 
                        : "bg-white/60 w-4"
                    )}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 h-full bg-white rounded-2xl shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-primary mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
            <h2 className="text-2xl font-bold font-poppins mb-6">That's all for now!</h2>
            <button 
              onClick={handleRestart}
              className="bg-primary text-white font-medium rounded-full px-6 py-3 hover:bg-opacity-90 transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}