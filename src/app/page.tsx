
"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLocation } from '@/hooks/use-location-context';
import LocationSelector from '@/components/location/LocationSelector';
import { Skeleton } from '@/components/ui/skeleton';
import EmergencyContactsDisplay from '@/components/dashboard/EmergencyContactsDisplay';

export default function Home() {
  const { location, isInitialLoad, isLocationSet, showSelector, setShowSelector } = useLocation();

  const renderContent = () => {
    if (isInitialLoad) {
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
    if (isLocationSet && location) {
      return <EmergencyContactsDisplay districtId={location.districtId} />;
    }
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <div className="rounded-full bg-primary/10 p-4">
          <SirenIcon className="h-12 w-12 text-primary" />
        </div>
        <h2 className="mt-6 text-2xl font-bold font-headline">Welcome to Emergency Seva</h2>
        <p className="mt-2 text-muted-foreground">
          Please select your location to view local emergency numbers.
        </p>
      </div>
    );
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


function SirenIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.52 5.52a6.5 6.5 0 0 1 9.19 0" />
        <path d="M2 11h20" />
        <path d="M18.37 5.63a9 9 0 0 1-12.73 0" />
        <path d="M12 11v11" />
        <path d="m6 22 1.5-1.5" />
        <path d="M18 22l-1.5-1.5" />
        <path d="M10 17h4" />
      </svg>
    )
  }
