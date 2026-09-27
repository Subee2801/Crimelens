"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Map, BarChart3, Database, Info, Home, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Home",   path: "/",       icon: Home },
    { name: "Map",    path: "/map",    icon: Map },
    { name: "Trends", path: "/trends", icon: BarChart3 },
    { name: "Data",   path: "/data",   icon: Database },
    { name: "About",  path: "/about",  icon: Info },
  ];

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b shadow-2xl"
      style={{
        background: "rgba(10,10,10,0.96)",
        borderColor: "var(--cl-border)",
      }}
    >
      {/* Red top rule — newspaper masthead style */}
      <div style={{ height: "2px", background: "var(--cl-red)", width: "100%" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="w-8 h-8 rounded flex items-center justify-center shrink-0 transition-all group-hover:scale-105"
              style={{
                background: "var(--cl-red)",
                boxShadow: "0 0 12px var(--cl-red-glow)",
              }}
            >
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span
                className="text-sm font-black tracking-widest text-white uppercase"
                style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.2em" }}
              >
                Crime<span style={{ color: "var(--cl-red)" }}>Lens</span>
              </span>
              <span
                className="text-[9px] uppercase tracking-widest"
                style={{ color: "var(--cl-text-3)", letterSpacing: "0.15em" }}
              >
                Intelligence Platform
              </span>
            </div>
            <span className="block sm:hidden text-sm font-black tracking-widest text-white uppercase">
              Crime<span style={{ color: "var(--cl-red)" }}>Lens</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="relative flex items-center px-4 py-2 text-[12px] font-semibold tracking-wide uppercase transition-all"
                  style={{
                    color: isActive ? "var(--cl-red)" : "var(--cl-text-2)",
                    letterSpacing: "0.08em",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--cl-text-2)";
                  }}
                >
                  <span>{link.name}</span>
                  {/* Red underline for active */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-sm"
                      style={{ height: "2px", width: "60%", background: "var(--cl-red)" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded transition-colors"
              style={{
                background: "var(--cl-surface)",
                border: "1px solid var(--cl-border-2)",
                color: "var(--cl-text-2)",
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t backdrop-blur-lg"
          style={{ borderColor: "var(--cl-border)", background: "rgba(10,10,10,0.98)" }}
        >
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded text-sm font-semibold uppercase tracking-wide transition-all"
                  style={{
                    background: isActive ? "var(--cl-red-dim)" : "transparent",
                    borderLeft: isActive ? "2px solid var(--cl-red)" : "2px solid transparent",
                    color: isActive ? "var(--cl-red)" : "var(--cl-text-2)",
                    letterSpacing: "0.08em",
                  }}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div
              className="mt-3 pt-3 flex items-center gap-2 px-4 text-xs uppercase tracking-widest"
              style={{
                borderTop: "1px solid var(--cl-border)",
                color: "var(--cl-text-3)",
                fontFamily: "var(--font-inter)",
              }}
            >
              <span style={{ color: "var(--cl-red)" }}>●</span>
              CrimeLens — Investigative Intelligence
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
