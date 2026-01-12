
"use client";

import Link from 'next/link';
import { useLocation } from '@/hooks/use-location-context';
import { Button } from '../ui/button';
import { Plus, HeartHandshake, MapPin } from 'lucide-react';
import AddContactDialog from '../dashboard/AddContactDialog';
import { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle';

const Header = () => {
  const { setShowSelector, selectedDistrict, isLocationSet } = useLocation();
  const [isAddContactOpen, setAddContactOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <HeartHandshake className="h-6 w-6 text-accent" />
              <span className="font-bold sm:inline-block">
                Emergency Seva
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            {isLocationSet && (
              <Button
                variant="outline"
                className="max-w-[150px] truncate sm:max-w-none hidden sm:inline-flex"
                onClick={() => setShowSelector(true)}
              >
                <MapPin className="mr-2 h-4 w-4" />
                <span className="truncate">{selectedDistrict?.name_ne}</span>
              </Button>
            )}
             <Button
              variant="outline"
              size="sm"
              onClick={() => setAddContactOpen(true)}
              className="sm:hidden"
            >
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
            <Button
                variant="accent"
                onClick={() => setAddContactOpen(true)}
                className="hidden sm:inline-flex"
              >
                <Plus className="mr-2 h-4 w-4" /> Add a Contact
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
