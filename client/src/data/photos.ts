import { Photo } from '@/types';
import { calculateAge } from '@/lib/utils';
import { BIRTHDATE } from './profile';

// Calculate the correct age
const currentAge = calculateAge(BIRTHDATE);

export const stockPhotos: Photo[] = [
  // Portrait photos
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=500&h=700",
    alt: "Portrait photo of man",
    type: "portrait",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=500&h=700",
    alt: "Portrait photo of man",
    type: "portrait",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?fit=crop&w=500&h=700",
    alt: "Portrait photo of man",
    type: "portrait",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?fit=crop&w=500&h=700",
    alt: "Portrait photo of man",
    type: "portrait",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=500&h=700",
    alt: "Portrait photo of man",
    type: "portrait",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=500&h=700", 
    alt: "Portrait photo of man",
    type: "portrait",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?fit=crop&w=500&h=700",
    alt: "Portrait photo of man",
    type: "portrait",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=500&h=700",
    alt: "Portrait photo of man",
    type: "portrait",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },

  // Casual lifestyle photos
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?fit=crop&w=500&h=700",
    alt: "Casual photo of man",
    type: "casual",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer & Coffee Enthusiast"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1482849297070-f4fae2173efe?fit=crop&w=500&h=700",
    alt: "Casual photo of man",
    type: "casual",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer & Coffee Enthusiast"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?fit=crop&w=500&h=700",
    alt: "Casual photo of man",
    type: "casual",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer & Traveler"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?fit=crop&w=500&h=700",
    alt: "Casual photo of man",
    type: "casual",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer & Traveler"
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1520409364224-63400afe26e5?fit=crop&w=500&h=700",
    alt: "Casual photo of man",
    type: "casual",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer & Hiker"
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1542892770-7d24c0104cb9?fit=crop&w=500&h=700",
    alt: "Casual photo of man",
    type: "casual",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer & Photographer"
  },

  // Professional photos
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1450133064473-71024230f91b?fit=crop&w=500&h=700",
    alt: "Professional photo of man",
    type: "professional",
    name: "Sergei",
    age: currentAge,
    profession: "Tech Lead & Public Speaker"
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=500&h=700",
    alt: "Professional photo of man",
    type: "professional",
    name: "Sergei",
    age: currentAge,
    profession: "Tech Lead & Public Speaker"
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?fit=crop&w=500&h=700",
    alt: "Professional photo of man",
    type: "professional",
    name: "Sergei",
    age: currentAge,
    profession: "Tech Lead & Public Speaker"
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?fit=crop&w=500&h=700",
    alt: "Professional photo of man",
    type: "professional",
    name: "Sergei",
    age: currentAge,
    profession: "Tech Lead & Public Speaker"
  }
];
