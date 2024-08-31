"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Typography from "@/components/ui/typography";
import { useTheme } from "next-themes";
import { FiSettings } from "react-icons/fi";

export default function ModeDialog() {
  const { theme, setTheme } = useTheme();
  const handleSwitchMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Dialog>
      <DialogTrigger className="flex space-x-2 cursor-pointer p-0 hover:text-orange-500 items-center">
        <FiSettings size={15} />
        <Typography
          className="text-bold cursor-pointer text-sm"
          variant="p"
          text="Settings"
        />
      </DialogTrigger>
      <DialogContent className="border-none bg-slate-200 dark:bg-neutral-600 rounded-md">
        <DialogTitle className="w-full">
          <Typography text="Edit Setting" variant="p" className="font-bold" />
        </DialogTitle>
        <Button className="rounded-xl bg-slate-600 hover:bg-slate-400 text-neutral-100" onClick={handleSwitchMode}>
          {theme === "light" ? "Dark" : "Light"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
