
import { HardHat } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ComingSoonProps {
  districtName: string;
}

export function ComingSoon({ districtName }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
        <HardHat className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-bold font-headline tracking-tight">
        Coming Soon!
      </h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        We are working hard to add emergency services for{" "}
        <span className="font-semibold text-foreground">{districtName}</span>. Please check back later.
      </p>
    </div>
  );
}
