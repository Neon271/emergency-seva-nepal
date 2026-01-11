
'use server';

import { validateNotificationText } from '@/ai/flows/validate-notification-text';
import { z } from 'zod';
import type { ReportPayload } from '@/lib/types';

const notificationFormSchema = z.object({
  notificationText: z.string(),
});

type ActionFormResult = {
  success: boolean;
  message: string;
};

export async function sendNotification(
  values: z.infer<typeof notificationFormSchema>
): Promise<ActionFormResult> {
  const parsed = notificationFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: 'Invalid input.' };
  }

  try {
    const validationResult = await validateNotificationText({
      notificationText: parsed.data.notificationText,
    });

    if (!validationResult.isValid) {
      return {
        success: false,
        message: validationResult.reason || 'The notification content is not valid.',
      };
    }

    // TODO: Implement actual FCM push notification logic here
    console.log('FCM Logic: Sending notification:', parsed.data.notificationText);

    return {
      success: true,
      message: 'Notification passed validation and was sent.',
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

export async function submitReport(
  payload: ReportPayload
): Promise<ActionFormResult> {
  const parsed = reportSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, message: 'Invalid report data.' };
  }

  try {
    // TODO: Implement saving the report to Firestore
    console.log('Feedback Received:', parsed.data);

    // Simulate a successful submission
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
