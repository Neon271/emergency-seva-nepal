import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LocationProvider } from '@/contexts/LocationContext';
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const manrope_bold = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
  weight: '800',
});

export const metadata: Metadata = {
  title: 'Emergency Seva',
  description: 'Fast access to emergency services in Nepal',
  manifest: '/manifest.json',
  themeColor: '#d9274b',
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
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${manrope_bold.variable}`}>
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
            {children}
            <Toaster />
          </LocationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
