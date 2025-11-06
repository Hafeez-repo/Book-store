import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";

export default function AboutPage() {
  const aboutImage = placeholderImages.find(p => p.id === 'hero-1');
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-primary font-semibold">Our Story</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-headline font-bold text-foreground">
            About Libris Digitalis
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            We are a passionate team of book lovers dedicated to bringing the joy of reading to the digital age.
          </p>
        </div>

        {aboutImage && (
          <div className="mt-12 aspect-video relative rounded-lg overflow-hidden shadow-xl max-w-4xl mx-auto">
            <Image
              src={aboutImage.imageUrl}
              alt="Libris Digitalis Team"
              fill
              className="object-cover"
              data-ai-hint={aboutImage.imageHint}
            />
          </div>
        )}

        <div className="prose prose-lg max-w-4xl mx-auto mt-12 text-muted-foreground">
          <p>
            Libris Digitalis was founded in 2023 with a simple mission: to create a seamless, enjoyable, and modern online bookstore experience. We believe that technology should enhance, not replace, the magic of discovering a new book.
          </p>
          <p>
            Our journey began in a small co-working space, fueled by coffee and a shared love for literature. We noticed that many online bookstores felt cluttered and impersonal. We envisioned a platform that was not only a place to buy books but also a community for readers to connect, share, and explore.
          </p>
          <h2 className="font-headline text-foreground">Our Philosophy</h2>
          <p>
            We curate our collection with care, offering everything from timeless classics to contemporary masterpieces. Our recommendation engine and expert-curated lists help you find hidden gems, while our commitment to a clean, intuitive design makes browsing a pleasure.
          </p>
          <p>
            Thank you for joining us on this adventure. We're excited to help you find your next great story.
          </p>
        </div>
      </div>
    </div>
  );
}
