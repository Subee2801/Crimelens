import Link from "next/link";
import { Shield, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="text-sm mt-auto"
      style={{
        background: "var(--cl-surface)",
        borderTop: "2px solid var(--cl-red)",
        color: "var(--cl-text-3)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded flex items-center justify-center shrink-0"
              style={{ background: "var(--cl-red)" }}
            >
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="font-black text-sm tracking-widest uppercase"
                style={{ color: "var(--cl-text)", letterSpacing: "0.2em" }}
              >
                Crime<span style={{ color: "var(--cl-red)" }}>Lens</span>
              </span>
              <span
                className="text-[9px] uppercase tracking-widest mt-0.5"
                style={{ color: "var(--cl-text-3)", letterSpacing: "0.15em" }}
              >
                Evidence-Based Crime Intelligence
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6 text-xs uppercase tracking-wider font-semibold">
            {[
              { label: "Map View", href: "/map" },
              { label: "Trends", href: "/trends" },
              { label: "Data", href: "/data" },
              { label: "About", href: "/about" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="transition-colors"
                style={{ color: "var(--cl-text-3)", letterSpacing: "0.1em" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--cl-red)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--cl-text-3)")
                }
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="mt-6 pt-5 text-center text-xs flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{
            borderTop: "1px solid var(--cl-border)",
            color: "var(--cl-text-3)",
          }}
        >
          <p>
            © {new Date().getFullYear()} CrimeLens · Data: NCRB dstrIPC_2013 ·
            Built with Next.js & Tailwind CSS
          </p>
          <p
            className="flex items-center gap-1"
            style={{ color: "var(--cl-text-3)" }}
          >
            <span>Open Government Data · NDSAP License</span>
            <ExternalLink className="w-3 h-3" />
          </p>
        </div>
      </div>
    </footer>
  );
}
