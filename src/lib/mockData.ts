"use client";

export interface ConsultationEntry {
  id: string;
  date: string;
  anamnese: string;
  diagnostico: string;
  conduta: string;
  medico: string;
}

export interface AttachedDoc {
  iconType: "receita" | "exame" | "vacina" | "documento";
  label: string;
}

export interface AlertItem {
  id: string;
  type: "sintoma" | "adesao" | "urgencia";
  text: string;
  date: string;
  solved: boolean;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

export interface Patient {
  id: string;
  initial: string;
  name: string;
  age: number;
  condition: string;
  lastConsultation: string; // YYYY-MM-DD
  daysSinceLastConsultation: number;
  status: "ativo" | "sem_retorno" | "urgente";
  avatarBg: string;
  avatarColor: string;
  statusColor: string;
  badge: string | null;
  badgeBg: string | null;
  borderColor: string;
  alertText: string | null;
  alerts: AlertItem[];
  adherence: number; // percentage (0-100)
  adherenceChart: number[];
  medications: Medication[];
  phone: string;
  email: string;
  recordHistory: ConsultationEntry[];
  attachedDocs: AttachedDoc[];
  reminderSent?: boolean;
}

const INITIAL_PATIENTS: Patient[] = [
  {
    id: "1",
    initial: "M",
    name: "Maria Aparecida",
    age: 72,
    condition: "Hipertensão",
    lastConsultation: "2026-06-08",
    daysSinceLastConsultation: 12,
    status: "urgente",
    avatarBg: "#E7F2F9",
    avatarColor: "#0077B6",
    statusColor: "#E74C3C",
    badge: "Urgente",
    badgeBg: "#E74C3C",
    borderColor: "#F4D6D2",
    alertText: "Tontura reportada hoje",
    alerts: [
      {
        id: "a1",
        type: "sintoma",
        text: "Tontura leve pela manhã nos últimos 3 dias",
        date: "2026-06-20",
        solved: false,
      },
    ],
    adherence: 85,
    adherenceChart: [40, 65, 50, 80, 45, 70, 90, 55, 60, 42, 75, 68],
    medications: [
      { name: "Losartana", dosage: "50mg", frequency: "1x ao dia (pela manhã)" },
      { name: "Anlodipino", dosage: "5mg", frequency: "1x ao dia (à noite)" }
    ],
    phone: "(11) 98765-4321",
    email: "maria.aparecida@gmail.com",
    recordHistory: [
      {
        id: "c1",
        date: "08/06/2026",
        anamnese: "Paciente refere cansaço leve ao subir escadas. Nega dor precordial ou palpitações. Relata tontura ocasional ao se levantar rapidamente.",
        diagnostico: "Hipertensão arterial sistêmica controlada, com leve hipotensão ortostática.",
        conduta: "Manter Losartana 50mg pela manhã. Orientar ingestão hídrica de 2L/dia. Orientar levantar-se devagar da cama ou cadeira.",
        medico: "Dr. André Souza",
      },
      {
        id: "c2",
        date: "14/04/2026",
        anamnese: "Retorno para avaliação de exames. Pressão arterial no consultório de 135/85 mmHg. Adesão boa às medicações.",
        diagnostico: "Hipertensão estável.",
        conduta: "Manter conduta terapêutica atual. Solicitar novos exames em 6 meses.",
        medico: "Dr. André Souza",
      }
    ],
    attachedDocs: [
      { iconType: "receita", label: "Receita — Losartana + Anlodipino" },
      { iconType: "exame", label: "Hemograma & Bioquímica (Junho/2026)" },
      { iconType: "vacina", label: "Comprovante Vacina Influenza" },
    ],
  },
  {
    id: "2",
    initial: "J",
    name: "João Batista",
    age: 68,
    condition: "Diabetes tipo 2",
    lastConsultation: "2026-03-10",
    daysSinceLastConsultation: 102,
    status: "sem_retorno",
    avatarBg: "#E8F6EF",
    avatarColor: "#2F9367",
    statusColor: "#F4B73D",
    badge: "Sem Retorno",
    badgeBg: "#F4B73D",
    borderColor: "#EEF2F6",
    alertText: "Adesão crítica (60%)",
    alerts: [
      {
        id: "a2",
        type: "adesao",
        text: "Pulou doses de Metformina por 4 dias seguidos na última semana",
        date: "2026-06-18",
        solved: false,
      }
    ],
    adherence: 60,
    adherenceChart: [20, 30, 40, 50, 40, 20, 60, 80, 50, 40, 50, 30],
    medications: [
      { name: "Metformina XR", dosage: "850mg", frequency: "2x ao dia (com as refeições)" },
      { name: "Jardiance", dosage: "10mg", frequency: "1x ao dia (pela manhã)" }
    ],
    phone: "(11) 97654-3210",
    email: "joao.batista@uol.com.br",
    recordHistory: [
      {
        id: "c3",
        date: "10/03/2026",
        anamnese: "Paciente relata cansaço e poliúria. Nega dores. Glicemia de jejum trazida no exame: 156mg/dL. Hemoglobina Glicada: 8.2%. Relata esquecimentos frequentes.",
        diagnostico: "Diabetes Mellitus Tipo 2 descompensado por má adesão farmacológica.",
        conduta: "Ajustado Metformina para XR (liberação prolongada) para melhorar tolerância e reduzir tomadas. Orientado uso de caixas organizadoras de remédio.",
        medico: "Dr. André Souza",
      }
    ],
    attachedDocs: [
      { iconType: "exame", label: "Hemoglobina Glicada (Março/2026)" },
      { iconType: "receita", label: "Receita — Metformina XR" },
    ],
  },
  {
    id: "3",
    initial: "C",
    name: "Conceição Lima",
    age: 75,
    condition: "Artrite",
    lastConsultation: "2026-05-02",
    daysSinceLastConsultation: 49,
    status: "sem_retorno",
    avatarBg: "#F3EEFA",
    avatarColor: "#7B5BD6",
    statusColor: "#2F9367",
    badge: null,
    badgeBg: null,
    borderColor: "#EEF2F6",
    alertText: null,
    alerts: [],
    adherence: 92,
    adherenceChart: [90, 100, 80, 90, 100, 90, 100, 100, 90, 80, 100, 95],
    medications: [
      { name: "Metotrexato", dosage: "15mg", frequency: "1x por semana (aos sábados)" },
      { name: "Ácido Fólico", dosage: "5mg", frequency: "1x por semana (domingos)" },
      { name: "Prednisona", dosage: "5mg", frequency: "1x ao dia (pela manhã)" }
    ],
    phone: "(11) 96543-2109",
    email: "conceicao.lima23@outlook.com",
    recordHistory: [
      {
        id: "c4",
        date: "02/05/2026",
        anamnese: "Paciente queixa-se de rigidez matinal persistente por mais de 1 hora nas mãos. Relata dor moderada em joelho direito.",
        diagnostico: "Artrite Reumatóide em atividade moderada.",
        conduta: "Mantido Metotrexato. Prescrito Prednisona 5mg/dia temporariamente por 15 dias para controle de crise. Encaminhado para fisioterapia motora.",
        medico: "Dr. André Souza",
      }
    ],
    attachedDocs: [
      { iconType: "documento", label: "Laudo RX Joelho e Mãos" },
      { iconType: "documento", label: "Encaminhamento Fisioterapia" },
    ],
  },
  {
    id: "4",
    initial: "M",
    name: "Marcos Oliveira",
    age: 45,
    condition: "Colesterol Alto",
    lastConsultation: "2025-12-15",
    daysSinceLastConsultation: 187,
    status: "sem_retorno",
    avatarBg: "#FDF5E6",
    avatarColor: "#D08A00",
    statusColor: "#E74C3C",
    badge: "Sem Retorno",
    badgeBg: "#7B8B99",
    borderColor: "#EEF2F6",
    alertText: "Adesão crítica (20%)",
    alerts: [
      {
        id: "a3",
        type: "adesao",
        text: "Não comprou a medicação de colesterol no último mês",
        date: "2026-06-15",
        solved: false,
      }
    ],
    adherence: 20,
    adherenceChart: [0, 0, 40, 20, 0, 0, 80, 20, 0, 0, 40, 0],
    medications: [
      { name: "Sinvastatina", dosage: "20mg", frequency: "1x ao dia (à noite)" }
    ],
    phone: "(11) 95432-1098",
    email: "marcos.oliveira@uol.com.br",
    recordHistory: [
      {
        id: "c5",
        date: "15/12/2025",
        anamnese: "Paciente assintomático, traz exames de rotina. LDL de 195 mg/dL. Sedentário, hábitos alimentares desregulados, ingestão frequente de carne vermelha.",
        diagnostico: "Dislipidemia primária de alto risco cardiovascular.",
        conduta: "Prescrito Sinvastatina 20mg/dia à noite. Orientado dieta cardioprotetora e início de caminhadas 3x/semana. Retornar em 3 meses com exames de controle.",
        medico: "Dr. André Souza",
      }
    ],
    attachedDocs: [
      { iconType: "exame", label: "Perfil Lipídico Completo (Dez/2025)" },
    ],
  },
  {
    id: "5",
    initial: "R",
    name: "Rita de Cássia",
    age: 58,
    condition: "Asma",
    lastConsultation: "2026-06-15",
    daysSinceLastConsultation: 5,
    status: "ativo",
    avatarBg: "#F0F9FF",
    avatarColor: "#0284C7",
    statusColor: "#2F9367",
    badge: null,
    badgeBg: null,
    borderColor: "#EEF2F6",
    alertText: "Tosse seca relatada ontem",
    alerts: [
      {
        id: "a4",
        type: "sintoma",
        text: "Relatou episódios de tosse seca persistente e falta de ar leve durante a noite",
        date: "2026-06-19",
        solved: false,
      }
    ],
    adherence: 95,
    adherenceChart: [100, 100, 90, 100, 100, 100, 80, 100, 100, 100, 90, 100],
    medications: [
      { name: "Alenia (Budesonida + Formoterol)", dosage: "12/400mcg", frequency: "1 Cápsula inalada de 12/12h" },
      { name: "Aerolin Spray", dosage: "100mcg", frequency: "Usar de 1 a 2 jatos se crise de falta de ar" }
    ],
    phone: "(11) 94321-0987",
    email: "rita.cassia@gmail.com",
    recordHistory: [
      {
        id: "c6",
        date: "15/06/2026",
        anamnese: "Paciente com bom controle da asma. Relata que no último mês usou o Aerolin de resgate apenas 1 vez após subir ladeira. Sem despertares noturnos.",
        diagnostico: "Asma persistente controlada.",
        conduta: "Manter Alenia 12/400mcg de 12h em 12h. Reforçar técnica de inalação e lavagem oral pós-uso. Liberado vacina de Influenza.",
        medico: "Dr. André Souza",
      }
    ],
    attachedDocs: [
      { iconType: "documento", label: "Espirometria Recente (Maio/2026)" },
    ],
  },
  {
    id: "6",
    initial: "A",
    name: "Antonio Santos",
    age: 80,
    condition: "Insuficiência Cardíaca",
    lastConsultation: "2026-06-17",
    daysSinceLastConsultation: 3,
    status: "urgente",
    avatarBg: "#FFF1F2",
    avatarColor: "#E11D48",
    statusColor: "#E74C3C",
    badge: "Urgente",
    badgeBg: "#E11D48",
    borderColor: "#FECDD3",
    alertText: "Ganho de peso rápido (+2kg)",
    alerts: [
      {
        id: "a5",
        type: "urgencia",
        text: "Reportou ganho de peso rápido de 2.2 kg em 2 dias (sinal de congestão/retenção)",
        date: "2026-06-20",
        solved: false,
      }
    ],
    adherence: 88,
    adherenceChart: [90, 80, 90, 90, 100, 70, 90, 100, 90, 80, 90, 90],
    medications: [
      { name: "Furosemida", dosage: "40mg", frequency: "1x ao dia (pela manhã)" },
      { name: "Carvedilol", dosage: "12.5mg", frequency: "12/12h" },
      { name: "Espironolactona", dosage: "25mg", frequency: "1x ao dia (pela manhã)" }
    ],
    phone: "(11) 93210-9876",
    email: "antonio.santos1946@uol.com.br",
    recordHistory: [
      {
        id: "c7",
        date: "17/06/2026",
        anamnese: "Paciente em retorno pós-alta por descompensação de IC. Refere dispneia aos moderados esforços. Discreto edema maleolar. Controlando sal.",
        diagnostico: "Insuficiência Cardíaca congestiva CF III, estável pós-alta.",
        conduta: "Manter Furosemida 40mg. Orientar pesagem diária em jejum após urinar. Se ganho >1.5kg em 2 dias, avisar via WhatsApp ou vir ao pronto atendimento.",
        medico: "Dr. André Souza",
      }
    ],
    attachedDocs: [
      { iconType: "documento", label: "Ecocardiograma Transtorácico (EF 36%)" },
      { iconType: "exame", label: "BNP & Creatinina / Potássio (Junho/2026)" },
    ],
  }
];

const LOCAL_STORAGE_KEY = "nexosaude_medico_patients";

export function getPatients(): Patient[] {
  if (typeof window === "undefined") {
    return INITIAL_PATIENTS;
  }
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PATIENTS));
    return INITIAL_PATIENTS;
  }
  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PATIENTS));
      return INITIAL_PATIENTS;
    }
    return parsed;
  } catch (e) {
    console.error("Erro ao carregar pacientes do localStorage, recriando...", e);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PATIENTS));
    return INITIAL_PATIENTS;
  }
}

