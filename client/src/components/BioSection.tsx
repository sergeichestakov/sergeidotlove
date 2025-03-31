import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, PanInfo, TapInfo } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Profile } from '@/types';

interface BioSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BioSection({ isOpen, onClose }: BioSectionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ['/api/profile'],
  });
  
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };
  
  const handleTap = (_: MouseEvent | TouchEvent | PointerEvent, info: TapInfo) => {
    // Only close if tapping on the overlay (not the content)
    if (info.point.y < window.innerHeight - 100) {
      onClose();
    }
  };
  
  const handleDragStart = () => {
    setIsDragging(true);
  };
  
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    // If the user drags down more than 80px or with velocity greater than 500, close the modal
    if (info.offset.y > 80 || (info.velocity.y > 500 && info.offset.y > 20)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
          onTap={handleTap}
        >
          <motion.div
            className="w-full max-w-md bg-white rounded-t-3xl shadow-lg overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 40, stiffness: 350 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.4}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 25 }}
            dragDirectionLock
            dragPropagation={false}
            style={{ cursor: isDragging ? 'grabbing' : 'auto', touchAction: 'none' }}
          >
            <div className="pt-3 pb-2 px-4 relative flex items-center justify-center">
              <motion.div 
                className="w-20 h-1.5 bg-gray-300 rounded-full cursor-grab active:cursor-grabbing"
                whileHover={{ scale: 1.1, backgroundColor: '#d1d5db' }}
                whileTap={{ scale: 0.95 }}
              ></motion.div>
            </div>
            
            {isLoading ? (
              <div className="pt-6 px-6 pb-6 space-y-6">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-1/3"></div>
                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-1/3"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="pt-4 px-6 pb-6 overflow-y-auto max-h-[70vh]">
                {/* Profile Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">{profile?.name}, {profile?.age}</h3>
                    <p className="text-gray-600">{profile?.profession}</p>
                  </div>
                </div>
                
                {/* Bio content */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold font-poppins mb-3">About Me</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {profile?.bio}
                  </p>
                </div>
                
                {/* Interests section */}
                <div>
                  <h3 className="text-xl font-semibold font-poppins mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile?.interests.map((interest, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
