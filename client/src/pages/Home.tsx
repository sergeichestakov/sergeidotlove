import { useState } from 'react';
import CardStack from '@/components/CardStack';
import BioSection from '@/components/BioSection';

export default function Home() {
  const [isBioOpen, setIsBioOpen] = useState(false);

  const handleOpenBio = () => {
    setIsBioOpen(true);
  };

  const handleCloseBio = () => {
    setIsBioOpen(false);
  };

  return (
    <main className="max-w-md mx-auto min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-2 sm:p-4 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold font-poppins">
          <span className="text-primary">sergei</span>
          <span className="text-red-500 mx-0.5 animate-pulse">♥</span>
          <span className="text-foreground">love</span>
        </h1>
        <a 
          href="https://sergei.com" 
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm hover:bg-gray-100 text-gray-700 transition-colors"
          title="Visit sergei.com"
          aria-label="Visit my main website"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </a>
      </header>

      {/* Card Stack */}
      <CardStack onInfoClick={handleOpenBio} />

      {/* Bio Section */}
      <BioSection isOpen={isBioOpen} onClose={handleCloseBio} />
    </main>
  );
}
