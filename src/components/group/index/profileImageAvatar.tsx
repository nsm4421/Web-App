"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { FiLogOut, FiEdit3 } from "react-icons/fi";
import { GiNightSleep } from "react-icons/gi";
import { GoDotFill } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { UserModel } from "@/types/auth";
import { GroupModel } from "@/types/group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ModeDialog from "./modeDialog";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

interface Props {
  groups: GroupModel[];
  currentGroup: GroupModel;
  currentUser: UserModel;
}

export default function ProfileImageAvatar(props: Props) {
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src={props.currentUser.avatar_url}
          alt={"profile-image"}
          width={300}
          height={300}
          className="object-cover h-10 w-10 relative cursor-pointer rounded-xl"
        />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        className="bg-neutral-300 dark:bg-slate-700 shadow-lg rounded-xl flex flex-col"
      >
        <div className="flex justify-start space-x-3 items-center">
          <Avatar>
            <AvatarImage src={props.currentUser.avatar_url} />
            <AvatarFallback>
              {props.currentUser?.name && (
                <Typography
                  variant="p"
                  text={props.currentUser.name.slice(0, 2)}
                />
              )}
            </AvatarFallback>
          </Avatar>
          <div>
            <Typography
              text={props.currentUser.name || props.currentUser.email || ""}
              variant="p"
              className="font-semibold"
            />
            {/* TODO : status변경하는 버튼 만들기 */}
            {props.currentUser.status === "active" ? (
              <div className="flex space-x-2 items-center">
                <GoDotFill className="bg-teal-600" size="12" />
                <Typography
                  text="active"
                  variant="p"
                  className="font-thin text-sm"
                />
              </div>
            ) : (
              <div className="flex space-x-2 items-center">
                <GiNightSleep size="12" />
                <Typography
                  text="deactivated"
                  variant="p"
                  className="font-thin text-sm"
                />
              </div>
            )}
          </div>
        </div>
        <Separator className="bg-slate-200 my-2" />
        <ul className="flex flex-col gap-y-2">
          <li>
            {/* TODO : 프로필 수정 버튼 기능 구현하기 */}
            <Button
              variant="ghost"
              className="flex space-x-2 cursor-pointer p-0 hover:text-orange-500"
            >
              <FiEdit3 size={15} />
              <Typography
                className="text-bold cursor-pointer text-sm"
                variant="p"
                text="Edit Profile"
              />
            </Button>
          </li>
          <li>
            {/* 그룹 생성하기 */}
            <Link
              href="/group/create"
              className="flex space-x-2 cursor-pointer items-center hover:text-orange-500"
            >
              <FaPlus />
              <Typography
                className="text-bold cursor-pointer text-sm"
                variant="p"
                text="Create Group"
              />
            </Link>
          </li>
          <li>
            {/* TODO : 로그아웃 버튼 기능구현 */}
            <Button
              variant="ghost"
              className="flex space-x-2 cursor-pointer p-0 hover:text-orange-500"
            >
              <FiLogOut size={15} />
              <Typography
                className="text-bold cursor-pointer text-sm"
                variant="p"
                text="Sign Out"
              />
            </Button>
          </li>
          <li>
            {/* 세팅 다이얼로그 팝업 버튼 */}
            <Button variant="ghost" className="p-0">
              <ModeDialog />
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
