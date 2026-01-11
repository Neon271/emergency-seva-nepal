
"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { District, Province } from "@/lib/types";
import { districts as allDistricts, provinces as allProvinces, getDistrictsByProvince } from "@/lib/locations";

const LOCATION_STORAGE_KEY = "emergency-seva-location";

export interface StoredLocation {
  provinceId: string;
  districtId: string;
}

interface LocationContextType {
  location: StoredLocation | null;
  setLocation: (location: StoredLocation | null) => void;
  isInitialLoad: boolean;
  isLocationSet: boolean;
  showSelector: boolean;
  setShowSelector: Dispatch<SetStateAction<boolean>>;
  provinces: Province[];
  districts: District[];
  getDistrictsByProvince: (provinceId: string) => District[];
  selectedProvince: Province | undefined;
  selectedDistrict: District | undefined;
}

export const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState<StoredLocation | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    try {
      const storedLocation = localStorage.getItem(LOCATION_STORAGE_KEY);
      if (storedLocation) {
        const parsedLocation = JSON.parse(storedLocation);
        setLocationState(parsedLocation);
      } else {
        setShowSelector(true);
      }
    } catch (error) {
      console.error("Failed to read location from localStorage", error);
      setShowSelector(true);
    } finally {
      setIsInitialLoad(false);
    }
  }, []);

  const setLocation = useCallback((newLocation: StoredLocation | null) => {
    try {
      if (newLocation) {
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(newLocation));
      } else {
        localStorage.removeItem(LOCATION_STORAGE_KEY);
      }
      setLocationState(newLocation);
    } catch (error) {
      console.error("Failed to save location to localStorage", error);
    }
  }, []);

  const selectedProvince = allProvinces.find(p => p.id === location?.provinceId);
  const selectedDistrict = allDistricts.find(d => d.id === location?.districtId);

  const value = {
    location,
    setLocation,
    isInitialLoad,
    isLocationSet: !!location,
    showSelector,
    setShowSelector,
    provinces: allProvinces,
    districts: allDistricts,
    getDistrictsByProvince,
    selectedProvince,
    selectedDistrict,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}
