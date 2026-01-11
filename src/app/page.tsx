"use client";

import { useState } from 'react';
import { useLocation } from '@/hooks/use-location-context';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import LocationSetup from '@/components/onboarding/LocationSetup';
import Dashboard from '@/components/dashboard/Dashboard';

export default function Home() {
  const { isLocationSet, isInitialLoad } = useLocation();

  if (isInitialLoad) {
    // You can return a loading spinner here if needed
    return null;
  }

  if (!isLocationSet) {
    return <OnboardingFlow />;
  }

  return <Dashboard />;
}

function OnboardingFlow() {
  const { location, setLocation } = useLocation();
  const [step, setStep] = useState<'welcome' | 'location'>(location ? 'location' : 'welcome');

  const handleGetStarted = () => {
    setStep('location');
  };

  const handleLocationSet = (provinceId: string, districtId: string) => {
    setLocation({ provinceId, districtId });
    // The main Home component will re-render and show the dashboard
  };

  if (step === 'welcome') {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  if (step === 'location') {
    return <LocationSetup onLocationSet={handleLocationSet} />;
  }

  return null;
}
