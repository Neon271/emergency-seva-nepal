
"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Share2, Flag, MapPin, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { EmergencyContact } from "@/lib/types";
import ReportDialog from "../feedback/ReportDialog";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

interface EmergencyContactCardProps {
  contact: EmergencyContact;
}

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16.75 13.96c.25.13.42.2.46.28.05.09.05.5.02.62-.03.12-.24.22-.4.25-.16.03-.5.03-.7.03-.2 0-1.14-.15-1.9-.45-.76-.3-1.68-.89-2.5-1.61-.95-.83-1.63-1.8-1.85-2.2-.23-.4-.41-.71-.41-1.01 0-.3.2-.45.33-.58.13-.13.28-.18.38-.18.1 0 .2.01.28.02.08.01.16.03.25.16.09.13.14.28.18.35.04.07.07.14.07.19 0 .07-.01.13-.03.18-.02.05-.05.09-.08.13s-.08.1-.13.15c-.05.05-.11.1-.15.14-.05.05-.08.09-.1.12-.02.03-.01.07.02.13.03.06.13.28.25.43.12.15.28.35.47.51.19.16.4.33.6.45.2.12.36.2.49.25.13.05.2.07.25.07.05 0 .1-.01.13-.03.03-.02.35-.16.4-.33.05-.17.1-.33.15-.5.05-.17.1-.28.16-.35.06-.07.12-.1.16-.1.04 0 .1 0 .19.01.09.01.2.01.28.02.08.01.14.01.17.02.03.01.05.01.06.01.01 0 .04-.01.06.01s.05.01.06.01c.01 0 .04.01.06.01l.01.01c.03.03.06.06.09.13.03.07.03.15.03.21 0 .07-.02.13-.04.18zM12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18.2a8.2 8.2 0 1 1 8.2-8.2 8.21 8.21 0 0 1-8.2 8.2z"></path>
    </svg>
)

export default function EmergencyContactCard({ contact }: EmergencyContactCardProps) {
  const { toast } = useToast();
  const [isReportDialogOpen, setReportDialogOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const favorite = isFavorite(contact.id);

  const handleShare = async () => {
    const shareData = {
      title: "Emergency Seva Contact",
      text: `Emergency Contact:\n${contact.name_ne} (${contact.name})\nPhone: ${contact.phone}${contact.address ? `\nAddress: ${contact.address}` : ''}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        toast({
          title: "Copied to Clipboard",
          description: "Contact details copied successfully.",
        });
      }
    } catch (err) {
      console.error("Share failed:", err);
      toast({
        variant: "destructive",
        title: "Share Failed",
        description: "Could not share the contact information.",
      });
    }
  };
  
  const handleFavoriteClick = () => {
    toggleFavorite(contact);
    toast({
      title: favorite ? "Removed from Favorites" : "Added to Favorites",
      description: `${contact.name_ne} has been ${favorite ? 'removed from' : 'added to'} your favorites.`,
    })
  }

  return (
    <>
      <Card className="flex h-full flex-col bg-card/80 transition-shadow hover:shadow-lg rounded-xl border-2">
        <CardContent className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-headline text-xl font-bold">{contact.name_ne}</h3>
                <p className="text-md text-muted-foreground">{contact.name}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleFavoriteClick} className="h-8 w-8 flex-shrink-0">
                  <Star className={cn("h-5 w-5", favorite ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground")} />
                  <span className="sr-only">Favorite</span>
              </Button>
            </div>
            {contact.address && (
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
                    <span>{contact.address}</span>
                </div>
            )}
             {contact.bloodTypes && contact.bloodTypes.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                    {contact.bloodTypes.map(bt => (
                        <span key={bt} className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">{bt}</span>
                    ))}
                </div>
            )}
            <a href={`tel:${contact.phone}`} className="mt-3 inline-block text-4xl font-bold tracking-wider text-primary hover:underline font-mono">
                {contact.phone}
            </a>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-2 p-4 pt-0">
            <Button asChild size="lg" className="w-full text-lg py-6">
                <a href={`tel:${contact.phone}`}>
                    <Phone className="mr-2 h-6 w-6" />
                    Call Now
                </a>
            </Button>
            <div className="grid grid-cols-3 gap-2">
                {contact.whatsapp ? (
                    <Button asChild variant="outline" className="w-full">
                        <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon className="h-5 w-5" />
                        </a>
                    </Button>
                ) : <div/>}

                {contact.mapLink ? (
                     <Button asChild variant="outline" className="w-full">
                        <a href={contact.mapLink} target="_blank" rel="noopener noreferrer">
                            <MapPin className="h-5 w-5" />
                        </a>
                    </Button>
                ) : <div />}

                <Button variant="outline" className="w-full" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                </Button>
            </div>
             <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={() => setReportDialogOpen(true)}>
                <Flag className="mr-2 h-4 w-4" />
                Report Issue
            </Button>
        </CardFooter>
      </Card>
      {isReportDialogOpen && (
        <ReportDialog
            isOpen={isReportDialogOpen}
            onOpenChange={setReportDialogOpen}
            contact={contact}
        />
      )}
    </>
  );
}
