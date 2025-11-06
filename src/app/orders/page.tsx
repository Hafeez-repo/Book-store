
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCollection, useFirebase, useUser, useMemoFirebase } from '@/firebase';
import { collection, Timestamp } from 'firebase/firestore';
import type { Order } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { ClientFormattedDate } from '@/components/books/ClientFormattedDate';

interface OrderWithDate extends Omit<Order, 'timestamp'> {
  timestamp: Date;
}

function OrderCard({ order }: { order: OrderWithDate }) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle className="font-headline text-lg">Order Details</CardTitle>
          <CardDescription>
            <span>Placed on <ClientFormattedDate dateString={order.timestamp.toISOString()} /></span>
            <span className="mx-2">|</span>
            <span>Order ID: #{order.id.substring(0, 7)}</span>
          </CardDescription>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-lg font-bold">₹{order.totalPrice.toFixed(2)}</p>
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <div className="space-y-4">
          {order.items.map((item, index) => {
            const image = placeholderImages.find(p => p.id === item.coverImage);
            return (
              <div key={`${item.bookId}-${index}`} className="flex gap-4">
                <div className="relative h-24 w-16 flex-shrink-0">
                   {image && <Image src={image.imageUrl} alt={item.title} fill className="object-cover rounded-md" />}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.author}</p>
                  <p className="text-sm text-primary font-medium">₹{item.price.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
      <CardFooter>
          <Button variant="outline" className="w-full sm:w-auto">Track Order</Button>
      </CardFooter>
    </Card>
  )
}

export default function MyOrdersPage() {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ordersRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'orders');
  }, [user, firestore]);

  const { data: ordersData, isLoading } = useCollection<Order>(ordersRef);

  const orders: OrderWithDate[] = (ordersData || []).map(order => ({
      ...order,
      timestamp: (order.timestamp as unknown as Timestamp)?.toDate() || new Date()
  })).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  if (!isClient || isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Loading your orders...</p>
      </div>
    );
  }
  
  if (!user) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-headline font-bold mb-4">My Orders</h1>
            <p className="text-muted-foreground mb-6">Please log in to see your order history.</p>
            <Button asChild>
                <Link href="/login">Log In</Link>
            </Button>
        </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold text-center mb-8">My Orders</h1>
      {orders.length > 0 ? (
        <div className="max-w-4xl mx-auto space-y-6">
            {orders.map(order => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No Orders Yet</h2>
          <p className="mt-2 text-muted-foreground">You haven't placed any orders yet. Time to start shopping!</p>
          <Button asChild className="mt-6">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
