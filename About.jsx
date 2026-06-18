import React from "react";
import Layout from "@/components/layout/Layout";
import { LogoMeaning } from "@/components/shared/LogoMeaning";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { FALLBACK_MESSAGES } from "@/lib/fallback-data";

export default function About() {
  const leaders = [
    { ...FALLBACK_MESSAGES.founder, filename: "founder.jpg" },
    { ...FALLBACK_MESSAGES.vp, filename: "vp.jpg" },
    { ...FALLBACK_MESSAGES.principal, filename: "principal.jpg" },
    { ...FALLBACK_MESSAGES.hod, filename: "hod.jpg" },
    { ...FALLBACK_MESSAGES.manager, filename: "manager.jpg" },
  ];

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">About Our School</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            A legacy of education, discipline, and service since 1952.
          </p>
        </div>
      </section>

      {/* History & Philosophy */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground font-serif">
            <p className="text-xl leading-relaxed text-foreground first-letter:text-5xl first-letter:font-bold first-letter:text-secondary first-letter:mr-1 first-letter:float-left">
              Founded in 1952, Gopal Vidyalaya Inter College has stood as a beacon of learning in Prayagraj for over seven decades. Affiliated with the UP Board, our English-medium institution was built on a foundational philosophy that continues to guide us today: <strong>"Service to Humanity is Service to God."</strong>
            </p>
            <p className="leading-relaxed mt-6">
              What began as a modest effort to bring quality education to Koraon has blossomed into a premier institution serving over 1500+ students from Nursery to Class 12. Our commitment has always been to provide an environment where traditional values meet modern educational standards. We believe that true education goes beyond textbooks—it builds character, instills discipline, and prepares students to face the world with confidence and compassion.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Meaning */}
      <LogoMeaning />

      {/* Leadership */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Leadership</h2>
            <p className="text-muted-foreground">
              The visionaries and educators who guide Gopal Vidyalaya towards continuous excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leaders.map((leader, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                  <ImagePlaceholder 
                    filename={leader.filename} 
                    className="absolute inset-0 w-full h-full"
                    text={leader.title}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif font-bold text-lg text-primary mb-1">{leader.name}</h3>
                  <p className="text-sm font-medium text-secondary uppercase tracking-wider">{leader.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
