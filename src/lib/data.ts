import type { Author, Book, Review, Category } from './types';

const authors: Author[] = [
  { id: '1', name: 'F. Scott Fitzgerald' },
  { id: '2', name: 'George Orwell' },
  { id: '3', name: 'Harper Lee' },
  { id: '4', name: 'J.D. Salinger' },
  { id: '5', name: 'Jane Austen' },
  { id: '6', name: 'J.R.R. Tolkien' },
  { id: '7', name: 'Herman Melville'},
  { id: '8', name: 'Leo Tolstoy'},
  { id: '9', name: 'William Shakespeare'},
  { id: '10', name: 'Charles Dickens'},
  { id: '11', name: 'Homer'},
  { id: '12', name: 'Aldous Huxley'},
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
    price: 999.00,
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
    price: 899.00,
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
    price: 1199.00,
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
    price: 799.00,
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
    price: 949.00,
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
    price: 1499.00,
    stock: 75,
    description: "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune.",
    rating: 4.9,
    coverImage: 'book-6',
    reviews: [],
  },
  {
    id: '7',
    title: 'Moby Dick',
    author: authors[6],
    genre: 'Adventure',
    price: 1250.00,
    stock: 10,
    description: 'The narrative of the sailor Ishmael and his voyage on the whaleship Pequod, commanded by Captain Ahab.',
    rating: 4.1,
    coverImage: 'book-7',
    reviews: [],
  },
  {
    id: '8',
    title: 'War and Peace',
    author: authors[7],
    genre: 'Historical Fiction',
    price: 1800.00,
    stock: 15,
    description: 'A literary work mixed with chapters on history and philosophy, it chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society through the stories of five Russian aristocratic families.',
    rating: 4.6,
    coverImage: 'book-8',
    reviews: [],
  },
  {
    id: '9',
    title: 'Hamlet',
    author: authors[8],
    genre: 'Tragedy',
    price: 699.00,
    stock: 35,
    description: 'The tragedy of Hamlet, Prince of Denmark, is a tragedy play by William Shakespeare believed to have been written between 1599 and 1601.',
    rating: 4.7,
    coverImage: 'book-9',
    reviews: [],
  },
  {
    id: '10',
    title: 'Great Expectations',
    author: authors[9],
    genre: 'Classic',
    price: 850.00,
    stock: 20,
    description: 'Great Expectations is the thirteenth novel by Charles Dickens and his penultimate completed novel. It depicts the education of an orphan nicknamed Pip.',
    rating: 4.4,
    coverImage: 'book-10',
    reviews: [],
  },
  {
    id: '11',
    title: 'The Odyssey',
    author: authors[10],
    genre: 'Epic',
    price: 1100.00,
    stock: 18,
    description: 'The Odyssey is one of two major ancient Greek epic poems attributed to Homer. It is, in part, a sequel to the Iliad, the other work ascribed to Homer.',
    rating: 4.8,
    coverImage: 'book-11',
    reviews: [],
  },
  {
    id: '12',
    title: 'Brave New World',
    author: authors[11],
    genre: 'Dystopian',
    price: 950.00,
    stock: 45,
    description: 'Brave New World is a dystopian social science fiction novel by English author Aldous Huxley, written in 1931 and published in 1932.',
    rating: 4.6,
    coverImage: 'book-12',
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
    { id: '7', name: 'Tragedy' },
    { id: '8', name: 'Epic' },
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
