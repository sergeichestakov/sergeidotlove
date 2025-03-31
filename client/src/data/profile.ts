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
  bio: "Hey there! I'm Sergei, a passionate software engineer and designer with a love for creating beautiful digital experiences. When I'm not coding, you'll find me hiking in the mountains, experimenting with photography, or trying out new coffee shops around the city. I believe in building products that make a positive impact and create meaningful connections.",
  interests: [
    "Coding",
    "Photography",
    "Hiking",
    "UX Design",
    "Travel",
    "Coffee",
    "Music"
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
