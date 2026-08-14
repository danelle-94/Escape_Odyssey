import type { VisaService, Destination, Feature, ProcessStep, DocumentCategory } from '../types';

export const PHONE_NUMBER = "+91 8796815817";
export const DISPLAY_PHONE = "+91 8796815817";
export const WHATSAPP_LINK = "https://wa.me/918796815817?text=Hello%20Escape%20Odyssey%20Travel%20%26%20Tours%2C%20I%20would%20like%20assistance%20with%20my%20visa%20application.";

export const VISA_SERVICES: VisaService[] = [
  {
    id: 'tourist-visa',
    title: 'Tourist Visa',
    subtitle: 'For holidays, vacations and international travel.',
    description: 'Seamless travel assistance for vacationers, sightseeing enthusiasts, and luxury holidaymakers. We ensure your itinerary, accommodation proof, and financial declarations satisfy embassy benchmarks.',
    badge: 'Most Popular',
    processingTime: '3 - 15 Business Days',
    stayDuration: '30 to 90 Days',
    validity: 'Up to 10 Years',
    keyRequirements: [
      'Valid passport with at least 6 months validity',
      'Recent passport-spec color photographs',
      'Bank statement reflecting sufficient travel funds',
      'Flight reservations & hotel booking voucher',
      'Detailed day-wise travel itinerary'
    ],
    iconName: 'Tourist',
    popularFor: ['Schengen Area', 'USA', 'UK', 'Dubai', 'Thailand', 'Singapore']
  },
  {
    id: 'business-visa',
    title: 'Business Visa',
    subtitle: 'For meetings, conferences, business travel and professional visits.',
    description: 'Expedited processing for corporate executives, investors, and conference attendees. Dedicated assistance for invitation letters, commercial documentation, and priority appointment booking.',
    badge: 'Priority Processing',
    processingTime: '2 - 7 Business Days',
    stayDuration: '30 to 180 Days',
    validity: 'Single or Multiple Entry',
    keyRequirements: [
      'Official invitation letter from host organization',
      'Covering letter on company letterhead',
      'Company incorporation & tax certificate',
      'Proof of business financial standing',
      'Conference registration / meeting proof'
    ],
    iconName: 'Business',
    popularFor: ['USA B1/B2', 'UK Standard Visitor', 'Schengen Business', 'Japan', 'Australia']
  },
  {
    id: 'family-visa',
    title: 'Family Visa',
    subtitle: 'For visiting family members and loved ones abroad.',
    description: 'Compassionate and thorough support for visiting children, parents, spouses, or relatives living overseas. Complete verification of sponsorship letters and relationship documentation.',
    badge: 'High Success',
    processingTime: '5 - 20 Business Days',
    stayDuration: 'Up to 6 Months',
    validity: 'Based on sponsorship',
    keyRequirements: [
      'Sponsorship declaration & invitation letter',
      'Sponsor ID proof & overseas residence status',
      'Proof of relationship (Birth / Marriage certificate)',
      'Sponsor financial statements & pay slips',
      'Applicant tie to home country proof'
    ],
    iconName: 'Family',
    popularFor: ['Canada Visitor', 'UK Family Visit', 'USA B2', 'Australia Subclass 600', 'Schengen Visitor']
  }
];

