"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  getPatients, 
  addConsultation, 
  resolveAlert, 
  Patient, 
  ConsultationEntry 
} from "@/lib/mockData";
import { 
  ArrowLeft, 
  AlertCircle, 
  Calendar, 
  Check, 
  PlusCircle, 
  FileText, 
  Phone, 
  Mail, 
  ExternalLink,
  ChevronRight,
  FlaskConical,
  Syringe,
  AlertTriangle
} from "lucide-react";

export default function PacienteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [patient, setPatient] = useState<Patient | null>(null);
  
  // Form states
  const [anamnese, setAnamnese] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [conduta, setConduta] = useState("");
  
  // UI states
  const [successMsg, setSuccessMsg] = useState("");
  const [activeAlerts, setActiveAlerts] = useState<Patient["alerts"]>([]);

  // Load patient data
  useEffect(() => {
    const list = getPatients();
    const p = list.find((item) => item.id === id);
    if (p) {
      setPatient(p);
      setActiveAlerts(p.alerts);
    }
  }, [id]);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center">
        <AlertCircle className="w-12 h-12 text-[#E74C3C] mb-4" />
        <h2 className="text-[20px] font-extrabold text-[#10212E]">Paciente não encontrado</h2>
        <p className="text-[14px] text-[#7B8B99] mt-2 mb-6">O código do paciente não consta em nosso sistema.</p>
        <Link 
          href="/medico" 
          className="px-6 py-3 rounded-xl bg-[#0077B6] text-white text-[14px] font-extrabold no-underline"
        >
          Voltar para o Dashboard
        </Link>
      </div>
    );
  }

  const handleResolveAlert = (alertId: string) => {
    const updated = resolveAlert(patient.id, alertId);
    if (updated) {
      setPatient(updated);
      setActiveAlerts(updated.alerts);
      
      // Update dashboard state in browser by dispatching a storage event
      window.dispatchEvent(new Event("storage"));
    }
  };

  const handleSaveConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anamnese || !conduta) {
      alert("Por favor, preencha a Anamnese e a Conduta/Prescrição.");
      return;
    }

    const updated = addConsultation(patient.id, {
      anamnese,
      diagnostico: diagnostico || "Não especificado",
      conduta,
    });

    if (updated) {
      setPatient(updated);
      
      // Reset form
      setAnamnese("");
      setDiagnostico("");
      setConduta("");
      
      // Show success
      setSuccessMsg("Evolução médica salva com sucesso no prontuário!");
      setTimeout(() => setSuccessMsg(""), 4000);

      // Dispatch storage event to keep tabs synced
      window.dispatchEvent(new Event("storage"));
    }
  };

  const hasUnsolvedAlerts = activeAlerts.some((a) => !a.solved);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] font-medium text-[#7B8B99] mb-4">
        <Link href="/medico" className="hover:text-[#0077B6] transition-colors no-underline text-[#7B8B99] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
        </Link>
        <ChevronRight className="w-3 h-3 text-[#9AAAB7]" />
        <span className="text-[#10212E] font-semibold">{patient.name}</span>
      </div>

      {/* Patient Header Card */}
      <div
        className="p-6 rounded-2xl mb-6 bg-white border border-[#EEF2F6]"
        style={{ boxShadow: "0 2px 10px rgba(0,0,0,.03)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div
                className="flex items-center justify-center text-[22px] font-extrabold"
                style={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: "50%", 
                  background: patient.avatarBg, 
                  color: patient.avatarColor 
                }}
              >
                {patient.initial}
              </div>
              <div
                className="absolute"
                style={{
                  bottom: 0,
                  right: 0,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: patient.statusColor,
                  border: "2.5px solid #fff",
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-[22px] font-extrabold text-[#10212E] tracking-tight">{patient.name}</h1>
                {patient.badge && (
                  <span
                    className="text-[9.5px] font-extrabold text-white px-2 py-0.5 rounded-full uppercase tracking-wider"
                    style={{ background: patient.badgeBg || "#7B8B99" }}
                  >
                    {patient.badge}
                  </span>
                )}
              </div>
              <p className="text-[13px] font-medium text-[#7B8B99] mt-0.5">
                {patient.age} anos · {patient.condition}
              </p>
            </div>
          </div>

          {/* Quick contact information */}
          <div className="flex flex-col gap-1.5 text-[12.5px] text-[#5E7D6D] border-t sm:border-t-0 sm:border-l border-[#EEF2F6] pt-3 sm:pt-0 sm:pl-6">
            <div className="flex items-center gap-2 font-bold text-[#10212E]">
              <Phone className="w-3.5 h-3.5 text-[#0077B6]" /> {patient.phone}
            </div>
            <div className="flex items-center gap-2 font-semibold text-[#7B8B99]">
              <Mail className="w-3.5 h-3.5 text-[#7B8B99]" /> {patient.email}
            </div>
          </div>
        </div>

        {/* Retorno Overdue alert banner if patient.status === 'sem_retorno' */}
        {patient.status === "sem_retorno" && (
          <div className="mt-4 p-3.5 rounded-xl flex gap-3 items-center bg-[#FFF9EB] border border-[#FFE4A0] text-[13px]">
            <Calendar className="w-4 h-4 text-[#D08A00] shrink-0" />
            <span className="font-semibold text-[#8C6D1F]">
              Atenção: Paciente está sem consultas há {patient.daysSinceLastConsultation} dias. É necessário realizar uma nova consulta de retorno.
            </span>
          </div>
        )}
      </div>

      {/* Active Alerts Section */}
      {hasUnsolvedAlerts && (
        <div className="mb-6 p-5 rounded-2xl bg-[#FFF5F5] border border-[#FAD2D2]">
          <h3 className="text-[14px] font-extrabold text-[#C53030] uppercase tracking-wider mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Alertas Clínicos do WhatsApp
          </h3>
          <div className="space-y-3">
            {activeAlerts
              .filter((a) => !a.solved)
              .map((alert) => (
                <div key={alert.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white rounded-xl border border-[#F5C2C2]">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-[#C53030] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[13.5px] font-bold text-[#10212E] leading-relaxed">{alert.text}</p>
                      <span className="text-[11px] text-[#7B8B99] font-medium" style={{ fontFamily: "var(--font-mono-clinical, ui-monospace)" }}>
                        Enviado em {alert.date}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleResolveAlert(alert.id)}
                    className="self-end sm:self-center px-4 py-2 bg-[#E2F0D9] text-[#385723] rounded-lg text-[12.5px] font-extrabold hover:bg-[#D5EAC8] transition-colors flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" /> Marcar como Resolvido
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Grid of Medical Data (Medications, Adherence) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Prescription and Medications */}
        <div className="p-5 rounded-2xl bg-white border border-[#EEF2F6]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,.03)" }}>
          <h3 className="text-[12px] font-extrabold text-[#7B8B99] uppercase tracking-wider mb-4">Medicamentos em Uso</h3>
          <div className="space-y-3">
            {patient.medications.map((m, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-[#F4F7FB] border border-[#EEF2F6]">
                <div className="text-[15px] font-extrabold text-[#10212E]">{m.name} {m.dosage}</div>
                <div className="text-[12px] text-[#7B8B99] font-semibold mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0077B6]" />
                  {m.frequency}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adherence Chart */}
        <div className="p-5 rounded-2xl bg-white border border-[#EEF2F6]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,.03)" }}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[12px] font-extrabold text-[#7B8B99] uppercase tracking-wider">Adesão Recente</h3>
            <span className="text-[18px] font-extrabold text-[#2F9367] bg-[#E8F6EF] px-2.5 py-0.5 rounded-full">
              {patient.adherence}%
            </span>
          </div>

          <p className="text-[12.5px] text-[#7B8B99] font-medium mb-4 leading-relaxed">
            Porcentagem de confirmação de tomadas via WhatsApp nos últimos 30 dias.
          </p>

          <div className="flex gap-1 items-end" style={{ height: 60 }}>
            {patient.adherenceChart.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background: h >= 80 ? "#2F9367" : h >= 60 ? "#7CCBA3" : "#F4B73D",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-[#7B8B99] font-semibold" style={{ fontFamily: "var(--font-mono-clinical)" }}>30 dias atrás</span>
            <span className="text-[10px] text-[#7B8B99] font-semibold" style={{ fontFamily: "var(--font-mono-clinical)" }}>Hoje</span>
          </div>
        </div>
      </div>

      {/* Main Medical Record Section */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Form: Nova Evolução Médica (Write new record) */}
        <div className="p-6 rounded-2xl bg-white border border-[#EEF2F6]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,.03)" }}>
          <h2 className="text-[18px] font-extrabold text-[#10212E] tracking-tight mb-1">Nova Evolução Clínica</h2>
          <p className="text-[13px] text-[#7B8B99] font-semibold mb-4">Registe os detalhes da consulta de hoje para atualizar o prontuário.</p>
          
          {successMsg && (
            <div className="p-3.5 rounded-xl bg-[#E8F6EF] text-[#2F9367] font-extrabold text-[13px] mb-4 flex items-center gap-2">
              <Check className="w-4 h-4" /> {successMsg}
            </div>
          )}

          <form onSubmit={handleSaveConsultation} className="space-y-4">
            <div>
              <label className="block text-[12.5px] font-extrabold text-[#10212E] uppercase mb-1.5">Anamnese / Queixas do Paciente</label>
              <textarea
                rows={3}
                placeholder="Ex: Paciente refere persistência da cefaleia. Boa adesão à dieta, mas refere dificuldades com atividade física..."
                value={anamnese}
                onChange={(e) => setAnamnese(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-[#EEF2F6] text-[13.5px] font-medium outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/10 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-[12.5px] font-extrabold text-[#10212E] uppercase mb-1.5">Hipótese Diagnóstica / Evolução</label>
              <input
                type="text"
                placeholder="Ex: Hipertensão Estágio I controlado. Diabetes compensado."
                value={diagnostico}
                onChange={(e) => setDiagnostico(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-[#EEF2F6] text-[13.5px] font-medium outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-[12.5px] font-extrabold text-[#10212E] uppercase mb-1.5">Conduta Médica & Prescrição</label>
              <textarea
                rows={3}
                placeholder="Ex: Manter medicações anteriores. Introduzir monitoramento residencial de PA. Retorno em 60 dias..."
                value={conduta}
                onChange={(e) => setConduta(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-[#EEF2F6] text-[13.5px] font-medium outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/10 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl text-[14px] font-extrabold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              style={{ background: "#0077B6", boxShadow: "0 4px 12px rgba(0,119,182,.2)" }}
            >
              <PlusCircle className="w-4 h-4" /> Salvar Prontuário Médico
            </button>
          </form>
        </div>

        {/* List: Prontuários Anteriores (Medical History) */}
        <div id="historico" className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[18px] font-extrabold text-[#10212E] tracking-tight">Histórico de Prontuários</h2>
            <span className="text-[12px] font-bold text-[#7B8B99] bg-[#EEF2F6] px-2.5 py-1 rounded-full">
              {patient.recordHistory.length} registros
            </span>
          </div>

          {patient.recordHistory.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-white border border-[#EEF2F6]"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,.02)" }}
            >
              <div className="flex items-center justify-between border-b border-[#F4F7FB] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0077B6]" />
                  <span className="text-[14px] font-extrabold text-[#10212E]">{rec.date}</span>
                </div>
                <span className="text-[12px] font-bold text-[#7B8B99]">{rec.medico}</span>
              </div>

              <div className="space-y-3.5">
                <div>
                  <h4 className="text-[11.5px] font-extrabold text-[#7B8B99] uppercase tracking-wider">Anamnese</h4>
                  <p className="text-[13.5px] text-[#10212E] font-medium mt-1 leading-relaxed">{rec.anamnese}</p>
                </div>
                {rec.diagnostico && (
                  <div>
                    <h4 className="text-[11.5px] font-extrabold text-[#7B8B99] uppercase tracking-wider">Diagnóstico</h4>
                    <p className="text-[13.5px] text-[#10212E] font-semibold mt-1 leading-relaxed">{rec.diagnostico}</p>
                  </div>
                )}
                <div>
                  <h4 className="text-[11.5px] font-extrabold text-[#7B8B99] uppercase tracking-wider">Conduta e Prescrição</h4>
                  <p className="text-[13.5px] text-[#0077B6] font-semibold mt-1 leading-relaxed bg-[#F4F9FC] p-3 rounded-xl border border-[#E7F2F9]">{rec.conduta}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Attached Documents section */}
        <div className="p-5 rounded-2xl bg-white border border-[#EEF2F6]">
          <h3 className="text-[12px] font-extrabold text-[#7B8B99] uppercase tracking-wider mb-4">Exames & Documentos Anexados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {patient.attachedDocs.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-[#F4F7FB] border border-[#EEF2F6] hover:bg-[#E7F2F9] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  {doc.iconType === "receita" && <FileText className="w-5 h-5 text-[#0077B6] shrink-0" />}
                  {doc.iconType === "exame" && <FlaskConical className="w-5 h-5 text-[#16A874] shrink-0" />}
                  {doc.iconType === "vacina" && <Syringe className="w-5 h-5 text-[#7B5BD6] shrink-0" />}
                  {doc.iconType === "documento" && <FileText className="w-5 h-5 text-[#7B8B99] shrink-0" />}
                  <span className="text-[13px] font-bold text-[#10212E] truncate max-w-[150px]">{doc.label}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#7B8B99] group-hover:text-[#0077B6] transition-colors shrink-0" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
