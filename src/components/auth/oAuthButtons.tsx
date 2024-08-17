"use client";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { supabaseBrowserClient } from "@/lib/supabase/supabseClient";
import { Provider } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { toast } from "sonner";

export default function OAuthButtons() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // 현재 인증상태 검사
  // 로그인한 경우, 홈 화면으로 리다이렉션
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const {
        data: { user },
      } = await supabaseBrowserClient.auth.getUser();
      if (user) {
        toast.info("already logined!");
        return router.push("/");
      } else {
        setIsMounted(true);
      }
    };
    fetchCurrentUser();
  }, []);

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

  if (!isMounted) {
    return <></>;
  }

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
