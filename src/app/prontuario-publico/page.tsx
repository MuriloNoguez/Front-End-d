"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPatients, Patient } from "@/lib/mockData";
import { 
  Activity, 
  FileText, 
  Pill, 
  FlaskConical, 
  Syringe, 
  User, 
  Calendar, 
  Shield, 
  Phone, 
  Mail,
  ChevronRight,
  Heart
} from "lucide-react";

export default function PublicProntuarioPage() {
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    // Carrega os dados do paciente de ID 1 (Maria Aparecida) em tempo real
    const patients = getPatients();
    const p = patients.find((item) => item.id === "1");
    if (p) {
      setPatient(p);
    }
  }, []);

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FB] px-4">
        <div className="text-center">
          <div className="animate-spin shrink-0 w-10 h-10 border-4 border-[#0077B6] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-[14px] text-[#7B8B99] font-medium">Carregando prontuário...</p>
        </div>
      </div>
    );
  }

  // Helper for document icons
  const docTypeIcon = (type: string) => {
    if (type === "receita") return <Pill className="w-5 h-5 text-[#2F9367]" />;
    if (type === "exame") return <FlaskConical className="w-5 h-5 text-[#7B5BD6]" />;
    if (type === "vacina") return <Syringe className="w-5 h-5 text-[#E08A35]" />;
    return <FileText className="w-5 h-5 text-[#0077B6]" />;
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] pb-16">
      {/* Public Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#0A2540] text-white border-b border-white/10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center" style={{ width: 28, height: 28, borderRadius: 8, background: "#0077B6" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <span className="font-extrabold text-[15px] tracking-tight">Carteira Saúde</span>
          </div>
          <div className="flex items-center gap-2 bg-[#E8F6EF]/10 px-3 py-1 rounded-full border border-[#2F9367]/25">
            <Shield className="w-3.5 h-3.5 text-[#2F9367]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2F9367]">Acesso Seguro</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 mt-6">
        
        {/* Notice Info Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-850 flex gap-3 items-start shadow-xs">
          <Shield className="w-5 h-5 text-[#0077B6] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[14px] font-extrabold text-[#0B3C5D]">Histórico de Saúde Compartilhado</h4>
            <p className="text-[12.5px] text-[#2E5B7C] font-semibold mt-1 leading-relaxed">
              Este é um prontuário médico de visualização temporária, compartilhado pelo próprio paciente para suporte diagnóstico em consultas externas.
            </p>
          </div>
        </div>

        {/* Patient Profile Card */}
        <div className="bg-white rounded-3xl p-6 border border-[#EEF2F6] shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className="flex items-center justify-center shrink-0 text-[26px] font-extrabold"
              style={{ width: 68, height: 68, borderRadius: "50%", background: patient.avatarBg, color: patient.avatarColor }}
            >
              {patient.initial}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-[24px] font-extrabold text-[#10212E] tracking-tight">{patient.name}</h1>
                <span className="text-[10px] font-extrabold text-[#0077B6] bg-[#E7F2F9] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Paciente
                </span>
              </div>
              <p className="text-[13.5px] font-semibold text-[#7B8B99] mt-0.5">
                {patient.age} anos · Diagnóstico Principal: <strong className="text-[#10212E]">{patient.condition}</strong>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 border-t md:border-t-0 md:border-l border-[#EEF2F6] pt-4 md:pt-0 md:pl-6 text-[13px]">
            <div className="flex items-center gap-2 text-[#5C6F7E] font-medium">
              <Phone className="w-4 h-4 text-[#0077B6]" />
              <span className="text-[#10212E] font-bold">{patient.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-[#5C6F7E] font-medium">
              <Mail className="w-4 h-4 text-[#7B8B99]" />
              <span className="text-[#7B8B99] font-semibold truncate max-w-[200px]">{patient.email}</span>
            </div>
          </div>
        </div>

        {/* Overview Medical Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          
          {/* Medications */}
          <div className="p-5 rounded-2xl bg-white border border-[#EEF2F6] shadow-sm">
            <h3 className="text-[12px] font-extrabold text-[#7B8B99] uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-[#0077B6]" /> Medicamentos Ativos em Uso
            </h3>
            <div className="space-y-3">
              {patient.medications.map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#F4F7FB] border border-[#EEF2F6]">
                  <div className="text-[14.5px] font-extrabold text-[#10212E]">{m.name} {m.dosage}</div>
                  <div className="text-[12px] text-[#7B8B99] font-bold mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F9367]" />
                    {m.frequency}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Adherence Chart */}
          <div className="p-5 rounded-2xl bg-white border border-[#EEF2F6] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-[12px] font-extrabold text-[#7B8B99] uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#0077B6]" /> Adesão Recente do Paciente
                </h3>
                <span className="text-[16px] font-extrabold text-[#2F9367] bg-[#E8F6EF] px-2.5 py-0.5 rounded-full">
                  {patient.adherence}%
                </span>
              </div>
              <p className="text-[12px] text-[#7B8B99] font-medium leading-relaxed mb-4">
                Índice de tomadas corretas monitorado e confirmado via assistente virtual.
              </p>
            </div>

            <div>
              <div className="flex gap-1.5 items-end" style={{ height: 50 }}>
                {patient.adherenceChart.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-xs"
                    style={{
                      height: `${h}%`,
                      background: h >= 80 ? "#2F9367" : h >= 60 ? "#7CCBA3" : "#F4B73D",
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[9px] text-[#9AAAB7] font-bold">30 dias atrás</span>
                <span className="text-[9px] text-[#9AAAB7] font-bold">Hoje</span>
              </div>
            </div>
          </div>
        </div>

        {/* Document section */}
        {patient.attachedDocs && patient.attachedDocs.length > 0 && (
          <div className="p-5 rounded-2xl bg-white border border-[#EEF2F6] shadow-sm mb-6">
            <h3 className="text-[12px] font-extrabold text-[#7B8B99] uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#0077B6]" /> Exames e Documentos Clínicos Anexados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {patient.attachedDocs.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#F4F7FB] border border-[#EEF2F6]"
                >
                  {docTypeIcon(doc.iconType)}
                  <span className="text-[13px] font-bold text-[#10212E] truncate" title={doc.label}>
                    {doc.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Record/Consultation History Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[18px] font-extrabold text-[#10212E] tracking-tight">Histórico de Prontuários Médicos</h2>
            <span className="text-[12px] font-bold text-[#7B8B99] bg-[#EEF2F6] px-2.5 py-1 rounded-full">
              {patient.recordHistory.length} evoluções
            </span>
          </div>

          {patient.recordHistory.map((rec) => (
            <div
              key={rec.id}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-[#EEF2F6] shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-[#F4F7FB] pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0077B6]" />
                  <span className="text-[14px] font-extrabold text-[#10212E]">{rec.date}</span>
                </div>
                <span className="text-[12.5px] font-bold text-[#7B8B99]">{rec.medico}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[11px] font-extrabold text-[#7B8B99] uppercase tracking-wider">Anamnese / Queixas</h4>
                  <p className="text-[13.5px] text-[#10212E] font-medium mt-1 leading-relaxed">
                    {rec.anamnese}
                  </p>
                </div>
                
                {rec.diagnostico && (
                  <div>
                    <h4 className="text-[11px] font-extrabold text-[#7B8B99] uppercase tracking-wider">Hipótese Diagnóstica</h4>
                    <p className="text-[13.5px] text-[#10212E] font-semibold mt-1 leading-relaxed">
                      {rec.diagnostico}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="text-[11px] font-extrabold text-[#7B8B99] uppercase tracking-wider">Conduta & Prescrição</h4>
                  <div className="text-[13.5px] text-[#0077B6] font-semibold mt-1 leading-relaxed bg-[#F4F9FC] p-3 rounded-xl border border-[#E7F2F9]">
                    {rec.conduta}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Public Footer */}
      <footer className="mt-16 text-center text-[12px] text-[#7B8B99] max-w-sm mx-auto px-4 leading-5">
        <p>Desenvolvido por Carteira Saúde. Este canal é restrito a fins informativos clínicos sob autorização expressa do paciente.</p>
      </footer>
    </div>
  );
}
