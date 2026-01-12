
import {
  Ambulance,
  Building,
  HeartHandshake,
  Shield,
  Phone,
  Flame,
  PersonStanding,
} from 'lucide-react';
import type { EmergencyServiceCategory, EmergencyContact } from '@/lib/types';
import allDistricts from '@/lib/data/districts.json';
import districtContactMapping from '@/lib/data/contacts.json';
import serviceData from '@/lib/data/services.json';

const allServicesRaw = serviceData.allServices;
const allContactsMap: Record<string, Omit<EmergencyContact, 'id'>> = serviceData.allContacts;

export const allBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const serviceIcons = {
  police: Shield,
  ambulance: Ambulance,
  fire: Flame,
  hospital: Building,
  women: PersonStanding,
  blood: HeartHandshake,
  disaster: Phone,
  helpline: Phone
};

const allServices: Omit<EmergencyServiceCategory, 'contacts'>[] = allServicesRaw.map(s => ({
    ...s,
    icon: serviceIcons[s.id as keyof typeof serviceIcons] || Phone
}));

const nationalHelplineContacts: EmergencyContact[] = [
    { id: 'nat-w-1', name: 'National Women Commission', name_ne: 'राष्ट्रिय महिला आयोग', phone: '1145', address: 'Nationwide' },
    { id: 'nat-d-1', name: 'Disaster & Emergency Control', name_ne: 'विपद् तथा आपतकालीन नियन्त्रण', phone: '1149', address: 'Nationwide' },
    { id: 'nat-d-2', name: 'National Emergency Operation Center', name_ne: 'राष्ट्रिय आपतकालीन कार्य सञ्चालन केन्द्र', phone: '1155', address: 'Nationwide' },
];

const nationalHelplinesByCategory = {
    women: nationalHelplineContacts.filter(c => c.id.startsWith('nat-w')),
    disaster: nationalHelplineContacts.filter(c => c.id.startsWith('nat-d')),
}

const getContactById = (id: string): EmergencyContact => ({ id, ...allContactsMap[id] });

export const getEmergencyServicesByDistrict = (districtId: string): EmergencyServiceCategory[] => {
  // Start with a copy of all service categories, ensuring none are missing
  const services: EmergencyServiceCategory[] = allServices.map(s => ({ ...s, contacts: [] }));

  // Get district-specific contact mappings
  const districtMappings = (districtContactMapping as Record<string, { serviceId: string; contactId: string }[]>)[districtId];

  if (districtMappings) {
    districtMappings.forEach(mapping => {
      const service = services.find(s => s.id === mapping.serviceId);
      const contact = getContactById(mapping.contactId);
      if (service && contact) {
        service.contacts.push({ ...contact, categoryId: service.id });
      }
    });
  }

  // Add generic national numbers for core services if they don't have contacts yet
  if (services.find(s => s.id === 'police')?.contacts.length === 0) {
    services.find(s => s.id === 'police')?.contacts.push({ ...getContactById('k-p-1'), id: `${districtId}-p-1` });
  }
  if (services.find(s => s.id === 'ambulance')?.contacts.length === 0) {
    services.find(s => s.id === 'ambulance')?.contacts.push({ ...getContactById('k-a-1'), id: `${districtId}-a-1` });
  }
  if (services.find(s => s.id === 'fire')?.contacts.length === 0) {
    services.find(s => s.id === 'fire')?.contacts.push({ ...getContactById('k-f-1'), id: `${districtId}-f-1` });
  }

  // Always merge national helplines
  services.forEach(service => {
      const nationalContacts = (nationalHelplinesByCategory as Record<string, EmergencyContact[]>)[service.id];
      if (nationalContacts) {
          const existingIds = new Set(service.contacts.map(c => c.id));
          const newContacts = nationalContacts.filter(c => !existingIds.has(c.id));
          service.contacts.unshift(...newContacts.map(c => ({...c, categoryId: service.id})));
      }
  });

  return services;
};

export const getAllContacts = (): Map<string, EmergencyContact> => {
    const allContacts = new Map<string, EmergencyContact>();
    
    // Add all base contacts
    for (const id in allContactsMap) {
        allContacts.set(id, getContactById(id));
    }

    // Add all national helplines
    nationalHelplineContacts.forEach(contact => {
        allContacts.set(contact.id, contact);
    });

    // Add generic fallbacks
    allDistricts.forEach(district => {
        if (!allContacts.has(`${district.id}-p-1`)) {
            allContacts.set(`${district.id}-p-1`, { ...getContactById('k-p-1'), id: `${district.id}-p-1` });
        }
        if (!allContacts.has(`${district.id}-a-1`)) {
            allContacts.set(`${district.id}-a-1`, { ...getContactById('k-a-1'), id: `${district.id}-a-1` });
        }
        if (!allContacts.has(`${district.id}-f-1`)) {
           allContacts.set(`${district.id}-f-1`, { ...getContactById('k-f-1'), id: `${district.id}-f-1` });
        }
    });

    return allContacts;
}
