import React from "react";
import Layout from "@/components/layout/Layout";
import { LogoMeaning } from "@/components/shared/LogoMeaning";
import { Link } from "wouter";
import { Users, BookOpen, Clock, GraduationCap } from "lucide-react";
import { useNews } from "@/hooks/useData";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: news } = useNews();
  const recentNews = news?.slice(0, 3) || [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <span className="hero-title text-secondary font-bold tracking-widest text-sm uppercase mb-4">Established 1952</span>
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 max-w-4xl leading-tight text-primary-foreground">
            Gopal Vidyalaya Inter College
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl font-serif italic text-accent mb-10 max-w-2xl">
            "Service to Humanity is Service to God"
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4">
            <Link href="/about">
              <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 text-lg px-8">
                Our History
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10 text-lg px-8 text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-card border-b border-border py-12 shadow-sm relative z-20 -mt-8 mx-4 rounded-lg container md:mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border">
          <div className="flex flex-col items-center">
            <Clock className="text-secondary mb-3" size={32} />
            <span className="text-3xl font-serif font-bold text-primary">1952</span>
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">Founded</span>
          </div>
          <div className="flex flex-col items-center">
            <GraduationCap className="text-secondary mb-3" size={32} />
            <span className="text-3xl font-serif font-bold text-primary">Ncy-12th</span>
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">Classes</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="text-secondary mb-3" size={32} />
            <span className="text-3xl font-serif font-bold text-primary">500+</span>
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">Students</span>
          </div>
          <div className="flex flex-col items-center">
            <BookOpen className="text-secondary mb-3" size={32} />
            <span className="text-3xl font-serif font-bold text-primary">8</span>
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">Core Faculty</span>
          </div>
        </div>
      </section>

      {/* Logo Meaning */}
      <div className="mt-16">
        <LogoMeaning />
      </div>

      {/* News Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-2">Latest Updates</h2>
              <p className="text-muted-foreground">Stay informed with the latest news and events.</p>
            </div>
            <Link href="/news">
              <Button variant="outline" className="hidden sm:inline-flex">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentNews.map((item: any) => (
              <div key={item.id} className="group cursor-pointer border border-border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-all flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${item.category === 'news' ? 'bg-primary/10 text-primary' : 'bg-secondary/20 text-secondary-foreground text-orange-700'}`}>
                      {item.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(item.event_date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-primary mb-3 group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/news">
              <Button variant="outline" className="w-full">View All Updates</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Facilities Highlight */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6 text-primary-foreground">Modern Facilities for Holistic Growth</h2>
          <p className="max-w-2xl mx-auto text-primary-foreground/80 mb-10 text-lg">
            From smart classrooms to fully equipped science labs and expansive sports grounds, we provide an environment that nurtures every aspect of student development.
          </p>
          <Link href="/facilities">
            <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90">
              Explore Our Campus
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
