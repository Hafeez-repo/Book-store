import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <p className="text-primary font-semibold">Get In Touch</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-headline font-bold text-foreground">
          Contact Us
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have a question or feedback? We'd love to hear from you. Fill out the form below or reach out to us through our contact details.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-12 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
            <CardDescription>We'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={5} />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-8">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                    <Mail className="h-6 w-6"/>
                </div>
                <div>
                    <h3 className="text-xl font-semibold font-headline">Email</h3>
                    <p className="text-muted-foreground">Send us an email for any inquiries.</p>
                    <a href="mailto:support@librisdigitalis.com" className="text-primary hover:underline">support@librisdigitalis.com</a>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                    <Phone className="h-6 w-6"/>
                </div>
                <div>
                    <h3 className="text-xl font-semibold font-headline">Phone</h3>
                    <p className="text-muted-foreground">Our support team is available Mon-Fri.</p>
                    <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                    <MapPin className="h-6 w-6"/>
                </div>
                <div>
                    <h3 className="text-xl font-semibold font-headline">Office</h3>
                    <p className="text-muted-foreground">123 Bookworm Lane, Readington, BK 11221</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
