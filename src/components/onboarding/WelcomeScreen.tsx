
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
            <div className="mx-auto text-6xl mb-4">⛑️</div>
          <CardTitle className="text-2xl">
            Welcome to Emergency Sewa
          </CardTitle>
          <CardDescription>
            Your guide to emergency contacts and health services in Nepal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            size="lg"
            className="w-full"
            onClick={onGetStarted}
          >
            Get Started
          </Button>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground text-center w-full">
                Disclaimer: This is not an official government application. In a life-threatening emergency, always call the official local emergency numbers first.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
