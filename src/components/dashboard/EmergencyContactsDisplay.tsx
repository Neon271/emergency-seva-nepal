
"use client";

import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import EmergencyContactCard from "./EmergencyContactCard";
import { getEmergencyServicesByDistrict, allBloodTypes } from "@/lib/emergency-services";
import { districts } from "@/lib/locations";
import type { EmergencyServiceCategory } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ComingSoon } from "../shared/ComingSoon";
import { Button } from "../ui/button";
import { Navigation } from "lucide-react";
import AddContactDialog from "./AddContactDialog";
import { useLocation } from "@/hooks/use-location-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ServiceCategoryList from "./ServiceCategoryList";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";


interface EmergencyContactsDisplayProps {
  districtId: string;
}

export default function EmergencyContactsDisplay({ districtId }: EmergencyContactsDisplayProps) {
  const { selectedDistrict } = useLocation();
  const [services, setServices] = useState<EmergencyServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddContactOpen, setAddContactOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<EmergencyServiceCategory | null>(null);
  const [selectedBloodType, setSelectedBloodType] = useState<string>('all');
  
  const districtInfo = districts.find(d => d.id === districtId);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const fetchedServices = getEmergencyServicesByDistrict(districtId);
      setServices(fetchedServices);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [districtId]);

  const renderSkeleton = () => (
     <div className="space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-10 w-full md:w-1/2" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
  );
  
  if (isLoading) {
    return renderSkeleton();
  }

  if (!districtInfo || !districtInfo.isSupported) {
    return <ComingSoon districtName={districtInfo?.name_ne || 'this area'} />;
  }

  const googleMapsSearchUrl = "https://www.google.com/maps/search/?api=1&query=hospitals+or+ambulance+near+me";

  const handleCategoryClick = (category: EmergencyServiceCategory) => {
    setSelectedCategory(category);
  };
  
  const handleCloseDialog = () => {
    setSelectedCategory(null);
    setSelectedBloodType('all');
  };
  
  const getFilteredBloodContacts = () => {
    if (!selectedCategory || selectedCategory.id !== 'blood') return [];
    if (selectedBloodType === 'all') return selectedCategory.contacts;
    return selectedCategory.contacts.filter(c => c.bloodTypes?.includes(selectedBloodType));
  };
  
  const contactsForDialog = selectedCategory?.id === 'blood'
    ? getFilteredBloodContacts()
    : selectedCategory?.contacts;


  return (
    <>
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-muted-foreground">
          Showing emergency services for
        </p>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          {selectedDistrict?.name_ne} ({selectedDistrict?.name})
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button asChild size="lg" className="flex-grow md:flex-grow-0 py-6 text-lg">
            <a href={googleMapsSearchUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="mr-2 h-5 w-5" />
                Find Nearby
            </a>
        </Button>
         <Button size="lg" variant="outline" className="flex-grow md:flex-grow-0 py-6 text-lg" onClick={() => setAddContactOpen(true)}>
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Contact
        </Button>
      </div>
      
      <ServiceCategoryList services={services} onCategoryClick={handleCategoryClick} />

    </div>

    <Dialog open={!!selectedCategory} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
      <DialogContent className="max-w-md w-full h-[80vh] flex flex-col">
        {selectedCategory && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                  <selectedCategory.icon className="h-7 w-7 text-primary" />
                  {selectedCategory.name_ne} ({selectedCategory.name})
              </DialogTitle>
              <DialogDescription>
                Showing contacts for {districtInfo.name_ne}.
              </DialogDescription>
            </DialogHeader>

            {selectedCategory.id === 'blood' && (
                <div className="px-6 pb-4">
                    <div className="flex items-baseline gap-2">
                    <Label htmlFor="blood-type-filter" className="text-sm">Filter:</Label>
                    <Select value={selectedBloodType} onValueChange={setSelectedBloodType}>
                        <SelectTrigger id="blood-type-filter" className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Blood Types</SelectItem>
                            {allBloodTypes.map(bt => (
                                <SelectItem key={bt} value={bt}>{bt}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    </div>
                </div>
            )}
            
            <ScrollArea className="flex-1">
              <div className="px-6 pb-6">
                {contactsForDialog && contactsForDialog.length > 0 ? (
                  <div className="grid gap-4">
                    {contactsForDialog.map((contact) => (
                      <EmergencyContactCard key={contact.id} contact={contact} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center h-full">
                      <h3 className="text-lg font-semibold">No Contacts Available</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {selectedCategory.id === 'blood' 
                          ? 'No contacts found for the selected blood type.'
                          : 'Check back later or report if this is an error.'}
                      </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>


    <AddContactDialog 
        isOpen={isAddContactOpen}
        onOpenChange={setAddContactOpen}
        onSuccess={() => { /* Consider switching tab to custom contacts */ }}
    />
    </>
  );
}
