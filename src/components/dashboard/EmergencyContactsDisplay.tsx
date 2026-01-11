
"use client";

import { useEffect, useState, useMemo } from "react";
import { getEmergencyServicesByDistrict } from "@/lib/emergency-services";
import { districts } from "@/lib/locations";
import type { EmergencyServiceCategory } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ComingSoon } from "../shared/ComingSoon";
import { useLocation } from "@/hooks/use-location-context";
import { Input } from "../ui/input";
import EmergencyContactCard from "./EmergencyContactCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { allBloodTypes } from "@/lib/emergency-services";

interface EmergencyContactsDisplayProps {
  districtId: string;
}

export default function EmergencyContactsDisplay({ districtId }: EmergencyContactsDisplayProps) {
  const { selectedDistrict } = useLocation();
  const [services, setServices] = useState<EmergencyServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedBloodType, setSelectedBloodType] = useState<string>("all");

  const districtInfo = useMemo(() => districts.find(d => d.id === districtId), [districtId]);

  useEffect(() => {
    setIsLoading(true);
    if (districtId) {
      const fetchedServices = getEmergencyServicesByDistrict(districtId);
      setServices(fetchedServices);
    }
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

      const matchesBloodType = activeCategory !== 'blood' || selectedBloodType === 'all' || (contact.bloodTypes && contact.bloodTypes.includes(selectedBloodType));

      return matchesCategory && matchesSearch && matchesBloodType;
    });
  }, [allContacts, activeCategory, searchTerm, selectedBloodType]);

  const serviceCategories = useMemo(() => {
    const categories = services.map(s => ({id: s.id, name: s.name, name_ne: s.name_ne, contactsCount: s.contacts.length}));
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
  
  if (isLoading || !districtInfo) {
    return renderSkeleton();
  }

  if (!districtInfo.isSupported) {
    return <ComingSoon districtName={districtInfo.name_ne} />;
  }

  const categoryIcons = {
    all: 'All',
    ambulance: '🚑',
    hospital: '🏥',
    police: '👮',
    fire: '🚒',
    blood: '🩸',
    women: '👩',
    disaster: '☎️',
  };

  return (
    <>
      <div className="mb-4 space-y-4">
        <Input 
          type="text"
          placeholder="Search contacts..."
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex space-x-2 overflow-x-auto pb-2">
            <button 
                onClick={() => setActiveCategory('all')}
                className={`flex-shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
                All
            </button>
          {serviceCategories.filter(c => c.contactsCount > 0).map(cat => (
             <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === cat.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
             >
                {categoryIcons[cat.id as keyof typeof categoryIcons] || cat.name} {cat.name_ne}
            </button>
          ))}
        </div>

        {activeCategory === 'blood' && (
          <div>
            <Select onValueChange={setSelectedBloodType} value={selectedBloodType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by blood type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blood Types</SelectItem>
                {allBloodTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      {filteredContacts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredContacts.map((contact) => (
            <EmergencyContactCard key={contact.id} contact={contact} />
            ))}
        </div>
      ) : (
        <div className="mt-8 text-center text-muted-foreground">
            <p>No contacts found for your search/filter.</p>
        </div>
      )}
    </>
  );
}
