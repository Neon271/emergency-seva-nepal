"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Trash2, Ambulance, Pill, Stethoscope, LifeBuoy, Navigation } from "lucide-react";
import type { CustomContact, CustomContactCategory } from "@/lib/types";
import { useCustomContacts } from "@/hooks/use-custom-contacts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface CustomContactCardProps {
  contact: CustomContact;
}

const categoryIcons: Record<CustomContactCategory, React.ElementType> = {
    ambulance: Ambulance,
    clinic: Stethoscope,
    pharmacy: Pill,
    other: LifeBuoy,
    hospital: Stethoscope,
    police: LifeBuoy,
    fire: LifeBuoy,
    blood: LifeBuoy,
    helpline: LifeBuoy,
};

const categoryNames = {
    ambulance: 'Ambulance Service',
    clinic: 'Clinic / Doctor',
    pharmacy: 'Pharmacy',
    other: 'Other',
    hospital: 'Hospital',
    police: 'Police',
    fire: 'Fire Brigade',
    blood: 'Blood Bank',
    helpline: 'Helpline'
};

export default function CustomContactCard({ contact }: CustomContactCardProps) {
  const { deleteContact } = useCustomContacts();
  const CategoryIcon = categoryIcons[contact.category];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address || contact.name)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.address || contact.name)}`;

  return (
    <div className="emergency-card bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl transition-transform hover:translate-y-[-3px] hover:shadow-2xl">
          <div className="card-header flex items-center gap-4 mb-4">
              <div className="card-icon text-5xl flex-shrink-0">
                  <CategoryIcon className="h-12 w-12 text-primary" />
              </div>
              <div className="card-title-group flex-1">
                  <div className="card-category text-xs text-gray-500 uppercase font-bold tracking-wide">
                      {categoryNames[contact.category]}
                  </div>
                  <div className="card-name text-xl text-gray-800 dark:text-gray-200 font-bold">
                      {contact.name}
                  </div>
              </div>
          </div>

          <div className="card-info mb-4 space-y-2">
            <a href={`tel:${contact.phone}`} className="card-phone flex items-center gap-2 text-2xl text-destructive font-bold">
                <Phone className="h-5 w-5"/> {contact.phone}
            </a>
            {contact.address && (
                <div className="card-address flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0"/> 
                    <span>{contact.address}</span>
                </div>
            )}
          </div>
          
          <div className="card-actions grid grid-cols-3 gap-2">
              <Button asChild className="btn-call h-auto py-3 text-base font-bold transition-transform hover:scale-105">
                <a href={`tel:${contact.phone}`}>
                    <Phone className="mr-2 h-5 w-5"/> Call
                </a>
              </Button>
              <Button asChild variant="secondary" className="h-auto py-3 text-base font-bold bg-blue-500 text-white hover:bg-blue-600 transition-transform hover:scale-105">
                 <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2 h-5 w-5" /> View
                </a>
              </Button>
               <Button asChild variant="secondary" className="h-auto py-3 text-base font-bold bg-green-600 text-white hover:bg-green-700 transition-transform hover:scale-105">
                 <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="mr-2 h-5 w-5" /> Navigate
                </a>
              </Button>
          </div>
           <div className="mt-4 flex justify-end">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-destructive">
                            <Trash2 className="mr-1 h-3 w-3" />
                            Delete Contact
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your custom contact for "{contact.name}".
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteContact(contact.id)}>
                            Yes, delete
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
      </div>
  );
}
