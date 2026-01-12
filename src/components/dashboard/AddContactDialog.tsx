
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Import, Loader2 } from "lucide-react";
import type { CustomContactCategory } from "@/lib/types";
import { useCustomContacts } from "@/hooks/use-custom-contacts";
import { Textarea } from "../ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().regex(/^[\d\s()+-]+$/, "Invalid phone number format.").min(1, "Phone number is required."),
  category: z.enum(['other', 'hospital', 'clinic', 'pharmacy', 'police', 'fire', 'ambulance', 'blood', 'helpline']),
  address: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface AddContactDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess?: () => void;
}

export default function AddContactDialog({ isOpen, onOpenChange, onSuccess }: AddContactDialogProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { addContact } = useCustomContacts();
  const [isContactPickerSupported, setisContactPickerSupported] = useState(false);

  useEffect(() => {
    if ('contacts' in navigator && 'select' in (navigator as any).contacts) {
      setisContactPickerSupported(true);
    }
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      category: "other",
      address: "",
    },
  });

  const handleImportContact = async () => {
    try {
      const contacts = await (navigator as any).contacts.select(['name', 'tel'], { multiple: false });
      if (contacts.length > 0) {
        const contact = contacts[0];
        if (contact.name && contact.name.length > 0) {
          form.setValue('name', contact.name[0]);
        }
        if (contact.tel && contact.tel.length > 0) {
          form.setValue('phone', contact.tel[0]);
        }
        toast({
            title: "Contact Imported",
            description: "Contact details have been filled in the form.",
        })
      }
    } catch (ex) {
      toast({
        variant: "destructive",
        title: "Could Not Import Contact",
        description: "There was an error accessing your contacts.",
      });
    }
  };

  const onSubmit = (values: ContactFormValues) => {
    startTransition(() => {
      try {
        addContact({
          ...values,
          category: values.category as CustomContactCategory,
        });

        toast({
          title: "Contact Saved",
          description: `${values.name} has been added to your contacts.`,
        });
        form.reset();
        onOpenChange(false);
        onSuccess?.();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Save Failed",
          description: "There was a problem saving your contact.",
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Custom Contact</DialogTitle>
          <DialogDescription>
            Save a personal emergency contact. It will be stored on your device.
          </DialogDescription>
        </DialogHeader>
        
        {isContactPickerSupported && (
            <Button variant="outline" onClick={handleImportContact} className="w-full">
                <Import className="mr-2 h-4 w-4" />
                Import from Device
            </Button>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Dr. Ramesh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 98XXXXXXXX" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="other">👤 Other</SelectItem>
                        <SelectItem value="hospital">🏥 Hospital</SelectItem>
                        <SelectItem value="clinic">🩺 Clinic</SelectItem>
                        <SelectItem value="pharmacy">💊 Pharmacy</SelectItem>
                        <SelectItem value="police">👮 Police</SelectItem>
                        <SelectItem value="fire">🚒 Fire Brigade</SelectItem>
                        <SelectItem value="ambulance">🚑 Ambulance</SelectItem>
                        <SelectItem value="blood">🩸 Blood Bank</SelectItem>
                        <SelectItem value="helpline">📞 Helpline</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Near the main market, Pokhara" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Contact
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

