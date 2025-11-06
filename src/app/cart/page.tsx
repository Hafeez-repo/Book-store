
'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { getBookById } from "@/lib/data";
import { placeholderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCollection, useFirebase, useUser, useMemoFirebase } from '@/firebase';
import { collection, doc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { deleteDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import type { CartItem, Book } from '@/lib/types';


interface CartItemWithBook extends CartItem {
    book: Book | undefined;
}

export default function CartPage() {
  const [isClient, setIsClient] = useState(false);
  const { user } = useUser();
  const { firestore } = useFirebase();
  const { toast } = useToast();

  const cartItemsRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'cartItems');
  }, [user, firestore]);

  const { data: cartItemsData, isLoading } = useCollection<CartItem>(cartItemsRef);

  const cartItems: CartItemWithBook[] = (cartItemsData || []).map(item => ({
      ...item,
      book: getBookById(item.bookId),
  }));

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDelete = (cartItemId: string) => {
    if (!user || !firestore) return;
    const docRef = doc(firestore, 'users', user.uid, 'cartItems', cartItemId);
    deleteDocumentNonBlocking(docRef);
    toast({
        title: 'Item removed',
        description: 'The item has been removed from your cart.',
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (!user || !firestore || newQuantity < 1) return;
    const docRef = doc(firestore, 'users', user.uid, 'cartItems', cartItemId);
    updateDocumentNonBlocking(docRef, { quantity: newQuantity });
  }

  const subtotal = cartItems.reduce((acc, item) => acc + (item.book?.price || 0) * item.quantity, 0);
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;

  const handleCheckout = async () => {
    if (!user || !firestore || cartItems.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Checkout Error',
        description: user ? 'Your cart is empty.' : 'You must be logged in to check out.',
      });
      return;
    }

    try {
      // 1. Create a new order document
      const ordersRef = collection(firestore, 'users', user.uid, 'orders');
      const newOrderRef = doc(ordersRef); // Create a new doc with a generated ID
      
      const orderData = {
        id: newOrderRef.id,
        userId: user.uid,
        bookIds: cartItems.map(item => item.bookId),
        totalPrice: total,
        paymentStatus: 'pending', // Assume payment is handled separately
        timestamp: serverTimestamp(),
        status: 'pending',
      };
      
      // 2. Clear the cart using a batched write
      const batch = writeBatch(firestore);
      batch.set(newOrderRef, orderData); // Add the new order to the batch

      cartItemsData?.forEach(item => {
        const itemRef = doc(firestore, 'users', user.uid, 'cartItems', item.id);
        batch.delete(itemRef);
      });

      await batch.commit();

      toast({
        title: 'Order Placed!',
        description: 'Your order has been successfully placed.',
      });

    } catch (error) {
      console.error("Error placing order: ", error);
      toast({
        variant: 'destructive',
        title: 'Uh oh!',
        description: 'There was an error placing your order. Please try again.',
      });
    }
  };


  if (!isClient || isLoading) {
    // You can add a loading spinner here
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <p>Loading your cart...</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold text-center mb-8">Shopping Cart</h1>
      
      {cartItems.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => {
              if (!item.book) return null;
              const image = placeholderImages.find(p => p.id === item.book?.coverImage);
              return (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="flex gap-4 p-4">
                    <div className="relative h-32 w-24 flex-shrink-0">
                      {image && <Image src={image.imageUrl} alt={item.book.title} fill className="object-cover rounded-md" />}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="font-headline font-semibold">{item.book.title}</h2>
                        <p className="text-sm text-muted-foreground">{item.book.author.name}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-lg font-semibold text-primary">${item.book.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold w-4 text-center">{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleDelete(item.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={handleCheckout}>Proceed to Checkout</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">{user ? "Your cart is empty" : "Please log in"}</h2>
          <p className="mt-2 text-muted-foreground">
            { user ? "Looks like you haven't added any books yet." : "Log in to see your cart and start shopping."}
          </p>
          <Button asChild className="mt-6">
            <Link href={user ? "/shop" : "/login"}>{user ? "Start Shopping" : "Log In"}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

    