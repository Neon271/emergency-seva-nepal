
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ProfileProvider } from '@/contexts/ProfileContext';
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
  applicationName: 'Emergency Seva',
};

export const viewport: Viewport = {
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
          <ProfileProvider>
            <AppLayout>
              {children}
            </AppLayout>
            <Toaster />
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
