
"use client";

import Link from 'next/link';
import { ThemeToggle } from '../ThemeToggle';
import { useLocation } from '@/hooks/use-location-context';
import { Button } from '../ui/button';
import { MapPin, Edit } from 'lucide-react';

const Header = () => {
  const { setShowSelector, selectedDistrict, selectedProvince, isLocationSet } = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <SirenIcon className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg sm:inline-block">
              Emergency Seva
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isLocationSet && (
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => setShowSelector(true)}
            >
              <MapPin className="mr-2 h-4 w-4" />
              <div className="text-left">
                <div className="font-semibold">{selectedDistrict?.name_ne}</div>
                <div className="text-xs text-muted-foreground -mt-1">{selectedProvince?.name_ne}</div>
              </div>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSelector(true)}
            aria-label="Change Location"
          >
            <Edit className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

function SirenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.52 5.52a6.5 6.5 0 0 1 9.19 0" />
      <path d="M2 11h20" />
      <path d="M18.37 5.63a9 9 0 0 1-12.73 0" />
      <path d="M12 11v11" />
      <path d="m6 22 1.5-1.5" />
      <path d="M18 22l-1.5-1.5" />
      <path d="M10 17h4" />
    </svg>
  );
}

export default Header;