export function savePatients(patients: Patient[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(patients));
  }
}

export function updatePatient(updated: Patient): void {
  const current = getPatients();
  const next = current.map((p) => (p.id === updated.id ? updated : p));
  savePatients(next);
}

export function addConsultation(patientId: string, entry: Omit<ConsultationEntry, "id" | "date" | "medico">): Patient | null {
  const patients = getPatients();
  const index = patients.findIndex((p) => p.id === patientId);
  if (index === -1) return null;

  const patient = patients[index];
  const dateObj = new Date();
  const formattedDate = `${String(dateObj.getDate()).padStart(2, "0")}/${String(dateObj.getMonth() + 1).padStart(2, "0")}/${dateObj.getFullYear()}`;
  
  const newEntry: ConsultationEntry = {
    id: Math.random().toString(36).substring(2, 9),
    date: formattedDate,
    medico: "Dr. André Souza",
    ...entry,
  };

  const recordHistory = [newEntry, ...patient.recordHistory];
  
  // Se o paciente estava "sem retorno", ao fazer uma consulta/prontuário ele volta a ficar "ativo"
  let status = patient.status;
  let badge = patient.badge;
  let badgeBg = patient.badgeBg;
  if (status === "sem_retorno") {
    status = "ativo";
    badge = null;
    badgeBg = null;
  }

  const updatedPatient: Patient = {
    ...patient,
    recordHistory,
    status,
    badge,
    badgeBg,
    lastConsultation: dateObj.toISOString().split("T")[0],
    daysSinceLastConsultation: 0,
    borderColor: "#EEF2F6",
  };

  patients[index] = updatedPatient;
  savePatients(patients);
  return updatedPatient;
}

