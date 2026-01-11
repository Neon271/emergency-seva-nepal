"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition } from "react";
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
import { Loader2 } from "lucide-react";
import type { CustomContactCategory } from "@/lib/types";
import { useCustomContacts } from "@/hooks/use-custom-contacts";
import { Textarea } from "../ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().regex(/^[\d\s()+-]+$/, "Invalid phone number format.").min(1, "Phone number is required."),
  category: z.enum(['ambulance', 'clinic', 'pharmacy', 'other', 'hospital', 'police', 'fire', 'blood', 'helpline']),
  address: z.string().min(1, "Address is required."),
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

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      category: "other",
      address: "",
    },
  });

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
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-800">Add Emergency Contact</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">Contact Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., City Hospital Pokhara" {...field} className="rounded-lg border-2 p-3 h-auto text-base" />
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
                  <FormLabel className="font-semibold text-gray-700">Type *</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-lg border-2 p-3 h-auto text-base">
                        <SelectValue placeholder="-- Select Type --" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="ambulance">🚑 Ambulance</SelectItem>
                        <SelectItem value="hospital">🏥 Hospital</SelectItem>
                        <SelectItem value="clinic">🏥 Clinic</SelectItem>
                        <SelectItem value="pharmacy">💊 Pharmacy</SelectItem>
                        <SelectItem value="police">👮 Police</SelectItem>
                        <SelectItem value="fire">🚒 Fire Brigade</SelectItem>
                        <SelectItem value="blood">🩸 Blood Bank</SelectItem>
                        <SelectItem value="helpline">📞 Helpline</SelectItem>
                        <SelectItem value="other">📋 Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">Phone Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 98XXXXXXXX" type="tel" {...field} className="rounded-lg border-2 p-3 h-auto text-base"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">Address *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Near the main market, Pokhara" {...field} className="rounded-lg border-2 p-3 text-base"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="grid grid-cols-2 gap-3 pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="h-auto py-3 text-base font-bold rounded-lg bg-gray-100 hover:bg-gray-200">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending} className="h-auto py-3 text-base font-bold rounded-lg shadow-lg transition-transform hover:scale-105">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "💾 Save Contact"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
