"use client";

import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <SirenIcon className="h-20 w-20 text-primary" />
      <h1 className="mt-6 text-4xl font-bold font-headline text-foreground">
        Emergency Seva
      </h1>
      <p className="mt-2 max-w-md text-lg text-muted-foreground">
        Fast emergency help for Nepal
      </p>
      <Button
        size="lg"
        className="mt-8 text-lg py-6"
        onClick={onGetStarted}
      >
        Get Started
      </Button>
      <div className="absolute bottom-4 text-sm text-muted-foreground">
        Powered by Emergency Seva © Prajwol
      </div>
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
