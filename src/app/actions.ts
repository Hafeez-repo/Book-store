'use server';

import { z } from 'zod';
import { moderateReview } from '@/ai/flows/review-sentiment-moderation';

const reviewSchema = z.object({
  bookId: z.string(),
  rating: z.coerce.number().min(1, 'Rating is required.').max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters long.'),
});

type State = {
  success: boolean;
  error?: string | null;
  errors?: {
    bookId?: string[];
    rating?: string[];
    comment?: string[];
  } | null;
};

export async function submitReview(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = reviewSchema.safeParse({
    bookId: formData.get('bookId'),
    rating: formData.get('rating'),
    comment: formData.get('comment'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      error: null,
    };
  }
  
  const { comment } = validatedFields.data;

  try {
    const moderationResult = await moderateReview({ reviewText: comment });

    if (!moderationResult.isAppropriate) {
        return {
            success: false,
            error: `Your review could not be published. Reason: ${moderationResult.reason || 'Content violates our community guidelines.'}`
        };
    }

    // Here you would typically save the review to your database (e.g., Firestore)
    // For example: await db.collection('reviews').add({ ...validatedFields.data, approved: true, createdAt: serverTimestamp() });
    
    console.log('Moderation passed, review would be saved:', validatedFields.data);

    return { success: true };
  } catch (error) {
    console.error('Error during review submission:', error);
    return { 
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
    };
  }
}
