"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronRight, X, Activity, Stethoscope, PhoneCall } from "lucide-react";
import { ShareModal } from "@/components/ShareModal";

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="rounded-2xl p-5 lg:p-6"
      style={{ background: "#fff", border: "1px solid #EEF2F6", boxShadow: "0 2px 8px rgba(0,0,0,.04)", ...style }}
    >
      {children}
    </div>
  );
}

export default function HubPage() {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [teleSessionState, setTeleSessionState] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const startSession = (role: string) => {
    setTeleSessionState(role);
  };

  return (
    <div>
      {/* Greeting */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center shrink-0 text-[22px] font-extrabold text-[#0077B6]"
            style={{ width: 56, height: 56, borderRadius: "50%", background: "#E7F2F9" }}
          >
            M
          </div>
          <div>
            <div className="text-[14px] font-semibold text-[#7B8B99]">Bom dia,</div>
            <h1 className="text-[26px] lg:text-[30px] font-extrabold text-[#10212E] tracking-tight leading-tight">
              Maria Aparecida
            </h1>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-[13px] font-medium text-[#7B8B99]">Sexta-feira</div>
          <div className="text-[13px] font-semibold text-[#10212E]">20 de junho de 2025</div>
        </div>
      </div>

      {/* Main cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Medication */}
        <Card style={{ background: "#E8F6EF", border: "1px solid #C3E6D0" }}>
          <div className="flex items-center gap-2 mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F9367" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.5 20.5 4 14a4.95 4.95 0 0 1 7-7l6.5 6.5a4.95 4.95 0 0 1-7 7Z" />
              <path d="m8.5 8.5 7 7" />
            </svg>
            <span className="text-[12px] font-extrabold text-[#2F9367] uppercase tracking-wider">Próximo remédio</span>
          </div>
          <div className="text-[22px] font-extrabold text-[#15412E] mb-2">Losartana 50mg</div>
          <div className="flex items-center gap-3">
            <span
              className="text-[20px] font-medium text-[#2F9367]"
              style={{ fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }}
            >
              14:00
            </span>
            <span className="text-[14px] text-[#5E7D6D] font-semibold">· 1 comprimido</span>
          </div>
        </Card>

        {/* Last symptom */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h4l2 6 4-12 2 6h6" />
            </svg>
            <span className="text-[12px] font-extrabold text-[#0077B6] uppercase tracking-wider">Último sintoma</span>
          </div>
          <div className="text-[20px] font-extrabold text-[#10212E] mb-2">Tontura leve pela manhã</div>
          <div
            className="text-[13px] text-[#7B8B99] font-medium"
            style={{ fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }}
          >
            18 jun · 08:20
          </div>
        </Card>
      </div>



      {/* Preciso de ajuda Button */}
      <button
        onClick={() => {
          setTeleSessionState(null);
          setIsHelpModalOpen(true);
        }}
        className="w-full mb-4 px-6 py-4 rounded-2xl border-none flex items-center justify-between transition-all active:translate-y-[1px] cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #7B5BD6, #6343C7)",
          boxShadow: "0 6px 20px rgba(123,91,214,.22)",
          color: "#fff"
        }}
      >
        <div className="flex items-center gap-3.5 text-left">
          <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-white/20 border border-white/30">
            <HelpCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[16.5px] font-extrabold text-white">Preciso de ajuda</div>
            <div className="text-[12px] font-medium text-white/80 mt-0.5">Teleconsulta rápida com enfermeiro ou médico</div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/80" />
      </button>

      {/* Scanner CTA */}
      <Link
        href="/paciente/scanner"
        className="flex items-center justify-between w-full px-6 py-5 rounded-2xl no-underline mb-4 transition-opacity hover:opacity-90"
        style={{ background: "#0077B6", boxShadow: "0 8px 24px rgba(0,119,182,.28)" }}
      >
        <div className="flex items-center gap-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 4h-5L8 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4l-1.5-2Z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
          <div>
            <div className="text-white font-extrabold text-[17px]">Escanear novo documento</div>
            <div className="text-[13px] font-medium" style={{ color: "rgba(255,255,255,.65)" }}>
              Receita, exame, vacina ou outro
            </div>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/paciente/historico"
          className="flex items-center gap-3 px-4 py-4 rounded-2xl no-underline transition-colors hover:bg-[#E7F2F9]"
          style={{ background: "#fff", border: "1px solid #EEF2F6" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
          </svg>
          <span className="text-[14px] font-bold text-[#10212E]">Ver histórico</span>
        </Link>
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-3 px-4 py-4 rounded-2xl border-none outline-none text-left w-full cursor-pointer transition-colors hover:bg-[#E7F2F9]"
          style={{ background: "#fff", border: "1px solid #EEF2F6" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
          </svg>
          <span className="text-[14px] font-bold text-[#10212E]">Relatório médico</span>
        </button>
      </div>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />

      {/* Help Modal */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsHelpModalOpen(false)}
          />
          
          {/* Modal content */}
          <div 
            className="relative bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl transition-all z-10 animate-in fade-in slide-in-from-bottom-4 duration-200"
            style={{ border: "1px solid #EEF2F6" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[18px] font-extrabold text-[#10212E]">Como podemos ajudar?</h3>
              <button 
                onClick={() => setIsHelpModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 border-none bg-transparent cursor-pointer transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Options */}
            {!teleSessionState ? (
              <div className="space-y-4">
                {/* Option 1: Enfermeiro */}
                <button
                  onClick={() => startSession("Enfermeiro")}
                  className="w-full text-left p-4 rounded-xl border border-slate-100 hover:border-[#7B5BD6]/30 hover:bg-[#7B5BD6]/5 transition-all bg-slate-50 cursor-pointer flex gap-4"
                >
                  <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-xl bg-[#E8F6EF] text-[#2F9367]">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-extrabold text-[#10212E]">Enfermeiro</h4>
                    <p className="text-[12.5px] text-[#7B8B99] font-medium mt-1 leading-relaxed">
                      Dúvidas sobre curativos, medições de pressão, repouso e cuidados de saúde.
                    </p>
                  </div>
                </button>

                {/* Option 2: Médico */}
                <button
                  onClick={() => startSession("Médico")}
                  className="w-full text-left p-4 rounded-xl border border-slate-100 hover:border-[#7B5BD6]/30 hover:bg-[#7B5BD6]/5 transition-all bg-slate-50 cursor-pointer flex gap-4"
                >
                  <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-xl bg-[#E7F2F9] text-[#0077B6]">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-extrabold text-[#10212E]">Médico</h4>
                    <p className="text-[12.5px] text-[#7B8B99] font-medium mt-1 leading-relaxed">
                      Dúvidas sobre medicamentos (ex: "posso tomar remédio X com Y?") ou novos sintomas.
                    </p>
                  </div>
                </button>
              </div>
            ) : (
              /* Success / Connecting state */
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#E8F6EF] flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <PhoneCall className="w-8 h-8 text-[#2F9367]" />
                </div>
                <h4 className="text-[18px] font-extrabold text-[#10212E]">Chamando {teleSessionState}...</h4>
                <p className="text-[13.5px] text-[#7B8B99] font-semibold mt-2 px-4 leading-relaxed">
                  Você está na fila de teleconsulta. Aguarde, o profissional iniciará o atendimento em instantes!
                </p>
                
                <button
                  onClick={() => setTeleSessionState(null)}
                  className="mt-6 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[13px] font-bold transition-colors cursor-pointer border-none"
                >
                  Cancelar Chamada
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
