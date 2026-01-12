
"use client";

import EmergencyContactsDisplay from '@/components/dashboard/EmergencyContactsDisplay';
import { Button } from '../ui/button';
import EmergencySms from '../sms/EmergencySms';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { useProfile } from '@/hooks/use-profile';

export default function Dashboard() {
  const { profile, selectedDistrict, selectedProvince } = useProfile();
  
  const findNearby = (service: string) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const url = `https://www.google.com/maps/search/${service}/@${latitude},${longitude},15z`;
                window.open(url, '_blank');
            },
            () => {
                 alert('Could not get your location. Please enable location services.');
                 const url = `https://www.google.com/maps/search/${service}+in+${selectedDistrict?.name}`;
                 window.open(url, '_blank');
            }
        );
    } else {
        const url = `https://www.google.com/maps/search/${service}+in+${selectedDistrict?.name}`;
        window.open(url, '_blank');
    }
  };

  return (
      <div className="w-full max-w-7xl mx-auto space-y-6">
          <Card className="bg-card/70">
              <CardHeader>
                  <CardTitle className="text-xl font-bold">Find Nearby Services</CardTitle>
                  {profile && (
                    <CardDescription>
                        Showing services for {selectedDistrict?.name_ne} ({selectedDistrict?.name}), {selectedProvince?.name_ne} ({selectedProvince?.name})
                    </CardDescription>
                  )}
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Button onClick={() => findNearby('hospitals')} size="lg" className="font-semibold">
                  🏥 Find Nearby Hospitals
                  </Button>
                  <Button onClick={() => findNearby('pharmacy')} size="lg" className="font-semibold">
                  💊 Find Nearby Pharmacy
                  </Button>
              </CardContent>
          </Card>

          <EmergencySms />

          {profile?.districtId && <EmergencyContactsDisplay districtId={profile.districtId} />}
      </div>
  );
}
