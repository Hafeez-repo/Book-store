'use server';

/**
 * @fileOverview A review sentiment moderation AI agent.
 *
 * - moderateReview - A function that moderates user reviews.
 * - ModerateReviewInput - The input type for the moderateReview function.
 * - ModerateReviewOutput - The return type for the moderateReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateReviewInputSchema = z.object({
  reviewText: z.string().describe('The text content of the user review.'),
});
export type ModerateReviewInput = z.infer<typeof ModerateReviewInputSchema>;

const ModerateReviewOutputSchema = z.object({
  isAppropriate: z
    .boolean()
    .describe(
      'Whether the review is appropriate for publication.  False if it contains hate speech, abuse, or other inappropriate content.'
    ),
  reason: z
    .string()
    .optional()
    .describe(
      'The reason why the review was flagged as inappropriate. Only present if isAppropriate is false.'
    ),
});
export type ModerateReviewOutput = z.infer<typeof ModerateReviewOutputSchema>;

export async function moderateReview(input: ModerateReviewInput): Promise<ModerateReviewOutput> {
  return moderateReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moderateReviewPrompt',
  input: {schema: ModerateReviewInputSchema},
  output: {schema: ModerateReviewOutputSchema},
  prompt: `You are an AI assistant specializing in content moderation for an online bookstore.
Your task is to analyze user reviews and determine if they are appropriate for publication.

Consider the following criteria:
- **Hate speech:** Does the review contain any language that attacks or demeans a group based on race, ethnicity, religion, gender, sexual orientation, disability, or other characteristic?
- **Abuse:** Does the review contain personal attacks, harassment, or threats against other users or individuals?
- **Inappropriate content:** Does the review contain sexually explicit, offensive, or otherwise inappropriate content?
- **Relevance:** Does the review focus on the book and not extraneous topics?

Based on your analysis, set the \`isAppropriate\` field to true if the review is appropriate and false if it violates any of the above criteria.
If the review is not appropriate, provide a brief \`reason\` explaining why.

Review text: {{{reviewText}}}`,
});

const moderateReviewFlow = ai.defineFlow(
  {
    name: 'moderateReviewFlow',
    inputSchema: ModerateReviewInputSchema,
    outputSchema: ModerateReviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