export const FEATURES: Feature[] = [
  {
    id: 'expert-guidance',
    title: 'Expert Guidance',
    description: 'Professional step-by-step assistance from certified visa consultants from application filing to passport collection.',
    icon: 'UserCheck'
  },
  {
    id: 'fast-reliable',
    title: 'Fast & Reliable',
    description: 'A streamlined digital & offline process designed to save precious time and secure early appointment slots.',
    icon: 'Zap'
  },
  {
    id: 'high-success',
    title: 'High Success Focus',
    description: 'Meticulous document audit and customized cover letters to maximize your visa approval odds.',
    icon: 'ShieldCheck'
  },
  {
    id: 'global-reach',
    title: '150+ Countries',
    description: 'Comprehensive visa assistance across top travel destinations worldwide across North America, Europe, Asia & Oceania.',
    icon: 'Globe'
  },
  {
    id: 'transparent-process',
    title: 'Transparent Process',
    description: 'Clear, honest guidance with upfront checklist verification and no hidden service fees.',
    icon: 'Eye'
  },
  {
    id: 'dedicated-support',
    title: 'Dedicated Support',
    description: 'Personalized 1-on-1 assistance via Call, WhatsApp, or Email whenever you need guidance.',
    icon: 'Headphones'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Consultation',
    description: 'Tell us about your travel plans, intended destination, and travel dates.',
    detail: 'We assess your profile, destination requirements, and recommend the best visa category.'
  },
  {
    step: '02',
    title: 'Document Check',
    description: 'We review your documents and verify embassy compliance requirements.',
    detail: 'Our document specialists audit your financial statements, photos, and background proofs.'
  },
  {
    step: '03',
    title: 'Application Preparation',
    description: 'We help prepare your visa application forms and draft professional cover letters.',
    detail: 'We eliminate form errors and prepare customized itineraries to match consulate criteria.'
  },
  {
    step: '04',
    title: 'Appointment Assistance',
    description: 'Get support with appointment scheduling and biometric center preparation.',
    detail: 'We secure convenient appointment slots at official VFS/TLS/Consulate centers.'
  },
  {
    step: '05',
    title: 'Visa Follow-Up',
    description: 'We help you track the real-time progress of your application status.',
    detail: 'Constant monitoring and updates until your passport is ready for retrieval.'
  },
  {
    step: '06',
    title: 'Travel Ready',
    description: 'Get ready to embark on your stress-free international journey.',
    detail: 'Final travel briefing, insurance handover, and pre-departure checklist verification.'
  }
];

export const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: 'usa',
    name: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
    region: 'Americas',
    processingTime: 'B1/B2 Slot Assist',
    successRate: '98%',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=1000',
    visaTypes: ['Tourist (B2)', 'Business (B1)', 'Student (F1)'],
    popularSpot: 'Statue of Liberty & NYC Skyline',
    description: 'Comprehensive DS-160 filling, mock interview prep, and priority slot booking support.'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    countryCode: 'GB',
    flag: '🇬🇧',
    region: 'Europe',
    processingTime: '10-15 Days',
    successRate: '99%',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1000',
    visaTypes: ['Standard Visitor', 'Business Visitor', 'Family Transit'],
    popularSpot: 'Big Ben & London Eye',
    description: 'Expert verification of UK VFS biometrics, financial sponsor proofs, and travel itineraries.'
  },
  {
    id: 'france',
    name: 'France (Schengen)',
    countryCode: 'FR',
    flag: '🇫🇷',
    region: 'Europe',
    processingTime: '5-12 Days',
    successRate: '97%',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000',
    visaTypes: ['Short Stay Tourist', 'Business Schengen', 'Circulation Visa'],
    popularSpot: 'Eiffel Tower & Paris Boulevards',
    description: 'Gateway to 29 Schengen states. Full flight reservation and hotel voucher documentation.'
  },
  {
    id: 'dubai',
    name: 'Dubai / UAE',
    countryCode: 'AE',
    flag: '🇦🇪',
    region: 'Middle East',
    processingTime: '24-48 Hours',
    successRate: '99.9%',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000',
    visaTypes: ['30 Days Tourist', '60 Days Multiple Entry', 'Express eVisa'],
    popularSpot: 'Burj Khalifa & Desert Safari',
    description: 'Ultra-fast express eVisa processing with minimal documentation required.'
  },
  {
    id: 'canada',
    name: 'Canada',
    countryCode: 'CA',
    flag: '🇨🇦',
    region: 'Americas',
    processingTime: '15-25 Days',
    successRate: '96%',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=1000',
    visaTypes: ['Visitor Visa (V-1)', 'Super Visa for Parents', 'Business Travel'],
    popularSpot: 'Niagara Falls & Banff National Park',
    description: 'Detailed GCKey profile assistance, biometric enrollment guidance, and tie proofs.'
  },
  {
    id: 'australia',
    name: 'Australia',
    countryCode: 'AU',
    flag: '🇦🇺',
    region: 'Oceania',
    processingTime: '7-14 Days',
    successRate: '98%',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1000',
    visaTypes: ['Visitor Subclass 600', 'Business Visitor Stream'],
    popularSpot: 'Sydney Opera House & Harbor Bridge',
    description: 'Seamless ImmiAccount submission with digital document verification.'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    countryCode: 'SG',
    flag: '🇸🇬',
    region: 'Asia',
    processingTime: '3-5 Days',
    successRate: '99.5%',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=1000',
    visaTypes: ['E-Visa Tourist', 'Business Entry'],
    popularSpot: 'Marina Bay Sands & Gardens by the Bay',
    description: 'Authorized agent submission with fast turnaround for e-visa approval.'
  },
  {
    id: 'japan',
    name: 'Japan',
    countryCode: 'JP',
    flag: '🇯🇵',
    region: 'Asia',
    processingTime: '5-8 Days',
    successRate: '99%',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000',
    visaTypes: ['Short Term Tourist', 'Multiple Entry Visa', 'Business Visa'],
    popularSpot: 'Mount Fuji & Tokyo Shibuya Crossing',
    description: 'Precise itinerary structuring, tax certificate review, and consulate filing.'
  },
  {
    id: 'india',
    name: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    region: 'Asia',
    processingTime: '2-4 Days',
    successRate: '99.8%',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1000',
    visaTypes: ['e-Tourist Visa', 'e-Business Visa', 'e-Medical Visa'],
    popularSpot: 'Taj Mahal & Forts of Rajasthan',
    description: 'International tourist e-visa assistance for travelers visiting India.'
  },
  {
    id: 'schengen',
    name: 'Europe (Schengen Area)',
    countryCode: 'EU',
    flag: '🇪🇺',
    region: 'Europe',
    processingTime: '7-15 Days',
    successRate: '97.5%',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=1000',
    visaTypes: ['Tourist Short-Stay', 'Multiple-Entry 1-5 Yr', 'Business Schengen'],
    popularSpot: 'Amalfi Coast, Swiss Alps & Spain',
    description: 'Unified Schengen application across Germany, Italy, Spain, Netherlands & 26 other nations.'
  }
];

