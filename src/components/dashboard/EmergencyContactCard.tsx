"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Share2, Flag, MapPin, Star, Navigation, Ambulance, Building, Shield, Flame, HeartHandshake, PersonStanding } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { EmergencyContact } from "@/lib/types";
import ReportDialog from "../feedback/ReportDialog";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

interface EmergencyContactCardProps {
  contact: EmergencyContact & { categoryId?: string };
}

const categoryIcons = {
    ambulance: '🚑',
    hospital: '🏥',
    police: '👮',
    fire: '🚒',
    blood: '🩸',
    women: '👩',
    disaster: '☎️',
    helpline: '📞',
};

const categoryNames = {
    ambulance: 'Ambulance Service',
    hospital: 'Hospital',
    police: 'Police Station',
    fire: 'Fire Brigade',
    blood: 'Blood Bank',
    women: 'Women Helpline',
    disaster: 'Disaster Helpline',
    helpline: 'National Helpline'
};

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
  
  const categoryId = contact.categoryId || 'helpline';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address || contact.name)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.address || contact.name)}`;


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
      <div className="emergency-card bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl transition-transform hover:translate-y-[-3px] hover:shadow-2xl">
          <div className="card-header flex items-center gap-4 mb-4">
              <div className="card-icon text-5xl flex-shrink-0">
                  {categoryIcons[categoryId as keyof typeof categoryIcons] || '📋'}
              </div>
              <div className="card-title-group flex-1">
                  <div className="card-category text-xs text-gray-500 uppercase font-bold tracking-wide">
                      {categoryNames[categoryId as keyof typeof categoryNames] || categoryId}
                  </div>
                  <div className="card-name text-xl text-gray-800 dark:text-gray-200 font-bold">
                    {contact.name_ne}
                  </div>
                  <p className="text-sm text-gray-500">{contact.name}</p>
              </div>
               <Button variant="ghost" size="icon" onClick={handleFavoriteClick} className="h-10 w-10 flex-shrink-0 rounded-full">
                  <Star className={cn("h-6 w-6", favorite ? "text-yellow-400 fill-yellow-400" : "text-gray-400")} />
                  <span className="sr-only">Favorite</span>
              </Button>
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
             {contact.bloodTypes && contact.bloodTypes.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                    {contact.bloodTypes.map(bt => (
                        <span key={bt} className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">{bt}</span>
                    ))}
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
          <div className="mt-4 flex justify-between items-center">
             <div className="flex gap-2">
                {contact.whatsapp && (
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-full text-green-500 hover:bg-green-100 dark:hover:bg-green-900/50">
                        <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon className="h-6 w-6" />
                        </a>
                    </Button>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                </Button>
             </div>
             <Button variant="link" size="sm" className="text-xs text-gray-500 hover:text-destructive" onClick={() => setReportDialogOpen(true)}>
                <Flag className="mr-1 h-3 w-3" />
                Report Issue
            </Button>
          </div>
      </div>
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
