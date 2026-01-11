
"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Trash2, Ambulance, Pill, Stethoscope, LifeBuoy } from "lucide-react";
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
};


export default function CustomContactCard({ contact }: CustomContactCardProps) {
  const { deleteContact } = useCustomContacts();
  const CategoryIcon = categoryIcons[contact.category];

  const googleMapsSearchUrl = contact.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}` : null;

  return (
    <Card className="flex h-full flex-col bg-card/80 transition-shadow hover:shadow-md">
        <CardContent className="flex-1 p-4">
            <div className="flex items-start justify-between">
                <h3 className="font-headline text-lg font-bold">{contact.name}</h3>
                <CategoryIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground capitalize">{contact.category}</p>
            {contact.address && (
                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
                    <span>{contact.address}</span>
                </div>
            )}
            <a href={`tel:${contact.phone}`} className="mt-2 inline-block text-3xl font-bold tracking-wider text-primary hover:underline font-mono">
                {contact.phone}
            </a>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-2 p-4 pt-0">
            <Button asChild size="lg" className="w-full">
                <a href={`tel:${contact.phone}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                </a>
            </Button>
            <div className="grid grid-cols-2 gap-2">
                {googleMapsSearchUrl ? (
                     <Button asChild variant="outline" className="w-full">
                        <a href={googleMapsSearchUrl} target="_blank" rel="noopener noreferrer">
                            <MapPin className="h-5 w-5" />
                        </a>
                    </Button>
                ) : <div />}
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                            <Trash2 className="h-5 w-5" />
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
        </CardFooter>
      </Card>
  );
}
