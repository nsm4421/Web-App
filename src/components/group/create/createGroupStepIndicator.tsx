"use client";

import { useCreateGroupState } from "@/hooks/useCreateGroupState";

import { CreateGroupStep } from "@/app/constant/group";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function CreateGroupStepIndicator() {
  const { currentStep } = useCreateGroupState();
  return (
    <nav className="flex justify-between px-1 items-center">
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

      <Link href={"/"}>
        <label className="text-sm hover:font-bold">To Group Page</label>
      </Link>
    </nav>
  );
}
