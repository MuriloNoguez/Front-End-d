"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Check, Plus } from "lucide-react";

const initialMeds = [
  { name: "Losartana 50mg", schedule: "14:00 · 1 comprimido", color: "#2F9367", bg: "#E8F6EF" },
  { name: "AAS 100mg", schedule: "08:00 · 1 comprimido", color: "#0077B6", bg: "#E7F2F9" },
  { name: "Atorvastatina 20mg", schedule: "22:00 · 1 comprimido", color: "#7B5BD6", bg: "#F3EEFA" },
];

const conditions = ["Hipertensão", "Dislipidemia"];

const contacts = [
  { name: "Ana Costa (filha)", phone: "(11) 99823-4567", tel: "+5511998234567" },
  { name: "Dr. André Souza", phone: "(11) 3344-5566", tel: "+551133445566" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#7B8B99] mb-3">{title}</div>
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#fff", border: "1px solid #EEF2F6", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}
      >
        {children}
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  last,
  valueStyle,
}: {
  label: string;
  value: React.ReactNode;
  last?: boolean;
  valueStyle?: React.CSSProperties;
}) {
  return (
    <div
      className="flex items-start sm:items-center justify-between px-4 py-3.5 gap-4"
      style={{ borderBottom: last ? undefined : "1px solid #EEF2F6" }}
    >
      <span className="text-[13px] font-semibold text-[#7B8B99] shrink-0">{label}</span>
      <span className="text-[14px] font-bold text-[#10212E] text-right" style={valueStyle}>
        {value}
      </span>
    </div>
  );
}

type Medication = { name: string; schedule: string; color: string; bg: string };

