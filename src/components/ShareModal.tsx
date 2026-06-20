"use client";

import { useState, useEffect } from "react";
import { X, Copy, Check, Shield } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareLink(`${window.location.origin}/prontuario-publico`);
    }
  }, []);

  if (!isOpen) return null;

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200" 
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div 
        className="relative bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl transition-all z-10 animate-in fade-in slide-in-from-bottom-4 duration-200"
        style={{ border: "1px solid #EEF2F6" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-[#E7F2F9] text-[#0077B6]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
              </svg>
            </div>
            <h3 className="text-[17px] font-extrabold text-[#10212E]">Compartilhar Prontuário</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 border-none bg-transparent cursor-pointer transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info text */}
        <p className="text-[12.5px] text-[#5C6F7E] font-medium leading-relaxed mb-5">
          Gere um link de acesso público para o seu médico visualizar o seu histórico clínico (medicamentos ativos, evolução e exames).
        </p>

        {/* Copy Box */}
        <div className="space-y-4">
          <div
            className="flex items-center gap-2 px-3.5 py-3 rounded-xl bg-slate-50 border border-[#EEF2F6]"
          >
            <span className="flex-1 text-[12.5px] font-mono text-[#0077B6] truncate select-all">
              {shareLink}
            </span>
            <button
              onClick={copyLink}
              className="shrink-0 p-2 rounded-lg transition-colors border-none cursor-pointer hover:bg-slate-200"
              style={{ background: copied ? "#E8F6EF" : "#E7F2F9" }}
              title="Copiar link"
            >
              {copied ? <Check className="w-4 h-4 text-[#2F9367]" /> : <Copy className="w-4 h-4 text-[#0077B6]" />}
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={copyLink}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-extrabold text-[14px] text-white border-none cursor-pointer transition-opacity hover:opacity-90 shadow-xs"
              style={{ background: copied ? "#2F9367" : "#0077B6" }}
            >
              {copied ? <><Check className="w-4.5 h-4.5" /> Copiado!</> : <><Copy className="w-4.5 h-4.5" /> Copiar link</>}
            </button>
            <a
              href={`https://wa.me/?text=Olá Dr., aqui está o meu prontuário clínico atualizado do Carreira Saúde para consulta: ${encodeURIComponent(shareLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-extrabold text-[14px] text-white no-underline transition-opacity hover:opacity-90 shadow-xs"
              style={{ background: "#25D366" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* compliance tag */}
        <div className="flex items-center justify-center gap-1.5 mt-4 text-[#2F9367]">
          <Shield className="w-3.5 h-3.5" />
          <span className="text-[11px] font-bold">Link em conformidade com a LGPD</span>
        </div>
      </div>
    </div>
  );
}
