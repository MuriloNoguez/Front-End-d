"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPatients, Patient } from "@/lib/mockData";
import { Search, AlertCircle, Clock, CheckCircle2, ChevronRight, UserMinus } from "lucide-react";

export default function MedicoDashboardPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"todos" | "sem_retorno" | "ativos">("todos");

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  // Recalculate stats dynamically
  const totalPatientsCount = patients.length;
  const activeAlertsCount = patients.filter((p) => p.alerts.some((a) => !a.solved)).length;
  const overduePatientsCount = patients.filter((p) => p.status === "sem_retorno").length;

  const stats = [
    { label: "Pacientes", value: totalPatientsCount.toString(), color: "#0077B6" },
    { label: "Alertas ativos", value: activeAlertsCount.toString(), color: "#E74C3C" },
    { label: "Sem retorno", value: overduePatientsCount.toString(), color: "#F4B73D" },
  ];

  // Filter patients based on search and active tab
  const filteredPatients = patients.filter((p) => {
    // Tab filter
    if (activeTab === "sem_retorno" && p.status !== "sem_retorno") return false;
    if (activeTab === "ativos" && p.status !== "ativo" && p.status !== "urgente") return false;

    // Search filter
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div>
      {/* Greeting */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-[14px] font-semibold text-[#7B8B99]">Bom dia,</div>
          <h1 className="text-[26px] lg:text-[30px] font-extrabold text-[#10212E] tracking-tight leading-tight">
            Dr. André Souza
          </h1>
          <div className="text-[13px] font-medium text-[#7B8B99] mt-0.5">Cardiologia · CRM 45.221</div>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-[13px] font-medium text-[#7B8B99]">Sexta-feira</div>
          <div className="text-[13px] font-semibold text-[#10212E]">20 de junho de 2026</div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-4 rounded-2xl transition-all hover:translate-y-[-2px] duration-200"
            style={{ 
              background: "#fff", 
              border: "1px solid #EEF2F6", 
              boxShadow: "0 2px 8px rgba(0,0,0,.03)" 
            }}
          >
            <div
              className="text-[28px] font-extrabold"
              style={{ 
                fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)",
                color: s.color
              }}
            >
              {s.value}
            </div>
            <div className="text-[12px] font-semibold text-[#7B8B99] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8B99] w-4 height-4" />
          <input
            type="text"
            placeholder="Buscar por nome ou condição (ex: Hipertensão)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#EEF2F6] bg-white text-[14px] text-[#10212E] font-medium outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/10 transition-all placeholder:text-[#9AAAB7]"
          />
        </div>

        {/* Tab filters */}
        <div className="flex gap-2 p-1 bg-[#EEF2F6] rounded-xl overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab("todos")}
            className={`flex-1 py-2 px-3 rounded-lg text-[13px] font-bold transition-all text-center ${
              activeTab === "todos"
                ? "bg-white text-[#0A2540] shadow-sm"
                : "text-[#7B8B99] hover:text-[#10212E]"
            }`}
          >
            Todos <span className="text-[11px] font-semibold opacity-65">({patients.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("sem_retorno")}
            className={`flex-1 py-2 px-3 rounded-lg text-[13px] font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === "sem_retorno"
                ? "bg-white text-[#F4B73D] shadow-sm"
                : "text-[#7B8B99] hover:text-[#10212E]"
            }`}
          >
            Sem Retorno <span className="text-[11px] font-semibold opacity-65">({overduePatientsCount})</span>
          </button>
          <button
            onClick={() => setActiveTab("ativos")}
            className={`flex-1 py-2 px-3 rounded-lg text-[13px] font-bold transition-all text-center ${
              activeTab === "ativos"
                ? "bg-white text-[#16A874] shadow-sm"
                : "text-[#7B8B99] hover:text-[#10212E]"
            }`}
          >
            Ativos <span className="text-[11px] font-semibold opacity-65">({patients.filter(p => p.status !== "sem_retorno").length})</span>
          </button>
        </div>
      </div>

      {/* Info Warning banner when on "Sem retorno" tab */}
      {activeTab === "sem_retorno" && overduePatientsCount > 0 && (
        <div className="p-4 rounded-xl mb-4 flex gap-3 items-start" style={{ background: "#FFF9EB", border: "1px solid #FFE4A0" }}>
          <Clock className="w-5 h-5 text-[#D08A00] shrink-0 mt-0.5" />
          <div>
            <div className="text-[13.5px] font-extrabold text-[#7C5A0B]">Dica sobre gestão de retornos</div>
            <p className="text-[12.5px] text-[#8C6D1F] font-semibold mt-0.5 leading-relaxed">
              Você pode enviar lembretes automáticos pelo WhatsApp para estes pacientes agendarem um retorno. Acesse a aba <strong>Agenda</strong> na barra lateral para disparar os contatos.
            </p>
          </div>
        </div>
      )}

      {/* Patient Cards List */}
      <div className="space-y-3">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((p) => {
            const hasUnsolvedAlert = p.alerts.some((a) => !a.solved);
            return (
              <div
                key={p.id}
                className="rounded-2xl p-5 transition-all duration-300 hover:shadow-md border bg-white"
                style={{ 
                  borderColor: p.status === "urgente" && hasUnsolvedAlert ? "#F4D6D2" : "#EEF2F6",
                  boxShadow: "0 2px 10px rgba(0,0,0,.02)" 
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar with dynamic ring */}
                  <div className="relative shrink-0">
                    <div
                      className="flex items-center justify-center text-[18px] font-extrabold"
                      style={{ 
                        width: 48, 
                        height: 48, 
                        borderRadius: "50%", 
                        background: p.avatarBg, 
                        color: p.avatarColor 
                      }}
                    >
                      {p.initial}
                    </div>
                    <div
                      className="absolute"
                      style={{
                        bottom: -1,
                        right: -1,
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: p.statusColor,
                        border: "2.5px solid #fff",
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[17px] font-extrabold text-[#10212E]">{p.name}</span>
                      {p.badge && (
                        <span
                          className="text-[9.5px] font-extrabold text-white px-2 py-0.5 rounded-full uppercase tracking-wider"
                          style={{ background: p.badgeBg || "#7B8B99" }}
                        >
                          {p.badge}
                        </span>
                      )}
                      {p.reminderSent && (
                        <span className="text-[9.5px] font-extrabold bg-[#E7F2F9] text-[#0077B6] px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Lembrete Enviado
                        </span>
                      )}
                    </div>
                    <div className="text-[13px] font-semibold text-[#7B8B99] mt-0.5">
                      {p.age} anos · {p.condition}
                    </div>

                    {/* Return information if sem_retorno */}
                    {p.status === "sem_retorno" && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-[12px] font-bold text-[#D08A00] bg-[#FFF9EB] px-2.5 py-1 rounded-lg w-fit">
                        <UserMinus className="w-3.5 h-3.5" />
                        {p.daysSinceLastConsultation} dias sem consulta de retorno
                      </div>
                    )}

                    {/* Dynamic Urgent Alert Text */}
                    {p.alertText && hasUnsolvedAlert && (
                      <div className="flex items-center gap-1.5 mt-2 text-[12px] font-bold text-[#E74C3C] bg-[#FDEEEE] px-2.5 py-1 rounded-lg w-fit">
                        <AlertCircle className="w-3.5 h-3.5 text-[#E74C3C]" />
                        {p.alertText}
                      </div>
                    )}
                  </div>

                  {/* Days since info (hidden on mobile) */}
                  <div
                    className="text-[11px] font-medium text-[#7B8B99] shrink-0 hidden sm:block bg-[#F4F7FB] px-2.5 py-1 rounded-lg"
                    style={{ fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }}
                  >
                    U. Consulta: {p.recordHistory[0]?.date || "N/A"}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/medico/paciente/${p.id}`}
                    className="flex-1 py-2.5 rounded-xl text-center text-[13.5px] font-extrabold no-underline transition-colors hover:bg-[#D8ECF7] flex items-center justify-center gap-1"
                    style={{ background: "#E7F2F9", color: "#0077B6" }}
                  >
                    Ver prontuário completo
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/medico/paciente/${p.id}#historico`}
                    className="px-4 py-2.5 rounded-xl text-[13.5px] font-extrabold transition-colors hover:bg-[#F4DADA] no-underline text-center flex items-center justify-center"
                    style={{ background: "#FDEEEE", color: "#E74C3C" }}
                  >
                    Histórico
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-[#EEF2F6]">
            <Clock className="w-12 h-12 text-[#9AAAB7] stroke-[1.5] mb-3" />
            <div className="text-[16px] font-bold text-[#10212E]">Nenhum paciente encontrado</div>
            <p className="text-[13px] text-[#7B8B99] font-medium mt-1 max-w-sm">
              Tente redefinir sua pesquisa ou verifique se você está na aba de filtros correta.
            </p>
          </div>
        )}
      </div>


    </div>
  );
}
