"use client";

import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl sm:p-8">
      <div className="text-7xl pulse-animation mb-6">🚑</div>
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
        Nepal Health & Emergency Finder
      </h1>
      <p className="mt-4 text-base text-gray-600 sm:text-lg">
        Emergency contacts and nearby health services across Nepal.
      </p>
      <Button
        size="lg"
        className="mt-8 w-full text-lg py-7 rounded-xl shadow-lg transition-transform hover:scale-105"
        onClick={onGetStarted}
      >
        Get Started
      </Button>
      <p className="mt-6 text-xs text-gray-400">
        We are not an official Nepal government app. For life-threatening emergencies, call 102 or 100 immediately.
      </p>
    </div>
  );
}
