import { PatientNav } from "@/components/PatientNav";

export default function PacienteLayout({ children }: { children: React.ReactNode }) {
  return <PatientNav>{children}</PatientNav>;
}
