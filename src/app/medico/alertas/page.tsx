"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPatients, resolveAlert, Patient, AlertItem } from "@/lib/mockData";
import { 
  Bell, 
  AlertTriangle, 
  Check, 
  ChevronRight, 
  User, 
  Clock, 
  ExternalLink,
  ArrowLeft
} from "lucide-react";

interface EnhancedAlert {
  patient: Patient;
  alert: AlertItem;
}

export default function AlertasPage() {
  const [alerts, setAlerts] = useState<EnhancedAlert[]>([]);

  const loadAlerts = () => {
    const patients = getPatients();
    const list: EnhancedAlert[] = [];
    patients.forEach((p) => {
      p.alerts.forEach((a) => {
        if (!a.solved) {
          list.push({ patient: p, alert: a });
        }
      });
    });
    // Sort alerts by date desc
    list.sort((a, b) => new Date(b.alert.date).getTime() - new Date(a.alert.date).getTime());
    setAlerts(list);
  };

  useEffect(() => {
    loadAlerts();
    
    // Listen for storage events (e.g. if tabs are synced in browser)
    window.addEventListener("storage", loadAlerts);
    return () => window.removeEventListener("storage", loadAlerts);
  }, []);

  const handleResolve = (patientId: string, alertId: string) => {
    const updated = resolveAlert(patientId, alertId);
    if (updated) {
      loadAlerts();
      
      // Dispatch storage event to sync other pages
      window.dispatchEvent(new Event("storage"));
    }
  };

  const getAlertBadgeStyles = (type: AlertItem["type"]) => {
    switch (type) {
      case "urgencia":
        return { bg: "#FFF1F2", color: "#E11D48", label: "Crítico" };
      case "sintoma":
        return { bg: "#FFF9EB", color: "#D08A00", label: "Sintoma" };
      case "adesao":
        return { bg: "#F0FDF4", color: "#16A874", label: "Adesão" };
      default:
        return { bg: "#F4F7FB", color: "#7B8B99", label: "Alerta" };
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[12px] font-extrabold text-[#7B8B99] uppercase tracking-wider">
          Painel de Triagem
        </div>
        <h1 className="text-[26px] lg:text-[30px] font-extrabold text-[#10212E] tracking-tight mt-1 flex items-center gap-2.5">
          <Bell className="w-7 h-7 text-[#0077B6] stroke-[2.2]" /> Alertas Ativos
        </h1>
        <p className="text-[14px] text-[#7B8B99] font-medium mt-1">
          Notificações urgentes de sintomas e adesão reportadas pelos pacientes via WhatsApp.
        </p>
      </div>

      {/* Alert list */}
      <div className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map(({ patient, alert }) => {
            const badge = getAlertBadgeStyles(alert.type);
            return (
              <div
                key={alert.id}
                className="p-5 rounded-2xl bg-white border border-[#EEF2F6] transition-all hover:shadow-sm"
                style={{ 
                  boxShadow: "0 2px 8px rgba(0,0,0,.02)",
                  borderLeft: `4px solid ${badge.color}`
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  
                  {/* Alert body */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Urgency Badge */}
                      <span 
                        className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider"
                        style={{ background: badge.bg, color: badge.color }}
                      >
                        {badge.label}
                      </span>
                      
                      {/* Patient link */}
                      <Link 
                        href={`/medico/paciente/${patient.id}`}
                        className="text-[14px] font-extrabold text-[#0077B6] hover:underline flex items-center gap-1"
                      >
                        <User className="w-3.5 h-3.5 text-[#0077B6]" />
                        {patient.name}
                      </Link>
                      
                      {/* Age and condition */}
                      <span className="text-[13px] text-[#7B8B99] font-semibold">
                        ({patient.age} anos · {patient.condition})
                      </span>
                    </div>

                    {/* Alert text */}
                    <div className="text-[15px] font-bold text-[#10212E] leading-relaxed pr-2">
                      {alert.text}
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#7B8B99] font-medium" style={{ fontFamily: "var(--font-mono-clinical)" }}>
                      <Clock className="w-3 h-3 text-[#7B8B99]" />
                      Reportado em: {alert.date}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 shrink-0 self-end sm:self-center w-full sm:w-auto">
                    <button
                      onClick={() => handleResolve(patient.id, alert.id)}
                      className="flex-1 sm:w-36 py-2.5 rounded-xl bg-[#E8F6EF] text-[#2F9367] hover:bg-[#D4EFE0] transition-colors text-[13px] font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4" /> Resolver
                    </button>
                    <Link
                      href={`/medico/paciente/${patient.id}`}
                      className="flex-1 sm:w-36 py-2.5 rounded-xl bg-[#F4F7FB] text-[#0A2540] hover:bg-[#EEF2F6] transition-colors text-[13px] font-extrabold text-center no-underline flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Ver Prontuário
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center p-16 text-center bg-white border border-dashed border-[#C3E6D0] rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-[#E8F6EF] flex items-center justify-center mb-4">
              <Check className="w-7 h-7 text-[#2F9367] stroke-[3]" />
            </div>
            <h3 className="text-[17px] font-extrabold text-[#15412E]">Sem Alertas Pendentes</h3>
            <p className="text-[13.5px] text-[#5E7D6D] font-semibold mt-1.5 max-w-sm leading-relaxed">
              Excelente! Todos os seus pacientes ativos estão com sintomas normais e boa adesão às medicações.
            </p>
          </div>
        )}
      </div>

      {/* Quick link back */}
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
