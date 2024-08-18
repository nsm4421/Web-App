"use client";

import { CreateGroupStep } from "@/app/constant/group";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useCreateGroupState } from "@/hooks/useCreateGroupState";

import { useRef } from "react";

export default function SecondStepOfCreateGroup() {
  const ref = useRef<HTMLInputElement>(null);
  const { thumbnail, updateState, setCurrentStep } = useCreateGroupState();

  const handleClickSelectImageButton = () => ref?.current?.click();

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files) {
      return;
    }
    const selected = files[0];
    if (selected) {
      updateState({
        thumbnailFile: selected,
        thumbnail: URL.createObjectURL(selected),
      });
    }
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentStep(CreateGroupStep.STEP1);
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentStep(CreateGroupStep.STEP3);
  };

  return (
    <section>
      <div>
        <Typography text="Add Thumbnail" className="my-5" />
      </div>

      <div className="flex flex-col gap-y-3">
        {thumbnail ? (
          <div className="flex flex-col gap-y-4">
            <Typography variant="h6" text="Image Selected" />

            <Button
              onClick={handleNext}
              className="mt-5 rounded-xl w-fit font-semibold bg-teal-800 text-white hover:text-slate-800"
            >
              <Typography variant="p" text="NEXT" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-y-3">
            <Button
              onClick={handleNext}
              className="w-full rounded-xl font-semibold bg-teal-800 text-white hover:text-slate-800"
            >
              <Typography variant="p" text="Use My Profile Image" />
            </Button>

            <Button
              onClick={handleClickSelectImageButton}
              className="w-full rounded-xl font-semibold bg-sky-800 text-white hover:text-slate-800"
            >
              <Typography variant="p" text="Select Thumbnail" />
            </Button>
            <input
              ref={ref}
              type="file"
              className="hidden"
              onChange={handleSelectImage}
            />

            <Button
              onClick={handleBack}
              className="w-full rounded-xl font-thin"
            >
              <Typography variant="p" text="Back" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
