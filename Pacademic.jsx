import React from "react";
import Layout from "@/components/layout/Layout";
import { Book, GraduationCap, Microscope, Code, Globe, Calculator } from "lucide-react";

export default function Academics() {
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Academics & Curriculum</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Rigorous UP Board curriculum designed for comprehensive student development.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Foundation */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8 border-b border-border pb-4">
              <div className="p-3 bg-secondary/20 rounded-lg text-secondary">
                <Book size={28} />
              </div>
              <h2 className="text-3xl font-serif font-bold text-primary">Nursery to Class 10</h2>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <p className="text-muted-foreground font-serif text-lg leading-relaxed mb-6">
                Our foundational years are built on the robust NCERT-based curriculum, emphasizing conceptual clarity, critical thinking, and language proficiency. We provide a balanced mix of academics, arts, and physical education to ensure holistic growth.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Computer Science', 'Art & Craft', 'Physical Education'].map(subject => (
                  <div key={subject} className="flex items-center gap-2 p-3 bg-muted rounded-md text-sm font-medium text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                    {subject}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Senior Secondary */}
          <div>
            <div className="flex items-center gap-4 mb-8 border-b border-border pb-4">
              <div className="p-3 bg-secondary/20 rounded-lg text-secondary">
                <GraduationCap size={28} />
              </div>
              <h2 className="text-3xl font-serif font-bold text-primary">Class 11 & 12 Streams</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* PCM */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="text-secondary" size={24} />
                  <h3 className="text-xl font-bold font-serif text-primary">Science (PCM)</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Physics</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Chemistry</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Mathematics</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">English / Hindi</span></li>
                </ul>
              </div>

              {/* PCB */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Microscope className="text-secondary" size={24} />
                  <h3 className="text-xl font-bold font-serif text-primary">Science (PCB)</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Physics</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Chemistry</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Biology</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">English / Hindi</span></li>
                </ul>
              </div>

              {/* Commerce */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="text-secondary" size={24} />
                  <h3 className="text-xl font-bold font-serif text-primary">Commerce</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Accountancy</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Business Studies</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Economics</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">English / Hindi</span></li>
                </ul>
              </div>

              {/* Arts */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="text-secondary" size={24} />
                  <h3 className="text-xl font-bold font-serif text-primary">Humanities / Arts</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">History</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Geography</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">Political Science</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span className="text-muted-foreground">English / Hindi</span></li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
