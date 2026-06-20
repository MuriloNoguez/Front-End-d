"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Pill, FlaskConical, Syringe, FileText, Check, X } from "lucide-react";
import { ShareModal } from "@/components/ShareModal";

const docTypes = ["Receita médica", "Resultado de exame", "Cartão de vacina", "Outro"];

const STORAGE_KEY = "nexo_docs";

type StoredDoc = {
  id: number;
  label: string;
  type: string;
  date: string;
  preview: string | null;
  extracted: [string, string][];
};

function getStoredDocs(): StoredDoc[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveDocs(docs: StoredDoc[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
}

const typeIconEl = (type: string) => {
  if (type === "Receita médica") return <Pill className="w-5 h-5 text-[#0D9488]" />;
  if (type === "Resultado de exame") return <FlaskConical className="w-5 h-5 text-[#0284C7]" />;
  if (type === "Cartão de vacina") return <Syringe className="w-5 h-5 text-[#7B5BD6]" />;
  return <FileText className="w-5 h-5 text-[#E08A35]" />;
};

const mockExtracted: Record<string, [string, string][]> = {
  "Receita médica": [["Medicamento", "Losartana 50mg"], ["Posologia", "1× ao dia"], ["Médico", "Dr. A. Souza"]],
  "Resultado de exame": [["Exame", "Hemograma completo"], ["Resultado", "Normal"], ["Laboratório", "Lab. Central"]],
  "Cartão de vacina": [["Vacina", "Influenza"], ["Dose", "Anual"], ["Aplicação", "UBS Jardim América"]],
  "Outro": [["Tipo", "Documento médico"], ["Data", "20/06/2025"], ["Status", "Identificado"]],
};

export default function ScannerPage() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [saved, setSaved] = useState(false);
  const [recentDocs, setRecentDocs] = useState<StoredDoc[]>([]);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRecentDocs(getStoredDocs());
  }, []);

  const processFile = useCallback((file: File) => {
    setFileName(file.name);
    setSaved(false);
    setIsReady(false);
    setIsProcessing(true);
    setPreview(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setTimeout(() => {
      setIsProcessing(false);
      setIsReady(true);
    }, 2200);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleSave = () => {
    const typeName = docTypes[selectedType];
    const now = new Date();
    const months = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
    const dateStr = `${now.getDate()} ${months[now.getMonth()]}`;

    const newDoc: StoredDoc = {
      id: Date.now(),
      label: fileName || typeName,
      type: typeName,
      date: dateStr,
      preview,
      extracted: mockExtracted[typeName] || mockExtracted["Outro"],
    };

    const updated = [newDoc, ...recentDocs].slice(0, 20);
    saveDocs(updated);
    setRecentDocs(updated);
    setSaved(true);
    setPreview(null);
    setIsReady(false);
    setFileName("");
  };

  const handleRemoveDoc = (id: number) => {
    const updated = recentDocs.filter((d) => d.id !== id);
    saveDocs(updated);
    setRecentDocs(updated);
  };

  const typeName = docTypes[selectedType];

  return (
    <div>
      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*,application/pdf"
        capture="environment"
        className="hidden"
        onChange={handleInputChange}
      />

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

      {/* Type chips */}
      <div className="-mx-4 sm:mx-0 mb-6">
        <div
          className="flex gap-2 px-4 sm:px-0 sm:flex-wrap overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {docTypes.map((t, i) => (
            <button
              key={t}
              onClick={() => { setSelectedType(i); setSaved(false); }}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-bold transition-all"
              style={
                i === selectedType
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
        onClick={() => !isProcessing && fileRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        className="w-full rounded-3xl flex flex-col items-center justify-center px-5 sm:px-10 py-10 sm:py-14 mb-5 cursor-pointer transition-all"
        style={{
          border: `2px dashed ${dragging ? "#0077B6" : "#C5DDEF"}`,
          background: dragging ? "#D6EAF8" : "#EBF5FC",
        }}
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
          {isProcessing ? (
            <svg className="animate-spin" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          ) : (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L8 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4l-1.5-2Z" />
              <circle cx="12" cy="13" r="3.5" />
            </svg>
          )}
        </div>

        <div className="text-[18px] sm:text-[20px] font-extrabold text-[#10212E] mb-1.5 text-center">
          {isProcessing ? "Analisando documento..." : "Toque para fotografar"}
        </div>
        <div className="text-[13px] sm:text-[14px] font-medium text-[#5C6F7E] text-center max-w-[260px] sm:max-w-sm leading-5">
          {isProcessing
            ? "A IA está lendo e extraindo as informações do documento."
            : "Câmera ou galeria — receitas, exames e cartão de vacina."}
        </div>

        {!isProcessing && (
          <>
            <div className="flex items-center gap-3 mt-6 w-full max-w-[220px]">
              <div className="flex-1 h-px" style={{ background: "#C5DDEF" }} />
              <span className="text-[11px] font-bold text-[#7B8B99] uppercase tracking-wider">ou</span>
              <div className="flex-1 h-px" style={{ background: "#C5DDEF" }} />
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
              className="mt-5 px-5 py-2.5 rounded-xl font-extrabold text-[13px] transition-opacity hover:opacity-80"
              style={{ background: "#fff", color: "#0077B6", border: "1.5px solid #0077B6" }}
            >
              Escolher da galeria / PDF
            </button>
          </>
        )}
      </div>

      {/* Preview image */}
      {preview && preview.startsWith("data:image") && (
        <div className="mb-5 rounded-2xl overflow-hidden" style={{ border: "1px solid #EEF2F6" }}>
          <img
            src={preview}
            alt="Pré-visualização do documento"
            className="w-full object-contain max-h-64"
            style={{ background: "#F4F7FB" }}
          />
        </div>
      )}

      {/* Processing bar */}
      {isProcessing && (
        <div className="mb-5 rounded-2xl px-4 py-4" style={{ background: "#E7F2F9", border: "1px solid #C5DDEF" }}>
          <div className="flex items-center gap-3 mb-3">
            <svg className="animate-spin shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0077B6" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            <span className="text-[13px] font-extrabold text-[#0077B6]">Processando com IA...</span>
          </div>
          <div className="w-full rounded-full overflow-hidden" style={{ height: 6, background: "#C5DDEF" }}>
            <div
              className="h-full rounded-full animate-pulse"
              style={{ width: "65%", background: "#0077B6", transition: "width 2s ease" }}
            />
          </div>
        </div>
      )}

      {/* Saved success */}
      {saved && (
        <div
          className="mb-5 rounded-2xl px-4 py-4 flex items-center gap-3"
          style={{ background: "#E8F6EF", border: "1px solid #C3E6D0" }}
        >
          <div
            className="flex items-center justify-center shrink-0"
            style={{ width: 32, height: 32, borderRadius: "50%", background: "#2F9367" }}
          >
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-[14px] font-extrabold text-[#15412E]">Documento salvo com sucesso!</div>
            <div className="text-[12px] font-medium text-[#5E7D6D]">Disponível no histórico clínico.</div>
          </div>
        </div>
      )}

      {/* AI reading result */}
      {isReady && !saved && (
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
              Leitura do Documento · {typeName}
            </span>
          </div>

          <div className="space-y-0">
            {(mockExtracted[typeName] || mockExtracted["Outro"]).map(([k, v], i, arr) => (
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
            onClick={handleSave}
            className="mt-4 w-full py-3 rounded-xl font-extrabold text-[14px] text-white transition-opacity hover:opacity-90"
            style={{ background: "#2F9367", boxShadow: "0 4px 14px rgba(47,147,103,.28)" }}
          >
            Confirmar e salvar no histórico
          </button>
        </div>
      )}

      {/* Show static AI card if no doc uploaded yet */}
      {!isProcessing && !isReady && !saved && !preview && (
        <div
          className="rounded-2xl px-4 sm:px-5 py-4 mb-6 opacity-50"
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
              Aguardando documento...
            </span>
          </div>
          <div className="text-[13px] font-medium text-[#5E7D6D]">
            Envie uma foto ou PDF para ver a leitura automática aqui.
          </div>
        </div>
      )}

      {/* Recent docs */}
      {recentDocs.length > 0 && (
        <div>
          <div className="text-[11px] font-extrabold text-[#7B8B99] uppercase tracking-widest mb-3">
            Documentos salvos
          </div>

          <div className="space-y-2">
            {recentDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
                style={{
                  background: "#fff",
                  border: "1px solid #EEF2F6",
                  boxShadow: "0 1px 4px rgba(0,0,0,.04)",
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 40, height: 40, borderRadius: 12, background: "#F4F7FB" }}
                >
                  {typeIconEl(doc.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-extrabold text-[#10212E] truncate leading-snug">
                    {doc.label}
                  </div>
                  <div
                    className="text-[12px] font-medium text-[#9AAAB7] mt-0.5"
                    style={{ fontFamily: "ui-monospace, monospace" }}
                  >
                    {doc.type} · {doc.date}
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveDoc(doc.id)}
                  className="shrink-0 p-1.5 rounded-full hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
                  title="Remover documento"
                >
                  <X className="w-4 h-4 text-[#C0CDD7]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state when no docs saved yet */}
      {recentDocs.length === 0 && (
        <div>
          <div className="text-[11px] font-extrabold text-[#7B8B99] uppercase tracking-widest mb-3">
            Documentos recentes
          </div>
          <div className="text-center py-8 text-[13px] font-medium text-[#C0CDD7]">
            Nenhum documento salvo ainda.
          </div>
        </div>
      )}

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
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-[13px] sm:text-[14px] text-white border-none cursor-pointer whitespace-nowrap transition-opacity hover:opacity-90"
          style={{ background: "#0077B6", boxShadow: "0 4px 14px rgba(0,119,182,.3)" }}
        >
          Gerar relatório
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  );
}
