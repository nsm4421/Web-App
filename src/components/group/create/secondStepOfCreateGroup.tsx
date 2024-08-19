"use client";

import { CreateGroupStep } from "@/app/constant/group";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useCreateGroupState } from "@/hooks/useCreateGroupState";

import { useRef } from "react";
import NavigateButton from "./navgiateButton";

export default function SecondStepOfCreateGroup() {
  const { thumbnail } = useCreateGroupState();

  const ref = useRef<HTMLInputElement>(null);
  const { updateState } = useCreateGroupState();

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

  return (
    <section>
      <div>
        <Typography text="Add Thumbnail" className="my-3" />

        <Typography
          variant="p"
          text={
            thumbnail
              ? "Image Selected"
              : "Select picture represent your gruoup"
          }
          className="my-3"
        />
      </div>

      <div className="flex flex-col gap-y-3">
        {thumbnail ? (
          <div>
            <div className="flex justify-center gap-y-4">
              <button onClick={handleClickSelectImageButton}>
                <img
                  className="w-[100px] h-[100px] rounded-full object-cover"
                  src={thumbnail}
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-y-3">
            <Button
              onClick={handleClickSelectImageButton}
              className="w-full rounded-xl font-semibold bg-sky-800 text-white hover:text-slate-800"
            >
              <Typography variant="p" text="Select Thumbnail" />
            </Button>
          </div>
        )}
      </div>

      <input
        ref={ref}
        type="file"
        className="hidden"
        onChange={handleSelectImage}
      />

      <NavigateButton
        withDivider
        beforeStep={CreateGroupStep.STEP1}
        nextStep={CreateGroupStep.STEP3}
      />
    </section>
  );
}
