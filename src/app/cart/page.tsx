import Image from "next/image";
import Link from "next/link";
import { getBooks } from "@/lib/data";
import { placeholderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  // Mock cart data
  const cartItems = getBooks().slice(0, 2).map((book, index) => ({ ...book, quantity: index + 1 }));
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold text-center mb-8">Shopping Cart</h1>
      
      {cartItems.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const image = placeholderImages.find(p => p.id === item.coverImage);
              return (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="flex gap-4 p-4">
                    <div className="relative h-32 w-24 flex-shrink-0">
                      {image && <Image src={image.imageUrl} alt={item.title} fill className="object-cover rounded-md" />}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="font-headline font-semibold">{item.title}</h2>
                        <p className="text-sm text-muted-foreground">{item.author.name}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-lg font-semibold text-primary">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2">
                            <Input type="number" value={item.quantity} className="w-16 h-9" />
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
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
              <CardContent className="space-y-4">
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
                <Button className="w-full" size="lg">Proceed to Checkout</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added any books yet.</p>
          <Button asChild className="mt-6">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
