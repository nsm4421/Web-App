"use client";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { BsSlack } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";

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
        <ul className="flex flex-col gap-4">
          <li>
            <Button
              variant="ghost"
              className="w-full bg-slate-700 text-white flex items-center gap-x-6 px-3 py-2 rounded-xl"
            >
              <FcGoogle size={25} />
              <Typography variant="h6" text="Google" />
            </Button>
          </li>

          <li>
            <Button
              variant="ghost"
              className="w-full bg-slate-700 text-white flex items-center gap-x-6 px-3 py-2 rounded-xl"
            >
              <RxGithubLogo size={25} />
              <Typography variant="h6" text="Github" />
            </Button>
          </li>
        </ul>
      </section>

      <div className="my-5 h-[1px] border-t bg-slate-300" />
    </main>
  );
}
