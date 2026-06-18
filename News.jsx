import React from "react";
import Layout from "@/components/layout/Layout";
import { useNews } from "@/hooks/useData";
import { Calendar, Tag } from "lucide-react";

export default function News() {
  const { data: news, isLoading } = useNews();

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">News & Events</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Stay updated with the latest happenings, announcements, and celebrations.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          {isLoading ? (
            <div className="space-y-6">
              {[1,2,3].map(i => (
                <div key={i} className="animate-pulse h-32 bg-card border border-border rounded-xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6">
              {news?.map((item: any) => (
                <div key={item.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start md:items-center">
                  
                  {/* Date Block */}
                  <div className="shrink-0 bg-primary/5 border border-primary/10 rounded-lg p-4 text-center min-w-[120px]">
                    <div className="text-secondary font-bold text-xl">
                      {new Date(item.event_date).getDate()}
                    </div>
                    <div className="text-primary font-serif font-medium uppercase text-sm">
                      {new Date(item.event_date).toLocaleString('default', { month: 'short', year: 'numeric' })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                        item.category === 'news' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-primary mb-3">
                      {item.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.content}
                    </p>
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
