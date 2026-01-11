
"use client";

import { useEffect, useState } from "react";
import EmergencyContactCard from "./EmergencyContactCard";
import { getEmergencyServicesByDistrict } from "@/lib/emergency-services";
import { districts } from "@/lib/locations";
import type { EmergencyServiceCategory } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ComingSoon } from "../shared/ComingSoon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Navigation } from "lucide-react";

interface EmergencyContactsDisplayProps {
  districtId: string;
}

export default function EmergencyContactsDisplay({ districtId }: EmergencyContactsDisplayProps) {
  const [services, setServices] = useState<EmergencyServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const districtInfo = districts.find(d => d.id === districtId);

  useEffect(() => {
    setIsLoading(true);
    // Simulate network fetch
    const timer = setTimeout(() => {
      const fetchedServices = getEmergencyServicesByDistrict(districtId);
      setServices(fetchedServices);
      setIsLoading(false);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [districtId]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-8 w-full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (!districtInfo || !districtInfo.isSupported) {
    return <ComingSoon districtName={districtInfo?.name_ne || 'this area'} />;
  }

  const servicesWithContacts = services.filter(s => s.contacts.length > 0);

  if (servicesWithContacts.length === 0) {
     return <ComingSoon districtName={districtInfo?.name_ne || 'this area'} />;
  }

  const googleMapsSearchUrl = "https://www.google.com/maps/search/?api=1&query=hospitals+or+ambulance+near+me";


  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Emergency Numbers for {districtInfo.name_ne}
        </h1>
        <p className="text-muted-foreground">
          Tap to call or share emergency contacts. Use the report button for incorrect information.
        </p>
      </div>

       <Button asChild size="lg" className="w-full md:w-auto">
          <a href={googleMapsSearchUrl} target="_blank" rel="noopener noreferrer">
              <Navigation className="mr-2 h-5 w-5" />
              Find Nearby Hospitals & Ambulances
          </a>
       </Button>
      
      <Tabs defaultValue={servicesWithContacts[0].id} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-auto md:grid-cols-3 lg:grid-cols-6">
          {servicesWithContacts.map((service) => (
            <TabsTrigger key={service.id} value={service.id} className="flex gap-2">
              <service.icon className="h-5 w-5" />
              <span>{service.name_ne}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {servicesWithContacts.map((service) => (
          <TabsContent value={service.id} key={service.id}>
             <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <service.icon className="h-7 w-7 text-primary" />
                        {service.name_ne} ({service.name})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {service.contacts.length > 0 ? (
                            service.contacts.map((contact) => (
                                <EmergencyContactCard key={contact.id} contact={contact} />
                            ))
                        ) : (
                            <p className="text-muted-foreground col-span-full">No contacts available for this service.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
