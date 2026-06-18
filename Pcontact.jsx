import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { supabase, hasSupabaseConfig } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    if (hasSupabaseConfig()) {
      const { error } = await supabase.from('enquiries').insert([data]);
      if (error) {
        toast({ title: "Error", description: "Could not send message. Please try again.", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Your message has been sent successfully." });
        (e.target as HTMLFormElement).reset();
      }
    } else {
      // Simulate success if no DB
      setTimeout(() => {
        toast({ title: "Success", description: "Your message has been sent successfully (Simulated)." });
        (e.target as HTMLFormElement).reset();
        setIsSubmitting(false);
      }, 1000);
      return;
    }
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            We'd love to hear from you. Reach out to us for admissions, queries, or feedback.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Our administrative office is open during school hours. Feel free to visit us or contact us via phone or email.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Address</h3>
                    <p className="text-muted-foreground">Shastri Nagar, Koraon,<br/>Prayagraj, Uttar Pradesh – 212306</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Phone</h3>
                    <p className="text-muted-foreground">7991308323</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Email</h3>
                    <p className="text-muted-foreground">gvicem@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Office Hours</h3>
                    <p className="text-muted-foreground">Monday - Saturday: 8:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">Send an Enquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                  <Input id="name" name="name" required placeholder="John Doe" className="bg-background" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                  <Input id="phone" name="phone" required placeholder="Your contact number" className="bg-background" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
                  <Textarea id="message" name="message" required placeholder="How can we help you?" rows={5} className="bg-background resize-none" />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2">
                  {isSubmitting ? "Sending..." : "Submit Enquiry"}
                </Button>
              </form>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-16 w-full h-96 bg-muted rounded-xl border border-border flex items-center justify-center overflow-hidden">
            {/* TODO: Replace with Google Maps embed URL */}
            <div className="text-center p-6">
              <MapPin size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground font-medium">Google Maps Embed Placeholder</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Shastri Nagar, Koraon, Prayagraj</p>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
