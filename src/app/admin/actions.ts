
'use client';

import { z } from 'zod';
import type { ReportPayload } from '@/lib/types';

const notificationFormSchema = z.object({
  notificationText: z.string(),
});

type ActionFormResult = {
  success: boolean;
  message: string;
};

// This is now a client-side function
export async function sendNotification(
  values: z.infer<typeof notificationFormSchema>
): Promise<ActionFormResult> {
  const parsed = notificationFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: 'Invalid input.' };
  }

  try {
    const notificationText = parsed.data.notificationText;
    if (notificationText.length < 10) {
        return {
            success: false,
            message: "Notification must be at least 10 characters.",
        };
    }

    // This is where the actual push notification logic would go.
    // For now, it just logs to the console.
    console.log('FCM Logic: Sending notification:', notificationText);

    return {
      success: true,
      message: 'Notification has been sent.',
    };
  } catch (error) {
    console.error('Error sending notification:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}

const reportSchema = z.object({
  contactId: z.string().min(1),
  contactName: z.string().min(1),
  contactPhone: z.string().min(1),
  reason: z.enum(["wrong-number", "not-working", "other"]),
  details: z.string().max(500).optional(),
});

// This is now a client-side function
export async function submitReport(
  payload: ReportPayload
): Promise<ActionFormResult> {
  const parsed = reportSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, message: 'Invalid report data.' };
  }

  try {
    // This is where the report would be saved to a database.
    // For now, it just logs to the console.
    console.log('Feedback Received:', parsed.data);

    return {
      success: true,
      message: 'Report submitted successfully. Thank you for your feedback!',
    };
  } catch (error) {
    console.error('Error submitting report:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while submitting your report.',
    };
  }
}
