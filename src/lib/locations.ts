
import type { Province, District } from '@/lib/types';
import provincesData from './data/provinces.json';
import districtsData from './data/districts.json';

export const provinces: Province[] = provincesData;
export const districts: District[] = districtsData;

export const getDistrictsByProvince = (provinceId: string): District[] => {
  return districts.filter((d) => d.provinceId === provinceId);
};
