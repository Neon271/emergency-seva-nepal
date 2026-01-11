"use client";

import Link from 'next/link';
import { useLocation } from '@/hooks/use-location-context';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import AddContactDialog from '../dashboard/AddContactDialog';
import { useState } from 'react';
import LocationSelector from '../location/LocationSelector';
import { ThemeToggle } from '../ThemeToggle';

const Header = () => {
  const { setShowSelector, selectedDistrict, isLocationSet } = useLocation();
  const [isAddContactOpen, setAddContactOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 shadow-md backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto flex h-auto max-w-5xl flex-col items-center justify-between gap-2 p-4 sm:h-20 sm:flex-row sm:gap-0">
          <div className="mr-4 flex items-center gap-3">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-3xl">⛑️</span>
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Emergency Seva
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
              <Button
                variant="destructive"
                className="rounded-full font-bold shadow-lg transition-transform hover:scale-105"
                onClick={() => setAddContactOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Contact
              </Button>
            {isLocationSet && (
              <Button
                variant="outline"
                className="rounded-full border-2 bg-gray-100 font-semibold text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => setShowSelector(true)}
              >
                📍 {selectedDistrict?.name_ne} ({selectedDistrict?.name})
              </Button>
            )}
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
