import type { LucideIcon } from 'lucide-react';

// For location selection
export interface Province {
  id: string;
  name: string;
  name_ne: string;
}

export interface District {
  id: string;
  name: string;
  name_ne: string;
  provinceId: string;
  isSupported: boolean;
}

// For displaying contacts
export interface EmergencyContact {
  id: string;
  name: string;
  name_ne: string;
  phone: string;
  address?: string;
  mapLink?: string;
  whatsapp?: string;
}

export interface EmergencyServiceCategory {
  id:string;
  name: string;
  name_ne: string;
  icon: LucideIcon;
  contacts: EmergencyContact[];
}

// For custom user-added contacts
export type CustomContactCategory = 'ambulance' | 'clinic' | 'pharmacy' | 'other';

export interface CustomContact {
    id: string;
    name: string;
    phone: string;
    category: CustomContactCategory;
    address?: string;
}


// For feedback submission
export interface ReportPayload {
  contactId: string;
  contactName: string;
  contactPhone: string;
  reason: 'wrong-number' | 'not-working' | 'other';
  details: string;
}
