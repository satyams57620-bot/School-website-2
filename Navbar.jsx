import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Home, Info, MessageSquare, BookOpen, Users, Building, Image, Newspaper, Phone, ShieldCheck, Trophy, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home",          href: "/",           icon: Home },
  { name: "About",         href: "/about",       icon: Info },
  { name: "Messages",      href: "/messages",    icon: MessageSquare },
  { name: "Academics",     href: "/academics",   icon: BookOpen },
  { name: "Faculty",       href: "/faculty",     icon: Users },
  { name: "Facilities",    href: "/facilities",  icon: Building },
  { name: "Gallery",       href: "/gallery",     icon: Image },
  { name: "News & Events", href: "/news",        icon: Newspaper },
  { name: "Contact",       href: "/contact",     icon: Phone },
];

const resultSubLinks = [
  { name: "10th Toppers", href: "/results?class=10" },
  { name: "12th Toppers", href: "/results?class=12" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [resultsOpen, setResultsOpen] = React.useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
    setResultsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    const handleClick = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.addEventListener("mousedown", handleClick);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isResultsActive = location === "/results";

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/school-logo.png"
                alt="Gopal Vidyalaya Logo"
                className="w-12 h-12 rounded-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-serif md:text-xl text-[40px] text-ring font-extralight bg-[#f0000000]">GOPAL  VIDYALAYA  INTER  COLLEGE [ENGLISH  MEDIUM]</span>
              </div>
            </Link>

            {/* Menu Button — always on right */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/10 hover:bg-secondary transition-all duration-200 text-primary-foreground font-medium text-sm"
            >
              <Menu size={20} />
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
      />

      {/* Slide-out Drawer from Right */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[90vw] bg-primary text-primary-foreground shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Navigation menu"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-primary-foreground/10">
          <div className="flex items-center gap-3">
            <img src="/school-logo.png" alt="Logo" className="w-9 h-9 rounded-full object-cover" />
            <div>
              <p className="font-serif font-bold text-base leading-tight">Gopal Vidyalaya</p>
              <p className="text-xs text-secondary tracking-wider">INTER COLLEGE</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-4 px-4 py-3 rounded-xl mb-1 font-medium text-sm transition-all duration-150 drawer-link"
              >
                <span className={`p-2 rounded-lg ${active ? "bg-secondary text-white" : "bg-primary-foreground/10 text-secondary"}`}>
                  <Icon size={16} />
                </span>
                <span className={active ? "text-secondary font-bold" : "text-primary-foreground"}>
                  {link.name}
                </span>
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary" />}
              </Link>
            );
          })}

          {/* Results — collapsible with sub-links */}
          <div className="mb-1">
            <button
              onClick={() => setResultsOpen(r => !r)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 drawer-link ${isResultsActive ? "text-secondary" : "text-primary-foreground"}`}
            >
              <span className={`p-2 rounded-lg ${isResultsActive ? "bg-secondary text-white" : "bg-primary-foreground/10 text-secondary"}`}>
                <Trophy size={16} />
              </span>
              <span className={isResultsActive ? "font-bold" : ""}>Results</span>
              <ChevronDown
                size={16}
                className={`ml-auto transition-transform duration-200 ${resultsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Sub-links */}
            <div className={`overflow-hidden transition-all duration-200 ${resultsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="pl-14 pr-3 pb-1 space-y-0.5">
                {resultSubLinks.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/10 transition-all duration-150"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/60 flex-shrink-0" />
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Admin Portal at Bottom */}
        <div className="px-3 pb-6 pt-2 border-t border-primary-foreground/10">
          <Link
            href="/admin"
            className="flex items-center gap-4 px-4 py-3 rounded-xl bg-secondary/20 hover:bg-secondary hover:text-white transition-all duration-200 font-semibold text-sm text-secondary"
          >
            <span className="p-2 rounded-lg bg-secondary text-white">
              <ShieldCheck size={16} />
            </span>
            Admin Portal
          </Link>
        </div>
      </div>
    </>
  );
}
