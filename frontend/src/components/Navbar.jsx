import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Satellite, Menu, X, Bell, User, Sparkles, MapPin, Layers } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Overview", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Crop Health & Spectral", path: "/crop-health" },
    { label: "GIS Satellite Monitor", path: "/gis-monitor" },
    { label: "AI Assistant & Reports", path: "/ai-assistant" },
    { label: "Agronomy Suite", path: "/suite" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-surface-variant/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[24px]">satellite_alt</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline font-bold text-lg tracking-tight text-on-surface">
                  AgroVision
                </span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold tracking-wider uppercase">
                  AI Pro
                </span>
              </div>
              <span className="text-[11px] text-on-surface-variant/80 -mt-0.5 font-medium">
                AgriSat Precision Agronomy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-primary-container text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & User */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Live Orbit Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-surface-variant/50 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="font-semibold text-secondary-container-on font-mono text-[11px] text-primary">
                Sentinel-2B Live
              </span>
            </div>

            {/* Quick Alerts */}
            <Link
              to="/crop-health"
              className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
              title="2 Anomalies Detected"
            >
              <Bell className="w-5 h-5 text-on-surface-variant" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error"></span>
            </Link>

            {/* User Profile or Login */}
            <Link
              to="/login"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">
                SJ
              </div>
              <div className="text-left text-xs hidden md:block">
                <p className="font-semibold text-on-surface leading-tight">Sarah Jenkins</p>
                <p className="text-[10px] text-on-surface-variant">Lead Agronomist</p>
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-on-surface hover:bg-surface-container"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-surface-variant/60 bg-surface px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  active
                    ? "bg-primary-container text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-surface-variant/50 flex gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 rounded-lg bg-surface-container text-sm font-medium text-on-surface"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 rounded-lg bg-primary-container text-sm font-medium text-on-primary"
            >
              Register Farm
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

