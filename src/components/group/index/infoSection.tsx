"use client";

import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { GroupModel } from "@/types/group";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

const currentGroup: GroupModel = {
  id: "test",
  name: "test name",
  introduce: "test1 introduce",
  hashtags: ["test1", "test2"],
  thumbnail_url:
    "https://image.fmkorea.com/files/attach/new3/20230720/2895716/1898014634/5983803433/60100bf48f4ba2ed87aefe5e3e72bfde.jpeg",
  host: null,
  members: null,
  created_at: "",
  created_by: "me",
};
export default function InfoSection() {
  return (
    <div className="fixed left-20 rounded-l-xl md:w-52 lg:w-[350px] h-[calc(100%-63px)] z-20 flex flex-col gap-y-4 items-center px-2">
      {/* 그룹 정보 */}

      <div className="shadow-md p-2 bg-neutral-300 dark:bg-neutral-800 w-full rounded-bl-xl rounded-br-xl rounded-tr-xl flex flex-col">
        <Typography text="Group Info" variant="h6" />
        <Separator className="h-[1px] bg-neutral-200 dark:bg-neutral-600 my-2" />
        <Typography text={currentGroup.name} variant="p" />
      </div>

      <div className="shadow-md p-2 bg-neutral-300 dark:bg-neutral-800 w-full rounded-xl flex flex-col">
        <span>CHAT</span>
        <span>DM</span>
      </div>
    </div>
  );
}
