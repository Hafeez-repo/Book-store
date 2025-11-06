import type { Author, Book, Review, Category } from './types';

const authors: Author[] = [
  { id: '1', name: 'F. Scott Fitzgerald' },
  { id: '2', name: 'George Orwell' },
  { id: '3', name: 'Harper Lee' },
  { id: '4', name: 'J.D. Salinger' },
  { id: '5', name: 'Jane Austen' },
  { id: '6', name: 'J.R.R. Tolkien' },
];

const reviews: Review[] = [
  {
    id: '1',
    bookId: '1',
    userId: '1',
    userName: 'Jane Doe',
    userAvatar: 'user-1',
    rating: 5,
    comment: "A timeless classic that perfectly captures the Jazz Age. Fitzgerald's writing is simply sublime.",
    createdAt: '2023-10-15',
  },
  {
    id: '2',
    bookId: '1',
    userId: '2',
    userName: 'John Smith',
    userAvatar: 'user-2',
    rating: 4,
    comment: 'An engaging read, though the characters can be frustrating. A must-read for any literature enthusiast.',
    createdAt: '2023-10-12',
  },
  {
    id: '3',
    bookId: '2',
    userId: '1',
    userName: 'Jane Doe',
    userAvatar: 'user-1',
    rating: 5,
    comment: "Orwell's dystopian vision is more relevant than ever. A chilling and thought-provoking masterpiece.",
    createdAt: '2023-09-20',
  },
];

const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: authors[0],
    genre: 'Classic',
    price: 12.99,
    stock: 50,
    description: "The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers.",
    rating: 4.5,
    coverImage: 'book-1',
    reviews: reviews.filter(r => r.bookId === '1'),
  },
  {
    id: '2',
    title: '1984',
    author: authors[1],
    genre: 'Dystopian',
    price: 10.99,
    stock: 30,
    description: "George Orwell's Nineteen Eighty-Four is a dystopian social science fiction novel and cautionary tale. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
    rating: 4.8,
    coverImage: 'book-2',
    reviews: reviews.filter(r => r.bookId === '2'),
  },
  {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: authors[2],
    genre: 'Classic',
    price: 14.50,
    stock: 25,
    description: "To Kill a Mockingbird is a novel by Harper Lee published in 1960. Instantly successful, widely read in high schools and middle schools in the United States, it has become a classic of modern American literature, winning the Pulitzer Prize.",
    rating: 4.7,
    coverImage: 'book-3',
    reviews: [],
  },
  {
    id: '4',
    title: 'The Catcher in the Rye',
    author: authors[3],
    genre: 'Classic',
    price: 9.99,
    stock: 40,
    description: "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults but is often read by adolescents for its themes of angst and alienation.",
    rating: 4.2,
    coverImage: 'book-4',
    reviews: [],
  },
  {
    id: '5',
    title: 'Pride and Prejudice',
    author: authors[4],
    genre: 'Romance',
    price: 11.99,
    stock: 60,
    description: "Pride and Prejudice is an 1813 romantic novel of manners written by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments.",
    rating: 4.9,
    coverImage: 'book-5',
    reviews: [],
  },
  {
    id: '6',
    title: 'The Hobbit',
    author: authors[5],
    genre: 'Fantasy',
    price: 18.99,
    stock: 75,
    description: "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune.",
    rating: 4.9,
    coverImage: 'book-6',
    reviews: [],
  },
  {
    id: '7',
    title: 'Moby Dick',
    author: {id: '7', name: 'Herman Melville'},
    genre: 'Adventure',
    price: 15.00,
    stock: 10,
    description: 'The narrative of the sailor Ishmael and his voyage on the whaleship Pequod, commanded by Captain Ahab.',
    rating: 4.1,
    coverImage: 'book-7',
    reviews: [],
  },
  {
    id: '8',
    title: 'War and Peace',
    author: {id: '8', name: 'Leo Tolstoy'},
    genre: 'Historical Fiction',
    price: 22.50,
    stock: 15,
    description: 'A literary work mixed with chapters on history and philosophy, it chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society through the stories of five Russian aristocratic families.',
    rating: 4.6,
    coverImage: 'book-8',
    reviews: [],
  }
];

const categories: Category[] = [
    { id: '1', name: 'Classic' },
    { id: '2', name: 'Dystopian' },
    { id: '3', name: 'Romance' },
    { id: '4', name: 'Fantasy' },
    { id: '5', name: 'Adventure' },
    { id: '6', name: 'Historical Fiction' },
]

export function getBooks() {
  return books;
}

export function getBookById(id: string) {
  return books.find(book => book.id === id);
}

export function getFeaturedBooks() {
  return books.slice(0, 4);
}

export function getAuthors() {
    return authors;
}

export function getCategories() {
    return categories;
}
