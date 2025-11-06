
'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDoc, useFirebase, useUser, useMemoFirebase } from '@/firebase';
import { doc, Timestamp } from 'firebase/firestore';
import type { Order } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ShoppingBag } from 'lucide-react';

function SuccessPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('orderId');

    const { user } = useUser();
    const { firestore } = useFirebase();

    const orderRef = useMemoFirebase(() => {
        if (!user || !firestore || !orderId) return null;
        return doc(firestore, 'users', user.uid, 'orders', orderId);
    }, [user, firestore, orderId]);

    const { data: order, isLoading } = useDoc<Order>(orderRef);

    if (isLoading) {
        return <div className="text-center"><p>Loading order details...</p></div>;
    }
    
    if (!order && !isLoading) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-semibold">Order Not Found</h2>
                <p className="mt-2 text-muted-foreground">We couldn't find the details for this order.</p>
                <Button asChild className="mt-6">
                    <Link href="/shop">Continue Shopping</Link>
                </Button>
            </div>
        );
    }
    
    if(!order) return null;

    const paymentMethodMap = {
        'credit-card': 'Credit Card',
        'debit-card': 'Debit Card',
        'cod': 'Cash on Delivery'
    };

    return (
        <div className="flex flex-col items-center text-center">
            <CheckCircle className="h-24 w-24 text-green-500" />
            <h1 className="mt-6 text-4xl font-headline font-bold">Thank You for Your Order!</h1>
            <p className="mt-2 text-muted-foreground">Your order has been confirmed and will be processed shortly.</p>

            <Card className="mt-8 w-full max-w-2xl text-left">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>Order ID: #{order.id.substring(0, 7)}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Total</p>
                            <p className="font-bold text-lg">₹{order.totalPrice.toFixed(2)}</p>
                        </div>
                         <div className="flex justify-between">
                            <p className="text-muted-foreground">Payment Method</p>
                            <p className="font-medium">{(paymentMethodMap as any)[order.paymentMethod] || 'N/A'}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8 flex gap-4">
                <Button asChild>
                    <Link href="/shop">
                        <ShoppingBag className="mr-2" />
                        Continue Shopping
                    </Link>
                </Button>
                 <Button asChild variant="outline">
                    <Link href="/orders">View My Orders</Link>
                </Button>
            </div>
        </div>
    );
}


export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
        <Suspense fallback={<div className="text-center"><p>Loading...</p></div>}>
            <SuccessPageContent />
        </Suspense>
    </div>
  );
}
