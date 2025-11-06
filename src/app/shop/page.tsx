
'use client';

import { useState } from 'react';
import { getBooks } from "@/lib/data";
import { BookCard } from "@/components/books/BookCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const BOOKS_PER_PAGE = 10;

export default function ShopPage() {
  const allBooks = getBooks();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(allBooks.length / BOOKS_PER_PAGE);

  const paginatedBooks = allBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  );

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPaginationItems = () => {
    const pages = [];
    // Always show first page
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink href={createPageURL(1)} isActive={currentPage === 1}>
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Ellipsis after first page if needed
    if (currentPage > 3) {
      pages.push(<PaginationItem key="start-ellipsis"><span className="px-3 py-1.5">...</span></PaginationItem>);
    }

    // Pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink href={createPageURL(i)} isActive={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Ellipsis before last page if needed
    if (currentPage < totalPages - 2) {
      pages.push(<PaginationItem key="end-ellipsis"><span className="px-3 py-1.5">...</span></PaginationItem>);
    }

    // Always show last page
    if (totalPages > 1) {
        pages.push(
            <PaginationItem key={totalPages}>
                <PaginationLink href={createPageURL(totalPages)} isActive={currentPage === totalPages}>
                {totalPages}
                </PaginationLink>
            </PaginationItem>
        );
    }


    return pages;
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          Explore Our Collection
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Find your next adventure in our curated collection of books.
        </p>
      </header>

      <main>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {paginatedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <Pagination className="mt-12">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious href={createPageURL(currentPage - 1)} />
              </PaginationItem>
            )}
            
            {renderPaginationItems()}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext href={createPageURL(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
}
