import { CreateGroupStep } from "@/app/constant/group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useCreateGroupState } from "@/hooks/useCreateGroupState";
import { ChangeEvent } from "react";
import { toast } from "sonner";

export default function FirstStepOfCreateGroup() {
  const minLength = 5;
  const maxLength = 30;
  const { name, updateState, setCurrentStep } = useCreateGroupState();
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    updateState({ name: text.slice(0, maxLength) });
  };
  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name.length < minLength) {
      toast.warning("group name is too short");
      return;
    } else if (name.length > maxLength) {
      toast.warning("group name is too long");
      return;
    }
    setCurrentStep(CreateGroupStep.STEP2);
  };

  return (
    <section>
      <Typography text="What is the name of group?" className="my-6" />

      <div className="flex flex-col gap-y-2 mt-3">
        <div className="flex gap-x-3">
          <Input
            className="border-none shadow-sm bg-slate-200"
            value={name}
            onChange={handleChangeName}
          />

          <Button
            disabled={name.length < minLength}
            variant="secondary"
            className=" bg-teal-800 dark:bg-teal-500 text-white hover:text-slate-800 w-fit rounded-xl"
            onClick={handleNext}
          >
            NEXT
          </Button>
        </div>

        <label className="text-sm text-slate-500">
          naming group name with characters between {minLength}~{maxLength}
        </label>
      </div>
    </section>
  );
}
