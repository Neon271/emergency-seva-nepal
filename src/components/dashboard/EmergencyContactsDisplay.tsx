"use client";

import { useEffect, useState, useMemo } from "react";
import { getEmergencyServicesByDistrict, allBloodTypes } from "@/lib/emergency-services";
import { districts } from "@/lib/locations";
import type { EmergencyServiceCategory } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ComingSoon } from "../shared/ComingSoon";
import { useLocation } from "@/hooks/use-location-context";
import { Input } from "../ui/input";
import EmergencyContactCard from "./EmergencyContactCard";

interface EmergencyContactsDisplayProps {
  districtId: string;
}

export default function EmergencyContactsDisplay({ districtId }: EmergencyContactsDisplayProps) {
  const { selectedDistrict } = useLocation();
  const [services, setServices] = useState<EmergencyServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const districtInfo = districts.find(d => d.id === districtId);

  useEffect(() => {
    setIsLoading(true);
    const fetchedServices = getEmergencyServicesByDistrict(districtId);
    setServices(fetchedServices);
    setIsLoading(false);
  }, [districtId]);

  const allContacts = useMemo(() => {
    return services.flatMap(service => 
      service.contacts.map(contact => ({ ...contact, categoryId: service.id, categoryName: service.name, categoryNameNe: service.name_ne }))
    );
  }, [services]);

  const filteredContacts = useMemo(() => {
    return allContacts.filter(contact => {
      const matchesCategory = activeCategory === 'all' || contact.categoryId === activeCategory;
      const matchesSearch = searchTerm === "" || 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.name_ne.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allContacts, activeCategory, searchTerm]);

  const serviceCategories = useMemo(() => {
    const categories = services.map(s => ({id: s.id, name: s.name, name_ne: s.name_ne, icon: s.icon, contactsCount: s.contacts.length}));
    return categories;
  }, [services]);

  const renderSkeleton = () => (
     <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
  );
  
  if (isLoading) {
    return renderSkeleton();
  }

  if (!districtInfo || !districtInfo.isSupported) {
    return <ComingSoon districtName={districtInfo?.name_ne || 'this area'} />;
  }

  const categoryIcons = {
    all: 'All Services',
    ambulance: '🚑 Ambulance',
    hospital: '🏥 Hospital',
    police: '👮 Police',
    fire: '🚒 Fire',
    blood: '🩸 Blood Bank',
    women: '👩 Women Helpline',
    disaster: '☎️ Disaster',
  };

  return (
    <>
      <div className="mb-4 rounded-2xl bg-white p-4 shadow-xl">
        <Input 
          type="text"
          placeholder="Search for hospitals, police, ambulance..."
          className="w-full rounded-lg border-2 p-3 h-auto text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-6 rounded-2xl bg-white p-4 shadow-xl overflow-x-auto">
        <div className="flex space-x-2">
            <button 
                onClick={() => setActiveCategory('all')}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${activeCategory === 'all' ? 'bg-destructive text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
                All Services
            </button>
          {serviceCategories.filter(c => c.contactsCount > 0).map(cat => (
             <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors whitespace-nowrap ${activeCategory === cat.id ? 'bg-destructive text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
             >
                {categoryIcons[cat.id as keyof typeof categoryIcons] || cat.name}
            </button>
          ))}
        </div>
      </div>
      
      {filteredContacts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredContacts.map((contact) => (
            <EmergencyContactCard key={contact.id} contact={contact} />
            ))}
        </div>
      ) : (
        <div className="mt-8 text-center text-gray-500 bg-white p-10 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold">No Results Found</h3>
            <p>Try adjusting your search or filter.</p>
        </div>
      )}
    </>
  );
}
