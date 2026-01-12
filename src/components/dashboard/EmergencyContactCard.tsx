
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Share2, Flag, MapPin, Star, Navigation } from "lucide-react";
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

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.607-1.476l-6.239 1.634zm6.837-2.922l.432.258c1.659 1.001 3.615 1.523 5.679 1.523 5.46 0 9.908-4.448 9.908-9.908s-4.448-9.908-9.908-9.908-9.908 4.448-9.908 9.908c0 2.021.61 3.965 1.701 5.616l.287.469-1.125 4.088 4.16-1.096z" />
    </svg>
)

export default function EmergencyContactCard({ contact }: EmergencyContactCardProps) {
  const { toast } = useToast();
  const [isReportDialogOpen, setReportDialogOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const favorite = isFavorite(contact.id);
  const categoryId = contact.categoryId || 'helpline';
  const directionsUrl = contact.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address || `${contact.name}, ${contact.address}`)}`;

  const handleShare = async () => {
    const shareData = {
      title: "Emergency Seva Contact",
      text: `Emergency Contact:\n${contact.name_ne} (${contact.name})\nPhone: ${contact.phone}${contact.address ? `\nAddress: ${contact.address}` : ''}`,
      url: window.location.href,
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
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-start gap-4">
            <div className="text-3xl mt-1 select-none">
                {categoryIcons[categoryId as keyof typeof categoryIcons] || '📋'}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base leading-tight">{contact.name_ne}</h3>
              <p className="text-sm text-muted-foreground -mt-0.5">{contact.name}</p>
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
               {contact.bloodTypes && contact.bloodTypes.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                    {contact.bloodTypes.map(bt => (
                        <span key={bt} className="inline-block bg-primary/20 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">{bt}</span>
                    ))}
                </div>
            )}
            </div>
             <Button variant="ghost" size="icon" className="-mr-2 -mt-2 h-8 w-8" onClick={handleFavoriteClick}>
                <Star className={cn("h-5 w-5", favorite ? "text-yellow-400 fill-yellow-400" : "text-gray-400")} />
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-1">
                <Button asChild variant="accent" size="icon" className="h-9 w-9">
                    <a href={`tel:${contact.phone}`}>
                        <Phone />
                        <span className="sr-only">Call</span>
                    </a>
                </Button>
                <Button asChild variant="secondary" size="icon" className="h-9 w-9">
                    <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                        <Navigation />
                        <span className="sr-only">Directions</span>
                    </a>
                </Button>
                 {contact.whatsapp && (
                    <Button asChild variant="ghost" size="icon" className="h-9 w-9 text-green-500 hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900/50">
                        <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon className="h-5 w-5" />
                        </a>
                    </Button>
                )}
                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                    <span className="sr-only">Share</span>
                </Button>
            </div>
            
             <Button variant="link" size="sm" className="text-xs text-muted-foreground hover:text-destructive pr-0" onClick={() => setReportDialogOpen(true)}>
                <Flag className="mr-1 h-3 w-3" />
                Report
            </Button>
          </div>
        </CardContent>
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
