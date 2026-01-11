
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
import { Phone, BookOpen, Star, UserSquare } from 'lucide-react';
import EmergencySms from '@/components/sms/EmergencySms';
import { useFavorites } from '@/hooks/use-favorites';
import EmergencyContactCard from './EmergencyContactCard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useCustomContacts } from '@/hooks/use-custom-contacts';
import CustomContactCard from './CustomContactCard';

export default function Dashboard() {
  const { location, isInitialLoad, isLocationSet, showSelector, setShowSelector } = useLocation();
  const [activeTab, setActiveTab] = useState('contacts');
  
  const { favoriteContacts, isLoading: isLoadingFavorites } = useFavorites();
  const { customContacts, isLoading: isLoadingCustomContacts } = useCustomContacts();


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
            <div className='sticky top-14 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 -mt-4'>
                <div className='flex justify-center'>
                    <TabsList className="grid w-full max-w-lg grid-cols-4 h-12">
                        <TabsTrigger value="contacts" className="flex gap-2 text-md">
                            <Phone className="h-5 w-5" />
                            <span>Home</span>
                        </TabsTrigger>
                        <TabsTrigger value="favorites" className="flex gap-2 text-md">
                            <Star className="h-5 w-5" />
                            <span>Favorites</span>
                        </TabsTrigger>
                         <TabsTrigger value="custom" className="flex gap-2 text-md">
                            <UserSquare className="h-5 w-5" />
                            <span>My Contacts</span>
                        </TabsTrigger>
                        <TabsTrigger value="guide" className="flex gap-2 text-md">
                            <BookOpen className="h-5 w-5" />
                            <span>Guide</span>
                        </TabsTrigger>
                    </TabsList>
                </div>
            </div>

            <TabsContent value="contacts" className="mt-6">
                <EmergencyContactsDisplay districtId={location.districtId} />
            </TabsContent>
            <TabsContent value="guide" className="mt-6">
                <EmergencyGuide />
            </TabsContent>
             <TabsContent value="favorites" className="mt-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Star className="h-7 w-7 text-primary" />
                            Favorite Contacts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                    {isLoadingFavorites ? <Skeleton className="h-48 w-full" /> : favoriteContacts.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {favoriteContacts.map((contact) => (
                            <EmergencyContactCard key={contact.id} contact={contact} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
                            <h3 className="text-lg font-semibold">No Favorites Yet</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Click the star icon on any contact to add it to your favorites.</p>
                        </div>
                    )}
                    </CardContent>
                </Card>
            </TabsContent>
             <TabsContent value="custom" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <UserSquare className="h-7 w-7 text-primary" />
                            My Custom Contacts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                    {isLoadingCustomContacts ? <Skeleton className="h-48 w-full" /> : customContacts.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {customContacts.map((contact) => (
                            <CustomContactCard key={contact.id} contact={contact} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
                            <h3 className="text-lg font-semibold">No Custom Contacts Yet</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Click "Add a Contact" to save your personal emergency numbers.</p>
                        </div>
                    )}
                    </CardContent>
                </Card>
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
