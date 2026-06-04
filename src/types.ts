/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Screen = 'home' | 'about' | 'weddings' | 'services' | 'gallery' | 'contact';

export interface WeddingProject {
  id: string;
  title: string;
  location: string;
  season: string;
  theme: string;
  description: string;
  coverImage: string;
  images: string[];
  features: string[];
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  basePrice: number;
  description: string;
  details: string[];
}

export interface BudgetInputs {
  guestCount: number;
  location: 'CT' | 'NY' | 'Destination';
  coordinationLevel: 'full' | 'partial' | 'day-of';
  designDepth: 'bespoke' | 'classic' | 'minimalist';
  florals: 'lush' | 'moderate' | 'organic';
  durationHours: number;
}

export interface Testimonial {
  id: string;
  couple: string;
  location: string;
  text: string;
  image: string;
}

export interface ContactForm {
  coupleName1: string;
  coupleName2: string;
  email: string;
  phone: string;
  eventDate: string;
  eventLocation: string;
  guestCount: number;
  estimatedBudget: string;
  coordinationLevel: string;
  details: string;
}
