
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useCollection, useFirebase, useUser, useMemoFirebase } from '@/firebase';
import { collection, doc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { CartItem, Book } from '@/lib/types';
import { getBookById } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PaymentAnimation } from '@/components/checkout/PaymentAnimation';
import { CreditCard, Landmark, Wallet } from 'lucide-react';

interface CartItemWithBook extends CartItem {
  book: Book | undefined;
}

export default function CheckoutPage() {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  const cartItemsRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'cartItems');
  }, [user, firestore]);

  const { data: cartItemsData, isLoading } = useCollection<CartItem>(cartItemsRef);

  const cartItems: CartItemWithBook[] = (cartItemsData || []).map(item => ({
    ...item,
    book: getBookById(item.bookId),
  }));

  const subtotal = cartItems.reduce((acc, item) => acc + (item.book?.price || 0) * item.quantity, 0);
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;

  const handlePlaceOrder = async () => {
    if (!user || !firestore || cartItems.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Checkout Error',
        description: user ? 'Your cart is empty.' : 'You must be logged in to check out.',
      });
      return;
    }

    setIsProcessing(true);

    try {
      const ordersRef = collection(firestore, 'users', user.uid, 'orders');
      const newOrderRef = doc(ordersRef);
      
      const orderData = {
        id: newOrderRef.id,
        userId: user.uid,
        items: cartItems.map(item => ({
            bookId: item.bookId,
            title: item.book?.title,
            author: item.book?.author.name,
            price: item.book?.price,
            quantity: item.quantity,
            coverImage: item.book?.coverImage,
        })),
        totalPrice: total,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
        timestamp: serverTimestamp(),
        status: 'pending',
      };
      
      const batch = writeBatch(firestore);
      batch.set(newOrderRef, orderData);

      cartItemsData?.forEach(item => {
        const itemRef = doc(firestore, 'users', user.uid, 'cartItems', item.id);
        batch.delete(itemRef);
      });

      await batch.commit();

      // On successful payment & order creation
      // Redirect to a success page with the order ID
      router.push(`/checkout/success?orderId=${newOrderRef.id}`);

    } catch (error) {
      console.error("Error placing order: ", error);
      toast({
        variant: 'destructive',
        title: 'Uh oh!',
        description: 'There was an error placing your order. Please try again.',
      });
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center"><p>Loading checkout...</p></div>;
  }
  
  if (!user) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-headline font-bold mb-4">Checkout</h1>
            <p className="text-muted-foreground mb-6">Please log in to complete your purchase.</p>
            <Button asChild>
                <Link href="/login">Log In</Link>
            </Button>
        </div>
    );
  }

  if (cartItems.length === 0 && !isLoading) {
     return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-headline font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">Add some books to your cart before checking out.</p>
            <Button asChild>
                <Link href="/shop">Start Shopping</Link>
            </Button>
        </div>
    );
  }

  if (isProcessing) {
      return <PaymentAnimation onComplete={handlePlaceOrder} />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold text-center mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Select Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <Label htmlFor="credit-card" className="flex items-center gap-4 border rounded-md p-4 has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all cursor-pointer">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <p className="font-semibold">Credit Card</p>
                    <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, etc.</p>
                  </div>
                  <RadioGroupItem value="credit-card" id="credit-card" />
                </Label>
                <Label htmlFor="debit-card" className="flex items-center gap-4 border rounded-md p-4 has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all cursor-pointer">
                  <Landmark className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <p className="font-semibold">Debit Card</p>
                    <p className="text-sm text-muted-foreground">Pay directly from your bank.</p>
                  </div>
                  <RadioGroupItem value="debit-card" id="debit-card" />
                </Label>
                <Label htmlFor="cod" className="flex items-center gap-4 border rounded-md p-4 has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all cursor-pointer">
                  <Wallet className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <p className="font-semibold">Cash on Delivery</p>
                    <p className="text-sm text-muted-foreground">Pay with cash when your order arrives.</p>
                  </div>
                  <RadioGroupItem value="cod" id="cod" />
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground truncate pr-4">{item.book?.title} x{item.quantity}</span>
                    <span className="font-medium">₹{( (item.book?.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span>₹{taxes.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <Button size="lg" className="w-full mt-4" onClick={() => setIsProcessing(true)}>
                Pay Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
