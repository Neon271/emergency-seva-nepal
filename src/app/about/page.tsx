
import { LifeBuoy, Target, Users, Star, Map, Globe, WifiOff, Bell, AlertTriangle, Database, Mail, Code } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <header className="text-center mb-10">
        <h1 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight">
          About Emergency Seva
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your reliable guide in times of need.
        </p>
      </header>

      <div className="space-y-8">
        
        {/* What is Emergency Seva */}
        <div className="p-6 rounded-lg bg-card border">
            <h2 className="font-semibold text-xl flex items-center gap-3 mb-3 text-primary">
                <LifeBuoy className="h-6 w-6" />
                What is Emergency Seva?
            </h2>
            <p className="text-muted-foreground">
                Emergency Seva is a mobile-friendly web app designed to provide quick and easy access to a list of important emergency service numbers across Nepal. It helps you find contact information for hospitals, police, ambulances, and more, right when you need it most.
            </p>
        </div>

        {/* Our Mission */}
        <div className="p-6 rounded-lg bg-card border">
            <h2 className="font-semibold text-xl flex items-center gap-3 mb-3 text-primary">
                <Target className="h-6 w-6" />
                Our Mission
            </h2>
            <p className="text-muted-foreground">
                Our mission is simple: to provide a reliable, easy-to-use, and accessible tool for the people of Nepal to find emergency contact information quickly. We aim to bridge the information gap during critical moments, potentially saving valuable time when it matters most.
            </p>
        </div>
        
        {/* Features */}
        <div className="p-6 rounded-lg bg-card border">
            <h2 className="font-semibold text-xl flex items-center gap-3 mb-3 text-primary">
                <Star className="h-6 w-6" />
                Main Features
            </h2>
            <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3"><Globe className="h-5 w-5 mt-1 text-accent flex-shrink-0" /><span><strong>Emergency Contacts:</strong> Find numbers for police, hospitals, ambulances, and more.</span></li>
                <li className="flex items-start gap-3"><Map className="h-5 w-5 mt-1 text-accent flex-shrink-0" /><span><strong>Province & District Support:</strong> Filter contacts based on your location within Nepal.</span></li>
                <li className="flex items-start gap-3"><WifiOff className="h-5 w-5 mt-1 text-accent flex-shrink-0" /><span><strong>Offline Access:</strong> The app works even without an internet connection once loaded.</span></li>
                <li className="flex items-start gap-3"><Bell className="h-5 w-5 mt-1 text-accent flex-shrink-0" /><span><strong>Notifications:</strong> Capable of receiving important public safety alerts (admin-controlled).</span></li>
            </ul>
        </div>

        <Accordion type="single" collapsible className="w-full">
            {/* Limitations */}
            <AccordionItem value="limitations">
                <AccordionTrigger className="text-lg font-semibold flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-destructive" /> Important Limitations
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pl-2 pt-2">
                    <p className="mb-4">Please read this carefully. Your safety is our priority.</p>
                     <ul className="list-disc space-y-2 pl-5">
                        <li>This app is an information directory, **not a hospital or a direct emergency service provider.**</li>
                        <li>In a life-threatening emergency, **always call 100, 101, or 102 first.**</li>
                        <li>Contact numbers can change. While we try our best to keep them updated, we cannot guarantee every number is current.</li>
                        <li>This app is not an official government service. It is a personal project to help the community.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>

             {/* Data Collection */}
            <AccordionItem value="data">
                <AccordionTrigger className="text-lg font-semibold flex items-center gap-3">
                    <Database className="h-6 w-6 text-primary" /> How Data is Collected
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pl-2 pt-2">
                    <p>
                        The contact information in this app is collected from various publicly available, open-source directories and government websites. We make a best effort to verify and periodically update this data. However, numbers and details can change. If you find any incorrect information, please use the "Report" feature on the contact card or email us.
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        
        {/* Developer & Contact */}
         <div className="text-center text-muted-foreground space-y-4 pt-8">
            <div className="flex items-center justify-center gap-2">
                <Code className="h-5 w-5" />
                <p>Developed by <strong>Prajwol</strong> from Nepal.</p>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5" />
                <p>For feedback or questions, please reach out via email.</p>
            </div>
        </div>

      </div>

      <footer className="text-center mt-12">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Emergency Seva – Prajwol</p>
      </footer>
    </div>
  );
}
