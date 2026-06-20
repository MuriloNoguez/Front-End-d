import type { Metadata } from "next";
import "./globals.css";
import { PWARegister } from "@/components/PWARegister";

export const metadata: Metadata = {
  title: "Nexo Saúde — Acompanhamento Longitudinal",
  description: "Cuidado de saúde contínuo e integrado ao seu médico",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nexo Saúde",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-[family-name:var(--font-inter)] bg-[#F4F7FB] text-[#10212E] antialiased">
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
