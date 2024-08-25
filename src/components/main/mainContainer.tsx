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
          "lg:ml-[420px] md:ml-[280px] md:h-full overflow-y-hidden rounded-l-2xl pl-3 pt-3",
          "[&::-webkit-scrollbar-track]:w-2",
          theme === "dark" ? "bg-slate-800" : "bg-neutral-100"
        )}
      >
        {children}
      </div>
    </div>
  );
}
