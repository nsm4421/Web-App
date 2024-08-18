"use client";

import { useCreateGroupState } from "@/hooks/useCreateGroupState";

import { CreateGroupStep } from "@/app/constant/group";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export default function CreateGroupStepIndicator() {
  const { currentStep } = useCreateGroupState();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {Object.values(CreateGroupStep).map((step) => (
          <BreadcrumbItem key={step}>
            <BreadcrumbLink
              className={
                step === currentStep
                  ? "font-semibold"
                  : "font-normal text-neutral-500"
              }
            >
              {step}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
