
"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { District, Province, Profile } from "@/lib/types";
import { districts as allDistricts, provinces as allProvinces, getDistrictsByProvince } from "@/lib/locations";

const PROFILE_STORAGE_KEY = "emergency-sewa-profile";

interface ProfileContextType {
  profile: Profile | null;
  saveProfile: (profile: Profile) => void;
  isInitialLoad: boolean;
  isProfileSet: boolean;
  provinces: Province[];
  districts: District[];
  getDistrictsByProvince: (provinceId: string) => District[];
  selectedProvince: Province | undefined;
  selectedDistrict: District | undefined;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error("Failed to read profile from localStorage", error);
    } finally {
      setIsInitialLoad(false);
    }
  }, []);

  const saveProfile = useCallback((newProfile: Profile | null) => {
    try {
      if (newProfile) {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newProfile));
      } else {
        localStorage.removeItem(PROFILE_STORAGE_KEY);
      }
      setProfile(newProfile);
    } catch (error) {
      console.error("Failed to save profile to localStorage", error);
    }
  }, []);

  const selectedProvince = allProvinces.find(p => p.id === profile?.provinceId);
  const selectedDistrict = allDistricts.find(d => d.id === profile?.districtId);

  const value: ProfileContextType = {
    profile,
    saveProfile,
    isInitialLoad,
    isProfileSet: !!profile,
    provinces: allProvinces,
    districts: allDistricts,
    getDistrictsByProvince,
    selectedProvince,
    selectedDistrict,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}
