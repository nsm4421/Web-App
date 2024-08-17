"use client";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { supabaseBrowserClient } from "@/supabase/supabseClient";
import { Provider } from "@supabase/supabase-js";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";

export default function OAuthButtons() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = (provider: Provider) => async () => {
    try {
      setIsLoading(true);
      await supabaseBrowserClient.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${location.origin}`,
        },
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ul className="flex flex-col gap-4">
      <li>
        <Button
          onClick={handleSignIn("google")}
          disabled={isLoading}
          variant="ghost"
          className="w-full bg-slate-700 text-white flex items-center gap-x-6 px-3 py-2 rounded-xl"
        >
          <FcGoogle size={25} />
          <Typography variant="h6" text="Google" />
        </Button>
      </li>

      <li>
        <Button
          onClick={handleSignIn("github")}
          disabled={isLoading}
          variant="ghost"
          className="w-full bg-slate-700 text-white flex items-center gap-x-6 px-3 py-2 rounded-xl"
        >
          <RxGithubLogo size={25} />
          <Typography variant="h6" text="Github" />
        </Button>
      </li>
    </ul>
  );
}
