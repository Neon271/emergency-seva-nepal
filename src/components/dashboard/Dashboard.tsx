"use client";

import { useLocation } from '@/hooks/use-location-context';
import { Skeleton } from '@/components/ui/skeleton';
import EmergencyContactsDisplay from '@/components/dashboard/EmergencyContactsDisplay';
import EmergencyGuide from '@/components/guide/EmergencyGuide';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, BookOpen, Star, UserSquare, Navigation } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import EmergencyContactCard from './EmergencyContactCard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useCustomContacts } from '@/hooks/use-custom-contacts';
import CustomContactCard from './CustomContactCard';
import { Button } from '../ui/button';

export default function Dashboard() {
  const { location, isInitialLoad, isLocationSet, selectedDistrict, selectedProvince } = useLocation();
  const [activeTab, setActiveTab] = useState('contacts');
  
  const { favoriteContacts, isLoading: isLoadingFavorites } = useFavorites();
  const { customContacts, isLoading: isLoadingCustomContacts } = useCustomContacts();
  
  const findNearby = (service: string) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const url = `https://www.google.com/maps/search/${service}/@${latitude},${longitude},15z`;
                window.open(url, '_blank');
            },
            () => {
                 alert('Could not get your location. Please enable location services.');
                 const url = `https://www.google.com/maps/search/${service}+in+${selectedDistrict?.name}`;
                 window.open(url, '_blank');
            }
        );
    } else {
        const url = `https://www.google.com/maps/search/${service}+in+${selectedDistrict?.name}`;
        window.open(url, '_blank');
    }
  };

  const renderContent = () => {
    if (isInitialLoad || !isLocationSet) {
      return (
        <div className="w-full max-w-5xl space-y-4">
          <Skeleton className="h-40 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      );
    }
    return (
        <div className="w-full max-w-5xl">
            <div className="mb-6 rounded-2xl bg-white p-6 shadow-xl">
                 <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">Emergency Services</h2>
                 <p className="mt-1 text-sm text-gray-600">
                    Showing services for {selectedDistrict?.name_ne}, {selectedProvince?.name_ne}
                 </p>
                 <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <Button onClick={() => findNearby('hospitals')} className="h-auto py-3 text-base font-bold bg-green-600 hover:bg-green-700 shadow-lg transition-transform hover:scale-105">
                       🏥 Find Nearby Hospitals
                    </Button>
                     <Button onClick={() => findNearby('pharmacy')} className="h-auto py-3 text-base font-bold bg-green-600 hover:bg-green-700 shadow-lg transition-transform hover:scale-105">
                       💊 Find Nearby Pharmacy
                    </Button>
                 </div>
            </div>

             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className='flex justify-center mb-6'>
                    <TabsList className="grid h-auto w-full max-w-lg grid-cols-2 sm:grid-cols-4 p-2">
                        <TabsTrigger value="contacts" className="flex gap-2 text-md py-2">
                            <Phone className="h-5 w-5" />
                            <span>Home</span>
                        </TabsTrigger>
                        <TabsTrigger value="favorites" className="flex gap-2 text-md py-2">
                            <Star className="h-5 w-5" />
                            <span>Favorites</span>
                        </TabsTrigger>
                         <TabsTrigger value="custom" className="flex gap-2 text-md py-2">
                            <UserSquare className="h-5 w-5" />
                            <span>My Contacts</span>
                        </TabsTrigger>
                        <TabsTrigger value="guide" className="flex gap-2 text-md py-2">
                            <BookOpen className="h-5 w-5" />
                            <span>Guide</span>
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="contacts">
                    <EmergencyContactsDisplay districtId={location.districtId} />
                </TabsContent>
                <TabsContent value="guide">
                    <EmergencyGuide />
                </TabsContent>
                 <TabsContent value="favorites">
                     <Card className="rounded-2xl shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl">
                                <Star className="h-7 w-7 text-primary" />
                                Favorite Contacts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                        {isLoadingFavorites ? <Skeleton className="h-48 w-full" /> : favoriteContacts.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
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
                 <TabsContent value="custom">
                    <Card className="rounded-2xl shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl">
                                <UserSquare className="h-7 w-7 text-primary" />
                                My Custom Contacts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                        {isLoadingCustomContacts ? <Skeleton className="h-48 w-full" /> : customContacts.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                                {customContacts.map((contact) => (
                                <CustomContactCard key={contact.id} contact={contact} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
                                <h3 className="text-lg font-semibold">No Custom Contacts Yet</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Click "Add a Contact" in the header to save your personal emergency numbers.</p>
                            </div>
                        )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
  };

  return renderContent();
}
