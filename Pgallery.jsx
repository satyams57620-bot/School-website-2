import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useGallery } from "@/hooks/useData";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export default function Gallery() {
  const { data: galleryItems, isLoading } = useGallery();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = galleryItems || [];

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Photo Gallery</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Glimpses of life, learning, and celebrations at Gopal Vidyalaya.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          {isLoading ? (
            <div className="w-full aspect-video bg-muted animate-pulse rounded-xl"></div>
          ) : images.length > 0 ? (
            <div className="space-y-6">
              {/* Main Slider */}
              <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-xl border border-border bg-muted">
                {images.map((img: any, idx: number) => (
                  <div 
                    key={img.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <ImagePlaceholder 
                      filename={img.image_url} 
                      className="w-full h-full"
                      text={img.title}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                      <h3 className="text-white font-serif text-2xl font-bold">{img.title}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Thumbnails/Dots */}
              <div className="flex justify-center gap-3 mt-6 flex-wrap">
                {images.map((_, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentIndex ? "bg-secondary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              
              {/* Grid View */}
              <div className="mt-20">
                <h2 className="text-2xl font-serif font-bold text-primary mb-8 border-b border-border pb-4">All Photos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img: any, idx: number) => (
                    <div 
                      key={img.id} 
                      className="aspect-square rounded-lg overflow-hidden border border-border cursor-pointer hover:shadow-md transition-all group relative"
                      onClick={() => setCurrentIndex(idx)}
                    >
                      <ImagePlaceholder filename={img.image_url} className="w-full h-full group-hover:scale-105 transition-transform duration-500" text="" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-4">
                        <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                          {img.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-muted rounded-lg border border-border">
              <p className="text-muted-foreground">No gallery images available.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
