import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookCard } from '@/components/books/BookCard';
import { getFeaturedBooks } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import { ArrowRight, BookOpen, Truck, Sparkles } from 'lucide-react';

export default function Home() {
  const featuredBooks = getFeaturedBooks();
  const heroImage = placeholderImages.find((img) => img.id === 'hero-1');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-center brightness-[.4]"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-10 p-4 sm:p-6 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary-foreground tracking-tight">
            Discover Your Next Favorite Book
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-primary-foreground/90 max-w-xl mx-auto">
            Explore a universe of stories, from timeless classics to the latest bestsellers. Your literary adventure starts here.
          </p>
          <div className="mt-8 sm:mt-10">
            <Button asChild size="lg" className="font-bold text-lg">
              <Link href="/shop">
                Browse Books <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-center text-foreground">
            Featured Books
          </h2>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Hand-picked selections by our curators. Find your next great read from our exclusive collection of featured titles.
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 sm:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground">
              Why Choose Libris Digitalis?
            </h2>
            <p className="mt-4 text-muted-foreground">
              We offer a premium book-buying experience tailored for the modern reader.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mx-auto">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-headline font-semibold">Vast Collection</h3>
              <p className="mt-2 text-muted-foreground">
                Access a library of thousands of books across all genres and authors.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mx-auto">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-headline font-semibold">Expert-Curated</h3>
              <p className="mt-2 text-muted-foreground">
                Discover hidden gems and bestsellers chosen by our literary experts.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mx-auto">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-headline font-semibold">Fast Shipping</h3>
              <p className="mt-2 text-muted-foreground">
                Get your next adventure delivered to your doorstep in no time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-primary/10 p-8 sm:p-12 rounded-lg">
             <h2 className="text-3xl sm:text-4xl font-headline font-bold text-primary">Ready to Dive In?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Your next story is just a click away. Browse our full collection and find the perfect book to get lost in today.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="font-bold text-lg">
                  <Link href="/shop">
                    Explore the Shop
                  </Link>
                </Button>
              </div>
          </div>
        </div>
      </section>

    </div>
  );
}
