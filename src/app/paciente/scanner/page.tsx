import Link from "next/link";
import { Pill, FlaskConical, Syringe, FileText, Camera, Upload, ArrowLeft } from "lucide-react";

const recentDocs = [
  { icon: <Pill className="w-5 h-5 text-[#0D9488]" />, label: "Receita — Losartana 50mg", date: "18 jun", type: "Receita" },
  { icon: <FlaskConical className="w-5 h-5 text-[#0284C7]" />, label: "Hemograma completo", date: "12 jun", type: "Exame" },
  { icon: <Syringe className="w-5 h-5 text-[#7B5BD6]" />, label: "Influenza — dose anual", date: "02 jun", type: "Vacina" },
];

const docTypes = ["Receita médica", "Resultado de exame", "Cartão de vacina", "Outro"];

export default function ScannerPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#7B8B99] mb-3">
        <Link href="/paciente" className="hover:text-[#0077B6] transition-colors no-underline text-[#7B8B99]">
          Início
        </Link>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
        <span className="text-[#10212E] font-semibold">Documentos</span>
      </div>

      <div className="mb-6">
        <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#10212E] tracking-tight leading-tight">
          Scanner de Documento
        </h1>
        <p className="text-[13px] sm:text-[14px] text-[#7B8B99] font-medium mt-1">
          Foto ou PDF da sua receita, exame ou cartão de vacina.
        </p>
      </div>

      {/* Type chips — horizontal scroll on mobile */}
      <div className="-mx-4 sm:mx-0 mb-6">
        <div
          className="flex gap-2 px-4 sm:px-0 sm:flex-wrap overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {docTypes.map((t, i) => (
            <button
              key={t}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-bold"
              style={
                i === 0
                  ? { background: "#0077B6", color: "#fff" }
                  : { background: "#EEF3F7", color: "#5C6F7E" }
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Upload area */}
      <div
        className="w-full rounded-3xl flex flex-col items-center justify-center px-5 sm:px-10 py-10 sm:py-14 mb-5 cursor-pointer"
        style={{ border: "2px dashed #C5DDEF", background: "#EBF5FC" }}
      >
        <div
          className="flex items-center justify-center mb-5 shrink-0"
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#0077B6",
            boxShadow: "0 8px 24px rgba(0,119,182,.28)",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 4h-5L8 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4l-1.5-2Z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
        </div>

        <div className="text-[18px] sm:text-[20px] font-extrabold text-[#10212E] mb-1.5 text-center">
          Toque para fotografar
        </div>
        <div className="text-[13px] sm:text-[14px] font-medium text-[#5C6F7E] text-center max-w-[260px] sm:max-w-sm leading-5">
          Câmera ou galeria — receitas, exames e cartão de vacina.
        </div>

        <div className="flex items-center gap-3 mt-6 w-full max-w-[220px]">
          <div className="flex-1 h-px" style={{ background: "#C5DDEF" }} />
          <span className="text-[11px] font-bold text-[#7B8B99] uppercase tracking-wider">ou</span>
          <div className="flex-1 h-px" style={{ background: "#C5DDEF" }} />
        </div>

        <button
          className="mt-5 px-5 py-2.5 rounded-xl font-extrabold text-[13px]"
          style={{ background: "#fff", color: "#0077B6", border: "1.5px solid #0077B6" }}
        >
          Escolher da galeria / PDF
        </button>
      </div>

      {/* AI reading result */}
      <div
        className="rounded-2xl px-4 sm:px-5 py-4 mb-6"
        style={{ background: "#E8F6EF", border: "1px solid #C3E6D0" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="flex items-center justify-center shrink-0"
            style={{ width: 22, height: 22, borderRadius: "50%", background: "#2F9367" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3 4 7v5c0 5 3.4 7.7 8 9 4.6-1.3 8-4 8-9V7Z" />
            </svg>
          </div>
          <span className="text-[11px] font-extrabold text-[#2F9367] uppercase tracking-widest">
            Leitura do Documento
          </span>
        </div>

        <div className="space-y-0">
          {[
            ["Medicamento", "Losartana 50mg"],
            ["Posologia", "1× ao dia"],
            ["Médico", "Dr. A. Souza"],
          ].map(([k, v], i) => (
            <div
              key={k}
              className="flex items-center justify-between py-2.5 gap-4"
              style={{ borderTop: i > 0 ? "1px solid #D2EBDD" : undefined }}
            >
              <span className="text-[13px] sm:text-[14px] font-semibold text-[#5E7D6D] shrink-0">{k}</span>
              <span className="text-[13px] sm:text-[14px] font-extrabold text-[#15412E] text-right min-w-0 truncate">
                {v}
              </span>
            </div>
          ))}
        </div>

        <button
          className="mt-4 w-full py-3 rounded-xl font-extrabold text-[14px] text-white transition-opacity hover:opacity-90"
          style={{ background: "#2F9367", boxShadow: "0 4px 14px rgba(47,147,103,.28)" }}
        >
          Confirmar e salvar no histórico
        </button>
      </div>

      {/* Recent docs */}
      <div>
        <div className="text-[11px] font-extrabold text-[#7B8B99] uppercase tracking-widest mb-3">
          Documentos recentes
        </div>

        <div className="space-y-2">
          {recentDocs.map((doc, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
              style={{
                background: "#fff",
                border: "1px solid #EEF2F6",
                boxShadow: "0 1px 4px rgba(0,0,0,.04)",
              }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "#F4F7FB",
                }}
              >
                {doc.icon}
              </div>

              {/* Label + meta — takes remaining space, truncates cleanly */}
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-extrabold text-[#10212E] truncate leading-snug">
                  {doc.label}
                </div>
                <div
                  className="text-[12px] font-medium text-[#9AAAB7] mt-0.5"
                  style={{ fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }}
                >
                  {doc.type} · {doc.date}
                </div>
              </div>

              {/* Chevron */}
              <svg
                className="shrink-0"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C0CDD7"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 pt-5 flex items-center justify-between gap-4" style={{ borderTop: "1px solid #EEF2F6" }}>
        <Link
          href="/paciente/historico"
          className="flex items-center gap-1.5 text-[13px] font-bold no-underline text-[#7B8B99] hover:text-[#0077B6] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Ver histórico
        </Link>
        <Link
          href="/paciente/relatorio"
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-[13px] sm:text-[14px] text-white no-underline whitespace-nowrap transition-opacity hover:opacity-90"
          style={{ background: "#0077B6", boxShadow: "0 4px 14px rgba(0,119,182,.3)" }}
        >
          Gerar relatório
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
