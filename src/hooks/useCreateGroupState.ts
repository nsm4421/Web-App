import { CreateGroupStep } from "@/app/constant/group";
import { create } from "zustand";

type CreateGroupState = {
  name: string;
  thumbnailFile: File | null;
  thumbnail: string;
  updateState: (values: Partial<CreateGroupState>) => void;
  currentStep: CreateGroupStep;
  setCurrentStep: (step: CreateGroupStep) => void;
};

export const useCreateGroupState = create<CreateGroupState>((set) => ({
  name: "",
  thumbnail: "",
  thumbnailFile: null,
  updateState: (values) => set(values),
  currentStep: CreateGroupStep.STEP1,
  setCurrentStep: (currentStep) => set({ currentStep }),
}));
