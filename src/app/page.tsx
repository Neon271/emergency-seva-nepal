
"use client";

import Dashboard from '@/components/dashboard/Dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import ProfileSetup from '@/components/onboarding/ProfileSetup';
import { useProfile } from '@/hooks/use-profile';

export default function Home() {
  const { profile, isProfileSet, isInitialLoad, saveProfile } = useProfile();
  const [step, setStep] = useState<'welcome' | 'profile' | 'dashboard'>('dashboard');

  useEffect(() => {
    if (!isInitialLoad) {
      if (!isProfileSet) {
        setStep('welcome');
      } else {
        setStep('dashboard');
      }
    }
  }, [isInitialLoad, isProfileSet]);

  const handleGetStarted = () => {
    setStep('profile');
  };

  const handleProfileSet = (newProfile: any) => {
    saveProfile(newProfile);
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
  
  if (!isProfileSet) {
    if (step === 'welcome') {
      return <main className="container p-4 sm:p-6 md:p-8"><WelcomeScreen onGetStarted={handleGetStarted} /></main>;
    }
    return <main className="container p-4 sm:p-6 md:p-8"><ProfileSetup onProfileSet={handleProfileSet} /></main>;
  }


  return (
    <main className="container p-4 sm:p-6 md:p-8">
        <Dashboard />
    </main>
  );
}
