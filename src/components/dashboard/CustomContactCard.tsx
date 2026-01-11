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
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-4">
          <CategoryIcon className="h-8 w-8 text-primary mt-1" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{categoryNames[contact.category]}</p>
            <h3 className="font-bold text-lg">{contact.name}</h3>
          </div>
        </div>

        <a href={`tel:${contact.phone}`} className="block">
            <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                <Phone className="h-5 w-5" /> <span>{contact.phone}</span>
            </div>
        </a>

        {contact.address && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{contact.address}</span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
            <Button asChild>
                <a href={`tel:${contact.phone}`}>
                    <Phone /> Call
                </a>
            </Button>
             <Button asChild variant="secondary">
                 <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin /> Map
                </a>
              </Button>
               <Button asChild variant="secondary">
                 <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation /> Directions
                </a>
              </Button>
        </div>

        <div className="mt-2 flex justify-end">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-destructive">
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
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
      </CardContent>
    </Card>
  );
}
