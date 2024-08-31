import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaHashtag } from "react-icons/fa";
import { PiChatsTeardrop } from "react-icons/pi";
import { RiHome2Fill } from "react-icons/ri";
import Typography from "@/components/ui/typography";
import { UserModel } from "@/types/auth";
import { GroupModel } from "@/types/group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  groups: GroupModel[];
  currentGroup: GroupModel;
  currentUser: UserModel;
}

export default function GroupThumnailAvatar({ currentGroup }: Props) {
  return (
    <nav>
      <ul className="flex flex-col space-y-3">
        <li>
          <div className="cursor-pointer items-center text-white mb-4 w-10 h-10 rounded-xl overflow-hidden">
            <Popover>
              <PopoverTrigger>
                {/* 그룹 썸네일 */}
                <Avatar>
                  <AvatarImage
                    src={currentGroup.thumbnail_url || ""}
                    alt={currentGroup.name}
                    className="object-cover w-full h-full"
                  />
                  <AvatarFallback className="bg-neutral-700">
                    <Typography
                      variant="p"
                      text={currentGroup.name.slice(0, 2)}
                    />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent
                side="right"
                className="ronded-xl bg-neutral-300 dark:bg-neutral-700 border-none shadow-md"
              >
                {/* 현재 그룹 정보 */}
                <Typography
                  variant="p"
                  text={currentGroup.name}
                  className="font-bold"
                />
                {currentGroup.introduce && (
                  <Typography
                    variant="p"
                    text={currentGroup.introduce}
                    className="font-thin text-sm"
                  />
                )}

                <ul className="mt-2 flex flex-wrap">
                  {currentGroup.hashtags.map((text) => (
                    <li
                      key={text}
                      className="outline border-slate-100 rounded-xl px-2 mr-2 text-sm flex justify-between space-x-1 items-center"
                    >
                      <FaHashtag size={12} />
                      <label>{text}</label>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
          <div className="cursor-pointer flex flex-col items-center group text-slate-500">
            <div className="rounded-xl bg-[rgba(255,255,255,0.8)] flex justify-center items-center p-2 m-1">
              <RiHome2Fill
                size="20"
                className="group-hover:scale-125 transition-all duration-200"
              />
            </div>
            <label className="text-sm">HOME</label>
          </div>
        </li>

        <li>
          <div className="cursor-pointer flex flex-col items-center group text-slate-500">
            <div className="rounded-xl bg-[rgba(255,255,255,0.8)] flex justify-center items-center p-2 m-1">
              <PiChatsTeardrop
                size="20"
                className="group-hover:scale-125 transition-all duration-200"
              />
            </div>
            <label className="text-sm">DM</label>
          </div>
        </li>
      </ul>
    </nav>
  );
}
