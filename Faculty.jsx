import React from "react";
import Layout from "@/components/layout/Layout";
import { useTeachers } from "@/hooks/useData";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BookOpen } from "lucide-react";

export default function Faculty() {
  const { data: teachers, isLoading } = useTeachers();

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Faculty</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Dedicated educators committed to shaping the future of our students.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="animate-pulse bg-card rounded-xl border border-border overflow-hidden">
                  <div className="aspect-[4/5] bg-muted w-full"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teachers?.map((teacher: any) => (
                <div key={teacher.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group flex flex-col">
                  <div className="aspect-[4/5] relative overflow-hidden bg-muted">
                    <ImagePlaceholder 
                      filename={teacher.image_name || "placeholder.jpg"} 
                      className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
                      text={teacher.name}
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col bg-card relative z-10 border-t border-border">
                    <h3 className="font-serif font-bold text-lg text-primary mb-1">{teacher.name}</h3>
                    <div className="flex items-center gap-2 text-secondary mb-3 mt-auto">
                      <BookOpen size={16} />
                      <span className="text-sm font-medium">{teacher.subject}</span>
                    </div>
                    <div className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider rounded-md w-fit">
                      {teacher.designation}
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
