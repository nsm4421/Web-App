"use client";

import CreateGroupAction from "@/action/createGroup";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useCreateGroupState } from "@/hooks/useCreateGroupState";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import NavigateButton from "./navgiateButton";
import { CreateGroupStep } from "@/app/constant/group";

export default function LastStepOfCreateGroup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { groupId, name, thumbnailUrl, introduce, hashtags } =
    useCreateGroupState();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { ok, error } = await CreateGroupAction({
        id: groupId,
        name,
        thumbnail_url: thumbnailUrl,
        introduce: introduce,
        hashtags,
      });
      if (ok) {
        toast.success("success", {
          position: "top-center",
        });
        router.push("/");
      } else {
        console.error(error);
        toast.error("fail", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("errpr pccirs", {
        position: "top-center",
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <main>
      <Typography text="Ready To Go" />
      <div className="mt-10">
        <Button
          className="text-xl"
          onClick={handleSubmit}
          disabled={isLoading}
          variant={isLoading ? "ghost" : "secondary"}
        >
          {isLoading ? "Loadings..." : "Submit"}
        </Button>
      </div>

      <div className="mt-5">
        <NavigateButton beforeStep={CreateGroupStep.STEP3} withDivider />
      </div>
    </main>
  );
}
