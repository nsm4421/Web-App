"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "md:px-2 md:pb-2 md:pt-14 md:h-screen",
        theme === "dark" ? "bg-slate-900" : "bg-neutral-200"
      )}
    >
      <div
        className={cn(
          "md:ml-[280px] lg:ml-[420px] md:h-full overflow-y-hidden",
          theme === "dark"
            ? "bg-slate-800 text-neutral-50"
            : "bg-neutral-100 text-neutral-900"
        )}
      >
        {children}
      </div>
    </div>
  );
}
