import { getBooks, getAuthors, getCategories } from "@/lib/data";
import { BookCard } from "@/components/books/BookCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function ShopPage() {
  const books = getBooks();
  const authors = getAuthors();
  const categories = getCategories();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          Explore Our Collection
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Find your next adventure in our curated collection of books. Filter by your favorite genres, authors, and more.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-headline">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox id={`cat-${category.id}`} />
                      <Label htmlFor={`cat-${category.id}`} className="font-normal text-muted-foreground">{category.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Author</h3>
                <div className="space-y-2">
                  {authors.map((author) => (
                    <div key={author.id} className="flex items-center space-x-2">
                      <Checkbox id={`author-${author.id}`} />
                      <Label htmlFor={`author-${author.id}`} className="font-normal text-muted-foreground">{author.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
                <Slider defaultValue={[50]} max={100} step={1} />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>$0</span>
                    <span>$100</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <Pagination className="mt-12">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
}