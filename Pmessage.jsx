import React from "react";
import Layout from "@/components/layout/Layout";
import { useMessages } from "@/hooks/useData";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export default function Messages() {
  const { data: messages, isLoading } = useMessages();

  // Order defined in requirements
  const order = ['founder', 'vp', 'principal', 'hod', 'manager'];
  
  const sortedMessages = messages?.sort((a: any, b: any) => {
    return order.indexOf(a.role) - order.indexOf(b.role);
  });

  const roleTitles: Record<string, string> = {
    founder: "Founder",
    vp: "Vice President",
    principal: "Principal",
    hod: "Head of Department",
    manager: "Manager"
  };

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Leadership Messages</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Words of guidance and vision from our school's leadership.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          {isLoading ? (
            <div className="space-y-12">
              {[1,2,3].map(i => (
                <div key={i} className="animate-pulse flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/3 aspect-[3/4] bg-muted rounded-lg"></div>
                  <div className="flex-1 space-y-4 py-4">
                    <div className="h-8 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="space-y-2 mt-8">
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-24">
              {sortedMessages?.map((msg: any, index: number) => (
                <div key={msg.id || msg.role} className={`flex flex-col gap-10 md:items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                  
                  <div className="w-full md:w-1/3 shrink-0">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg border border-border relative">
                      <ImagePlaceholder 
                        filename={`${msg.role}.jpg`}
                        className="absolute inset-0 w-full h-full"
                        text={roleTitles[msg.role]}
                      />
                    </div>
                  </div>

                  <div className="flex-1 relative">
                    <div className="absolute -top-10 -left-6 text-8xl text-accent opacity-50 font-serif z-0">"</div>
                    <div className="relative z-10">
                      <h2 className="text-3xl font-serif font-bold text-primary mb-2">{msg.name}</h2>
                      <h3 className="text-lg font-medium text-secondary uppercase tracking-wider mb-6">
                        {roleTitles[msg.role] || msg.role}
                      </h3>
                      
                      <div className="prose prose-lg dark:prose-invert text-muted-foreground font-serif leading-relaxed">
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
