'use client';

import type { Book } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from './StarRating';
import { placeholderImages } from '@/lib/placeholder-images';
import { ReviewForm } from './ReviewForm';
import { ClientFormattedDate } from './ClientFormattedDate';

interface ReviewSectionProps {
  book: Book;
  user: any;
}

export function ReviewSection({ book, user }: ReviewSectionProps) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-headline font-bold text-foreground">
        Customer Reviews
      </h2>
      <div className="grid md:grid-cols-3 gap-8 mt-6">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-headline">Leave a Review</CardTitle>
                </CardHeader>
                <CardContent>
                    <ReviewForm bookId={book.id} user={user} />
                </CardContent>
            </Card>


          <div className="mt-8 space-y-8">
            {book.reviews.length > 0 ? (
              book.reviews.map((review) => {
                const avatar = placeholderImages.find((img) => img.id === review.userAvatar);
                return (
                  <div key={review.id} className="flex gap-4">
                    <Avatar>
                      {avatar && <AvatarImage src={avatar.imageUrl} alt={review.userName} data-ai-hint={avatar.imageHint} />}
                      <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{review.userName}</p>
                        <span className="text-xs text-muted-foreground">
                          <ClientFormattedDate dateString={review.createdAt} />
                        </span>
                      </div>
                      <StarRating rating={review.rating} size={16} className="my-1" />
                      <p className="text-muted-foreground text-sm">{review.comment}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-muted-foreground py-8 text-center">No reviews yet. Be the first to share your thoughts!</p>
            )}
          </div>
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-headline">Overall Rating</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <p className="text-4xl font-bold text-primary">{book.rating.toFixed(1)}</p>
                    <div className='flex flex-col'>
                        <StarRating rating={book.rating} size={20} />
                        <span className="text-sm text-muted-foreground">{book.reviews.length} reviews</span>
                    </div>
                </div>
                {/* Add rating breakdown bars here if needed */}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
