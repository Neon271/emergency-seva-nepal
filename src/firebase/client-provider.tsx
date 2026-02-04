'use client';

import React, { useMemo } from 'react';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";
import { firebaseConfig } from './config';
import { FirebaseProvider } from './provider';

interface FirebaseClientProviderProps {
  children: React.ReactNode;
}

// This prevents Firebase from being initialized more than once
const getFirebaseInstances = () => {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    if (typeof window !== 'undefined') {
        isSupported().then(yes => yes ? getAnalytics(app) : null);
    }
    return { app, auth, firestore };
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
    // useMemo ensures this only runs once per client session
    const firebaseContext = useMemo(() => {
        return getFirebaseInstances();
    }, []);

    return (
        <FirebaseProvider value={firebaseContext}>
        {children}
        </FirebaseProvider>
    );
}
