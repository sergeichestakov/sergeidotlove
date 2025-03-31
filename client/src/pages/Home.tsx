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
      <header className="p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold font-poppins">
          <span className="text-primary">sergei</span>
          <span className="text-foreground">.love</span>
        </h1>
        <a 
          href="https://sergei.com" 
          className="text-sm text-secondary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit my main site 
          <svg xmlns="http://www.w3.org/2000/svg" className="inline-block ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7h10v10"></path>
            <path d="M7 17 17 7"></path>
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
