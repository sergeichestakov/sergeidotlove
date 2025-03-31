import { Profile } from '@/types';
import { calculateAge } from '@/lib/utils';

// Define birthdate: May 10, 1998 2:00pm UTC
export const BIRTHDATE = new Date(Date.UTC(1998, 4, 10, 14, 0, 0)); // Note: Month is 0-indexed (4 = May)

export const profileData: Profile = {
  id: 1,
  name: "Sergei",
  birthdate: BIRTHDATE,
  age: calculateAge(BIRTHDATE), // Dynamically calculated
  profession: "Software Engineer at Startup",
  bio: "Hi! I'm Sergei, a software engineer based in New York City. I'm originally from California and grew up in the Bay Area. When I'm not coding, you can find me working out, reading, traveling, or hanging with friends. I'm always looking to try new things and meet interesting people.",
  interests: [
    "Coding",
    "Travel",
    "Running",
    "Reading",
    "Biking",
    "Coffee",
    "Music",
    "Lifting",
    "Snowboarding"
  ],
  socialLinks: [
    {
      platform: "Twitter",
      url: "https://twitter.com",
      icon: "fab fa-twitter"
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com",
      icon: "fab fa-linkedin-in"
    },
    {
      platform: "GitHub",
      url: "https://github.com",
      icon: "fab fa-github"
    },
    {
      platform: "Email",
      url: "mailto:hello@sergei.love",
      icon: "fas fa-envelope"
    }
  ]
};
