
"use client";

import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { ChevronRight, BookOpen, Info, History, User, Shield } from 'lucide-react';

export default function MoreMenu() {
    const menuItems = [
         {
            href: "/profile",
            icon: User,
            title: "My Profile",
            description: "View and edit your personal information."
        },
        {
            href: "/guide",
            icon: BookOpen,
            title: "Emergency Guide",
            description: "Learn what to do in different emergencies."
        },
        {
            href: "/history",
            icon: History,
            title: "Interaction History",
            description: "View your past calls and service requests."
        },
        {
            href: "/about",
            icon: Info,
            title: "About Emergency Seva",
            description: "Our mission, features, and limitations."
        },
        {
            href: "/admin",
            icon: Shield,
            title: "Admin Panel",
            description: "Send push notifications to users."
        }
    ]
  return (
    <div className="space-y-4">
        {menuItems.map((item) => (
            <Link href={item.href} key={item.title} className="block">
                 <Card className="hover:bg-muted/50 transition-colors">
                    <div className="p-4 flex items-center gap-4">
                        <item.icon className="h-8 w-8 text-accent flex-shrink-0" />
                        <div className="flex-1">
                            <h3 className="font-bold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                 </Card>
            </Link>
        ))}
    </div>
  );
}
