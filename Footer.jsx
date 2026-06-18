import React from "react";
import { Link } from "wouter";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-serif font-bold text-primary-foreground text-lg">
                GV
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg leading-tight">
                  Gopal Vidyalaya
                </span>
                <span className="text-xs text-secondary font-medium tracking-wider">
                  INTER COLLEGE
                </span>
              </div>
            </div>
            <p className="text-sm opacity-80 max-w-sm mb-4">
              A prestigious English-medium school in Prayagraj, rooted in the
              philosophy "Service to Humanity is Service to God." Founded in
              1952.
            </p>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4 text-secondary">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link
                  href="/about"
                  className="hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/academics"
                  className="hover:text-secondary transition-colors"
                >
                  Academics
                </Link>
              </li>
              <li>
                <Link
                  href="/facilities"
                  className="hover:text-secondary transition-colors"
                >
                  Facilities
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-secondary transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4 text-secondary">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                <span>
                  Shastri Nagar, Koraon,
                  <br />
                  Prayagraj, Uttar Pradesh – 212306
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary shrink-0" />
                <span>7991308323</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary shrink-0" />
                <span>gvicem@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-background/20 flex flex-col md:flex-row items-center justify-between text-sm opacity-70">
          <p>
            &copy; {new Date().getFullYear()} Gopal Vidyalaya Inter College. All
            rights reserved.
          </p>
          <Link
            href="/admin"
            className="hover:text-secondary mt-2 md:mt-0 transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
