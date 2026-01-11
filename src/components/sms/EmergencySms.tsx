
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquareWarning, Loader2, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function EmergencySms() {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { toast } = useToast();

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
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex-grow">
                <h3 className="font-headline text-xl font-bold text-destructive-foreground">Emergency Situation?</h3>
                <p className="text-destructive-foreground/80">
                    Quickly send a pre-written SMS with your location to an emergency contact.
                </p>
            </div>
             <Button
                size="lg"
                variant="destructive"
                className="w-full md:w-auto text-lg py-6"
                onClick={handleClick}
                disabled={isLoadingLocation}
                >
                {isLoadingLocation ? (
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                ) : (
                    <MessageSquareWarning className="mr-2 h-6 w-6" />
                )}
                Send Emergency SMS
            </Button>
        </CardContent>
    </Card>
  );
}

// Dummy Card components for compilation, as they are not imported
const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => (
    <div className={className}>{children}</div>
);
const CardContent = ({ className, children }: { className?: string, children: React.ReactNode }) => (
    <div className={className}>{children}</div>
);
