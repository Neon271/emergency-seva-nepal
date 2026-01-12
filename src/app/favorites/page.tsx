
"use client";

import { useFavorites } from "@/hooks/use-favorites";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import EmergencyContactCard from "@/components/dashboard/EmergencyContactCard";
import { Star } from "lucide-react";

export default function FavoritesPage() {
    const { favoriteContacts, isLoading: isLoadingFavorites } = useFavorites();
    
    return (
        <main className="container p-4 sm:p-6 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                        <Star className="text-accent" />
                        Favorite Contacts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                {isLoadingFavorites ? <Skeleton className="h-48 w-full" /> : favoriteContacts.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        </main>
    )
}
