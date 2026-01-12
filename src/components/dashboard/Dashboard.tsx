
"use client";

import { useLocation } from '@/hooks/use-location-context';
import { Skeleton } from '@/components/ui/skeleton';
import EmergencyContactsDisplay from '@/components/dashboard/EmergencyContactsDisplay';
import EmergencyGuide from '@/components/guide/EmergencyGuide';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, BookOpen, Star, UserSquare, Plus } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import EmergencyContactCard from './EmergencyContactCard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useCustomContacts } from '@/hooks/use-custom-contacts';
import CustomContactCard from './CustomContactCard';
import { Button } from '../ui/button';
import EmergencySms from '../sms/EmergencySms';
import { CardDescription } from '../ui/card';
import AddContactDialog from './AddContactDialog';

export default function Dashboard() {
  const { location, isInitialLoad, isLocationSet, selectedDistrict, selectedProvince } = useLocation();
  const [activeTab, setActiveTab] = useState('contacts');
  const [isAddContactOpen, setAddContactOpen] = useState(false);
  
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
        <>
            <div className="w-full max-w-5xl mx-auto pb-24">
                <Card className="mb-6 bg-card/70">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Find Nearby Services</CardTitle>
                        <CardDescription>
                            Showing services for {selectedDistrict?.name_ne} ({selectedDistrict?.name}), {selectedProvince?.name_ne} ({selectedProvince?.name})
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <Button onClick={() => findNearby('hospitals')} size="lg" className="font-semibold">
                        🏥 Find Nearby Hospitals
                        </Button>
                        <Button onClick={() => findNearby('pharmacy')} size="lg" className="font-semibold">
                        💊 Find Nearby Pharmacy
                        </Button>
                    </CardContent>
                </Card>

                <EmergencySms />

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
                    <TabsContent value="contacts">
                        <EmergencyContactsDisplay districtId={location.districtId} />
                    </TabsContent>
                    <TabsContent value="guide">
                        <EmergencyGuide />
                    </TabsContent>
                    <TabsContent value="favorites">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-xl font-bold">
                                    <Star className="text-accent" />
                                    Favorite Contacts
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                            {isLoadingFavorites ? <Skeleton className="h-48 w-full" /> : favoriteContacts.length > 0 ? (
                                <div className="grid gap-4 sm:grid-cols-2">
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
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-xl font-bold">
                                    <UserSquare className="text-accent" />
                                    My Custom Contacts
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                            {isLoadingCustomContacts ? <Skeleton className="h-48 w-full" /> : customContacts.length > 0 ? (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {customContacts.map((contact) => (
                                    <CustomContactCard key={contact.id} contact={contact} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
                                    <h3 className="text-lg font-semibold">No Custom Contacts Yet</h3>
                                    <p className="mt-1 text-sm text-muted-foreground mb-4">Save your personal emergency numbers for quick access.</p>
                                    <Button onClick={() => setAddContactOpen(true)}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add a Contact
                                    </Button>
                                </div>
                            )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur-sm">
                        <div className="container px-0">
                            <TabsList className="grid h-auto w-full grid-cols-4 p-1 rounded-none">
                                <TabsTrigger value="contacts" className="flex-col gap-1 h-14">
                                    <Phone className="h-5 w-5"/>
                                    <span className="text-xs">Home</span>
                                </TabsTrigger>
                                <TabsTrigger value="favorites" className="flex-col gap-1 h-14">
                                    <Star className="h-5 w-5"/>
                                    <span className="text-xs">Favorites</span>
                                </TabsTrigger>
                                <TabsTrigger value="custom" className="flex-col gap-1 h-14">
                                    <UserSquare className="h-5 w-5"/>
                                    <span className="text-xs">My Contacts</span>
                                </TabsTrigger>
                                <TabsTrigger value="guide" className="flex-col gap-1 h-14">
                                    <BookOpen className="h-5 w-5"/>
                                    <span className="text-xs">Guide</span>
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </div>
                </Tabs>
            </div>
            <AddContactDialog 
                isOpen={isAddContactOpen}
                onOpenChange={setAddContactOpen}
            />
        </>
    );
  };

  return renderContent();
}
