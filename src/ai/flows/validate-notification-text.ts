'use server';

/**
 * @fileOverview This flow validates the notification text for clarity and relevance using an LLM.
 *
 * validateNotificationText - A function that validates the notification text.
 * ValidateNotificationTextInput - The input type for the validateNotificationText function.
 * ValidateNotificationTextOutput - The return type for the validateNotificationText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateNotificationTextInputSchema = z.object({
  notificationText: z
    .string()
    .describe('The text of the notification to be validated.'),
});

export type ValidateNotificationTextInput = z.infer<
  typeof ValidateNotificationTextInputSchema
>;

const ValidateNotificationTextOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the notification text is valid.'),
  reason:
    z.string().optional().describe('The reason why the notification text is invalid.'),
});

export type ValidateNotificationTextOutput = z.infer<
  typeof ValidateNotificationTextOutputSchema
>;

export async function validateNotificationText(
  input: ValidateNotificationTextInput
): Promise<ValidateNotificationTextOutput> {
  return validateNotificationTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateNotificationTextPrompt',
  input: {schema: ValidateNotificationTextInputSchema},
  output: {schema: ValidateNotificationTextOutputSchema},
  prompt: `You are an expert at validating notification text for clarity and relevance.

You will receive the text of a notification and determine if it is valid.

A valid notification text is clear, concise, and relevant to the intended audience. It should not be misleading, ambiguous, or contain any offensive or harmful content.

Text: {{{notificationText}}}`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_CIVIC_INTEGRITY',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const validateNotificationTextFlow = ai.defineFlow(
  {
    name: 'validateNotificationTextFlow',
    inputSchema: ValidateNotificationTextInputSchema,
    outputSchema: ValidateNotificationTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

