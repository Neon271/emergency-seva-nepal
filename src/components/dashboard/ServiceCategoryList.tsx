"use client";

import type { EmergencyServiceCategory } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCategoryListProps {
  services: EmergencyServiceCategory[];
  onCategoryClick: (category: EmergencyServiceCategory) => void;
}

export default function ServiceCategoryList({ services, onCategoryClick }: ServiceCategoryListProps) {
  const servicesWithContacts = services.filter(s => s.contacts.length > 0);
  const servicesWithoutContacts = services.filter(s => s.contacts.length === 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {servicesWithContacts.map((service) => (
        <CategoryCard key={service.id} service={service} onClick={() => onCategoryClick(service)} />
      ))}
      {servicesWithoutContacts.map((service) => (
        <CategoryCard key={service.id} service={service} onClick={() => onCategoryClick(service)} disabled />
      ))}
    </div>
  );
}

interface CategoryCardProps {
  service: EmergencyServiceCategory;
  onClick: () => void;
  disabled?: boolean;
}

function CategoryCard({ service, onClick, disabled = false }: CategoryCardProps) {
  return (
    <Card
      className={cn(
        "bg-card/80 transition-shadow hover:shadow-lg rounded-xl border-2 text-center",
        disabled ? "opacity-50 cursor-not-allowed bg-muted/30" : "cursor-pointer hover:border-primary",
      )}
      onClick={!disabled ? onClick : undefined}
      aria-disabled={disabled}
    >
      <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
        <service.icon className="h-10 w-10 text-primary mb-1" />
        <h3 className="font-headline text-lg font-bold">{service.name_ne}</h3>
        <p className="text-sm text-muted-foreground">{service.name}</p>
        {disabled && <p className="text-xs text-destructive">No contacts</p>}
      </CardContent>
    </Card>
  );
}
