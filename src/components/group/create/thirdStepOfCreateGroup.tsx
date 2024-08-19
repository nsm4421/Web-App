"use client";

import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useCreateGroupState } from "@/hooks/useCreateGroupState";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useEffect, useState } from "react";
import NavigateButton from "./navgiateButton";
import { CreateGroupStep } from "@/app/constant/group";
import { Textarea } from "@/components/ui/textarea";

export default function ThirdSteopOfCreateGroup() {
  const maxHashtagNum = 3;
  const { hashtags, introduce, updateState } = useCreateGroupState();
  const [currentHashtag, setCurrentHashtag] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  }, [currentHashtag]);

  const handleCurrentHashtag = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentHashtag(e.target.value);
  };

  const handleIntroduce = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateState({ introduce: e.target.value });
  };

  const handleAddHashtag = () => {
    const newHashtag = currentHashtag.trim();
    if (!newHashtag) {
      return;
    } else if (hashtags.includes(newHashtag)) {
      setErrorMessage("Duplicated Hashtag");
      return;
    } else if (hashtags.length >= maxHashtagNum) {
      setErrorMessage("Too many hashtag");
      return;
    }
    updateState({ hashtags: [...hashtags, newHashtag] });
    setCurrentHashtag("");
  };

  const handleRemoveHashtag = (text: string) => () => {
    if (hashtags.includes(text)) {
      updateState({
        hashtags: [...hashtags].filter((element) => element !== text),
      });
    }
  };

  return (
    <main>
      <Typography text="Describe your group" />
      <section className="my-5 p-2 flex flex-col gap-y-5">
        <div className="shadow-md px-3 py-2">
          <Typography variant="h6" text="Hashtag" />
          <div className="flex justify-between gap-x-3 items-start mt-4">
            <div className="flex flex-col w-full">
              <Input
                value={currentHashtag}
                onChange={handleCurrentHashtag}
                placeholder="# Let's play lol"
                className="bg-slate-200 border-none rounded-xl"
              />
              {errorMessage && (
                <label className="text-rose-500 text-sm">{errorMessage}</label>
              )}
            </div>

            <button
              disabled={hashtags.length > maxHashtagNum}
              onClick={handleAddHashtag}
              className="bg-sky-800 cursor-pointer rounded-full p-3 text-white hover:bg-sky-500"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>

          <ul className="flex gap-x-4 px-2 mt-3">
            {hashtags.map((text) => (
              <li
                key={text}
                className="flex justify-between gap-x-2 space-x-1 px-2 py-1 bg-teal-700 rounded-xl items-center"
              >
                <label className="text-lg font-bold text-white">{text}</label>
                <i
                  className="text-white hover:text-rose-500 text-lg"
                  onClick={handleRemoveHashtag(text)}
                >
                  <Cross2Icon />
                </i>
              </li>
            ))}
          </ul>
        </div>

        <div className="shadow-md px-3 py-2 flex flex-col gap-y-3">
          <Typography variant="h6" text="Introduce" />
          <Textarea
            value={introduce}
            onChange={handleIntroduce}
            placeholder="Introduce Our Group"
            className="bg-slate-200 border-none rounded-xl resize-none p-1"
          />
        </div>
      </section>

      <NavigateButton
        withDivider
        beforeStep={CreateGroupStep.STEP2}
        nextStep={CreateGroupStep.STEP4}
      />
    </main>
  );
}
