"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { sendNotification } from '@/app/admin/actions';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  notificationText: z
    .string()
    .min(10, 'Notification must be at least 10 characters.')
    .max(200, 'Notification must not exceed 200 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function NotificationForm() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notificationText: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsPending(true);
    const result = await sendNotification(values);

    if (result.success) {
      toast({
        title: 'Success',
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.message,
      });
    }
    setIsPending(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Compose Notification</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="notificationText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Missing person alert: [Name], last seen at [Location]. Please contact [Number] with any information."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Notification
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
