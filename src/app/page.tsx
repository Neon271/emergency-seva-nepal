"use client";

import Dashboard from '@/components/dashboard/Dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import ProfileSetup from '@/components/onboarding/ProfileSetup';
import { useProfile } from '@/hooks/use-profile';

export default function Home() {
  const { isProfileSet, isInitialLoad, saveProfile } = useProfile();
  const [onboardingStep, setOnboardingStep] = useState<'welcome' | 'profile'>('welcome');

  const handleGetStarted = () => {
    setOnboardingStep('profile');
  };

  const handleProfileSet = (newProfile: any) => {
    saveProfile(newProfile);
    // The component will automatically re-render with isProfileSet=true after this.
  };
  
  // This is the key to preventing hydration errors.
  // The server and the initial client render will both show this skeleton UI.
  if (isInitialLoad) {
    return (
        <main className="container p-4 sm:p-6 md:p-8">
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-32 w-full mb-4" />
            <Skeleton className="h-16 w-full mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        </main>
    );
  }
  
  // After the initial load, we can safely check isProfileSet to decide what to render.
  if (isProfileSet) {
    return (
        <main className="container p-4 sm:p-6 md:p-8">
            <Dashboard />
        </main>
    );
  }

  // If the profile isn't set, we show the onboarding flow.
  if (onboardingStep === 'welcome') {
    return (
        <main className="container p-4 sm:p-6 md:p-8">
            <WelcomeScreen onGetStarted={handleGetStarted} />
        </main>
    );
  }

  return (
    <main className="container p-4 sm:p-6 md:p-8">
        <ProfileSetup onProfileSet={handleProfileSet} />
    </main>
  );
}
