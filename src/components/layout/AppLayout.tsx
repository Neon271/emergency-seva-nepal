
"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from './BottomNav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full pb-24 md:pb-0">
                {children}
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}
