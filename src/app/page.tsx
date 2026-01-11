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
    return <div className="p-4"><Skeleton className="h-[80vh] w-full" /></div>;
  }

  const renderContent = () => {
    if (!isLocationSet) {
      return <OnboardingFlow />;
    }
    return <Dashboard />;
  }

  return (
    <main className="main-container">
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
