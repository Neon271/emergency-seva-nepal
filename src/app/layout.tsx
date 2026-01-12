import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LocationProvider } from '@/contexts/LocationContext';
import { PT_Sans } from 'next/font/google';
import AppLayout from '@/components/layout/AppLayout';

const ptSans = PT_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '700'],
});


export const metadata: Metadata = {
  title: 'Emergency Seva',
  description: 'Find nearby hospitals, clinics, and emergency services in Nepal',
  manifest: '/manifest.json',
  themeColor: '#F77F00',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Emergency Seva',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${ptSans.variable}`}>
      <head>
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LocationProvider>
            <AppLayout>
              {children}
            </AppLayout>
            <Toaster />
          </LocationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
