export interface Photo {
  id: number;
  src: string;
  alt: string;
  type: 'portrait' | 'casual' | 'professional';
  name: string;
  age: number;
  profession: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Profile {
  id: number;
  name: string;
  age: number;
  profession: string;
  bio: string;
  interests: string[];
  socialLinks: SocialLink[];
}
