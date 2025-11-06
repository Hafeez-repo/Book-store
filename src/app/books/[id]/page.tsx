'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBookById } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/books/StarRating';
import { Separator } from '@/components/ui/separator';
import { ReviewSection } from '@/components/books/ReviewSection';
import { Heart, ShoppingCart } from 'lucide-react';
import { useFirebase, useUser } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import React from 'react';

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const resolvedParams = React.use(params);
  const book = getBookById(resolvedParams.id);
  const { firestore } = useFirebase();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  if (!book) {
    notFound();
  }

  const handleAddToCart = () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Please log in',
        description: 'You need to be logged in to add items to your cart.',
      });
      return;
    }
    if (!firestore) return;
    const cartItemsRef = collection(firestore, 'users', user.uid, 'cartItems');
    addDocumentNonBlocking(cartItemsRef, {
      userId: user.uid,
      bookId: book.id,
      quantity: 1,
    });
    toast({
      title: 'Added to Cart',
      description: `"${book.title}" has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Please log in',
        description: 'You need to be logged in to add items to your wishlist.',
      });
      return;
    }
    if (!firestore) return;
    const wishlistItemsRef = collection(firestore, 'users', user.uid, 'wishlistItems');
    addDocumentNonBlocking(wishlistItemsRef, {
      userId: user.uid,
      bookId: book.id,
    });
    toast({
      title: 'Added to Wishlist',
      description: `"${book.title}" has been added to your wishlist.`,
    });
  };

  const image = placeholderImages.find((img) => img.id === book.coverImage);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="flex justify-center items-start">
           <div className="sticky top-24 w-full max-w-sm">
            <div className="aspect-[2/3] relative w-full rounded-lg shadow-xl overflow-hidden">
                {image && (
                <Image
                    src={image.imageUrl}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                />
                )}
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">{book.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">by <span className="text-primary hover:underline cursor-pointer">{book.author.name}</span></p>
          
          <div className="mt-4 flex items-center gap-4">
            <StarRating rating={book.rating} showText={true} />
            <span className="text-muted-foreground text-sm">({book.reviews.length} reviews)</span>
          </div>

          <p className="mt-6 text-3xl font-bold text-primary">₹{book.price.toFixed(2)}</p>
          
          <div className="mt-6 flex items-center gap-4">
            <Button size="lg" className="text-lg flex-1 md:flex-none" onClick={handleAddToCart} disabled={isUserLoading}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="text-lg flex-1 md:flex-none" onClick={handleAddToWishlist} disabled={isUserLoading}>
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>
          <p className="mt-4 text-sm text-green-600 font-semibold">In Stock ({book.stock} available)</p>

          <Separator className="my-8" />

          <div>
            <h2 className="text-xl font-headline font-semibold text-foreground">Description</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{book.description}</p>
          </div>

          <Separator className="my-8" />

            <div>
              <h3 className="text-xl font-headline font-semibold text-foreground mb-2">Details</h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                  <li><strong>Genre:</strong> {book.genre}</li>
                  <li><strong>Author:</strong> {book.author.name}</li>
              </ul>
            </div>
        </div>
      </div>
      
      <div className="mt-16">
        <ReviewSection book={book} user={user} />
      </div>
    </div>
  );
}
