"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "Início",
    href: "/paciente/hub",
    icon: (active: boolean) => (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none"
        stroke={active ? "#0077B6" : "#9AAAB7"} strokeWidth="2.1"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V20h14V9.5" />
      </svg>
    ),
  },
  {
    label: "Histórico",
    href: "/paciente/historico",
    icon: (active: boolean) => (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none"
        stroke={active ? "#0077B6" : "#9AAAB7"} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: "Documentos",
    href: "/paciente/scanner",
    icon: (active: boolean) => (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none"
        stroke={active ? "#0077B6" : "#9AAAB7"} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
      </svg>
    ),
  },
  {
    label: "Perfil",
    href: "/paciente/perfil",
    icon: (active: boolean) => (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none"
        stroke={active ? "#0077B6" : "#9AAAB7"} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[86px] bg-white border-t border-[#EDF1F5] flex px-3 pt-2.5 pb-6">
      {tabs.map((tab) => {
        const active = pathname === tab.href || (tab.href !== "/paciente/hub" && pathname.startsWith(tab.href));
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 flex flex-col items-center gap-1 no-underline"
          >
            {tab.icon(active)}
            <span
              className="text-[12px]"
              style={{
                fontWeight: active ? 800 : 700,
                color: active ? "#0077B6" : "#9AAAB7",
              }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
