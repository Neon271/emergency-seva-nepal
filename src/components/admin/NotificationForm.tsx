
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { sendNotification } from '@/app/admin/actions';
import { Loader2, BellRing, HardHat } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const notificationFormSchema = z.object({
  notificationText: z.string().min(10, {
    message: 'Notification must be at least 10 characters.',
  }).max(200, {
      message: 'Notification must not be longer than 200 characters.'
  }),
});

export default function NotificationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      notificationText: '',
    },
  });

  async function onSubmit(values: z.infer<typeof notificationFormSchema>) {
    setIsSubmitting(true);
    
    // This currently calls a placeholder action.
    const result = await sendNotification(values);

    if (result.success) {
      toast({
        title: 'Action Simulated',
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Action Failed',
        description: result.message,
      });
    }

    setIsSubmitting(false);
  }

  return (
    <div className='space-y-6'>
        <Alert>
            <HardHat className="h-4 w-4" />
            <AlertTitle>Developer Preview</AlertTitle>
            <AlertDescription>
                This form is for sending push notifications. It is not yet connected to a backend. Pressing send will simulate the action.
            </AlertDescription>
        </Alert>

        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="notificationText"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Notification Message</FormLabel>
                <FormControl>
                    <Textarea
                    placeholder="Enter the notification text you want to send to all users."
                    className="resize-none"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <BellRing className="mr-2 h-4 w-4" />
                Send Notification
            </Button>
        </form>
        </Form>
    </div>
  );
}
