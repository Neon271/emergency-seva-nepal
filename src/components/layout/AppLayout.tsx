"use client";

import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from './BottomNav';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { useToast } from '@/hooks/use-toast';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();

    useEffect(() => {
        if (Capacitor.isNativePlatform()) {
            const registerNotifications = async () => {
                let permStatus = await PushNotifications.checkPermissions();

                if (permStatus.receive === 'prompt') {
                    permStatus = await PushNotifications.requestPermissions();
                }

                if (permStatus.receive !== 'granted') {
                    console.log('User denied permissions!');
                    return;
                }
                await PushNotifications.register();
            };

            registerNotifications();

            PushNotifications.addListener('registration', (token: Token) => {
                console.info('Push registration success, token: ' + token.value);
                // In a real app, you would send this token to your backend server
            });

            PushNotifications.addListener('registrationError', (error: any) => {
                console.error('Error on push registration: ' + JSON.stringify(error));
            });

            PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
                console.log('Push received: ', notification);
                toast({
                    title: notification.title || "New Notification",
                    description: notification.body,
                });
            });

            PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
                console.log('Push action performed: ' + JSON.stringify(notification));
                // Here you could navigate to a specific page based on the notification data
            });
        }
    }, [toast]);

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
