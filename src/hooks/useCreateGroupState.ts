import { CreateGroupStep } from "@/app/constant/group";
import { create } from "zustand";

type CreateGroupState = {
  groupId: string;
  name: string;
  thumbnailUrl: string;
  introduce: string;
  hashtags: string[];
  updateState: (values: Partial<CreateGroupState>) => void;
  currentStep: CreateGroupStep;
  setCurrentStep: (step: CreateGroupStep) => void;
};

export const useCreateGroupState = create<CreateGroupState>((set) => ({
  groupId: "",
  name: "",
  thumbnailUrl: "",
  hashtags: [],
  introduce: "",
  updateState: (values) => set(values),
  currentStep: CreateGroupStep.STEP1,
  setCurrentStep: (currentStep) => set({ currentStep }),
}));
