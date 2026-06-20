"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  {
    label: "Pacientes",
    href: "/medico",
    active: (p: string) => p === "/medico",
    icon: (on: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={on ? "#fff" : "rgba(255,255,255,.45)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Alertas",
    href: "/medico/alertas",
    active: (p: string) => p.startsWith("/medico/alertas"),
    hasAlert: true,
    icon: (on: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={on ? "#fff" : "rgba(255,255,255,.45)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    label: "Agenda",
    href: "/medico/agenda",
    active: (p: string) => p.startsWith("/medico/agenda"),
    icon: (on: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={on ? "#fff" : "rgba(255,255,255,.45)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
];

export function DoctorNav({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-[#F4F7FB]">
      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-30"
        style={{ width: 224, background: "#0A2540" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <div
            className="flex items-center justify-center shrink-0"
            style={{ width: 36, height: 36, borderRadius: 10, background: "#16A874" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div>
            <div className="text-white font-extrabold text-[15px] leading-none tracking-tight">Nexo Saúde</div>
            <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,.4)" }}>Médico</div>
          </div>
        </div>

        {/* Doctor info */}
        <div className="px-4 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center shrink-0 text-white text-[13px] font-bold"
              style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(22,168,116,.35)" }}
            >
              AS
            </div>
            <div>
              <div className="text-[13px] font-bold text-white leading-tight">Dr. André Souza</div>
              <div className="text-[11px]" style={{ color: "rgba(255,255,255,.4)" }}>Cardiologia · CRM 45.221</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5">
          {navItems.map((item) => {
            const on = item.active(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg text-[13.5px] font-semibold transition-colors relative"
                style={{
                  padding: on ? "10px 12px 10px 10px" : "10px 12px",
                  color: on ? "#fff" : "rgba(255,255,255,.5)",
                  background: on ? "rgba(22,168,116,.2)" : "transparent",
                  borderLeft: on ? "2px solid #16A874" : "2px solid transparent",
                }}
              >
                {item.icon(on)}
                {item.label}
                {"hasAlert" in item && item.hasAlert && (
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ width: 8, height: 8, borderRadius: "50%", background: "#DC3545" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>


      </aside>

      {/* ── Content area ── */}
      <div className="flex-1 flex flex-col lg:ml-[224px]">
        {/* Mobile header */}
        <header
          className="lg:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3"
          style={{ background: "#0A2540", borderBottom: "1px solid rgba(255,255,255,.08)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center"
              style={{ width: 30, height: 30, borderRadius: 8, background: "#16A874" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <span className="text-white font-extrabold text-[15px] tracking-tight">Nexo Saúde · Médico</span>
          </div>
          <div
            className="flex items-center justify-center text-white text-[12px] font-bold"
            style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(22,168,116,.4)" }}
          >
            AS
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 pb-20 lg:pb-0">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            {children}
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav
          className="lg:hidden fixed bottom-0 inset-x-0 z-20 flex"
          style={{ background: "#fff", borderTop: "1px solid #EEF2F6", height: 60 }}
        >
          {navItems.map((item) => {
            const on = item.active(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 relative"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on ? "#16A874" : "#9AAAB7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {item.href === "/medico" && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>}
                  {item.href.includes("alertas") && <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>}
                  {item.href.includes("agenda") && <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>}
                </svg>
                <span className="text-[10px]" style={{ fontWeight: on ? 800 : 600, color: on ? "#16A874" : "#9AAAB7" }}>
                  {item.label}
                </span>
                {"hasAlert" in item && item.hasAlert && (
                  <span className="absolute top-2 right-[calc(50%-14px)]" style={{ width: 7, height: 7, borderRadius: "50%", background: "#DC3545" }} />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
