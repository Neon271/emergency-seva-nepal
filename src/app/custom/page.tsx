
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CustomContactCard from "@/components/dashboard/CustomContactCard";
import { useCustomContacts } from "@/hooks/use-custom-contacts";
import { Plus, UserSquare } from "lucide-react";
import { Button } from '@/components/ui/button';
import AddContactDialog from '@/components/dashboard/AddContactDialog';

export default function CustomContactsPage() {
    const [isAddContactOpen, setAddContactOpen] = useState(false);
    const { customContacts, isLoading: isLoadingCustomContacts } = useCustomContacts();

    return (
         <main className="container p-4 sm:p-6 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                        <UserSquare className="text-accent" />
                        My Custom Contacts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                {isLoadingCustomContacts ? <Skeleton className="h-48 w-full" /> : customContacts.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
             <AddContactDialog 
                isOpen={isAddContactOpen}
                onOpenChange={setAddContactOpen}
            />
        </main>
    )
}
