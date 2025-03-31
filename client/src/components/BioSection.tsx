import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Profile } from '@/types';

interface BioSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BioSection({ isOpen, onClose }: BioSectionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ['/api/profile'],
  });
  
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
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
          >
            <div className="p-4 border-b border-gray-200">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-poppins">Sergei's Profile</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                </button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="p-6 space-y-6">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-1/3"></div>
                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-1/3"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="p-6 overflow-y-auto max-h-[70vh]">
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
