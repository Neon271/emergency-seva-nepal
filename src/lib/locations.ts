import type { Province, District } from '@/lib/types';

export const provinces: Province[] = [
  { id: 'p1', name: 'Koshi Province', name_ne: 'कोशी प्रदेश' },
  { id: 'p2', name: 'Madhesh Province', name_ne: 'मधेश प्रदेश' },
  { id: 'p3', name: 'Bagmati Province', name_ne: 'बागमती प्रदेश' },
  { id: 'p4', name: 'Gandaki Province', name_ne: 'गण्डकी प्रदेश' },
  { id: 'p5', name: 'Lumbini Province', name_ne: 'लुम्बिनी प्रदेश' },
  { id: 'p6', name: 'Karnali Province', name_ne: 'कर्णाली प्रदेश' },
  { id: 'p7', name: 'Sudurpashchim Province', name_ne: 'सुदूरपश्चिम प्रदेश' },
];

export const districts: District[] = [
  // Bagmati Province
  { id: 'kathmandu', name: 'Kathmandu', name_ne: 'काठमाडौं', provinceId: 'p3', isSupported: true },
  { id: 'bhaktapur', name: 'Bhaktapur', name_ne: 'भक्तपुर', provinceId: 'p3', isSupported: true },
  { id: 'lalitpur', name: 'Lalitpur', name_ne: 'ललितपुर', provinceId: 'p3', isSupported: true },
  { id: 'sindhuli', name: 'Sindhuli', name_ne: 'सिन्धुली', provinceId: 'p3', isSupported: false },
  // Gandaki Province
  { id: 'kaski', name: 'Kaski', name_ne: 'कास्की', provinceId: 'p4', isSupported: true },
  { id: 'gorkha', name: 'Gorkha', name_ne: 'गोरखा', provinceId: 'p4', isSupported: false },
];

export const getDistrictsByProvince = (provinceId: string): District[] => {
  return districts.filter((d) => d.provinceId === provinceId);
};
