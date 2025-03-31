import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Photo } from '@/types';

interface PhotoCardProps {
  photo: Photo;
  disabled?: boolean;
  className?: string;
}

export default function PhotoCard({ photo, disabled = false, className = '' }: PhotoCardProps) {
  const [dragAmount, setDragAmount] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Calculate rotation based on drag amount
  const calculateRotation = (x: number) => {
    return x * 0.1; // 0.1 is a good sensitivity factor
  };
  
  // Determine if like/nope badge should be shown
  const showLikeBadge = dragAmount.x > 50;
  const showNopeBadge = dragAmount.x < -50;

  // Preload the image to avoid alt text flash
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = photo.src;
    
    // If the image is already in browser cache, it might load immediately
    if (img.complete) {
      setImageLoaded(true);
    }
  }, [photo.src]);

  // Watch for CSS class changes on drag
  useEffect(() => {
    if (!className.includes('current-card')) return;
    
    const element = document.querySelector(`.${className}`);
    if (!element) return;
    
    // Setup mutation observer to watch for class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const newClasses = (mutation.target as HTMLElement).className;
          // Update the badges based on drag direction classes
          if (newClasses.includes('drag-right')) {
            setDragAmount({ x: 100, y: 0 });
          } else if (newClasses.includes('drag-left')) {
            setDragAmount({ x: -100, y: 0 });
          } else {
            setDragAmount({ x: 0, y: 0 });
          }
        }
      });
    });
    
    observer.observe(element, { attributes: true });
    
    // Also watch for data-drag-x attribute changes
    const dragObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-drag-x') {
          const dragX = parseFloat((mutation.target as HTMLElement).getAttribute('data-drag-x') || '0');
          setDragAmount({ x: dragX, y: 0 });
        }
      });
    });
    
    dragObserver.observe(element, { attributes: true });
    
    return () => {
      observer.disconnect();
      dragObserver.disconnect();
    };
  }, [className]);

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden select-none ${className}`}>
      <div className="relative pb-[130%] md:pb-[140%]">
        {/* Show a skeleton loader while image is loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse"></div>
        )}
        
        {/* Hide the image and alt text until loaded */}
        <img
          src={photo.src}
          alt={photo.alt}
          className={`absolute inset-0 w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          draggable="false"
        />
        
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50"></div>
        
        {/* Like Badge */}
        <motion.div
          className="absolute top-[10%] right-[10%] text-success border-4 border-success font-bold uppercase py-1 px-3 rounded-md transform -rotate-30 z-20 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: showLikeBadge ? 1 : 0 }}
          style={{ rotate: -30 }}
        >
          Like
        </motion.div>
        
        {/* Nope Badge */}
        <motion.div
          className="absolute top-[10%] left-[10%] text-destructive border-4 border-destructive font-bold uppercase py-1 px-3 rounded-md transform rotate-30 z-20 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: showNopeBadge ? 1 : 0 }}
          style={{ rotate: 30 }}
        >
          Nope
        </motion.div>
        
        {/* Photo info */}
        <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 text-white">
          <h2 className="text-xl md:text-2xl font-bold font-poppins">{photo.name}, {photo.age}</h2>
          <p className="text-xs md:text-sm opacity-90">{photo.profession}</p>
        </div>
      </div>
    </div>
  );
}
