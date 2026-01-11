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
        { id: 'k-p-2', name: 'Metropolitan Police, Ranipokhari', name_ne: 'महानगरीय प्रहरी, रानीपोखरी', phone: '014228435' },
        { id: 'k-p-3', name: 'Police Circle, Maharajganj', name_ne: 'प्रहरी वृत्त, महाराजगञ्ज', phone: '014412780' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'k-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
        { id: 'k-a-2', name: 'Red Cross Ambulance', name_ne: 'रेडक्रस एम्बुलेन्स', phone: '014228094' },
        { id: 'k-a-3', name: 'Bir Hospital Ambulance', name_ne: 'वीर अस्पताल एम्बुलेन्स', phone: '014221988' },
      ],
    },
     {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'k-f-1', name: 'Fire Brigade Control, Basantapur', name_ne: 'जुद्ध बारुण यन्त्र, बसन्तपुर', phone: '101' },
        { id: 'k-f-2', name: 'Fire Brigade, Bouddha', name_ne: 'दमकल, बौद्ध', phone: '014470101' },
      ],
    },
  ],
  bhaktapur: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'b-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'b-p-2', name: 'District Police Office, Bhaktapur', name_ne: 'जिल्ला प्रहरी कार्यालय, भक्तपुर', phone: '016614821' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'b-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
        { id: 'b-a-2', name: 'Bhaktapur Red Cross', name_ne: 'भक्तपुर रेडक्रस', phone: '016610747' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'b-f-1', name: 'Fire Brigade, Bhaktapur', name_ne: 'दमकल, भक्तपुर', phone: '016611177' },
      ],
    },
  ],
  lalitpur: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'l-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'l-p-2', name: 'District Police Office, Lalitpur', name_ne: 'जिल्ला प्रहरी कार्यालय, ललितपुर', phone: '015521207' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'l-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
        { id: 'l-a-2', name: 'Patan Hospital Ambulance', name_ne: 'पाटन अस्पताल एम्बुलेन्स', phone: '015522266' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'l-f-1', name: 'Fire Brigade, Lalitpur', name_ne: 'दमकल, ललितपुर', phone: '015521177' },
      ],
    },
  ],
  kaski: [
     {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'kaski-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'kaski-p-2', name: 'District Police Office, Kaski', name_ne: 'जिल्ला प्रहरी कार्यालय, कास्की', phone: '061520033' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'kaski-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'kaski-f-1', name: 'Pokhara Fire Brigade', name_ne: 'पोखरा दमकल', phone: '061522222' },
      ],
    },
    {
      id: 'disaster',
      name: 'Disaster Helpline',
      name_ne: 'विपद् हेल्पलाइन',
      icon: Phone,
      contacts: [{ id: 'kaski-d-1', name: 'District Disaster Mgmt.', name_ne: 'जिल्ला विपद् व्यवस्थापन', phone: '061520633' }],
    },
  ],
  chitwan: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'chitwan-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'chitwan-p-2', name: 'District Police Office, Chitwan', name_ne: 'जिल्ला प्रहरी कार्यालय, चितवन', phone: '056520155' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'chitwan-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'chitwan-f-1', name: 'Bharatpur Fire Brigade', name_ne: 'भरतपुर दमकल', phone: '056520177' },
      ],
    },
  ],
  morang: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'morang-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'morang-p-2', name: 'District Police Office, Morang', name_ne: 'जिल्ला प्रहरी कार्यालय, मोरङ', phone: '021523999' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'morang-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'morang-f-1', name: 'Biratnagar Fire Brigade', name_ne: 'विराटनगर दमकल', phone: '021471111' },
      ],
    },
  ],
  jhapa: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'jhapa-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'jhapa-p-2', name: 'District Police Office, Jhapa', name_ne: 'जिल्ला प्रहरी कार्यालय, झापा', phone: '023580133' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'jhapa-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'jhapa-f-1', name: 'Bhadrapur Fire Brigade', name_ne: 'भद्रपुर दमकल', phone: '023520101' },
      ],
    },
  ],
  sunsari: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'sunsari-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'sunsari-p-2', name: 'District Police Office, Sunsari', name_ne: 'जिल्ला प्रहरी कार्यालय, सुनसरी', phone: '025520133' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'sunsari-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'sunsari-f-1', name: 'Dharan Fire Brigade', name_ne: 'धरान दमकल', phone: '025520101' },
      ],
    },
  ],
  rupandehi: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'rupandehi-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'rupandehi-p-2', name: 'District Police Office, Rupandehi', name_ne: 'जिल्ला प्रहरी कार्यालय, रुपन्देही', phone: '071541199' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'rupandehi-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'rupandehi-f-1', name: 'Butwal Fire Brigade', name_ne: 'बुटवल दमकल', phone: '071540101' },
      ],
    },
  ],
  banke: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'banke-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'banke-p-2', name: 'District Police Office, Banke', name_ne: 'जिल्ला प्रहरी कार्यालय, बाँके', phone: '081520199' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'banke-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'banke-f-1', name: 'Nepalgunj Fire Brigade', name_ne: 'नेपालगञ्ज दमकल', phone: '081520101' },
      ],
    },
  ],
  parsa: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'parsa-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'parsa-p-2', name: 'District Police Office, Parsa', name_ne: 'जिल्ला प्रहरी कार्यालय, पर्सा', phone: '051522133' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'parsa-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'parsa-f-1', name: 'Birgunj Fire Brigade', name_ne: 'वीरगञ्ज दमकल', phone: '051522131' },
      ],
    },
  ],
  dhanusha: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'dhanusha-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'dhanusha-p-2', name: 'District Police Office, Dhanusha', name_ne: 'जिल्ला प्रहरी कार्यालय, धनुषा', phone: '041520133' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'dhanusha-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'dhanusha-f-1', name: 'Janakpur Fire Brigade', name_ne: 'जनकपुर दमकल', phone: '041520101' },
      ],
    },
  ],
  kailali: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'kailali-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'kailali-p-2', name: 'District Police Office, Kailali', name_ne: 'जिल्ला प्रहरी कार्यालय, कैलाली', phone: '091521200' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'kailali-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'kailali-f-1', name: 'Dhangadhi Fire Brigade', name_ne: 'धनगढी दमकल', phone: '091521111' },
      ],
    },
  ],
  surkhet: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'surkhet-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'surkhet-p-2', name: 'District Police Office, Surkhet', name_ne: 'जिल्ला प्रहरी कार्यालय, सुर्खेत', phone: '083520133' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'surkhet-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'surkhet-f-1', name: 'Birendranagar Fire Brigade', name_ne: 'वीरेन्द्रनगर दमकल', phone: '083520101' },
      ],
    },
  ],
  makwanpur: [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: 'makwanpur-p-1', name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
        { id: 'makwanpur-p-2', name: 'District Police Office, Makwanpur', name_ne: 'जिल्ला प्रहरी कार्यालय, मकवानपुर', phone: '057520133' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: 'makwanpur-a-1', name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: 'makwanpur-f-1', name: 'Hetauda Fire Brigade', name_ne: 'हेटौंडा दमकल', phone: '057520101' },
      ],
    },
  ],
};

export const getEmergencyServicesByDistrict = (districtId: string): EmergencyServiceCategory[] => {
  if (contactsData[districtId]) {
    return contactsData[districtId];
  }

  // Fallback for other supported districts with generic numbers
  const genericServices: EmergencyServiceCategory[] = [
    {
      id: 'police',
      name: 'Police',
      name_ne: 'प्रहरी',
      icon: Shield,
      contacts: [
        { id: `${districtId}-p-1`, name: 'Police Control', name_ne: 'प्रहरी कन्ट्रोल', phone: '100' },
      ],
    },
    {
      id: 'ambulance',
      name: 'Ambulance',
      name_ne: 'एम्बुलेन्स',
      icon: Ambulance,
      contacts: [
        { id: `${districtId}-a-1`, name: 'Nepal Ambulance Service', name_ne: 'नेपाल एम्बुलेन्स सेवा', phone: '102' },
      ],
    },
    {
      id: 'fire',
      name: 'Fire Brigade',
      name_ne: 'दमकल',
      icon: Flame,
      contacts: [
        { id: `${districtId}-f-1`, name: 'Fire Brigade', name_ne: 'दमकल', phone: '101' },
      ],
    },
  ];

  return genericServices;
};
