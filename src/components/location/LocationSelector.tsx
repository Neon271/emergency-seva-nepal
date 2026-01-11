
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLocation } from "@/hooks/use-location-context";
import type { StoredLocation } from "@/contexts/LocationContext";
import type { District } from "@/lib/types";

interface LocationSelectorProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function LocationSelector({ isOpen, onOpenChange }: LocationSelectorProps) {
  const { setLocation, provinces, getDistrictsByProvince } = useLocation();
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
      const newLocation: StoredLocation = {
        provinceId: selectedProvinceId,
        districtId: selectedDistrictId,
      };
      setLocation(newLocation);
      onOpenChange(false);
    }
  };

  const isSaveDisabled = !selectedProvinceId || !selectedDistrictId;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Your Location</DialogTitle>
          <DialogDescription>
            Choose your province and district to see relevant emergency numbers. This is saved on your device.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="province" className="text-right">
              Province
            </Label>
            <Select onValueChange={setSelectedProvinceId}>
              <SelectTrigger id="province" className="col-span-3">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="district" className="text-right">
              District
            </Label>
            <Select
              onValueChange={setSelectedDistrictId}
              disabled={!selectedProvinceId}
              value={selectedDistrictId || ""}
            >
              <SelectTrigger id="district" className="col-span-3">
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
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={isSaveDisabled}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
