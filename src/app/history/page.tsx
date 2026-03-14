"use client";

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Ambulance,
  Flame,
  HeartHandshake,
  Phone,
  ListFilter,
  History,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from 'date-fns';

type HistoryCategory = 'police' | 'ambulance' | 'fire' | 'blood' | 'other';
type HistoryStatus = 'Dialed' | 'Requested' | 'Completed' | 'Failed';

interface HistoryItem {
  id: number;
  type: HistoryCategory;
  name: string;
  timestamp: Date;
  status: HistoryStatus;
}

const categoryDetails: Record<HistoryCategory, { icon: React.ElementType; color: string }> = {
  police: { icon: Shield, color: 'text-blue-500' },
  ambulance: { icon: Ambulance, color: 'text-red-500' },
  fire: { icon: Flame, color: 'text-orange-500' },
  blood: { icon: HeartHandshake, color: 'text-pink-500' },
  other: { icon: Phone, color: 'text-gray-500' },
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filter, setFilter] = useState<HistoryCategory | 'all'>('all');

  useEffect(() => {
    // Generate mock data on the client side to avoid hydration errors
    const mockHistory: HistoryItem[] = [
      { id: 1, type: 'police', name: 'Police Control (100)', timestamp: new Date(Date.now() - 3600000), status: 'Dialed' },
      { id: 2, type: 'ambulance', name: 'Nepal Ambulance Service (102)', timestamp: new Date(Date.now() - 86400000), status: 'Dialed' },
      { id: 3, type: 'blood', name: 'Blood Bank Request', timestamp: new Date(Date.now() - 172800000), status: 'Requested' },
      { id: 4, type: 'fire', name: 'Fire Brigade (101)', timestamp: new Date(Date.now() - 259200000), status: 'Dialed' },
      { id: 5, type: 'other', name: 'Dr. Ramesh (Custom Contact)', timestamp: new Date(Date.now() - 604800000), status: 'Dialed' },
      { id: 6, type: 'police', name: 'Tourist Police (1144)', timestamp: new Date(Date.now() - 1209600000), status: 'Dialed' },
    ];
    setHistory(mockHistory);
  }, []);

  const filteredHistory = useMemo(() => {
    if (filter === 'all') return history;
    return history.filter((item) => item.type === filter);
  }, [filter, history]);

  const FilterIcon = ListFilter;

  return (
    <main className="container p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <History className="text-accent" />
            Interaction History
          </CardTitle>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Service</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={filter} onValueChange={(value) => setFilter(value as any)}>
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="police">Police</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="ambulance">Ambulance</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="fire">Fire</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="blood">Blood</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="other">Other</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          {filteredHistory.length > 0 ? (
            <div className="space-y-4">
              {filteredHistory.map((item) => {
                const { icon: Icon, color } = categoryDetails[item.type];
                return (
                  <div key={item.id} className="flex items-center gap-4 rounded-lg border p-4">
                    <Icon className={`h-6 w-6 flex-shrink-0 ${color}`} />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(item.timestamp, "PPP, p")}
                      </p>
                    </div>
                    <Badge variant={item.status === 'Failed' ? 'destructive' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
              <h3 className="text-lg font-semibold">No History Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your recent interactions will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
