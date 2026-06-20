import { DoctorNav } from "@/components/DoctorNav";

export default function MedicoLayout({ children }: { children: React.ReactNode }) {
  return <DoctorNav>{children}</DoctorNav>;
}
