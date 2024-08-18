"use client";

import { useCreateGroupState } from "@/hooks/useCreateGroupState";

// TODO : 제출 기능 구현하기
export default function ThirdSteopOfCreateGroup() {
  const { thumbnail } = useCreateGroupState();
  return (
    <main>
      <div className="w-32 h-32 overflow-hidden rounded-full flex justify-center items-center">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-full h-full object-cover"
        />
      </div>
    </main>
  );
}
