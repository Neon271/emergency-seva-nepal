
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


export default function CustomContactCard({ contact }: CustomContactCardProps) {
  const { deleteContact } = useCustomContacts();
  const CategoryIcon = categoryIcons[contact.category];
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.address || contact.name)}`;

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start gap-4">
          <CategoryIcon className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
          <div className="flex-1">
             <h3 className="font-bold text-base leading-tight">{contact.name}</h3>
             <a href={`tel:${contact.phone}`} className="block mt-1">
                <div className="flex items-center gap-2 text-lg font-semibold text-accent">
                    <Phone className="h-4 w-4" /> <span>{contact.phone}</span>
                </div>
              </a>
            {contact.address && (
                <div className="flex items-start gap-2 text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span>{contact.address}</span>
                </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
            <div className="flex gap-1">
                <Button asChild variant="accent" size="sm" className="h-9">
                    <a href={`tel:${contact.phone}`}>
                        <Phone /> Call
                    </a>
                </Button>
                <Button asChild variant="secondary" size="icon" className="h-9 w-9">
                    <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                        <Navigation />
                    </a>
                </Button>
            </div>
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

