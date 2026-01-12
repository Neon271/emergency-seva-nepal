
"use client";

import { useLocation } from '@/hooks/use-location-context';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import LocationSetup from '@/components/onboarding/LocationSetup';
import Dashboard from '@/components/dashboard/Dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';

export default function Home() {
  const { location, setLocation, isLocationSet, isInitialLoad } = useLocation();
  const [step, setStep] = useState<'welcome' | 'location' | 'dashboard'>('dashboard');

  useEffect(() => {
    if (!isInitialLoad) {
      if (!isLocationSet) {
        setStep('welcome');
      } else {
        setStep('dashboard');
      }
    }
  }, [isInitialLoad, isLocationSet]);

  const handleGetStarted = () => {
    setStep('location');
  };

  const handleLocationSet = (provinceId: string, districtId: string) => {
    setLocation({ provinceId, districtId });
    setStep('dashboard');
  };
  
  if (isInitialLoad) {
    return (
        <div className="container p-4 sm:p-6 md:p-8">
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
  
  if (!isLocationSet) {
    if (step === 'welcome') {
      return <main className="container p-4 sm:p-6 md:p-8"><WelcomeScreen onGetStarted={handleGetStarted} /></main>;
    }
    return <main className="container p-4 sm:p-6 md:p-8"><LocationSetup onLocationSet={handleLocationSet} /></main>;
  }


  return (
    <main className="container p-4 sm:p-6 md:p-8">
        <Dashboard />
    </main>
  );
}
