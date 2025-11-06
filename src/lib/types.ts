export type Author = {
  id: string;
  name: string;
};

export type Review = {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type Book = {
  id: string;
  title: string;
  author: Author;
  genre: string;
  price: number;
  stock: number;
  description: string;
  rating: number;
  coverImage: string;
  reviews: Review[];
};

export type Category = {
  id: string;
  name: string;
}

export type CartItem = {
    id: string;
    userId: string;
    bookId: string;
    quantity: number;
};

export type WishlistItem = {
    id: string;
    userId: string;
    bookId: string;
};

export type OrderItem = {
    bookId: string;
    title: string;
    author: string;
    price: number;
    quantity: number;
    coverImage: string;
}

export type Order = {
    id: string;
    userId: string;
    items: OrderItem[];
    totalPrice: number;
    paymentMethod: string;
    paymentStatus: string;
    timestamp: any;
    status: string;
}
