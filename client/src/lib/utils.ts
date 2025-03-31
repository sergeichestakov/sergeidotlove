import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculate age from birthdate with UTC precision
export function calculateAge(birthdate: Date): number {
  const today = new Date();
  
  // Create the birthdate as UTC
  const birthdateUTC = new Date(Date.UTC(
    birthdate.getUTCFullYear(),
    birthdate.getUTCMonth(),
    birthdate.getUTCDate(),
    birthdate.getUTCHours(),
    birthdate.getUTCMinutes()
  ));
  
  // Create today as UTC
  const todayUTC = new Date(Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
    today.getUTCHours(),
    today.getUTCMinutes()
  ));
  
  let age = todayUTC.getUTCFullYear() - birthdateUTC.getUTCFullYear();
  
  // Check if birthday hasn't occurred this year yet
  const hasBirthdayOccurred = 
    todayUTC.getUTCMonth() > birthdateUTC.getUTCMonth() || 
    (todayUTC.getUTCMonth() === birthdateUTC.getUTCMonth() && 
     todayUTC.getUTCDate() >= birthdateUTC.getUTCDate() &&
     todayUTC.getUTCHours() >= birthdateUTC.getUTCHours() &&
     todayUTC.getUTCMinutes() >= birthdateUTC.getUTCMinutes());
  
  if (!hasBirthdayOccurred) {
    age--;
  }
  
  return age;
}
