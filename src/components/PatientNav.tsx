"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const HEADER_H = 54;

const navItems = [
  {
    label: "Início",
    href: "/paciente",
    active: (p: string) => p === "/paciente",
    icon: (on: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={on ? "#fff" : "rgba(255,255,255,.45)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5 12 3l9 7.5M5 9.5V20h14V9.5" />
      </svg>
    ),
    mobileIcon: (on: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on ? "#0077B6" : "#9AAAB7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5 12 3l9 7.5M5 9.5V20h14V9.5" />
      </svg>
    ),
  },
  {
    label: "Histórico",
    href: "/paciente/historico",
    active: (p: string) => p.startsWith("/paciente/historico") || p.startsWith("/paciente/relatorio"),
    icon: (on: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={on ? "#fff" : "rgba(255,255,255,.45)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
      </svg>
    ),
    mobileIcon: (on: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on ? "#0077B6" : "#9AAAB7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: "Documentos",
    href: "/paciente/scanner",
    active: (p: string) => p.startsWith("/paciente/scanner"),
    icon: (on: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={on ? "#fff" : "rgba(255,255,255,.45)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
      </svg>
    ),
    mobileIcon: (on: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on ? "#0077B6" : "#9AAAB7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
      </svg>
    ),
  },
  {
    label: "Perfil",
    href: "/paciente/perfil",
    active: (p: string) => p.startsWith("/paciente/perfil"),
    icon: (on: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={on ? "#fff" : "rgba(255,255,255,.45)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
      </svg>
    ),
    mobileIcon: (on: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on ? "#0077B6" : "#9AAAB7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
      </svg>
    ),
  },
];

function SOSModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function call(number: string) {
    onClose();
    window.location.href = `tel:${number}`;
  }

  return (
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center sm:p-6"
      style={{ zIndex: 9999, background: "rgba(10,37,64,.78)" }}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{ background: "#fff", boxShadow: "0 24px 64px rgba(0,0,0,.3)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative flex flex-col items-center justify-center px-6 pt-8 pb-6"
          style={{ background: "#DC3545" }}
        >
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-4 right-4 flex items-center justify-center"
            style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,.18)", border: "1.5px solid rgba(255,255,255,.28)", color: "#fff" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <div
            className="flex items-center justify-center mb-4"
            style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,.18)", border: "2px solid rgba(255,255,255,.28)" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3 4 7v5c0 5 3.4 7.7 8 9 4.6-1.3 8-4 8-9V7Z" />
            </svg>
          </div>
          <p className="text-white font-extrabold text-[22px] tracking-tight">Emergência</p>
          <p className="text-[13px] font-medium mt-1" style={{ color: "rgba(255,255,255,.65)" }}>
            Ligue agora ou aguarde o atendimento
          </p>
        </div>

        {/* Corpo */}
        <div className="px-5 py-5 space-y-3">
          <button
            onClick={() => call("192")}
            className="flex items-center justify-between w-full px-5 py-4 rounded-2xl"
            style={{ background: "#DC3545", boxShadow: "0 6px 18px rgba(220,53,69,.32)", touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center shrink-0"
                style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.2)" }}
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.19 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16l.92.92Z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-extrabold text-[18px] leading-none">Ligar para o SAMU</p>
                <p
                  className="text-[15px] font-bold mt-0.5"
                  style={{ color: "rgba(255,255,255,.65)", fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }}
                >
                  192
                </p>
              </div>
            </div>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Bombeiros */}
          <button
            onClick={() => call("193")}
            className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl"
            style={{ background: "#FEF2F2", border: "1.5px solid #FECACA", touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center shrink-0"
                style={{ width: 38, height: 38, borderRadius: "50%", background: "#FECACA" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#DC3545" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.19 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16l.92.92Z" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-extrabold text-[#C05B6A]">Bombeiros</p>
                <p
                  className="text-[13px] font-bold text-[#9AAAB7]"
                  style={{ fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }}
                >
                  193
                </p>
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FECACA" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "#EEF2F6" }} />
            <span className="text-[11px] font-bold text-[#C0CDD7] uppercase tracking-wider">ou</span>
            <div className="flex-1 h-px" style={{ background: "#EEF2F6" }} />
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl text-[14px] font-extrabold"
            style={{ background: "#F4F7FB", color: "#5C6F7E" }}
          >
            Cancelar — não é emergência
          </button>
        </div>
      </div>
    </div>
  );
}

export function PatientNav({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sosOpen, setSosOpen] = useState(false);

  useEffect(() => {
    const handleOpenSOS = () => setSosOpen(true);
    window.addEventListener("open-sos", handleOpenSOS);
    return () => window.removeEventListener("open-sos", handleOpenSOS);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      {sosOpen && <SOSModal onClose={() => setSosOpen(false)} />}

      {/* FAB único — inline style não inclui display para não vencer lg:hidden */}
      <button
        onClick={() => setSosOpen(true)}
        aria-label="Emergência"
        className="flex items-center gap-2 fixed z-40 font-extrabold text-white"
        style={{
          bottom: 76,
          right: 16,
          height: 46,
          paddingLeft: 14,
          paddingRight: 16,
          borderRadius: 999,
          background: "#DC3545",
          boxShadow: "0 4px 16px rgba(220,53,69,.45)",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
          userSelect: "none",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3 4 7v5c0 5 3.4 7.7 8 9 4.6-1.3 8-4 8-9V7Z" />
        </svg>
        <span className="text-[13px] tracking-wide">SOS</span>
      </button>

      {/* Sidebar desktop */}
      <aside
        className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-30"
        style={{ width: 224, background: "#0A2540" }}
      >
        <div className="flex items-center gap-3 px-5 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <div className="flex items-center justify-center shrink-0" style={{ width: 36, height: 36, borderRadius: 10, background: "#0077B6" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div>
            <p className="text-white font-extrabold text-[15px] leading-none tracking-tight">Carteira Saúde</p>
            <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,.4)" }}>Paciente</p>
          </div>
        </div>

        <div className="px-4 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center shrink-0 text-[15px] font-bold text-white" style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(0,119,182,.35)" }}>
              M
            </div>
            <div>
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,.4)" }}>Bom dia,</p>
              <p className="text-[14px] font-bold text-white leading-tight">Dona Maria</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-0.5">
          {navItems.map((item) => {
            const on = item.active(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-semibold transition-colors"
                style={{
                  color: on ? "#fff" : "rgba(255,255,255,.5)",
                  background: on ? "rgba(0,119,182,.2)" : "transparent",
                  borderLeft: on ? "2px solid #0077B6" : "2px solid transparent",
                  paddingLeft: on ? "10px" : "12px",
                }}
              >
                {item.icon(on)}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Área de conteúdo */}
      <div className="lg:ml-[224px] flex flex-col min-h-screen">
        {/* Header mobile — fixed (não sticky, que quebra com overflow-x em filhos) */}
        <header
          className="lg:hidden fixed top-0 inset-x-0 z-30 flex items-center justify-between px-4"
          style={{ height: HEADER_H, background: "#0A2540", borderBottom: "1px solid rgba(255,255,255,.08)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center" style={{ width: 30, height: 30, borderRadius: 8, background: "#0077B6" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <span className="text-white font-extrabold text-[15px] tracking-tight">Carteira Saúde</span>
          </div>
          <div className="flex items-center justify-center text-white text-[13px] font-bold" style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(0,119,182,.4)" }}>
            M
          </div>
        </header>

        {/* Conteúdo — padding compensa header fixo no mobile */}
        <main className="flex-1" style={{ paddingTop: HEADER_H, paddingBottom: 80 }}>
          <div className="lg:pt-0 lg:pb-0">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
              {children}
            </div>
          </div>
        </main>

        {/* Bottom nav mobile — fixed */}
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
                className="flex-1 flex flex-col items-center justify-center gap-0.5"
              >
                {item.mobileIcon(on)}
                <span className="text-[10px]" style={{ fontWeight: on ? 800 : 600, color: on ? "#0077B6" : "#9AAAB7" }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
