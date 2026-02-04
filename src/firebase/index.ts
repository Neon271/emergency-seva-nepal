'use client';

// This is the barrel file for all Firebase-related functionality.
// It re-exports modules for easy importing throughout the app.

export * from './config';
export * from './provider';
export * from './client-provider';
export * from './auth/use-user';

// Placeholder exports for firestore hooks that will be added later
export const useCollection = () => {
    console.warn('useCollection hook not implemented');
    return { data: null, isLoading: true };
};
export const useDoc = () => {
    console.warn('useDoc hook not implemented');
    return { data: null, isLoading: true };
};

// Placeholder for initializeFirebase if needed, though client-provider handles it.
export const initializeFirebase = () => {
    console.warn('Firebase is initialized in FirebaseClientProvider');
};
