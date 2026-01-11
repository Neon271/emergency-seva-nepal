"use client";

import Link from 'next/link';
import { useLocation } from '@/hooks/use-location-context';
import { Button } from '../ui/button';
import { Plus, HeartHandshake } from 'lucide-react';
import AddContactDialog from '../dashboard/AddContactDialog';
import { useState } from 'react';
import LocationSelector from '../location/LocationSelector';
import { ThemeToggle } from '../ThemeToggle';

const Header = () => {
  const { setShowSelector, selectedDistrict, isLocationSet, selectedProvince } = useLocation();
  const [isAddContactOpen, setAddContactOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <HeartHandshake className="h-6 w-6 text-accent" />
              <span className="font-bold">
                Emergency Seva
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            {isLocationSet && (
              <Button
                variant="outline"
                className="hidden sm:inline-flex"
                onClick={() => setShowSelector(true)}
              >
                📍 {selectedDistrict?.name_ne}
              </Button>
            )}
            <Button
                variant="accent"
                size="sm"
                onClick={() => setAddContactOpen(true)}
              >
                <Plus className="mr-1 h-4 w-4" /> Add Contact
              </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
       <AddContactDialog 
        isOpen={isAddContactOpen}
        onOpenChange={setAddContactOpen}
      />
    </>
  );
};

export default Header;
