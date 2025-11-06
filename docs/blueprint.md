# **App Name**: Libris Digitalis

## Core Features:

- User Authentication: Secure user registration, login, and profile management using Firebase Authentication.
- Book Browsing & Filtering: Browse books with filtering by category, author, price, and rating.
- Book Search: Search for books via real-time search using Django.
- Shopping Cart: Add books to cart, update quantities, and calculate total price. Manage cart data on client-side (e.g. React Context) until checkout.
- Secure Checkout: Integrate with Stripe via Django REST API for secure payment processing.
- Order Management: Create and track orders, automatically updating stock quantity using a Firebase Cloud Function.
- Review Sentiment Tool: LLM judges from user provided content (review), when a review should be published. It can identify hate-speech and abuse using a variety of internal methods.

## Style Guidelines:

- Primary color: Deep indigo (#3F51B5) to evoke trust and intellect, resonating with the app's purpose.
- Background color: Very light indigo (#F0F2FA) providing a clean and unobtrusive backdrop.
- Accent color: Deep purple (#7E57C2) for interactive elements and calls to action, differentiating them from the primary color.
- Headline font: 'Playfair', a modern serif to convey an elegant, fashionable, high-end feel.
- Body font: 'PT Sans', a humanist sans-serif, well suited for the body to pair with Playfair.
- Simple, professional icons representing book genres, user actions, and navigation.
- Clean, grid-based layout with clear visual hierarchy to improve usability.
- Subtle animations for transitions, loading states, and user interactions to provide feedback without distraction.