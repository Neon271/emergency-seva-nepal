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
  // Koshi Province (p1)
  { id: 'bhojpur', name: 'Bhojpur', name_ne: 'भोजपुर', provinceId: 'p1', isSupported: true },
  { id: 'dhankuta', name: 'Dhankuta', name_ne: 'धनकुटा', provinceId: 'p1', isSupported: true },
  { id: 'ilam', name: 'Ilam', name_ne: 'इलाम', provinceId: 'p1', isSupported: true },
  { id: 'jhapa', name: 'Jhapa', name_ne: 'झापा', provinceId: 'p1', isSupported: true },
  { id: 'khotang', name: 'Khotang', name_ne: 'खोटाङ', provinceId: 'p1', isSupported: true },
  { id: 'morang', name: 'Morang', name_ne: 'मोरङ', provinceId: 'p1', isSupported: true },
  { id: 'okhaldhunga', name: 'Okhaldhunga', name_ne: 'ओखलढुङ्गा', provinceId: 'p1', isSupported: true },
  { id: 'panchthar', name: 'Panchthar', name_ne: 'पाँचथर', provinceId: 'p1', isSupported: true },
  { id: 'sankhuwasabha', name: 'Sankhuwasabha', name_ne: 'सङ्खुवासभा', provinceId: 'p1', isSupported: true },
  { id: 'solukhumbu', name: 'Solukhumbu', name_ne: 'सोलुखुम्बु', provinceId: 'p1', isSupported: true },
  { id: 'sunsari', name: 'Sunsari', name_ne: 'सुनसरी', provinceId: 'p1', isSupported: true },
  { id: 'taplejung', name: 'Taplejung', name_ne: 'ताप्लेजुङ', provinceId: 'p1', isSupported: true },
  { id: 'terhathum', name: 'Terhathum', name_ne: 'तेह्रथुम', provinceId: 'p1', isSupported: true },
  { id: 'udayapur', name: 'Udayapur', name_ne: 'उदयपुर', provinceId: 'p1', isSupported: true },

  // Madhesh Province (p2)
  { id: 'bara', name: 'Bara', name_ne: 'बारा', provinceId: 'p2', isSupported: true },
  { id: 'dhanusha', name: 'Dhanusha', name_ne: 'धनुषा', provinceId: 'p2', isSupported: true },
  { id: 'mahottari', name: 'Mahottari', name_ne: 'महोत्तरी', provinceId: 'p2', isSupported: true },
  { id: 'parsa', name: 'Parsa', name_ne: 'पर्सा', provinceId: 'p2', isSupported: true },
  { id: 'rautahat', name: 'Rautahat', name_ne: 'रौतहट', provinceId: 'p2', isSupported: true },
  { id: 'saptari', name: 'Saptari', name_ne: 'सप्तरी', provinceId: 'p2', isSupported: true },
  { id: 'sarlahi', name: 'Sarlahi', name_ne: 'सर्लाही', provinceId: 'p2', isSupported: true },
  { id: 'siraha', name: 'Siraha', name_ne: 'सिराहा', provinceId: 'p2', isSupported: true },
  
  // Bagmati Province (p3)
  { id: 'bhaktapur', name: 'Bhaktapur', name_ne: 'भक्तपुर', provinceId: 'p3', isSupported: true },
  { id: 'chitwan', name: 'Chitwan', name_ne: 'चितवन', provinceId: 'p3', isSupported: true },
  { id: 'dhading', name: 'Dhading', name_ne: 'धादिङ', provinceId: 'p3', isSupported: true },
  { id: 'dolakha', name: 'Dolakha', name_ne: 'दोलखा', provinceId: 'p3', isSupported: true },
  { id: 'kathmandu', name: 'Kathmandu', name_ne: 'काठमाडौं', provinceId: 'p3', isSupported: true },
  { id: 'kavrepalanchok', name: 'Kavrepalanchok', name_ne: 'काभ्रेपलान्चोक', provinceId: 'p3', isSupported: true },
  { id: 'lalitpur', name: 'Lalitpur', name_ne: 'ललितपुर', provinceId: 'p3', isSupported: true },
  { id: 'makwanpur', name: 'Makwanpur', name_ne: 'मकवानपुर', provinceId: 'p3', isSupported: true },
  { id: 'nuwakot', name: 'Nuwakot', name_ne: 'नुवाकोट', provinceId: 'p3', isSupported: true },
  { id: 'rasuwa', name: 'Rasuwa', name_ne: 'रसुवा', provinceId: 'p3', isSupported: true },
  { id: 'ramechhap', name: 'Ramechhap', name_ne: 'रामेछाप', provinceId: 'p3', isSupported: true },
  { id: 'sindhuli', name: 'Sindhuli', name_ne: 'सिन्धुली', provinceId: 'p3', isSupported: true },
  { id: 'sindhupalchok', name: 'Sindhupalchok', name_ne: 'सिन्धुपाल्चोक', provinceId: 'p3', isSupported: true },

  // Gandaki Province (p4)
  { id: 'baglung', name: 'Baglung', name_ne: 'बागलुङ', provinceId: 'p4', isSupported: true },
  { id: 'gorkha', name: 'Gorkha', name_ne: 'गोरखा', provinceId: 'p4', isSupported: true },
  { id: 'kaski', name: 'Kaski', name_ne: 'कास्की', provinceId: 'p4', isSupported: true },
  { id: 'lamjung', name: 'Lamjung', name_ne: 'लमजुङ', provinceId: 'p4', isSupported: true },
  { id: 'manang', name: 'Manang', name_ne: 'मनाङ', provinceId: 'p4', isSupported: true },
  { id: 'mustang', name: 'Mustang', name_ne: 'मुस्ताङ', provinceId: 'p4', isSupported: true },
  { id: 'myagdi', name: 'Myagdi', name_ne: 'म्याग्दी', provinceId: 'p4', isSupported: true },
  { id: 'nawalpur', name: 'Nawalpur', name_ne: 'नवलपुर', provinceId: 'p4', isSupported: true },
  { id: 'parbat', name: 'Parbat', name_ne: 'पर्वत', provinceId: 'p4', isSupported: true },
  { id: 'syangja', name: 'Syangja', name_ne: 'स्याङ्जा', provinceId: 'p4', isSupported: true },
  { id: 'tanahun', name: 'Tanahun', name_ne: 'तनहुँ', provinceId: 'p4', isSupported: true },
  
  // Lumbini Province (p5)
  { id: 'arghakhanchi', name: 'Arghakhanchi', name_ne: 'अर्घाखाँची', provinceId: 'p5', isSupported: true },
  { id: 'banke', name: 'Banke', name_ne: 'बाँके', provinceId: 'p5', isSupported: true },
  { id: 'bardiya', name: 'Bardiya', name_ne: 'बर्दिया', provinceId: 'p5', isSupported: true },
  { id: 'dang', name: 'Dang', name_ne: 'दाङ', provinceId: 'p5', isSupported: true },
  { id: 'gulmi', name: 'Gulmi', name_ne: 'गुल्मी', provinceId: 'p5', isSupported: true },
  { id: 'kapilvastu', name: 'Kapilvastu', name_ne: 'कपिलवस्तु', provinceId: 'p5', isSupported: true },
  { id: 'parasi', name: 'Parasi', name_ne: 'परासी', provinceId: 'p5', isSupported: true },
  { id: 'palpa', name: 'Palpa', name_ne: 'पाल्पा', provinceId: 'p5', isSupported: true },
  { id: 'pyuthan', name: 'Pyuthan', name_ne: 'प्युठान', provinceId: 'p5', isSupported: true },
  { id: 'rolpa', name: 'Rolpa', name_ne: 'रोल्पा', provinceId: 'p5', isSupported: true },
  { id: 'eastern-rukum', name: 'Eastern Rukum', name_ne: 'पूर्वी रुकुम', provinceId: 'p5', isSupported: true },
  { id: 'rupandehi', name: 'Rupandehi', name_ne: 'रुपन्देही', provinceId: 'p5', isSupported: true },

  // Karnali Province (p6)
  { id: 'dailekh', name: 'Dailekh', name_ne: 'दैलेख', provinceId: 'p6', isSupported: true },
  { id: 'dolpa', name: 'Dolpa', name_ne: 'डोल्पा', provinceId: 'p6', isSupported: true },
  { id: 'humla', name: 'Humla', name_ne: 'हुम्ला', provinceId: 'p6', isSupported: true },
  { id: 'jajarkot', name: 'Jajarkot', name_ne: 'जाजरकोट', provinceId: 'p6', isSupported: true },
  { id: 'jumla', name: 'Jumla', name_ne: 'जुम्ला', provinceId: 'p6', isSupported: true },
  { id: 'kalikot', name: 'Kalikot', name_ne: 'कालिकोट', provinceId: 'p6', isSupported: true },
  { id: 'mugu', name: 'Mugu', name_ne: 'मुगु', provinceId: 'p6', isSupported: true },
  { id: 'salyan', name: 'Salyan', name_ne: 'सल्यान', provinceId: 'p6', isSupported: true },
  { id: 'surkhet', name: 'Surkhet', name_ne: 'सुर्खेत', provinceId: 'p6', isSupported: true },
  { id: 'western-rukum', name: 'Western Rukum', name_ne: 'पश्चिम रुकुम', provinceId: 'p6', isSupported: true },

  // Sudurpashchim Province (p7)
  { id: 'achham', name: 'Achham', name_ne: 'अछाम', provinceId: 'p7', isSupported: true },
  { id: 'baitadi', name: 'Baitadi', name_ne: 'बैतडी', provinceId: 'p7', isSupported: true },
  { id: 'bajhang', name: 'Bajhang', name_ne: 'बझाङ', provinceId: 'p7', isSupported: true },
  { id: 'bajura', name: 'Bajura', name_ne: 'बाजुरा', provinceId: 'p7', isSupported: true },
  { id: 'dadeldhura', name: 'Dadeldhura', name_ne: 'डडेलधुरा', provinceId: 'p7', isSupported: true },
  { id: 'darchula', name: 'Darchula', name_ne: 'दार्चुला', provinceId: 'p7', isSupported: true },
  { id: 'doti', name: 'Doti', name_ne: 'डोटी', provinceId: 'p7', isSupported: true },
  { id: 'kailali', name: 'Kailali', name_ne: 'कैलाली', provinceId: 'p7', isSupported: true },
  { id: 'kanchanpur', name: 'Kanchanpur', name_ne: 'कञ्चनपुर', provinceId: 'p7', isSupported: true },
];

export const getDistrictsByProvince = (provinceId: string): District[] => {
  return districts.filter((d) => d.provinceId === provinceId);
};
