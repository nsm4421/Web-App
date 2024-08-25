import MainContainer from "@/components/main/mainContainer";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MainContainer>{children}</MainContainer>
    </ThemeProvider>
  );
}
