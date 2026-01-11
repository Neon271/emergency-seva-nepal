
"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EmergencyContactCard from "./EmergencyContactCard";
import { getEmergencyServicesByDistrict } from "@/lib/emergency-services";
import { districts } from "@/lib/locations";
import type { EmergencyServiceCategory } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ComingSoon } from "../shared/ComingSoon";

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
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  if (!districtInfo || !districtInfo.isSupported) {
    return <ComingSoon districtName={districtInfo?.name_ne || 'this area'} />;
  }

  if (services.length === 0) {
     return <ComingSoon districtName={districtInfo?.name_ne || 'this area'} />;
  }

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
      <Accordion type="multiple" className="w-full" defaultValue={services.map(s => s.id)}>
        {services.map((service) => (
          <AccordionItem value={service.id} key={service.id}>
            <AccordionTrigger className="text-xl font-bold font-headline hover:no-underline">
              <div className="flex items-center gap-4">
                <service.icon className="h-6 w-6 text-primary" />
                {service.name_ne} ({service.name})
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {service.contacts.map((contact) => (
                  <EmergencyContactCard key={contact.id} contact={contact} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
