import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const SITE_PASSWORD = "gvic1952";
const STORAGE_KEY = "gv_site_unlocked";

export function SiteGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "1") setUnlocked(true);
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === SITE_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(false), 3000);
    }
  };

  if (checking) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary"
      style={{ background: "linear-gradient(135deg, #fec00a 0%, #f59e0b 50%, #d97706 100%)" }}>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "repeating-conic-gradient(rgba(255,255,255,0.1) 0deg, rgba(255,255,255,0.1) 10deg, transparent 10deg, transparent 20deg)" }} />

      <div
        className={`relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 text-center transition-transform ${shake ? "animate-[shake_0.5s_ease]" : ""}`}
        style={{ animation: shake ? "shake 0.5s ease" : undefined }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/school-logo.png"
            alt="Gopal Vidyalaya"
            className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-primary"
            onError={(e: any) => { e.target.style.display = "none"; }}
          />
        </div>

        <h1 className="text-xl font-serif font-bold text-primary mb-1" style={{ color: "#1e3a6e" }}>
          Gopal Vidyalaya
        </h1>
        <p className="text-xs text-gray-500 tracking-wider mb-6">INTER COLLEGE [ENGLISH MEDIUM]</p>

        {/* Lock icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "#fec00a" }}>
            <Lock size={22} color="#1e3a6e" />
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-5">This site is password protected.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={input}
              onChange={e => { setInput(e.target.value); setError(false); }}
              placeholder="Enter password"
              autoFocus
              className={`w-full px-4 py-3 pr-12 rounded-xl border-2 text-sm outline-none transition-all ${
                error
                  ? "border-red-400 bg-red-50 text-red-700 placeholder:text-red-300"
                  : "border-gray-200 focus:border-yellow-400 bg-gray-50"
              }`}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPw(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-medium animate-fade-in">
              ❌ Incorrect password. Please try again.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-150 active:scale-95"
            style={{ background: "#1e3a6e", color: "#fff" }}
          >
            Enter Site
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-5">
          © Gopal Vidyalaya Inter College
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-8px); }
          30%       { transform: translateX(8px); }
          45%       { transform: translateX(-6px); }
          60%       { transform: translateX(6px); }
          75%       { transform: translateX(-4px); }
          90%       { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
