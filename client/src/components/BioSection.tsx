import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
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
  
  const handleDragStart = () => {
    setIsDragging(true);
  };
  
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    // If the user drags down more than 50px, close the modal
    if (info.offset.y > 50) {
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
        >
          <motion.div
            className="w-full max-w-md bg-white rounded-t-3xl shadow-lg overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.6}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            dragMomentum={false}
            dragDirectionLock
            style={{ cursor: isDragging ? 'grabbing' : 'auto' }}
          >
            <div className="pt-4 pb-2 px-4 relative">
              <motion.div 
                className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto cursor-grab active:cursor-grabbing"
                whileHover={{ scale: 1.1, backgroundColor: '#d1d5db' }}
                whileTap={{ scale: 0.95 }}
              ></motion.div>
            </div>
            <motion.button
              onClick={onClose}
              className="fixed right-4 top-4 z-50 w-8 h-8 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors bg-white/80 backdrop-blur-sm rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </motion.button>
            
            {isLoading ? (
              <div className="pt-8 px-6 pb-6 space-y-6">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-1/3"></div>
                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-1/3"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="pt-8 px-6 pb-6 overflow-y-auto max-h-[70vh]">
                {/* Profile Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">{profile?.name}, {profile?.age}</h3>
                    <p className="text-gray-600">{profile?.profession}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Born on {profile?.birthdate && new Date(profile.birthdate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
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
                <div className="mb-6">
                  <h3 className="text-xl font-semibold font-poppins mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile?.interests.map((interest, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Contact section */}
                <div>
                  <h3 className="text-xl font-semibold font-poppins mb-3">Get In Touch</h3>
                  <div className="flex space-x-4">
                    {profile?.socialLinks.map((link, index) => (
                      <a 
                        key={index}
                        href={link.url} 
                        className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={link.icon}></i>
                      </a>
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
