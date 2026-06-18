import React from "react";
import Layout from "@/components/layout/Layout";
import { useFacilities } from "@/hooks/useData";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export default function Facilities() {
  const { data: facilities, isLoading } = useFacilities();

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Campus Facilities</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Providing a modern, safe, and stimulating environment for holistic education.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          {isLoading ? (
            <div className="space-y-12">
              {[1,2,3].map(i => (
                <div key={i} className="animate-pulse flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/2 aspect-video bg-muted rounded-xl"></div>
                  <div className="flex-1 space-y-4 py-8">
                    <div className="h-8 bg-muted rounded w-2/3"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {facilities?.map((facility: any, index: number) => (
                <div key={facility.id} className={`flex flex-col gap-8 md:items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                  
                  <div className="w-full md:w-1/2 shrink-0">
                    <div className="aspect-video rounded-xl overflow-hidden shadow-lg border border-border relative group">
                      <ImagePlaceholder 
                        filename={facility.image_name || "facility.jpg"}
                        className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                        text={facility.name}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold font-serif">
                        {index + 1}
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-primary">{facility.name}</h2>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed font-serif">
                      {facility.description}
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
