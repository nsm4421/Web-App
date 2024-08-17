import Typography from "@/components/ui/typography";
import { BsSlack } from "react-icons/bs";
import OAuthButtons from "@/components/auth/oAuthButtons";

export default function AuthPage() {
  return (
    <main className="min-h-screen grid text-center place-content-center text-black dark:text-white">
      <div className="flex justify-center items-center gap-x-3 max-w-[500px]">
        <BsSlack size={30} />
        <Typography text="Karma" variant="h2" />
      </div>

      <div className="mt-10 flex flex-col gap-y-2">
        <Typography text="Sign In" variant="h4" />
        <Typography
          text="you can sign in with social account"
          className="text-slate-700 dark:text-slate-200"
          variant="p"
        />
      </div>

      <div className="my-5 h-[1px] border-t bg-slate-300" />

      <section className="w-full max-w-[800px]">
        <OAuthButtons />
      </section>

      <div className="my-5 h-[1px] border-t bg-slate-300" />
    </main>
  );
}
