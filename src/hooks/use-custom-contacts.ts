
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { CustomContact } from '@/lib/types';

const CUSTOM_CONTACTS_STORAGE_KEY = 'emergency-seva-custom-contacts';

export function useCustomContacts() {
  const [customContacts, setCustomContacts] = useState<CustomContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedContacts = localStorage.getItem(CUSTOM_CONTACTS_STORAGE_KEY);
      if (storedContacts) {
        setCustomContacts(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.error("Failed to load custom contacts from localStorage", error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  const saveContacts = useCallback((contacts: CustomContact[]) => {
    try {
      localStorage.setItem(CUSTOM_CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
      setCustomContacts(contacts);
    } catch (error) {
      console.error("Failed to save custom contacts to localStorage", error);
    }
  }, []);

  const addContact = useCallback((contact: Omit<CustomContact, 'id'>) => {
    const newContact = { ...contact, id: `custom-${Date.now()}` };
    const updatedContacts = [...customContacts, newContact];
    saveContacts(updatedContacts);
    return newContact;
  }, [customContacts, saveContacts]);

  const deleteContact = useCallback((contactId: string) => {
    const updatedContacts = customContacts.filter(c => c.id !== contactId);
    saveContacts(updatedContacts);
  }, [customContacts, saveContacts]);

  return { customContacts, addContact, deleteContact, isLoading };
}
