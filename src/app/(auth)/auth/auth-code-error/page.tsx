import Typography from "@/components/ui/typography";
import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <main className="min-h-screen grid text-center place-content-center text-black dark:text-white">
      <Typography variant="h1" text="Auth Error" />
      <Link href={"/auth"} replace>
        <Typography variant="p" text="Go To Auth Page" />
      </Link>
    </main>
  );
}
