
"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLocation } from '@/hooks/use-location-context';
import LocationSelector from '@/components/location/LocationSelector';
import { Skeleton } from '@/components/ui/skeleton';
import EmergencyContactsDisplay from '@/components/dashboard/EmergencyContactsDisplay';
import EmergencyGuide from '@/components/guide/EmergencyGuide';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, BookOpen } from 'lucide-react';
import EmergencySms from '@/components/sms/EmergencySms';

export default function Dashboard() {
  const { location, isInitialLoad, isLocationSet, showSelector, setShowSelector } = useLocation();
  const [activeTab, setActiveTab] = useState('contacts');

  const renderContent = () => {
    if (isInitialLoad || !isLocationSet) {
      return (
        <div className="space-y-8">
          <Skeleton className="h-10 w-1/3" />
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      );
    }
    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className='flex justify-center'>
                <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
                    <TabsTrigger value="contacts" className="flex gap-2 text-md">
                        <Phone className="h-5 w-5" />
                        <span>Emergency Contacts</span>
                    </TabsTrigger>
                    <TabsTrigger value="guide" className="flex gap-2 text-md">
                        <BookOpen className="h-5 w-5" />
                        <span>Emergency Guide</span>
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="contacts" className="mt-6">
                <EmergencyContactsDisplay districtId={location.districtId} />
            </TabsContent>
            <TabsContent value="guide" className="mt-6">
                <EmergencyGuide />
            </TabsContent>
      </Tabs>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="mb-8">
                <EmergencySms />
            </div>
          {renderContent()}
        </div>
      </main>
      <LocationSelector isOpen={showSelector} onOpenChange={setShowSelector} />
      <Footer />
    </div>
  );
}
