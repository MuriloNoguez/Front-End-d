import Link from "next/link";
import { FileText, FlaskConical, Syringe, ArrowLeft } from "lucide-react";

const bars = [40, 65, 50, 80, 45, 70, 90, 55, 60, 42, 75, 68];

const attachedDocs = [
  { icon: <FileText className="w-5 h-5 text-[#0077B6]" />, label: "Receita — Losartana" },
  { icon: <FlaskConical className="w-5 h-5 text-[#16A874]" />, label: "Hemograma" },
  { icon: <Syringe className="w-5 h-5 text-[#7B5BD6]" />, label: "Influenza" },
];

export default function RelatorioPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] font-medium text-[#7B8B99] mb-2">
        <Link href="/paciente" className="hover:text-[#0077B6] transition-colors no-underline text-[#7B8B99]">Início</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
        <span className="text-[#10212E] font-semibold">Relatório para Médico</span>
      </div>

      <div className="mb-8">
        <h1 className="text-[26px] lg:text-[30px] font-extrabold text-[#10212E] tracking-tight">Relatório Clínico</h1>
        <p className="text-[14px] text-[#7B8B99] font-medium mt-1">Resumo gerado para compartilhar com o médico.</p>
      </div>

      {/* Patient header card */}
      <div
        className="flex items-center gap-4 p-5 rounded-2xl mb-4"
        style={{ background: "#fff", border: "1px solid #EEF2F6", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}
      >
        <div
          className="flex items-center justify-center shrink-0 text-[22px] font-extrabold text-[#0077B6]"
          style={{ width: 56, height: 56, borderRadius: "50%", background: "#E7F2F9" }}
        >
          M
        </div>
        <div>
          <div className="text-[20px] font-extrabold text-[#10212E]">Maria Aparecida</div>
          <div
            className="text-[13px] font-medium text-[#7B8B99]"
            style={{ fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }}
          >
            72 anos · Hipertensão · Gerado em 20 jun 2026
          </div>
        </div>
      </div>

      {/* AI summary */}
      <div
        className="p-5 rounded-2xl mb-4 bg-slate-900"
        style={{ boxShadow: "0 4px 14px rgba(15,23,42,.08)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3 4 7v5c0 5 3.4 7.7 8 9 4.6-1.3 8-4 8-9V7Z" />
          </svg>
          <span className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: "rgba(255,255,255,.5)" }}>
            Resumo Clínico
          </span>
        </div>
        <p className="text-[15px] leading-6 font-semibold" style={{ color: "#E2E8F0" }}>
          <span className="text-white font-extrabold">Condição:</span> Hipertensão controlada.{" "}
          <span className="text-white font-extrabold">Medicações:</span> Losartana 50mg 1×/dia.{" "}
          <span className="text-white font-extrabold">Sintomas recentes:</span> tontura leve matinal nos últimos 3 dias, sem outras queixas.
        </p>
      </div>

      {/* Two-column section on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Attached docs */}
        <div
          className="p-5 rounded-2xl"
          style={{ background: "#fff", border: "1px solid #EEF2F6", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}
        >
          <div className="text-[12px] font-extrabold text-[#7B8B99] uppercase tracking-wider mb-3">Documentos anexados</div>
          <div className="space-y-2">
            {attachedDocs.map((d, i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                {d.icon}
                <span className="text-[14px] font-bold text-[#10212E]">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 30-day adherence chart */}
        <div
          className="p-5 rounded-2xl"
          style={{ background: "#fff", border: "1px solid #EEF2F6", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}
        >
          <div className="text-[12px] font-extrabold text-[#7B8B99] uppercase tracking-wider mb-3">Adesão — últimos 30 dias</div>
          <div className="flex gap-1 items-end" style={{ height: 56 }}>
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background: h >= 80 ? "#2F9367" : h >= 60 ? "#7CCBA3" : "#B8E0CC",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[11px] text-[#7B8B99] font-medium"
              style={{ fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }}>Jun 1</span>
            <span className="text-[11px] text-[#7B8B99] font-medium"
              style={{ fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }}>Jun 20</span>
          </div>
        </div>
      </div>

      {/* Share CTA */}
      <div
        className="p-5 rounded-2xl"
        style={{ background: "#E7F2F9", border: "1px solid #C5DDEF" }}
      >
        <div className="text-[15px] font-extrabold text-[#10212E] mb-1">Enviar ao médico</div>
        <div className="text-[13px] font-medium text-[#5C6F7E] mb-4">
          O link expira em 24 horas e só pode ser acessado pelo destinatário.
        </div>
        <Link
          href="/medico"
          className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-extrabold text-[15px] text-white no-underline transition-opacity hover:opacity-90"
          style={{ background: "#0077B6", boxShadow: "0 8px 22px rgba(0,119,182,.32)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
          </svg>
          Gerar link de compartilhamento
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
        <div className="flex items-center justify-center gap-1.5 mt-2.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E08A35" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
          </svg>
          <span className="text-[12px] font-bold text-[#E08A35]">Link expira em 24h</span>
        </div>
      </div>
    </div>
  );
}