export default function PerfilPage() {
  const [meds, setMeds] = useState<Medication[]>(initialMeds);
  const [showAddMed, setShowAddMed] = useState(false);
  const [newMedName, setNewMedName] = useState("");
  const [newMedSchedule, setNewMedSchedule] = useState("");
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [disconnected, setDisconnected] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Maria Aparecida Costa",
    phone: "(11) 97654-3210",
    email: "maria.costa@email.com",
  });
  const [editDraft, setEditDraft] = useState(profileData);

  const medColors = [
    { color: "#2F9367", bg: "#E8F6EF" },
    { color: "#0077B6", bg: "#E7F2F9" },
    { color: "#7B5BD6", bg: "#F3EEFA" },
    { color: "#E08A35", bg: "#FDEFE4" },
    { color: "#C05B6A", bg: "#FAECEE" },
  ];

  const handleAddMed = () => {
    if (!newMedName.trim()) return;
    const colors = medColors[meds.length % medColors.length];
    setMeds([...meds, { name: newMedName.trim(), schedule: newMedSchedule.trim() || "Conforme prescrição", ...colors }]);
    setNewMedName("");
    setNewMedSchedule("");
    setShowAddMed(false);
  };

  const handleRemoveMed = (idx: number) => {
    setMeds(meds.filter((_, i) => i !== idx));
  };

  const handleExport = () => {
    const data = {
      paciente: profileData,
      medicamentos: meds,
      condicoes: conditions,
      contatos: contacts,
      exportadoEm: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "carreira-saude-dados.json";
    a.click();
    URL.revokeObjectURL(url);
    setExportDone(true);
    setTimeout(() => setExportDone(false), 3000);
  };

  const handleSaveEdit = () => {
    setProfileData(editDraft);
    setEditMode(false);
  };

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
        <span className="text-[#10212E] font-semibold">Perfil</span>
      </div>

      {/* Avatar hero */}
      <div
        className="flex flex-col sm:flex-row sm:items-center gap-5 p-5 sm:p-6 rounded-2xl mb-6"
        style={{ background: "#0A2540" }}
      >
        <div
          className="flex items-center justify-center shrink-0 text-[32px] font-extrabold text-white self-start sm:self-auto"
          style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(0,119,182,.45)" }}
        >
          {profileData.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-[22px] sm:text-[26px] font-extrabold text-white tracking-tight leading-tight">
            {profileData.name}
          </h1>
          <div
            className="text-[13px] mt-1 font-medium"
            style={{ color: "rgba(255,255,255,.5)", fontFamily: "ui-monospace, monospace" }}
          >
            72 anos · Feminino · CPF 345.***.***.67
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {conditions.map((c) => (
              <span
                key={c}
                className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{ background: "rgba(0,119,182,.25)", color: "#7DCEF8" }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => { setEditDraft(profileData); setEditMode(true); }}
          className="self-start sm:self-auto shrink-0 px-4 py-2 rounded-xl text-[13px] font-bold transition-colors cursor-pointer border-none"
          style={{ background: "rgba(255,255,255,.1)", color: "rgba(255,255,255,.75)", border: "1px solid rgba(255,255,255,.15)" }}
        >
          Editar
        </button>
      </div>

      {/* Edit modal */}
      {editMode && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setEditMode(false)} />
          <div
            className="relative bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl z-10"
            style={{ border: "1px solid #EEF2F6" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[18px] font-extrabold text-[#10212E]">Editar perfil</h3>
              <button onClick={() => setEditMode(false)} className="p-1.5 rounded-full hover:bg-slate-100 border-none bg-transparent cursor-pointer text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[12px] font-bold text-[#7B8B99] uppercase tracking-wider block mb-1.5">Nome completo</label>
                <input
                  className="w-full px-4 py-3 rounded-xl text-[14px] font-medium text-[#10212E] outline-none"
                  style={{ border: "1.5px solid #C5DDEF", background: "#F4F7FB" }}
                  value={editDraft.name}
                  onChange={(e) => setEditDraft({ ...editDraft, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[12px] font-bold text-[#7B8B99] uppercase tracking-wider block mb-1.5">Telefone (WhatsApp)</label>
                <input
                  className="w-full px-4 py-3 rounded-xl text-[14px] font-medium text-[#10212E] outline-none"
                  style={{ border: "1.5px solid #C5DDEF", background: "#F4F7FB", fontFamily: "ui-monospace, monospace" }}
                  value={editDraft.phone}
                  onChange={(e) => setEditDraft({ ...editDraft, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[12px] font-bold text-[#7B8B99] uppercase tracking-wider block mb-1.5">E-mail</label>
                <input
                  className="w-full px-4 py-3 rounded-xl text-[14px] font-medium text-[#10212E] outline-none"
                  style={{ border: "1.5px solid #C5DDEF", background: "#F4F7FB" }}
                  value={editDraft.email}
                  onChange={(e) => setEditDraft({ ...editDraft, email: e.target.value })}
                />
              </div>
            </div>
            <button
              onClick={handleSaveEdit}
              className="mt-5 w-full py-3.5 rounded-xl font-extrabold text-[14px] text-white border-none cursor-pointer transition-opacity hover:opacity-90"
              style={{ background: "#0077B6" }}
            >
              Salvar alterações
            </button>
          </div>
        </div>
      )}

      {/* Personal info */}
      <Section title="Dados pessoais">
        <Row label="Nome completo" value={profileData.name} />
        <Row label="Data de nascimento" value="14 de março de 1954" valueStyle={{ fontFamily: "ui-monospace, monospace" }} />
        <Row label="Telefone (WhatsApp)" value={profileData.phone} valueStyle={{ fontFamily: "ui-monospace, monospace" }} />
        <Row label="E-mail" value={profileData.email} last />
      </Section>

      {/* Medications */}
      <Section title="Medicamentos ativos">
        {meds.map((m, i) => (
          <div
            key={m.name + i}
            className="flex items-center gap-4 px-4 py-3.5"
            style={{ borderBottom: i < meds.length - 1 ? "1px solid #EEF2F6" : undefined }}
          >
            <div
              className="shrink-0 flex items-center justify-center"
              style={{ width: 36, height: 36, borderRadius: 10, background: m.bg }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.5 20.5 4 14a4.95 4.95 0 0 1 7-7l6.5 6.5a4.95 4.95 0 0 1-7 7Z" />
                <path d="m8.5 8.5 7 7" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-extrabold text-[#10212E]">{m.name}</div>
              <div className="text-[12px] font-medium text-[#7B8B99]" style={{ fontFamily: "ui-monospace, monospace" }}>
                {m.schedule}
              </div>
            </div>
            <button
              onClick={() => handleRemoveMed(i)}
              className="shrink-0 p-1.5 rounded-full hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer text-[#C0CDD7] hover:text-[#C05B6A]"
              title="Remover medicamento"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {showAddMed && (
          <div className="px-4 py-4 space-y-3" style={{ borderTop: "1px solid #EEF2F6", background: "#F9FBFD" }}>
            <input
              className="w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[#10212E] outline-none"
              style={{ border: "1.5px solid #C5DDEF", background: "#fff" }}
              placeholder="Nome do medicamento e dose (ex: Metformina 500mg)"
              value={newMedName}
              onChange={(e) => setNewMedName(e.target.value)}
              autoFocus
            />
            <input
              className="w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[#10212E] outline-none"
              style={{ border: "1.5px solid #C5DDEF", background: "#fff" }}
              placeholder="Horário e dose (ex: 08:00 · 1 comprimido)"
              value={newMedSchedule}
              onChange={(e) => setNewMedSchedule(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddMed()}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddMed}
                className="flex-1 py-2.5 rounded-xl text-[13px] font-extrabold text-white border-none cursor-pointer transition-opacity hover:opacity-90"
                style={{ background: "#0077B6" }}
              >
                Adicionar
              </button>
              <button
                onClick={() => { setShowAddMed(false); setNewMedName(""); setNewMedSchedule(""); }}
                className="px-4 py-2.5 rounded-xl text-[13px] font-bold border-none cursor-pointer transition-colors"
                style={{ background: "#EEF3F7", color: "#5C6F7E" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="px-4 py-3" style={{ borderTop: "1px solid #EEF2F6" }}>
          <button
            onClick={() => setShowAddMed(true)}
            className="text-[13px] font-bold text-[#0077B6] flex items-center gap-1.5 border-none bg-transparent cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Adicionar medicamento
          </button>
        </div>
      </Section>

      {/* Emergency contacts */}
      <Section title="Contatos de emergência">
        {contacts.map((c, i) => (
          <div
            key={c.name}
            className="flex items-center gap-4 px-4 py-3.5"
            style={{ borderBottom: i < contacts.length - 1 ? "1px solid #EEF2F6" : undefined }}
          >
            <div
              className="shrink-0 flex items-center justify-center"
              style={{ width: 36, height: 36, borderRadius: "50%", background: "#EEF3F7" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C6F7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" /><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-extrabold text-[#10212E]">{c.name}</div>
              <div className="text-[12px] font-medium text-[#7B8B99]" style={{ fontFamily: "ui-monospace, monospace" }}>
                {c.phone}
              </div>
            </div>
            <a
              href={`tel:${c.tel}`}
              className="shrink-0 text-[12px] font-bold text-[#0077B6] no-underline px-3 py-1.5 rounded-lg transition-colors hover:bg-[#E7F2F9]"
            >
              Ligar
            </a>
          </div>
        ))}
      </Section>

      {/* WhatsApp & connection */}
      <Section title="Conexão WhatsApp">
        <div className="px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="shrink-0 flex items-center justify-center"
              style={{ width: 36, height: 36, borderRadius: 10, background: "#E8F6EF" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F9367" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <div className="text-[14px] font-extrabold text-[#10212E]">
                {disconnected ? "Desconectado" : "Número conectado"}
              </div>
              <div className="text-[12px] text-[#7B8B99] font-medium" style={{ fontFamily: "ui-monospace, monospace" }}>
                {disconnected ? "—" : profileData.phone}
              </div>
            </div>
          </div>
          <span
            className="text-[11px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full"
            style={
              disconnected
                ? { background: "#FECACA", color: "#C05B6A" }
                : { background: "#E8F6EF", color: "#2F9367" }
            }
          >
            {disconnected ? "Inativo" : "Ativo"}
          </span>
        </div>
      </Section>

      {/* Privacy & LGPD */}
      <Section title="Privacidade e dados (LGPD)">
        <Row label="Compartilhamento com médicos" value="Autorizado" valueStyle={{ color: "#2F9367" }} />
        <Row label="Armazenamento de dados" value="Criptografado" />
        <Row
          label="Exportar meus dados"
          value={
            <button
              onClick={handleExport}
              className="text-[13px] font-bold flex items-center gap-1.5 border-none bg-transparent cursor-pointer transition-colors"
              style={{ color: exportDone ? "#2F9367" : "#0077B6" }}
            >
              {exportDone ? <><Check className="w-3.5 h-3.5" /> Baixado!</> : "Solicitar cópia"}
            </button>
          }
          last
        />
      </Section>

      {/* Danger zone */}
      <div
        className="rounded-2xl p-4 sm:p-5 mb-6"
        style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}
      >
        <div className="text-[12px] font-extrabold uppercase tracking-widest text-[#C05B6A] mb-3">Zona de atenção</div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowDisconnectConfirm(true)}
            className="flex-1 py-3 rounded-xl text-[13px] font-extrabold transition-colors hover:bg-[#FECACA] cursor-pointer border-none"
            style={{ background: "#fff", color: "#C05B6A", border: "1.5px solid #FECACA" }}
          >
            Desconectar WhatsApp
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex-1 py-3 rounded-xl text-[13px] font-extrabold transition-colors hover:bg-[#C05B6A] hover:text-white cursor-pointer border-none"
            style={{ background: "#FECACA", color: "#C05B6A" }}
          >
            Excluir conta e dados
          </button>
        </div>
      </div>

      {/* Disconnect confirm */}
      {showDisconnectConfirm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowDisconnectConfirm(false)} />
          <div className="relative bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl z-10" style={{ border: "1px solid #EEF2F6" }}>
            <h3 className="text-[17px] font-extrabold text-[#10212E] mb-2">Desconectar WhatsApp?</h3>
            <p className="text-[13px] font-medium text-[#7B8B99] mb-5 leading-relaxed">
              Você não receberá mais lembretes de medicamentos e alertas por WhatsApp.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDisconnectConfirm(false)}
                className="flex-1 py-3 rounded-xl text-[13px] font-bold border-none cursor-pointer"
                style={{ background: "#EEF3F7", color: "#5C6F7E" }}
              >
                Cancelar
              </button>
              <button
                onClick={() => { setDisconnected(true); setShowDisconnectConfirm(false); }}
                className="flex-1 py-3 rounded-xl text-[13px] font-extrabold text-white border-none cursor-pointer"
                style={{ background: "#C05B6A" }}
              >
                Desconectar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)} />
          <div className="relative bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl z-10" style={{ border: "1px solid #EEF2F6" }}>
            <h3 className="text-[17px] font-extrabold text-[#C05B6A] mb-2">Excluir conta e dados?</h3>
            <p className="text-[13px] font-medium text-[#7B8B99] mb-5 leading-relaxed">
              Esta ação é irreversível. Todos os seus dados clínicos, histórico e documentos serão excluídos permanentemente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 rounded-xl text-[13px] font-bold border-none cursor-pointer"
                style={{ background: "#EEF3F7", color: "#5C6F7E" }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  setShowDeleteConfirm(false);
                  window.location.href = "/";
                }}
                className="flex-1 py-3 rounded-xl text-[13px] font-extrabold text-white border-none cursor-pointer"
                style={{ background: "#C05B6A" }}
              >
                Excluir tudo
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-[11px] text-[#C0CDD7] font-medium pb-4">
        Carreira Saúde · v0.1.0 · © 2026
      </div>
    </div>
  );
}
