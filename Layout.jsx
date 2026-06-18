import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col page-enter">
        {children}
      </main>
      <Footer />
    </div>
  );
}
