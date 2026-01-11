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
  // Bagmati Province (p3)
  { id: 'kathmandu', name: 'Kathmandu', name_ne: 'काठमाडौं', provinceId: 'p3', isSupported: true },
  { id: 'bhaktapur', name: 'Bhaktapur', name_ne: 'भक्तपुर', provinceId: 'p3', isSupported: true },
  { id: 'lalitpur', name: 'Lalitpur', name_ne: 'ललितपुर', provinceId: 'p3', isSupported: true },
  { id: 'sindhuli', name: 'Sindhuli', name_ne: 'सिन्धुली', provinceId: 'p3', isSupported: false },

  // Gandaki Province (p4)
  { id: 'kaski', name: 'Kaski', name_ne: 'कास्की', provinceId: 'p4', isSupported: true },
  { id: 'gorkha', name: 'Gorkha', name_ne: 'गोरखा', provinceId: 'p4', isSupported: false },

  // Koshi Province (p1)
  { id: 'morang', name: 'Morang', name_ne: 'मोरङ', provinceId: 'p1', isSupported: false },
  { id: 'sunsari', name: 'Sunsari', name_ne: 'सुनसरी', provinceId: 'p1', isSupported: false },

  // Madhesh Province (p2)
  { id: 'parsa', name: 'Parsa', name_ne: 'पर्सा', provinceId: 'p2', isSupported: false },
  { id: 'bara', name: 'Bara', name_ne: 'बारा', provinceId: 'p2', isSupported: false },

  // Lumbini Province (p5)
  { id: 'rupandehi', name: 'Rupandehi', name_ne: 'रुपन्देही', provinceId: 'p5', isSupported: false },
  { id: 'banke', name: 'Banke', name_ne: 'बाँके', provinceId: 'p5', isSupported: false },

  // Karnali Province (p6)
  { id: 'surkhet', name: 'Surkhet', name_ne: 'सुर्खेत', provinceId: 'p6', isSupported: false },
  { id: 'jumla', name: 'Jumla', name_ne: 'जुम्ला', provinceId: 'p6', isSupported: false },

  // Sudurpashchim Province (p7)
  { id: 'kailali', name: 'Kailali', name_ne: 'कैलाली', provinceId: 'p7', isSupported: false },
  { id: 'kanchanpur', name: 'Kanchanpur', name_ne: 'कञ्चनपुर', provinceId: 'p7', isSupported: false },
];

export const getDistrictsByProvince = (provinceId: string): District[] => {
  return districts.filter((d) => d.provinceId === provinceId);
};
