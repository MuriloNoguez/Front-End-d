"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Pill, FlaskConical, Syringe, FileText } from "lucide-react";

const STORAGE_KEY = "nexo_docs";

type TimelineEvent = {
  date: string;
  dateDetail: string;
  type: string;
  typeColor: string;
  dotBg: string;
  dotBorder: string;
  title: string;
  meta: string;
  filterKey: string;
  icon: React.ReactNode;
};

const staticEvents: TimelineEvent[] = [
  {
    date: "Hoje",
    dateDetail: "20 jun",
    type: "Medicação",
    typeColor: "#2F9367",
    dotBg: "#E8F6EF",
    dotBorder: "#C3E6D0",
    title: "Losartana 50mg iniciada",
    meta: "Prescrita pelo Dr. A. Souza",
    filterKey: "Medicação",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2F9367" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.5 20.5 4 14a4.95 4.95 0 0 1 7-7l6.5 6.5a4.95 4.95 0 0 1-7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </svg>
    ),
  },
  {
    date: "18 jun",
    dateDetail: "Qua",
    type: "Sintoma",
    typeColor: "#0077B6",
    dotBg: "#E7F2F9",
    dotBorder: "#C5DDEF",
    title: "Tontura leve pela manhã",
    meta: "Registrado às 08:20",
    filterKey: "Sintomas",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0077B6" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h4l2 6 4-12 2 6h6" />
      </svg>
    ),
  },
  {
    date: "12 jun",
    dateDetail: "Qui",
    type: "Exame",
    typeColor: "#7B5BD6",
    dotBg: "#F3EEFA",
    dotBorder: "#D9C9F5",
    title: "Hemograma completo",
    meta: "Laboratório Central",
    filterKey: "Exames",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B5BD6" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </svg>
    ),
  },
  {
    date: "02 jun",
    dateDetail: "Ter",
    type: "Vacina",
    typeColor: "#E08A35",
    dotBg: "#FDEFE4",
    dotBorder: "#F5D5B3",
    title: "Influenza (gripe) anual",
    meta: "UBS Jardim América",
    filterKey: "Vacinas",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E08A35" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 2 4 4M17 3l4 4-9.5 9.5-4-4Z" />
        <path d="m7.5 12.5 4 4M3 21l4-1" />
      </svg>
    ),
  },
  {
    date: "28 mai",
    dateDetail: "Qua",
    type: "Consulta",
    typeColor: "#C05B6A",
    dotBg: "#FAECEE",
    dotBorder: "#EFC9CD",
    title: "Retorno cardiologista",
    meta: "Dr. A. Souza · Hospital São Lucas",
    filterKey: "Consultas",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C05B6A" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

function docTypeToFilter(type: string): string {
  if (type === "Receita médica") return "Exames";
  if (type === "Resultado de exame") return "Exames";
  if (type === "Cartão de vacina") return "Vacinas";
  return "Exames";
}

function docTypeColor(type: string) {
  if (type === "Receita médica") return { typeColor: "#2F9367", dotBg: "#E8F6EF", dotBorder: "#C3E6D0" };
  if (type === "Resultado de exame") return { typeColor: "#7B5BD6", dotBg: "#F3EEFA", dotBorder: "#D9C9F5" };
  if (type === "Cartão de vacina") return { typeColor: "#E08A35", dotBg: "#FDEFE4", dotBorder: "#F5D5B3" };
  return { typeColor: "#0077B6", dotBg: "#E7F2F9", dotBorder: "#C5DDEF" };
}

const filters = ["Todos", "Medicação", "Sintomas", "Exames", "Vacinas", "Consultas"];

export default function HistoricoPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [allEvents, setAllEvents] = useState<TimelineEvent[]>(staticEvents);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const docEvents: TimelineEvent[] = stored.map((doc: any) => {
        const colors = docTypeColor(doc.type);
        return {
          date: doc.date,
          dateDetail: "",
          type: doc.type,
          filterKey: docTypeToFilter(doc.type),
          title: doc.label,
          meta: `Scaneado em ${doc.date}`,
          ...colors,
          icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.typeColor} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6M8 13h8M8 17h5" />
            </svg>
          ),
        };
      });
      setAllEvents([...docEvents, ...staticEvents]);
    } catch {
      // ignore
    }
  }, []);

  const filtered = activeFilter === "Todos"
    ? allEvents
    : allEvents.filter((e) => e.filterKey === activeFilter || e.type === activeFilter);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#7B8B99] mb-3">
          <Link href="/paciente" className="hover:text-[#0077B6] transition-colors no-underline text-[#7B8B99]">
            Início
          </Link>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-[#10212E] font-semibold">Histórico</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#10212E] tracking-tight leading-tight">
              Histórico Clínico
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#7B8B99] font-medium mt-1">
              Todos os registros em ordem cronológica.
            </p>
          </div>
          <Link
            href="/paciente/relatorio"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-[13px] text-white no-underline whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
            style={{ background: "#0077B6" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
            </svg>
            Compartilhar
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="-mx-4 sm:mx-0 mb-6">
        <div className="flex gap-2 px-4 sm:px-0 sm:flex-wrap overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-bold transition-all"
              style={
                activeFilter === f
                  ? { background: "#0077B6", color: "#fff" }
                  : { background: "#EEF3F7", color: "#5C6F7E" }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-[14px] font-medium text-[#C0CDD7]">
          Nenhum registro encontrado para este filtro.
        </div>
      ) : (
        <div className="relative pl-10">
          <div
            className="absolute top-3 bottom-3"
            style={{ left: 15, width: 2, background: "linear-gradient(to bottom, #C5DDEF, #E1E8EE 80%)" }}
          />

          <div className="space-y-3">
            {filtered.map((e, i) => (
              <div key={i} className="relative">
                <div
                  className="absolute flex items-center justify-center"
                  style={{
                    left: -25,
                    top: 14,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: e.dotBg,
                    border: `2px solid ${e.dotBorder}`,
                  }}
                >
                  {e.icon}
                </div>

                <div
                  className="rounded-2xl px-4 py-3.5"
                  style={{
                    background: "#fff",
                    border: "1px solid #EEF2F6",
                    boxShadow: "0 1px 6px rgba(0,0,0,.04)",
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ color: e.typeColor, background: e.dotBg }}
                    >
                      {e.type}
                    </span>
                    <span
                      className="text-[11px] font-medium text-[#9AAAB7] shrink-0"
                      style={{ fontFamily: "ui-monospace, monospace" }}
                    >
                      {e.date}
                    </span>
                  </div>

                  <div className="text-[15px] sm:text-[16px] font-extrabold text-[#10212E] leading-snug">
                    {e.title}
                  </div>

                  <div className="text-[12px] sm:text-[13px] font-medium text-[#7B8B99] mt-0.5">
                    {e.meta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share CTA */}
      <div
        className="mt-6 p-4 sm:p-5 rounded-2xl"
        style={{ background: "#E7F2F9", border: "1px solid #C5DDEF" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[14px] sm:text-[15px] font-extrabold text-[#10212E]">
              Pronto para compartilhar?
            </div>
            <div className="text-[12px] sm:text-[13px] font-medium text-[#5C6F7E] mt-0.5">
              Gere um relatório clínico completo para o seu médico.
            </div>
          </div>
          <Link
            href="/paciente/relatorio"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-extrabold text-[14px] text-white no-underline whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ background: "#0077B6", boxShadow: "0 4px 14px rgba(0,119,182,.28)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
            </svg>
            Compartilhar com médico
          </Link>
        </div>
      </div>
    </div>
  );
}
