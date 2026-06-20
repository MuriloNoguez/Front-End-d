"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, FlaskConical, Syringe, Copy, Check, Pill } from "lucide-react";

const STORAGE_KEY = "nexo_docs";

const bars = [40, 65, 50, 80, 45, 70, 90, 55, 60, 42, 75, 68];

const defaultDocs = [
  { icon: <FileText className="w-5 h-5 text-[#0077B6]" />, label: "Receita — Losartana" },
  { icon: <FlaskConical className="w-5 h-5 text-[#16A874]" />, label: "Hemograma" },
  { icon: <Syringe className="w-5 h-5 text-[#7B5BD6]" />, label: "Influenza" },
];

function docTypeIcon(type: string) {
  if (type === "Receita médica") return <Pill className="w-5 h-5 text-[#2F9367]" />;
  if (type === "Resultado de exame") return <FlaskConical className="w-5 h-5 text-[#7B5BD6]" />;
  if (type === "Cartão de vacina") return <Syringe className="w-5 h-5 text-[#E08A35]" />;
  return <FileText className="w-5 h-5 text-[#0077B6]" />;
}

export default function RelatorioPage() {
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [scannedDocs, setScannedDocs] = useState<{ label: string; type: string }[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setScannedDocs(stored.slice(0, 5).map((d: any) => ({ label: d.label, type: d.type })));
    } catch {
      // ignore
    }
  }, []);

  const generateLink = () => {
    const token = Math.random().toString(36).slice(2, 10).toUpperCase();
    const link = `${window.location.origin}/r/${token}`;
    setShareLink(link);
    setCopied(false);
  };

  const copyLink = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const allDocs = [
    ...scannedDocs.map((d) => ({ icon: docTypeIcon(d.type), label: d.label })),
    ...defaultDocs,
  ];

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
            style={{ fontFamily: "ui-monospace, monospace" }}
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
          <div className="text-[12px] font-extrabold text-[#7B8B99] uppercase tracking-wider mb-3">
            Documentos anexados ({allDocs.length})
          </div>
          <div className="space-y-2">
            {allDocs.map((d, i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                {d.icon}
                <span className="text-[14px] font-bold text-[#10212E] truncate">{d.label}</span>
              </div>
            ))}
          </div>
          {scannedDocs.length > 0 && (
            <div className="mt-3 pt-3" style={{ borderTop: "1px solid #EEF2F6" }}>
              <Link
                href="/paciente/scanner"
                className="text-[12px] font-bold text-[#0077B6] no-underline hover:underline"
              >
                + Adicionar documento
              </Link>
            </div>
          )}
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
            <span className="text-[11px] text-[#7B8B99] font-medium" style={{ fontFamily: "ui-monospace, monospace" }}>Jun 1</span>
            <span className="text-[11px] text-[#7B8B99] font-medium" style={{ fontFamily: "ui-monospace, monospace" }}>Jun 20</span>
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

        {!shareLink ? (
          <button
            onClick={generateLink}
            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-extrabold text-[15px] text-white border-none cursor-pointer transition-opacity hover:opacity-90"
            style={{ background: "#0077B6", boxShadow: "0 8px 22px rgba(0,119,182,.32)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
            </svg>
            Gerar link de compartilhamento
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        ) : (
          <div className="space-y-3">
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl"
              style={{ background: "#fff", border: "1.5px solid #0077B6" }}
            >
              <span className="flex-1 text-[13px] font-mono text-[#0077B6] truncate">{shareLink}</span>
              <button
                onClick={copyLink}
                className="shrink-0 p-1.5 rounded-lg transition-colors border-none cursor-pointer"
                style={{ background: copied ? "#E8F6EF" : "#E7F2F9" }}
                title="Copiar link"
              >
                {copied ? <Check className="w-4 h-4 text-[#2F9367]" /> : <Copy className="w-4 h-4 text-[#0077B6]" />}
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyLink}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-extrabold text-[14px] text-white border-none cursor-pointer transition-opacity hover:opacity-90"
                style={{ background: copied ? "#2F9367" : "#0077B6" }}
              >
                {copied ? <><Check className="w-4 h-4" /> Copiado!</> : <><Copy className="w-4 h-4" /> Copiar link</>}
              </button>
              <a
                href={`https://wa.me/?text=Meu relatório clínico Carreira Saúde: ${encodeURIComponent(shareLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-extrabold text-[14px] text-white no-underline transition-opacity hover:opacity-90"
                style={{ background: "#25D366" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
            </div>

            <button
              onClick={() => setShareLink(null)}
              className="w-full text-[12px] font-bold text-[#7B8B99] border-none bg-transparent cursor-pointer hover:text-[#10212E] transition-colors"
            >
              Gerar novo link
            </button>
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 mt-3">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E08A35" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
          </svg>
          <span className="text-[12px] font-bold text-[#E08A35]">Link expira em 24h</span>
        </div>
      </div>
    </div>
  );
}