export function resolveAlert(patientId: string, alertId: string): Patient | null {
  const patients = getPatients();
  const index = patients.findIndex((p) => p.id === patientId);
  if (index === -1) return null;

  const patient = patients[index];
  const nextAlerts = patient.alerts.map((a) => (a.id === alertId ? { ...a, solved: true } : a));
  const unsolvedAlerts = nextAlerts.filter((a) => !a.solved);

  const updatedPatient: Patient = {
    ...patient,
    alerts: nextAlerts,
    alertText: unsolvedAlerts.length > 0 ? unsolvedAlerts[0].text : null,
    // Se não há alertas não resolvidos e o status era urgente, volta para ativo
    status: unsolvedAlerts.length === 0 && patient.status === "urgente" ? "ativo" : patient.status,
    badge: unsolvedAlerts.length === 0 && patient.badge === "Urgente" ? null : patient.badge,
    borderColor: unsolvedAlerts.length === 0 ? "#EEF2F6" : patient.borderColor,
  };

  patients[index] = updatedPatient;
  savePatients(patients);
  return updatedPatient;
}

export function sendReminder(patientId: string): Patient | null {
  const patients = getPatients();
  const index = patients.findIndex((p) => p.id === patientId);
  if (index === -1) return null;

  const patient = patients[index];
  const updatedPatient: Patient = {
    ...patient,
    reminderSent: true,
  };

  patients[index] = updatedPatient;
  savePatients(patients);
  return updatedPatient;
}
