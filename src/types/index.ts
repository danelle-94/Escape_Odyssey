export interface VisaService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  processingTime: string;
  stayDuration: string;
  validity: string;
  keyRequirements: string[];
  iconName: 'Tourist' | 'Business' | 'Family';
  popularFor: string[];
}

export interface Destination {
  id: string;
  name: string;
  countryCode: string;
  flag: string;
  region: 'Americas' | 'Europe' | 'Middle East' | 'Asia' | 'Oceania';
  processingTime: string;
  successRate: string;
  image: string;
  visaTypes: string[];
  popularSpot: string;
  description: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  detail: string;
}

export interface DocumentCategory {
  id: string;
  visaType: 'all' | 'tourist' | 'business' | 'family';
  title: string;
  description: string;
  icon: string;
  items: string[];
}
