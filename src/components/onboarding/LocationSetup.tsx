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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
    <div className="flex items-center justify-center min-h-full">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Select Your Location</CardTitle>
          <CardDescription>Choose your province and district to see relevant emergency numbers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                 <Select defaultValue="nepal" disabled>
                    <SelectTrigger id="country">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="nepal">Nepal (नेपाल)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="province">Province (प्रदेश)</Label>
                <Select onValueChange={setSelectedProvinceId}>
                    <SelectTrigger id="province">
                    <SelectValue placeholder="Select a province" />
                    </SelectTrigger>
                    <SelectContent>
                    {provinces.map((province) => (
                        <SelectItem key={province.id} value={province.id}>
                        {province.name_ne} ({province.name})
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="district">District (जिल्ला)</Label>
                <Select
                    onValueChange={handleDistrictChange}
                    disabled={!selectedProvinceId}
                    value={selectedDistrictId || ""}
                >
                    <SelectTrigger id="district">
                    <SelectValue placeholder="First select a province" />
                    </SelectTrigger>
                    <SelectContent>
                    {availableDistricts.map((district) => (
                        <SelectItem key={district.id} value={district.id}>
                        {district.name_ne} ({district.name})
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
            {showInfo && (
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Data Coming Soon</AlertTitle>
                    <AlertDescription>
                        Detailed information for this district is being updated. You can still access national emergency numbers.
                    </AlertDescription>
                </Alert>
            )}
        </CardContent>
        <CardFooter>
            <Button onClick={handleSave} disabled={isSaveDisabled} className="w-full">
                Save & Continue
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
