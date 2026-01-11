
"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLocation } from '@/hooks/use-location-context';
import LocationSelector from '@/components/location/LocationSelector';
import { Skeleton } from '@/components/ui/skeleton';
import EmergencyContactsDisplay from '@/components/dashboard/EmergencyContactsDisplay';

export default function Dashboard() {
  const { location, isInitialLoad, isLocationSet, showSelector, setShowSelector } = useLocation();

  const renderContent = () => {
    if (isInitialLoad || !isLocationSet) {
      return (
        <div className="space-y-8">
          <Skeleton className="h-10 w-1/3" />
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      );
    }
    return <EmergencyContactsDisplay districtId={location.districtId} />;
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {renderContent()}
        </div>
      </main>
      <LocationSelector isOpen={showSelector} onOpenChange={setShowSelector} />
      <Footer />
    </div>
  );
}
