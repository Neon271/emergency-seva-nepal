
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquareWarning, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '../ui/card';

export default function EmergencySms() {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { toast } = useToast();

  const handleVibrate = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(100); // Vibrate for 100ms
    }
  };

  const handleSendSms = (location?: GeolocationCoordinates) => {
    let message = "I am in an emergency and need help.";
    if (location) {
      message += ` My current location is: https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    } else {
      message += " My location is not available.";
    }
    
    const smsLink = `sms:?body=${encodeURIComponent(message)}`;
    window.location.href = smsLink;
  };

  const handleClick = () => {
    handleVibrate();
    if (!navigator.geolocation) {
      toast({
        variant: 'destructive',
        title: 'Geolocation not supported',
        description: "Your browser doesn't support location services.",
      });
      handleSendSms(); // Send without location
      return;
    }

    setIsLoadingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoadingLocation(false);
        handleSendSms(position.coords);
      },
      (error) => {
        setIsLoadingLocation(false);
        console.error("Geolocation error:", error);
        toast({
          variant: 'destructive',
          title: 'Location Error',
          description: "Could not get your location. SMS will be sent without it.",
        });
        handleSendSms(); // Send without location
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <Card className="bg-destructive/10 border-destructive">
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
                <h3 className="font-bold text-destructive-foreground">Emergency Situation?</h3>
                <p className="text-sm text-destructive-foreground/80">
                    Quickly send an SMS with your location to an emergency contact.
                </p>
            </div>
             <Button
                size="lg"
                variant="destructive"
                className="w-full sm:w-auto flex-shrink-0"
                onClick={handleClick}
                disabled={isLoadingLocation}
                >
                {isLoadingLocation ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <MessageSquareWarning className="mr-2 h-4 w-4" />
                )}
                Send Emergency SMS
            </Button>
        </CardContent>
    </Card>
  );
}
