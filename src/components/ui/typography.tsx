import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

const classNames = {
  h1: "scroll-m-20 text-7xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-16 text-6xl font-extrabold tracking-tight lg:text-4xl",
  h3: "scroll-m-12 text-5xl font-semibold tracking-tight lg:text-3xl",
  h4: "scroll-m-10 text-4xl font-semibold tracking-tight lg:text-2xl",
  h5: "scroll-m-8 text-3xl font-medium tracking-tight lg:text-2xl",
  h6: "scroll-m-6 text-2xl font-medium tracking-tight lg:text-xl",
  p: "scroll-m-4 text-xl font-normal tracking-tight lg:text-base",
};

type Props = {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"| "p";
  text: string;
  className?: string;
} & HTMLAttributes<HTMLElement>;

const Typography: FC<Props> = ({
  variant = "h1",
  text,
  className,
  ...props
}: Props) => {
  const Tag = variant;
  return <Tag className={cn(classNames[variant], className)} {...props}>{text}</Tag>;
};

export default Typography;
