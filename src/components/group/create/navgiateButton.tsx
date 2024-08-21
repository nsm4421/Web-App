import { CreateGroupStep } from "@/app/constant/group";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useCreateGroupState } from "@/hooks/useCreateGroupState";
import { cn } from "@/lib/utils";

interface Props {
  beforeDisabled?: boolean;
  nextDisabled?: boolean;
  withDivider?: boolean;
  beforeStep?: CreateGroupStep;
  nextStep?: CreateGroupStep;
}

export default function NavigateButton({
  beforeDisabled,
  nextDisabled,
  withDivider,
  beforeStep,
  nextStep,
}: Props) {
  const { setCurrentStep } = useCreateGroupState();

  const handleBack = () => {
    beforeStep && setCurrentStep(beforeStep);
  };

  const handleNext = () => {
    nextStep && setCurrentStep(nextStep);
  };

  return (
    <div className="w-full">
      {withDivider && (
        <div className="flex h-[1px] items-center my-5">
          <div className="bg-slate-300 ml-[10px] flex-1 h-full"></div>
          <label className="text-sm text-slate-500 mx-2">OR</label>
          <div className="bg-slate-300 mr-[10px] flex-1 h-full"></div>
        </div>
      )}

      {/* Navigator Button */}
      <div className="flex justify-between gap-x-2">
        {beforeStep && (
          <Button
            disabled={beforeDisabled}
            onClick={handleBack}
            className={cn(
              "w-full rounded-xl font-thin",
              beforeDisabled ? "cursor-progress" : "cursor-pointer"
            )}
          >
            <Typography variant="p" text="Back" />
          </Button>
        )}
        {nextStep && (
          <Button
            disabled={nextDisabled}
            onClick={handleNext}
            className={cn(
              "w-full rounded-xl font-thin",
              nextDisabled ? "cursor-progress" : "cursor-pointer"
            )}
          >
            <Typography variant="p" text="Next" />
          </Button>
        )}
      </div>
    </div>
  );
}
