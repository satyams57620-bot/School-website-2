import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { supabase, hasSupabaseConfig } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Image as ImageIcon, FileText, MessageSquare, Users, Building, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AdminLayout({ children, title }: { children: React.ReactNode, title: string }) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!hasSupabaseConfig()) {
      setChecking(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setLocation("/admin");
      }
      setChecking(false);
    });
  }, [setLocation]);

  const handleLogout = async () => {
    if (hasSupabaseConfig()) {
      await supabase.auth.signOut();
    }
    toast({ title: "Logged out" });
    setLocation("/admin");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "News & Events", href: "/admin/news", icon: FileText },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Teachers", href: "/admin/teachers", icon: Users },
    { name: "Facilities", href: "/admin/facilities", icon: Building },
  ];

  if (checking) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-[100dvh] flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col fixed inset-y-0 z-10">
        <div className="p-6 border-b border-border">
          <h2 className="font-serif font-bold text-xl text-primary">Admin Panel</h2>
          <p className="text-xs text-muted-foreground mt-1">Gopal Vidyalaya</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground text-foreground">
                <Icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full mt-2">Back to Site</Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-primary">{title}</h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
