"use client";

import { BellRing, HardHat } from 'lucide-react';

export default function NotificationForm() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center mt-8">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
        <HardHat className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">
        Backend Not Implemented
      </h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        Sending push notifications requires a secure backend component (like a Firebase Cloud Function) to work. This feature is not yet connected.
      </p>
    </div>
  );
}
