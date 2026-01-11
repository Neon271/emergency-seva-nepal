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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface LocationSetupProps {
  onLocationSet: (provinceId: string, districtId: string) => void;
}

export default function LocationSetup({ onLocationSet }: LocationSetupProps) {
  const { provinces, getDistrictsByProvince } = useLocation();
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [availableDistricts, setAvailableDistricts] = useState<District[]>([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProvinceId) {
      setAvailableDistricts(getDistrictsByProvince(selectedProvinceId));
      setSelectedDistrictId(null);
    } else {
      setAvailableDistricts([]);
    }
  }, [selectedProvinceId, getDistrictsByProvince]);

  const handleSave = () => {
    if (selectedProvinceId && selectedDistrictId) {
      onLocationSet(selectedProvinceId, selectedDistrictId);
    }
  };

  const isSaveDisabled = !selectedProvinceId || !selectedDistrictId;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Select Your Location</CardTitle>
                <CardDescription>
                Choose your province and district to see relevant emergency numbers.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="province">Province</Label>
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
                    <Label htmlFor="district">District</Label>
                    <Select
                        onValueChange={setSelectedDistrictId}
                        disabled={!selectedProvinceId}
                        value={selectedDistrictId || ""}
                    >
                        <SelectTrigger id="district">
                            <SelectValue placeholder="Select a district" />
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
            </CardContent>
            <CardFooter>
                 <Button onClick={handleSave} disabled={isSaveDisabled} className="w-full" size="lg">
                    Confirm Location
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}
