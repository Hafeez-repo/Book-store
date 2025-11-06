import Link from 'next/link';
import Image from 'next/image';
import type { Book } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { StarRating } from '@/components/books/StarRating';
import { placeholderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

interface BookCardProps {
  book: Book;
  className?: string;
}

export function BookCard({ book, className }: BookCardProps) {
  const image = placeholderImages.find((img) => img.id === book.coverImage);

  return (
    <Link href={`/books/${book.id}`} className={cn("group", className)}>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="aspect-[2/3] relative w-full">
            {image && (
              <Image
                src={image.imageUrl}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                data-ai-hint={image.imageHint}
              />
            )}
          </div>
          <div className="p-4">
            <h3 className="font-headline font-semibold text-lg leading-snug truncate group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{book.author.name}</p>
            <div className="flex items-center justify-between mt-3">
              <p className="text-lg font-semibold text-primary">${book.price.toFixed(2)}</p>
              <StarRating rating={book.rating} size={16} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
