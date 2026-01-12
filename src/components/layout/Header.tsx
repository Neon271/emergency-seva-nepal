
"use client";

import Link from 'next/link';
import { Button } from '../ui/button';
import { Plus, HeartHandshake, MapPin, Menu, Star, UserSquare, Home, User } from 'lucide-react';
import AddContactDialog from '../dashboard/AddContactDialog';
import { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle';
import { useProfile } from '@/hooks/use-profile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


const Header = () => {
  const { isProfileSet, profile, selectedDistrict } = useProfile();
  const [isAddContactOpen, setAddContactOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

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

          <div className="hidden md:flex flex-1 items-center justify-start space-x-1 ml-6">
            <Button variant="ghost" asChild>
                <Link href="/">
                    <Home className="mr-2 h-4 w-4"/> Home
                </Link>
            </Button>
            <Button variant="ghost" asChild>
                 <Link href="/favorites">
                    <Star className="mr-2 h-4 w-4"/> Favorites
                </Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/custom">
                    <UserSquare className="mr-2 h-4 w-4"/> My Contacts
                </Link>
            </Button>
             <Button variant="ghost" asChild>
                <Link href="/more">
                    <Menu className="mr-2 h-4 w-4"/> More
                </Link>
            </Button>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-2">
             <Button
                variant="accent"
                onClick={() => setAddContactOpen(true)}
                className="hidden sm:inline-flex"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Contact
              </Button>
            <ThemeToggle />

             {isProfileSet && profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={profile.photoUrl} alt={profile.name} />
                            <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{profile.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">{profile.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/profile">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/favorites">
                            <Star className="mr-2 h-4 w-4" />
                            <span>Favorites</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
                <Button asChild variant='outline'>
                    <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Login
                    </Link>
                </Button>
            )}
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
