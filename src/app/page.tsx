"use client";

import { useState } from 'react';
import { useLocation } from '@/hooks/use-location-context';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import LocationSetup from '@/components/onboarding/LocationSetup';
import Dashboard from '@/components/dashboard/Dashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { isLocationSet, isInitialLoad } = useLocation();

  if (isInitialLoad) {
    return (
        <div className="container p-4">
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-32 w-full mb-4" />
            <Skeleton className="h-16 w-full mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
    );
  }

  const renderContent = () => {
    if (!isLocationSet) {
      return <OnboardingFlow />;
    }
    return <Dashboard />;
  }

  return (
    <main className="container p-4 sm:p-6">
        {renderContent()}
    </main>
  );
}

function OnboardingFlow() {
  const { location, setLocation } = useLocation();
  const [step, setStep] = useState<'welcome' | 'location'>(location ? 'location' : 'welcome');

  const handleGetStarted = () => {
    setStep('location');
  };

  const handleLocationSet = (provinceId: string, districtId: string) => {
    setLocation({ provinceId, districtId });
  };

  if (step === 'welcome') {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  if (step === 'location') {
    return <LocationSetup onLocationSet={handleLocationSet} />;
  }

  return null;
}
