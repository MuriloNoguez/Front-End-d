import Link from "next/link";

const meds = [
  { name: "Losartana 50mg", schedule: "14:00 · 1 comprimido", color: "#2F9367", bg: "#E8F6EF" },
  { name: "AAS 100mg", schedule: "08:00 · 1 comprimido", color: "#0077B6", bg: "#E7F2F9" },
  { name: "Atorvastatina 20mg", schedule: "22:00 · 1 comprimido", color: "#7B5BD6", bg: "#F3EEFA" },
];

const conditions = ["Hipertensão", "Dislipidemia"];

const contacts = [
  { name: "Ana Costa (filha)", phone: "(11) 99823-4567" },
  { name: "Dr. André Souza", phone: "(11) 3344-5566" },
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
      <span
        className="text-[14px] font-bold text-[#10212E] text-right"
        style={valueStyle}
      >
        {value}
      </span>
    </div>
  );
}

export default function PerfilPage() {
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
          M
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-[22px] sm:text-[26px] font-extrabold text-white tracking-tight leading-tight">
            Maria Aparecida Costa
          </h1>
          <div
            className="text-[13px] mt-1 font-medium"
            style={{ color: "rgba(255,255,255,.5)", fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }}
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
          className="self-start sm:self-auto shrink-0 px-4 py-2 rounded-xl text-[13px] font-bold transition-colors"
          style={{ background: "rgba(255,255,255,.1)", color: "rgba(255,255,255,.75)", border: "1px solid rgba(255,255,255,.15)" }}
        >
          Editar
        </button>
      </div>

      {/* Personal info */}
      <Section title="Dados pessoais">
        <Row label="Nome completo" value="Maria Aparecida Costa" />
        <Row label="Data de nascimento" value="14 de março de 1954" valueStyle={{ fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }} />
        <Row label="Telefone (WhatsApp)" value="(11) 97654-3210" valueStyle={{ fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }} />
        <Row label="E-mail" value="maria.costa@email.com" last />
      </Section>

      {/* Medications */}
      <Section title="Medicamentos ativos">
        {meds.map((m, i) => (
          <div
            key={m.name}
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
              <div
                className="text-[12px] font-medium text-[#7B8B99]"
                style={{ fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }}
              >
                {m.schedule}
              </div>
            </div>
          </div>
        ))}
        <div className="px-4 py-3" style={{ borderTop: "1px solid #EEF2F6" }}>
          <button className="text-[13px] font-bold text-[#0077B6] flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
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
              <div
                className="text-[12px] font-medium text-[#7B8B99]"
                style={{ fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }}
              >
                {c.phone}
              </div>
            </div>
            <button className="shrink-0 text-[12px] font-bold text-[#0077B6]">Ligar</button>
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
              {/* WhatsApp icon approximation */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F9367" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <div className="text-[14px] font-extrabold text-[#10212E]">Número conectado</div>
              <div
                className="text-[12px] text-[#7B8B99] font-medium"
                style={{ fontFamily: "var(--font-mono-clinical, ui-monospace, monospace)" }}
              >
                (11) 97654-3210
              </div>
            </div>
          </div>
          <span
            className="text-[11px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full"
            style={{ background: "#E8F6EF", color: "#2F9367" }}
          >
            Ativo
          </span>
        </div>
      </Section>

      {/* Privacy & LGPD */}
      <Section title="Privacidade e dados (LGPD)">
        <Row label="Compartilhamento com médicos" value="Autorizado" valueStyle={{ color: "#2F9367" }} />
        <Row label="Armazenamento de dados" value="Criptografado" />
        <Row label="Exportar meus dados" value={
          <button className="text-[13px] font-bold text-[#0077B6]">Solicitar cópia</button>
        } last />
      </Section>

      {/* Danger zone */}
      <div
        className="rounded-2xl p-4 sm:p-5 mb-6"
        style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}
      >
        <div className="text-[12px] font-extrabold uppercase tracking-widest text-[#C05B6A] mb-3">Zona de atenção</div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="flex-1 py-3 rounded-xl text-[13px] font-extrabold transition-colors hover:bg-[#FECACA]"
            style={{ background: "#fff", color: "#C05B6A", border: "1.5px solid #FECACA" }}
          >
            Desconectar WhatsApp
          </button>
          <button
            className="flex-1 py-3 rounded-xl text-[13px] font-extrabold transition-colors hover:bg-[#C05B6A] hover:text-white"
            style={{ background: "#FECACA", color: "#C05B6A" }}
          >
            Excluir conta e dados
          </button>
        </div>
      </div>

      {/* App version */}
      <div className="text-center text-[11px] text-[#C0CDD7] font-medium pb-4">
        Nexo Saúde · v0.1.0 · © 2026
      </div>
    </div>
  );
}
