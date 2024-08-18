"use client";

import { CreateGroupStep } from "@/app/constant/group";
import { useCreateGroupState } from "@/hooks/useCreateGroupState";

import FirstStepOfCreateGroup from "./firstStepOfCreateGroup";
import SecondStepOfCreateGroup from "./secondStepOfCreateGroup";
import ThirdSteopOfCreateGroup from "./thirdStepOfCreateGroup";
import Typography from "@/components/ui/typography";

export default function CreateGroupForm() {
  const { currentStep } = useCreateGroupState();

  switch (currentStep) {
    case CreateGroupStep.STEP1:
      return <FirstStepOfCreateGroup />;
    case CreateGroupStep.STEP2:
      return <SecondStepOfCreateGroup />;
    case CreateGroupStep.STEP3:
      return <ThirdSteopOfCreateGroup />;
    default:
      return <Typography text="ERROR" />;
  }
}
