import { ReactNode } from "react";

interface MobileShellProps {
  children: ReactNode;
}

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-8 bg-[#E6EAEF]">
      <div
        className="relative overflow-hidden bg-white"
        style={{
          width: 390,
          height: 844,
          borderRadius: 46,
          boxShadow: "0 18px 50px rgba(2,62,138,.16)",
          border: "1px solid #E3E8EE",
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
