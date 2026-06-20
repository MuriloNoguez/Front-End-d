"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPatients, sendReminder, Patient } from "@/lib/mockData";
import { 
  Calendar, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare,
  ArrowLeft,
  ChevronRight,
  UserCheck
} from "lucide-react";

export default function AgendaPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [successId, setSuccessId] = useState<string | null>(null);

  const loadPatients = () => {
    setPatients(getPatients());
  };

  useEffect(() => {
    loadPatients();
    
    // Sync with other tabs
    window.addEventListener("storage", loadPatients);
    return () => window.removeEventListener("storage", loadPatients);
  }, []);

  const handleSendReminder = (patientId: string) => {
    const updated = sendReminder(patientId);
    if (updated) {
      loadPatients();
      setSuccessId(patientId);
      
      // Dispatch storage event to update the homepage dashboard
      window.dispatchEvent(new Event("storage"));
      
      // Clear toast after 3 seconds
      setTimeout(() => setSuccessId(null), 3000);
    }
  };

  // Filter patients who are sem_retorno
  const overduePatients = patients.filter((p) => p.status === "sem_retorno");

  // Mock consultations for today
  const mockAppointments = [
    {
      time: "09:00",
      patientName: "Maria Aparecida",
      type: "Retorno Urgente",
      condition: "Hipertensão · Queixa de tontura",
      bg: "#FFF1F2",
      badgeColor: "#E11D48",
      link: "/medico/paciente/1"
    },
    {
      time: "10:30",
      patientName: "Rita de Cássia",
      type: "Consulta Periódica",
      condition: "Asma · Avaliação de espirometria",
      bg: "#F0F9FF",
      badgeColor: "#0284C7",
      link: "/medico/paciente/5"
    },
    {
      time: "14:00",
      patientName: "Claudio Peixoto",
      type: "Primeira Consulta",
      condition: "Diabetes recém-diagnosticado",
      bg: "#F4F7FB",
      badgeColor: "#7B8B99",
      link: "#"
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[12px] font-extrabold text-[#7B8B99] uppercase tracking-wider">
          Agenda e Acompanhamento
        </div>
        <h1 className="text-[26px] lg:text-[30px] font-extrabold text-[#10212E] tracking-tight mt-1 flex items-center gap-2.5">
          <Calendar className="w-7 h-7 text-[#0077B6] stroke-[2.2]" /> Agenda & Retornos
        </h1>
        <p className="text-[14px] text-[#7B8B99] font-medium mt-1">
          Gerencie seus horários de hoje e reconecte-se com pacientes que precisam de consulta de retorno.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Column 1: Agenda de Hoje (5/12 grid width on large screens) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-[17px] font-extrabold text-[#10212E] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0077B6]" /> Consultas de Hoje
          </h2>
          
          <div className="space-y-3">
            {mockAppointments.map((app, index) => (
              <div 
                key={index}
                className="p-4 rounded-2xl bg-white border border-[#EEF2F6] flex gap-4 transition-all hover:translate-x-1"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,.02)" }}
              >
                {/* Time tag */}
                <div className="flex flex-col items-center justify-center shrink-0 border-r border-[#EEF2F6] pr-4" style={{ width: 60 }}>
                  <span className="text-[16px] font-extrabold text-[#10212E]" style={{ fontFamily: "var(--font-mono-clinical)" }}>
                    {app.time}
                  </span>
                  <span className="text-[10px] text-[#7B8B99] font-bold uppercase mt-0.5">Horário</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {app.link !== "#" ? (
                      <Link href={app.link} className="text-[14.5px] font-extrabold text-[#0077B6] hover:underline truncate">
                        {app.patientName}
                      </Link>
                    ) : (
                      <span className="text-[14.5px] font-extrabold text-[#10212E] truncate">{app.patientName}</span>
                    )}
                    <span 
                      className="text-[9px] font-extrabold text-white px-2 py-0.5 rounded-full uppercase"
                      style={{ background: app.badgeColor }}
                    >
                      {app.type}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#7B8B99] font-semibold mt-1 truncate">
                    {app.condition}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Calendar visual widget */}
          <div className="p-5 rounded-2xl bg-[#E7F2F9] border border-[#C5DDEF] text-[13px]">
            <div className="font-extrabold text-[#0077B6] mb-1">Visualização da Semana</div>
            <p className="text-[#5C6F7E] font-medium leading-relaxed">
              Você tem um total de <strong>14 consultas</strong> agendadas para esta semana. Seu tempo médio de atendimento é de 30 minutos.
            </p>
          </div>
        </div>

        {/* Column 2: Assistente de Retornos (7/12 grid width) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-[17px] font-extrabold text-[#10212E] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#F4B73D]" /> Assistente de Retornos
            </span>
            <span className="text-[12px] text-[#D08A00] bg-[#FFF9EB] px-2.5 py-0.5 rounded-full font-bold">
              {overduePatients.length} em atraso
            </span>
          </h2>

          <div className="space-y-3">
            {overduePatients.length > 0 ? (
              overduePatients.map((p) => {
                const isSentSuccess = successId === p.id;
                return (
                  <div 
                    key={p.id}
                    className="p-5 rounded-2xl bg-white border border-[#EEF2F6]"
                    style={{ 
                      boxShadow: "0 2px 8px rgba(0,0,0,.02)",
                      borderLeft: p.daysSinceLastConsultation > 90 ? "4px solid #E74C3C" : "4px solid #F4B73D"
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      {/* Patient delay info */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link href={`/medico/paciente/${p.id}`} className="text-[15px] font-extrabold text-[#0077B6] hover:underline">
                            {p.name}
                          </Link>
                          <span className="text-[12px] text-[#7B8B99] font-bold">
                            ({p.age} anos · {p.condition})
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-[12.5px] font-bold">
                          <span 
                            className="px-2 py-0.5 rounded text-[11px] font-extrabold uppercase"
                            style={{ 
                              background: p.daysSinceLastConsultation > 90 ? "#FDEEEE" : "#FFF9EB", 
                              color: p.daysSinceLastConsultation > 90 ? "#E74C3C" : "#D08A00" 
                            }}
                          >
                            {p.daysSinceLastConsultation} dias sem retorno
                          </span>
                        </div>
                        <p className="text-[12px] text-[#7B8B99] font-medium">
                          Última consulta realizada: <strong>{p.recordHistory[p.recordHistory.length - 1]?.date || p.lastConsultation}</strong>
                        </p>
                      </div>

                      {/* WhatsApp trigger action */}
                      <div className="shrink-0 self-end sm:self-center">
                        {p.reminderSent ? (
                          <div className="px-4 py-2.5 rounded-xl bg-[#E7F2F9] text-[#0077B6] text-[12.5px] font-extrabold flex items-center gap-1.5 border border-[#C5DDEF]">
                            <UserCheck className="w-4 h-4" /> Lembrete Enviado
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSendReminder(p.id)}
                            className="px-4 py-2.5 rounded-xl bg-[#0077B6] text-white hover:bg-[#005B8C] transition-all text-[12.5px] font-extrabold flex items-center gap-1.5 cursor-pointer shadow-sm"
                            disabled={isSentSuccess}
                          >
                            {isSentSuccess ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" /> Enviando...
                              </>
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5" /> Chamar no WhatsApp
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Simulating popup toast check */}
                    {isSentSuccess && (
                      <div className="mt-3 p-2.5 rounded-lg bg-[#E8F6EF] border border-[#C3E6D0] text-[#2F9367] text-[12px] font-bold flex items-center gap-2 animate-pulse">
                        <MessageSquare className="w-4 h-4" />
                        Disparo enviado! Mensagem de retorno configurada e enviada via WhatsApp para {p.name}.
                      </div>
                    )}

                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center bg-white border border-[#EEF2F6] rounded-2xl flex flex-col items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-[#2F9367] stroke-[1.5] mb-3" />
                <h3 className="text-[16px] font-bold text-[#10212E]">Nenhum Paciente Pendente</h3>
                <p className="text-[13px] text-[#7B8B99] font-medium mt-1 max-w-xs leading-relaxed">
                  Excelente! Todos os seus pacientes cadastrados realizaram consultas nos últimos 30 dias ou já receberam lembretes.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Navigation back */}
      <div className="mt-8">
        <Link
          href="/medico"
          className="text-[13px] font-bold text-[#7B8B99] hover:text-[#0077B6] transition-colors no-underline flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar para o início
        </Link>
      </div>
    </div>
  );
}