export const DOCUMENT_CHECKLISTS: DocumentCategory[] = [
  {
    id: 'doc-passports',
    visaType: 'all',
    title: 'Identity & Passport Requirements',
    description: 'Mandatory personal identification documents required across all embassies.',
    icon: 'BookOpen',
    items: [
      'Original Passport valid for at least 6 months beyond intended stay',
      'At least 2 blank visa pages facing each other',
      'All previous old passports (if applicable)',
      '2 Recent matte-finish photographs (35mm x 45mm or 50mm x 50mm based on embassy spec)',
      'Government ID card / National Identity proof'
    ]
  },
  {
    id: 'doc-financial',
    visaType: 'all',
    title: 'Financial & Proof of Funds',
    description: 'Crucial documents demonstrating your ability to sponsor your trip.',
    icon: 'CreditCard',
    items: [
      'Original Bank Statement for the last 6 months with official bank stamp & signature',
      'Income Tax Returns (ITR V) for the last 3 financial years',
      'Payslips for the last 3-6 months (for employed individuals)',
      'Fixed deposits, investments, or property valuation certificates (optional boost)',
      'Sponsorship letter + sponsor financial documents (if sponsored trip)'
    ]
  },
  {
    id: 'doc-travel',
    visaType: 'tourist',
    title: 'Travel & Accommodation Details',
    description: 'Proof of genuine travel intentions and stay arrangements.',
    icon: 'Plane',
    items: [
      'Confirmed round-trip flight reservations (Do not buy non-refundable tickets before visa)',
      'Hotel reservations / Accommodation confirmation covering full stay duration',
      'Day-by-day detailed travel itinerary',
      'Overseas Travel Medical Insurance (minimum coverage of €30,000 / $50,000)'
    ]
  },
  {
    id: 'doc-employment',
    visaType: 'business',
    title: 'Employment & Business Proofs',
    description: 'Verifiable proof of your current professional status.',
    icon: 'Briefcase',
    items: [
      'NOC / Leave sanction letter from employer specifying approved travel dates',
      'Official Invitation Letter from host company detailing meeting purpose & sponsorship',
      'Covering letter on company letterhead (for self-employed or business visits)',
      'Company Registration Certificate / GST / Trade License',
      'Business bank statements (last 6 months)'
    ]
  },
  {
    id: 'doc-family',
    visaType: 'family',
    title: 'Family Visit & Invitation Specs',
    description: 'Specific proofs required when visiting relatives residing abroad.',
    icon: 'Heart',
    items: [
      'Formal Invitation Letter from host in destination country with contact info',
      'Host\'s passport copy & valid residence permit / visa status',
      'Proof of relationship (Birth Certificate, Marriage Certificate, Family Register)',
      'Host financial documents & tenancy agreement (if host covers expenses)'
    ]
  }
];
