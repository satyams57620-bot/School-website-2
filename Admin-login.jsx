import React, { useState } from "react";
import { useLocation } from "wouter";
import { supabase, hasSupabaseConfig } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!hasSupabaseConfig()) {
      setLocation("/admin/dashboard");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          setError("Your email is not confirmed. Go to Supabase → Authentication → Users → click your user → set Email Confirmed to ON.");
        } else if (error.message.includes("Invalid login credentials")) {
          setError("Wrong email or password. Please check and try again.");
        } else {
          setError(error.message);
        }
        setLoading(false);
      } else {
        setLocation("/admin/dashboard");
      }
    } catch (e: any) {
      setError("Connection failed. Please check your Supabase credentials in Replit Secrets.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <div className="max-w-md w-full bg-card border border-border p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center font-serif font-bold text-primary-foreground text-2xl mx-auto mb-4">
            GV
          </div>
          <h1 className="text-2xl font-serif font-bold text-primary">Admin Portal</h1>
          <p className="text-muted-foreground text-sm mt-2">Sign in to manage website content</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              autoComplete="email"
              data-testid="input-admin-email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Your password"
              required
              autoComplete="current-password"
              data-testid="input-admin-password"
            />
          </div>
          <Button type="submit" className="w-full mt-6" disabled={loading} data-testid="button-admin-signin">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
