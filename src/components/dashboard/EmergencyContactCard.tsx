
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Share2, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { EmergencyContact } from "@/lib/types";
import ReportDialog from "../feedback/ReportDialog";

interface EmergencyContactCardProps {
  contact: EmergencyContact;
}

export default function EmergencyContactCard({ contact }: EmergencyContactCardProps) {
  const { toast } = useToast();
  const [isReportDialogOpen, setReportDialogOpen] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Emergency Seva Contact",
      text: `Emergency Contact:\n${contact.name_ne} (${contact.name})\nPhone: ${contact.phone}`,
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

  return (
    <>
      <Card className="bg-card/80">
        <CardContent className="p-4">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <h3 className="text-lg font-bold font-headline">{contact.name_ne}</h3>
              <p className="text-sm text-muted-foreground">{contact.name}</p>
              <p className="mt-1 text-2xl font-bold font-mono tracking-wider text-primary">
                {contact.phone}
              </p>
            </div>
            <div className="flex w-full flex-shrink-0 gap-2 sm:w-auto">
              <Button asChild size="lg" className="flex-1 sm:flex-initial">
                <a href={`tel:${contact.phone}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call
                </a>
              </Button>
              <Button variant="outline" size="lg" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>
          <div className="mt-2 text-right">
             <Button
                variant="link"
                size="sm"
                className="h-auto p-1 text-xs text-muted-foreground"
                onClick={() => setReportDialogOpen(true)}
              >
                <Flag className="mr-1 h-3 w-3" />
                Report incorrect number
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
