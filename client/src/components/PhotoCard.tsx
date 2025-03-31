import { useState } from 'react';
import { motion } from 'framer-motion';
import { Photo } from '@/types';

interface PhotoCardProps {
  photo: Photo;
  disabled?: boolean;
}

export default function PhotoCard({ photo, disabled = false }: PhotoCardProps) {
  const [dragAmount, setDragAmount] = useState({ x: 0, y: 0 });
  
  // Calculate rotation based on drag amount
  const calculateRotation = (x: number) => {
    return x * 0.1; // 0.1 is a good sensitivity factor
  };
  
  // Determine if like/nope badge should be shown
  const showLikeBadge = dragAmount.x > 50;
  const showNopeBadge = dragAmount.x < -50;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden select-none">
      <div className="relative pb-[140%]">
        <img
          src={photo.src}
          alt={photo.alt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50"></div>
        
        {/* Like Badge */}
        <motion.div
          className="absolute top-[10%] right-[10%] text-success border-4 border-success font-bold uppercase py-1 px-3 rounded-md transform -rotate-30 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: showLikeBadge ? 1 : 0 }}
          style={{ rotate: -30 }}
        >
          Like
        </motion.div>
        
        {/* Nope Badge */}
        <motion.div
          className="absolute top-[10%] left-[10%] text-destructive border-4 border-destructive font-bold uppercase py-1 px-3 rounded-md transform rotate-30 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: showNopeBadge ? 1 : 0 }}
          style={{ rotate: 30 }}
        >
          Nope
        </motion.div>
        
        {/* Photo info */}
        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
          <h2 className="text-2xl font-bold font-poppins">{photo.name}, {photo.age}</h2>
          <p className="text-sm opacity-90">{photo.profession}</p>
        </div>
      </div>
    </div>
  );
}
