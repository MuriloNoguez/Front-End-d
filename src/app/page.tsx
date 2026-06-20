import Link from "next/link";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 py-16"
      style={{ background: "#0A2540" }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-4 mb-14">
        <div
          className="flex items-center justify-center"
          style={{ width: 60, height: 60, borderRadius: 12, background: "#0D9488", border: "1px solid rgba(255,255,255,.1)" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-white font-extrabold text-[36px] sm:text-[44px] tracking-tight leading-none">
            Carreira Saúde
          </h1>
          <p className="mt-2 text-[16px] sm:text-[18px] font-medium" style={{ color: "rgba(255,255,255,.5)" }}>
            Acompanhamento longitudinal de saúde integrado.
          </p>
        </div>
      </div>

      {/* Role cards */}
      <div className="w-full max-w-xl flex flex-col sm:flex-row gap-4">
        <Link
          href="/paciente"
          className="flex-1 group flex flex-col gap-5 p-7 rounded-2xl no-underline transition-transform hover:-translate-y-1"
          style={{
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.12)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="flex items-center justify-center self-start"
            style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(82,183,136,.2)", border: "1px solid rgba(82,183,136,.3)" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#52B788" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="7" y="2" width="10" height="20" rx="2.5" />
              <path d="M11 18h2" /><circle cx="12" cy="8" r="2" />
              <path d="M9 13.5c0-1.5 1.3-2.5 3-2.5s3 1 3 2.5" />
            </svg>
          </div>
          <div>
            <div className="text-white font-extrabold text-[20px] leading-none mb-1">Sou paciente</div>
            <div className="text-[14px] leading-5 font-medium" style={{ color: "rgba(255,255,255,.5)" }}>
              Acompanhe remédios, sintomas e documentos clínicos em um lugar só.
            </div>
          </div>
          <div className="flex items-center gap-2 text-[13px] font-bold" style={{ color: "#52B788" }}>
            Entrar
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link
          href="/medico"
          className="flex-1 group flex flex-col gap-5 p-7 rounded-2xl no-underline transition-transform hover:-translate-y-1"
          style={{
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.12)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="flex items-center justify-center self-start"
            style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(0,119,182,.2)", border: "1px solid rgba(0,119,182,.3)" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0096C7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div>
            <div className="text-white font-extrabold text-[20px] leading-none mb-1">Sou médico</div>
            <div className="text-[14px] leading-5 font-medium" style={{ color: "rgba(255,255,255,.5)" }}>
              Acesse relatórios clínicos e o histórico longitudinal dos seus pacientes.
            </div>
          </div>
          <div className="flex items-center gap-2 text-[13px] font-bold" style={{ color: "#0096C7" }}>
            Entrar
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Flow overview */}
      <div className="mt-14 flex items-center gap-2 text-[12px] font-medium" style={{ color: "rgba(255,255,255,.25)" }}>
        <span>Paciente</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        <span>Hub de Saúde</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        <span>Histórico</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        <span>Relatório</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        <span>Médico</span>
      </div>

      <p className="mt-8 text-center text-[12px] max-w-xs leading-5" style={{ color: "rgba(255,255,255,.2)" }}>
        Ao continuar, você concorda em conectar seu número e autoriza o tratamento dos dados de saúde conforme a LGPD.
      </p>
    </div>
  );
}
