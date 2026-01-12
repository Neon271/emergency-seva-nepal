"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Star, UserSquare, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/favorites", label: "Favorites", icon: Star },
    { href: "/custom", label: "My Contacts", icon: UserSquare },
    { href: "/more", label: "More", icon: Menu },
]

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur-sm md:hidden">
            <div className="container px-0">
                <div className="grid h-auto w-full grid-cols-4 p-1 rounded-none">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link href={item.href} key={item.href}>
                                <div className={cn(
                                    "flex flex-col items-center justify-center gap-1 h-14 rounded-md transition-colors",
                                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50"
                                )}>
                                    <item.icon className="h-5 w-5"/>
                                    <span className="text-xs font-medium">{item.label}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
