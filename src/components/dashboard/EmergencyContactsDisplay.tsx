
"use client";

import { useEffect, useState } from "react";
import { PlusCircle, UserSquare } from "lucide-react";
import EmergencyContactCard from "./EmergencyContactCard";
import { getEmergencyServicesByDistrict } from "@/lib/emergency-services";
import { districts } from "@/lib/locations";
import type { EmergencyServiceCategory, CustomContact } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ComingSoon } from "../shared/ComingSoon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Navigation } from "lucide-react";
import { useCustomContacts } from "@/hooks/use-custom-contacts";
import AddContactDialog from "./AddContactDialog";
import CustomContactCard from "./CustomContactCard";

interface EmergencyContactsDisplayProps {
  districtId: string;
}

export default function EmergencyContactsDisplay({ districtId }: EmergencyContactsDisplayProps) {
  const [services, setServices] = useState<EmergencyServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddContactOpen, setAddContactOpen] = useState(false);

  const { customContacts, isLoading: isLoadingCustomContacts } = useCustomContacts();
  
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

  const handleAddSuccess = () => {
    // Potentially switch to the custom contacts tab
  };

  const renderSkeleton = () => (
     <div className="space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-10 w-full md:w-1/2" />
        <Skeleton className="h-8 w-full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
  );

  if (isLoading || isLoadingCustomContacts) {
    return renderSkeleton();
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
    <>
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Emergency Numbers for {districtInfo.name_ne}
        </h1>
        <p className="text-muted-foreground">
          Tap to call or share emergency contacts. Use the report button for incorrect information.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button asChild size="lg" className="flex-grow md:flex-grow-0">
            <a href={googleMapsSearchUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="mr-2 h-5 w-5" />
                Find Nearby Hospitals & Ambulances
            </a>
        </Button>
         <Button size="lg" variant="outline" className="flex-grow md:flex-grow-0" onClick={() => setAddContactOpen(true)}>
          <PlusCircle className="mr-2 h-5 w-5" />
          Add a Contact
        </Button>
      </div>
      
      <Tabs defaultValue={servicesWithContacts[0].id} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto md:grid-cols-4 lg:grid-cols-7">
          {servicesWithContacts.map((service) => (
            <TabsTrigger key={service.id} value={service.id} className="flex gap-2">
              <service.icon className="h-5 w-5" />
              <span>{service.name_ne}</span>
            </TabsTrigger>
          ))}
           <TabsTrigger value="custom" className="flex gap-2">
              <UserSquare className="h-5 w-5" />
              <span>My Contacts</span>
            </TabsTrigger>
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

        <TabsContent value="custom">
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <UserSquare className="h-7 w-7 text-primary" />
                        My Custom Contacts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                  {customContacts.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {customContacts.map((contact) => (
                          <CustomContactCard key={contact.id} contact={contact} />
                        ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
                        <h3 className="text-lg font-semibold">No Custom Contacts Yet</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Click "Add a Contact" to save your personal emergency numbers.</p>
                    </div>
                  )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
    <AddContactDialog 
        isOpen={isAddContactOpen}
        onOpenChange={setAddContactOpen}
        onSuccess={handleAddSuccess}
    />
    </>
  );
}
