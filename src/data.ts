/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { WeddingProject, ServicePackage, BudgetInputs } from './types';

export const HERO_IMAGE = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600";
export const FIELD_IMAGE_LEFT = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1000";
export const FLOWERS_IMAGE_RIGHT = "https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&q=80&w=800";

// Curated wedding projects / portfolio stories
export const WEDDING_PROJECTS: WeddingProject[] = [
  {
    id: 'julie-steve',
    title: 'Julie & Steve',
    location: 'Litchfield Hills, CT',
    season: 'Autumn 2025',
    theme: 'Whimsical & Bold',
    description: 'A whimsical woodland celebration emphasizing organic textures, vibrant amber florals, and deep velvet elements under a canopy of warm fairy lights.',
    coverImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['Wildflower installations', 'Handpicked vintage tableware', 'Custom sailcloth tent ceiling', 'Local cider pairing bar']
  },
  {
    id: 'marissa-dan',
    title: 'Marissa & Dan',
    location: 'Westchester County, NY',
    season: 'Summer 2025',
    theme: 'Classic Editorial',
    description: 'An elegant black-tie estate wedding featuring a striking double-door entry floral arch, custom ice sculptures, and romantic live jazz overlooking the Hudson River.',
    coverImage: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['Symmetrical rose arch', '12-piece classical orchestra', 'Custom champagne towers', 'Bespoke letterpress stationery']
  },
  {
    id: 'elena-marcos',
    title: 'Elena & Marcos',
    location: 'Brooklyn, NY',
    season: 'Spring 2025',
    theme: 'Industrial Romantic',
    description: 'A breathtaking union inside a restored high-arch brick foundry, blending cold industrial arches with warm golden string lights and lush trailing ivy.',
    coverImage: 'https://images.unsplash.com/photo-1507504038482-7621c518d531?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1507504038482-7621c518d531?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['Edison bulb chandeliers', 'Exposed brick accents', 'White rose & spray orchid runners', 'Local craft cocktail lounge']
  },
  {
    id: 'sophia-lucas',
    title: 'Sophia & Lucas',
    location: 'New Haven Coast, CT',
    season: 'Summer 2024',
    theme: 'Bohemian Wanderlust',
    description: 'A playful coastal ocean-side reception highlighted by customized retro transporter details, sand ceremony installations, and barefoot dancing on the beach.',
    coverImage: 'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb56?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb56?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['Vintage camper photo-booth', 'Pampas grass altar installations', 'Acoustic beachside guitar', 'Seaside oyster shucking station']
  }
];

// Curated services list
export const SERVICES: ServicePackage[] = [
  {
    id: 'full-planning',
    name: 'Full Planning & Event Design',
    tagline: 'Our comprehensive signature service from first concept to final goodbye.',
    basePrice: 7500,
    description: 'A complete, hands-on design and coordination experience. Perfect for couples who want Devon and the team to handle every custom blueprint, floor plan, vendor contract, and micro-schedule detail.',
    details: [
      'A to Z custom visual theme & layout blueprints',
      'Complete budget mapping, payment schedule, and allocation tracking',
      'Unlimited vendor outreach, vetting, and contract negotiations',
      'Up to 12 scheduled site inspection visits',
      'Detailed hourly master schedule with full on-site staff coordination (minimum 3 team members)'
    ]
  },
  {
    id: 'partial-design',
    name: 'Partial Design & Production',
    tagline: 'You have done some homework, we elevate and stitch the details together.',
    basePrice: 4800,
    description: 'For couples who have secured their dream venue and key vendors but want our creative eye to design the space, oversee layouts, construct beautiful tablescapes, and secure the remaining production elements.',
    details: [
      'Curated floral, lighting, and decorative advisory service',
      'Management of rental layouts, tablecloths, plates, and backdrops',
      'Vendor integration of high-priority floral & aesthetic elements',
      'Creation of the production timeline 3 months prior to wedding day',
      '2 team members on-site for custom setup and vendor arrival oversight'
    ]
  },
  {
    id: 'day-of-coordination',
    name: 'Month-of & Day-of Orchestration',
    tagline: 'Step back, relax, and let professionals command the celebration.',
    basePrice: 2800,
    description: 'For structured organizers who want complete piece of mind in the final stretch. We step in 4 to 6 weeks before, audit your schedules, confirm all details with vendors, and manage the event day from sunrise to clean up.',
    details: [
      'Final schedule audit and timeline alignment with all vendors',
      'Comprehensive rehearsal coordination (up to 1.5 hours)',
      'On-site presence of 2 experienced senior wedding coordinators',
      'Bridal suite support and wedding party alignment checklist',
      'Disbursement of final payments, tips, and secure collection of gifts'
    ]
  }
];

// Beautiful realistic testimonials
export const TESTIMONIALS = [
  {
    id: '1',
    couple: 'Meredith & Julian',
    location: 'Connecticut Waterfront',
    text: '“Working with Devon and her team was worth every single penny and more. They took our moodboard and transformed it into a dreamy, glowing greenhouse wedding. Not a single thing went astray on our day!”',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    couple: 'Clara & Thomas',
    location: 'Hudson Valley Estate',
    text: '“They brought our bold color design dream to life perfectly. Their organization, budget templates, and sheer grace under pressure turned what would have been a highly stressful week of logistics into pure magic.”',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=200'
  }
];

// Estimate budget formula to provide accurate elegant simulator
export function calculateBudgetEstimate(inputs: BudgetInputs): {
  planningAmount: number;
  decorAmount: number;
  operationalAmount: number;
  totalEstimated: number;
} {
  let basePlanning = 2500;
  
  // Coordination level multiplier
  if (inputs.coordinationLevel === 'full') basePlanning = 7500;
  else if (inputs.coordinationLevel === 'partial') basePlanning = 4800;
  else basePlanning = 2800;

  // Location fee adjustments
  let locationPremium = 0;
  if (inputs.location === 'NY') locationPremium = 1200;
  if (inputs.location === 'Destination') locationPremium = 2400;

  // Guest count costs
  const guestBaseCost = inputs.guestCount * 12; // place cards, menus, detailed table layout planning
  
  // Decor / florals and Design cost additions
  let decorAndFlorals = 2000;
  if (inputs.designDepth === 'bespoke') decorAndFlorals += 3500;
  else if (inputs.designDepth === 'classic') decorAndFlorals += 1500;

  if (inputs.florals === 'lush') decorAndFlorals += 4000;
  else if (inputs.florals === 'moderate') decorAndFlorals += 1800;

  // Total estimation split
  const planningAmount = Math.round(basePlanning + locationPremium);
  const decorAmount = Math.round(decorAndFlorals);
  const operationalAmount = Math.round(guestBaseCost + (inputs.durationHours * 150));
  
  return {
    planningAmount,
    decorAmount,
    operationalAmount,
    totalEstimated: planningAmount + decorAmount + operationalAmount
  };
}
