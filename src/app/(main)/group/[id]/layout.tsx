import MainContainer from "@/components/main/mainContainer";
import { ReactNode } from "react";

export default function GroupPageLayout({ children }: { children: ReactNode }) {
  return <MainContainer>{children}</MainContainer>;
}
