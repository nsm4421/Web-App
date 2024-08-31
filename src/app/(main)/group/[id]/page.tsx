import GroupThumnailAvatar from "@/components/group/index/groupThumnailAvatar";
import InfoSection from "@/components/group/index/infoSection";
import ProfileImageAvatar from "@/components/group/index/profileImageAvatar";
import ChatTextEditer from "@/components/group/index/chatTextEditer";
import Typography from "@/components/ui/typography";
import { FiPlus } from "react-icons/fi";
import { Textarea } from "@/components/ui/textarea";

const test = {
  groups: [
    {
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
    },
    {
      id: "test2",
      name: "test2 name",
      introduce: "test introduce",
      hashtags: ["test1111", "test2111"],
      thumbnail_url:
        "https://image.fmkorea.com/files/attach/new3/20230720/2895716/1898014634/5983803433/60100bf48f4ba2ed87aefe5e3e72bfde.jpeg",
      host: null,
      members: null,
      created_at: "",
      created_by: "me",
    },
    {
      id: "test3",
      name: "test3 name",
      introduce: "test introduce",
      hashtags: ["test1222", "test2222"],
      thumbnail_url:
        "https://image.fmkorea.com/files/attach/new3/20230720/2895716/1898014634/5983803433/60100bf48f4ba2ed87aefe5e3e72bfde.jpeg",
      host: null,
      members: null,
      created_at: "",
      created_by: "me",
    },
  ],
  currentGroup: {
    id: "test",
    name: "test name",
    introduce: "test introduce",
    hashtags: ["test1", "test2"],
    thumbnail_url:
      "https://image.fmkorea.com/files/attach/new3/20230720/2895716/1898014634/5983803433/60100bf48f4ba2ed87aefe5e3e72bfde.jpeg",
    host: null,
    members: null,
    created_at: "",
    created_by: "me",
  },
  currentUser: {
    avatar_url:
      "https://qdzzkstwzbhzunjstpvk.supabase.co/storage/v1/object/public/avatar/1227f645-4b11-4637-bdd1-da0d1a11b504",
    country: null,
    created_at: null,
    email: "test1@naver.com",
    groups: null,
    id: "test",
    name: "test",
    phone: null,
    role: null,
    status: null,
  },
};

export default async function GroupPage() {
  return (
    <main className="hidden md:block">
      {/* 사이드바 */}
      <aside className="hidden md:block">
        <div className="fixed top-0 left-0 pt-[60px] pb-5 z-30 flex flex-col justify-between items-center h-screen w-20">
          <GroupThumnailAvatar {...test} />
          <div className="flex flex-col space-y-3">
            <div className="bg-[rgba(255,255,255,0.8)] transition-all cursor-pointer duration-300 hover:scale-125 text-slate-500 grid place-content-center rounded-full w-10 h-10">
              <FiPlus size={25} />
            </div>
            <ProfileImageAvatar {...test} />
          </div>
        </div>
      </aside>

      {/* 현재 페이지 정보 */}
      <InfoSection/>

      <section className="h-screen flex flex-col px-2">
        <div className="flex-1 overflow-y-auto">
          {/* 채팅 메세지 목록 */}
          <Typography text="test" />
          <Typography text="test" />
          <Typography text="test" />
          <Typography text="test" />
          <Typography text="test" />
          <Typography text="test" />
          <Typography text="test" />
          <Typography text="test" />
          <Typography text="test" />
          <Typography text="test" />
          <Typography text="test" />
          <Typography text="test" />
          <Typography text="test" />
        </div>

        {/* 채팅 입력창 */}
        <ChatTextEditer />
      </section>
    </main>
  );
}
