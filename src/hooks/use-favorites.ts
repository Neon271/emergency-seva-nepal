
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { EmergencyContact } from '@/lib/types';
import { getAllContacts } from '@/lib/emergency-services';

const FAVORITES_STORAGE_KEY = 'emergency-seva-favorites';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [favoriteContacts, setFavoriteContacts] = useState<EmergencyContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allContactsMap, setAllContactsMap] = useState<Map<string, EmergencyContact>>(new Map());

  // Load all contacts into memory once
  useEffect(() => {
    setAllContactsMap(getAllContacts());
  }, []);

  // Load favorite IDs from localStorage on initial render
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        setFavoriteIds(new Set(JSON.parse(storedFavorites)));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  // Function to save favorite IDs to localStorage
  const saveFavorites = useCallback((ids: Set<string>) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(ids)));
      setFavoriteIds(ids);
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  }, []);

  // Re-populate favorite contacts when favorite IDs or all contacts change
  useEffect(() => {
    if (isLoading || allContactsMap.size === 0) return;

    const contacts = Array.from(favoriteIds)
      .map(id => allContactsMap.get(id))
      .filter((c): c is EmergencyContact => !!c);
      
    setFavoriteContacts(contacts);
  }, [favoriteIds, isLoading, allContactsMap]);
  
  // Toggle a contact's favorite status
  const toggleFavorite = useCallback((contact: EmergencyContact) => {
    const newFavoriteIds = new Set(favoriteIds);
    if (newFavoriteIds.has(contact.id)) {
      newFavoriteIds.delete(contact.id);
    } else {
      newFavoriteIds.add(contact.id);
    }
    saveFavorites(newFavoriteIds);
  }, [favoriteIds, saveFavorites]);

  const isFavorite = useCallback((contactId: string) => {
    return favoriteIds.has(contactId);
  }, [favoriteIds]);

  return { favoriteContacts, toggleFavorite, isFavorite, isLoading };
}
