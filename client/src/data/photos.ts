import { Photo } from '@/types';
import { calculateAge } from '@/lib/utils';
import { BIRTHDATE } from './profile';

// Calculate the correct age
const currentAge = calculateAge(BIRTHDATE);

export const stockPhotos: Photo[] = [
  // Photos sorted by number in filename
  {
    id: 1,
    src: "/assets/images/profile-pool-1.JPG",
    alt: "Sergei in a rooftop pool with city skyline in background",
    type: "casual",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },
  {
    id: 2,
    src: "/assets/images/profile-beach-2.JPG",
    alt: "Sergei at the beach with sunglasses smiling",
    type: "casual",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },
  {
    id: 3,
    src: "/assets/images/profile-burning-man-3.JPG",
    alt: "Sergei at Burning Man festival with pink scarf",
    type: "casual",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },
  {
    id: 4,
    src: "/assets/images/profile-gondola-4.jpg",
    alt: "Sergei in a gondola with city view in background",
    type: "casual",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },
  {
    id: 5,
    src: "/assets/images/profile-suit-smile-5.jpg",
    alt: "Sergei in a suit in a park",
    type: "professional",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },
  {
    id: 6,
    src: "/assets/images/profile-russia-6.JPG",
    alt: "Sergei in Moscow with Kremlin in background at sunset",
    type: "casual",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },
  {
    id: 7,
    src: "/assets/images/profile-hot-tub-7.jpg",
    alt: "Sergei in a hot tub at night with snowy mountains",
    type: "casual",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  },
  {
    id: 8,
    src: "/assets/images/profile-book-8.jpg",
    alt: "Sergei reading a book in bed",
    type: "casual",
    name: "Sergei",
    age: currentAge,
    profession: "Software Engineer at Startup"
  }
];
