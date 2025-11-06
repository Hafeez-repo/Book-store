'use client';

import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Star } from 'lucide-react';

import { submitReview } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import React from 'react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface ReviewFormProps {
  bookId: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit Review'}
    </Button>
  );
}

function StarInput({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <button
                        type="button"
                        key={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <Star
                            size={24}
                            className={cn(
                                'transition-colors',
                                ratingValue <= (hover || rating) ? 'text-primary fill-primary' : 'text-muted-foreground'
                            )}
                        />
                        <span className="sr-only">{ratingValue} stars</span>
                    </button>
                );
            })}
        </div>
    );
}

export function ReviewForm({ bookId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const { toast } = useToast();

  const handleSubmit = async (prevState: any, formData: FormData) => {
    formData.append('rating', rating.toString());
    formData.append('bookId', bookId);

    const result = await submitReview(prevState, formData);
    
    if (result.success) {
      toast({
        title: 'Review Submitted',
        description: 'Thank you! Your review is being processed.',
      });
      // Here you would typically reset the form, but we'll just show a toast.
    } else if (result.error) {
       toast({
        variant: "destructive",
        title: 'Submission Error',
        description: result.error,
      });
    }

    return result;
  };
  
  const [state, formAction] = useActionState(handleSubmit, { success: false });

  return (
    <form action={formAction} className="space-y-4">
        <div>
            <Label htmlFor="rating">Your Rating</Label>
            <StarInput rating={rating} setRating={setRating} />
            {state?.errors?.rating && <p className="text-sm font-medium text-destructive">{state.errors.rating}</p>}
        </div>
      <div>
        <Label htmlFor="comment">Your Review</Label>
        <Textarea
          id="comment"
          name="comment"
          placeholder="Share your thoughts on this book..."
          rows={4}
          required
        />
        {state?.errors?.comment && <p className="text-sm font-medium text-destructive">{state.errors.comment}</p>}
      </div>

      {state.error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.success && (
        <Alert>
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Your review has been submitted for moderation. Thank you!</AlertDescription>
        </Alert>
      )}


      <SubmitButton />
    </form>
  );
}
