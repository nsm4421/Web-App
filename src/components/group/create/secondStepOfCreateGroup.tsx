"use client";

import { CreateGroupStep } from "@/app/constant/group";
import Typography from "@/components/ui/typography";
import { useCreateGroupState } from "@/hooks/useCreateGroupState";
import NavigateButton from "./navgiateButton";
import { ImCancelCircle, ImInstagram } from "react-icons/im";
import Image from "next/image";
import { useRef, useState } from "react";
import UploadGroupThumbnailAction from "@/action/uploadGroupThumbnail";
import { toast } from "sonner";

export default function SecondStepOfCreateGroup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const { groupId, thumbnailUrl, updateState } = useCreateGroupState();

  const handleUnSelect = () => {
    updateState({ thumbnailUrl: undefined });
  };

  const handleClickSelectImageButton = () => ref?.current?.click();

  const handleSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const files = e.target.files;
      if (!files || !files[0]) {
        return;
      }
      await UploadGroupThumbnailAction({
        groupId,
        thumbnail: files[0],
      }).then((res) => {
        if (res.error || !res.data) {
          toast.error("uploading image failed", {
            position: "top-center",
          });
        } else {
          updateState({ thumbnailUrl: res.data });
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("uploading image failed", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div>
        <Typography text="Add Thumbnail" className="my-3" />

        <Typography
          variant="p"
          text={
            thumbnailUrl
              ? "Image Selected"
              : "Select picture represent your gruoup"
          }
          className="my-3"
        />
      </div>

      {!isLoading && thumbnailUrl && (
        <div className="flex items-center justify-center h-32 w-32 relative">
          <Image
            className="object-cover w-full h-full rounded-full"
            src={thumbnailUrl}
            alt={"thumbnail"}
            width={300}
            height={300}
          />
          <ImCancelCircle
            onClick={handleUnSelect}
            className="absolute cursor-pointer -right-2 -top-2 z-10 hover:scale-110"
          />
        </div>
      )}

      {!thumbnailUrl && (
        <button
          onClick={handleClickSelectImageButton}
          className="mt-5 flex justify-center items-center w-full h-32 bg-slate-600 text-white rounded-xl"
        >
          {isLoading ? (
            <Typography text="Uploading..." variant="h5" />
          ) : (
            <div className="flex items-center gap-x-3">
              <ImInstagram className="w-15 h-15" />
              <Typography variant="h6" text="PICTURE" />
            </div>
          )}
        </button>
      )}

      <input
        onChange={handleSelectImage}
        type="file"
        ref={ref}
        className="hidden"
      />

      <NavigateButton
        beforeDisabled={isLoading}
        nextDisabled={!thumbnailUrl}
        withDivider
        beforeStep={CreateGroupStep.STEP1}
        nextStep={CreateGroupStep.STEP3}
      />
    </section>
  );
}
