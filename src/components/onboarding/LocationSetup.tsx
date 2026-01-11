"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLocation } from "@/hooks/use-location-context";
import type { District } from "@/lib/types";
import { Info } from "lucide-react";

interface LocationSetupProps {
  onLocationSet: (provinceId: string, districtId: string) => void;
}

export default function LocationSetup({ onLocationSet }: LocationSetupProps) {
  const { provinces, getDistrictsByProvince } = useLocation();
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [availableDistricts, setAvailableDistricts] = useState<District[]>([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const limitedDataDistricts = [
      'humla', 'mugu', 'dolpa', 'manang', 'mustang', 
      'bajhang', 'bajura', 'darchula', 'taplejung', 
      'solukhumbu', 'western-rukum', 'eastern-rukum'
  ];

  useEffect(() => {
    if (selectedProvinceId) {
      setAvailableDistricts(getDistrictsByProvince(selectedProvinceId));
      setSelectedDistrictId(null);
      setShowInfo(false);
    } else {
      setAvailableDistricts([]);
    }
  }, [selectedProvinceId, getDistrictsByProvince]);
  
  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrictId(districtId);
    if(limitedDataDistricts.includes(districtId)) {
        setShowInfo(true);
    } else {
        setShowInfo(false);
    }
  }

  const handleSave = () => {
    if (selectedProvinceId && selectedDistrictId) {
      onLocationSet(selectedProvinceId, selectedDistrictId);
    }
  };

  const isSaveDisabled = !selectedProvinceId || !selectedDistrictId;

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 text-left shadow-2xl sm:p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Select Your Location</h1>
        <p className="mt-1 mb-6 text-sm text-gray-600">Choose your province and district</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="country" className="font-semibold text-gray-700">🌍 Country</Label>
            <Select defaultValue="nepal" disabled>
                <SelectTrigger id="country" className="w-full rounded-lg border-2 p-3 h-auto text-base">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="nepal">Nepal (नेपाल)</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
            <Label htmlFor="province" className="font-semibold text-gray-700">📍 Province (प्रदेश)</Label>
            <Select onValueChange={setSelectedProvinceId}>
                <SelectTrigger id="province" className="w-full rounded-lg border-2 p-3 h-auto text-base">
                    <SelectValue placeholder="-- Select Province --" />
                </SelectTrigger>
                <SelectContent>
                    {provinces.map((province) => (
                    <SelectItem key={province.id} value={province.id} className="text-base">
                        {province.name_ne} ({province.name})
                    </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
            <Label htmlFor="district" className="font-semibold text-gray-700">🏘️ District (जिल्ला)</Label>
            <Select
                onValueChange={handleDistrictChange}
                disabled={!selectedProvinceId}
                value={selectedDistrictId || ""}
            >
                <SelectTrigger id="district" className="w-full rounded-lg border-2 p-3 h-auto text-base">
                    <SelectValue placeholder="-- First select a province --" />
                </SelectTrigger>
                <SelectContent>
                    {availableDistricts.map((district) => (
                    <SelectItem key={district.id} value={district.id} className="text-base">
                        {district.name_ne} ({district.name})
                    </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        {showInfo && (
            <div className="flex items-start gap-3 rounded-lg border-2 border-amber-400 bg-amber-50 p-3">
                <Info className="h-5 w-5 flex-shrink-0 text-amber-600 mt-0.5" />
                <p className="text-xs text-amber-800">
                    <strong className="block">Data Coming Soon</strong>
                    Detailed information for this district is being updated. You can still access national emergency numbers.
                </p>
            </div>
        )}
      </div>

      <Button onClick={handleSave} disabled={isSaveDisabled} className="mt-8 w-full text-lg py-7 rounded-xl shadow-lg transition-transform hover:scale-105">
        Next: View Dashboard
      </Button>
    </div>
  );
}
