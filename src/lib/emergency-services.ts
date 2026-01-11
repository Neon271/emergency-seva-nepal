import {
  Ambulance,
  Building,
  HeartHandshake,
  Shield,
  Siren,
  Phone,
  Flame,
} from 'lucide-react';
import type { EmergencyServiceCategory } from '@/lib/types';

const allServices: Omit<EmergencyServiceCategory, 'contacts'>[] = [
  { id: 'police', name: 'Police', name_ne: 'प्रहरी', icon: Shield },
  { id: 'ambulance', name: 'Ambulance', name_ne: 'एम्बुलेन्स', icon: Ambulance },
  { id: 'fire', name: 'Fire Brigade', name_ne: 'दमकल', icon: Flame },
  { id: 'hospital', name: 'Hospitals', name_ne: 'अस्पताल', icon: Building },
  { id: 'blood', name: 'Blood Donation', name_ne: 'रक्तदान', icon: HeartHandshake },
  { id: 'disaster', name: 'Disaster Helpline', name_ne: 'विपद् हेल्पलाइन', icon: Phone },
];

const contactsData: { [key: string]: EmergencyServiceCategory[] } = {
  kathmandu: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'k-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'k-p-2', name: 'Metropolitan Police', name_ne: 'महानगरीय प्रहरी', phone: '11111111' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'k-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
        { id: 'k-a-2', name: 'Red Cross Ambulance', name_ne: 'रेडक्रस एम्बुलेन्स', phone: '22222222' },
      ],
    },
     {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'k-f-1', name: 'Fire Brigade Control', name_ne: 'दमकल कन्ट्रोल', phone: '101' },
      ],
    },
  ],
  bhaktapur: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [{ id: 'b-p-1', name: 'Bhaktapur Police', name_ne: 'भक्तपुर प्रहरी', phone: '33333333' }],
    },
  ],
  kaski: [
     {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [{ id: 'kaski-p-1', name: 'Kaski Police', name_ne: 'कास्की प्रहरी', phone: '44444444' }],
    },
    {
      id: 'disaster',
      name: 'Disaster Helpline',
      name_ne: 'विपद् हेल्पलाइन',
      icon: Phone,
      contacts: [{ id: 'kaski-d-1', name: 'District Disaster Mgmt.', name_ne: 'जिल्ला विपद् व्यवस्थापन', phone: '55555555' }],
    },
  ]
};

export const getEmergencyServicesByDistrict = (districtId: string): EmergencyServiceCategory[] => {
  return contactsData[districtId] || [];
};
