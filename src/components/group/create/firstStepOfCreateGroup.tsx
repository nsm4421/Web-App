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
    updateState({ name: e.target.value });
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

      <form className="flex gap-x-3">
        <Input
          className="border-none shadow-sm bg-slate-200"
          placeholder={`naming group name with characters between ${minLength}~${maxLength}`}
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
      </form>
    </section>
  );
}
