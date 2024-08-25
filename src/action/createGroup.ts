"use server";

import AddMemberAction from "./addGroup";
import { ActionData } from "@/types/action";
import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";

interface Props {
  id: string;
  name: string;
  introduce: string;
  hashtags: string[];
  thumbnail_url: string;
}

export default async function CreateGroupAction(
  props: Props
): Promise<ActionData<void>> {
  const supabase = await createSupabaseServerClient();
  // 인증 정보 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user?.id) {
    return { ok: false, error: authError };
  }

  // 그룹 테이블 insert
  const { error: insertError } = await supabase.from("groups").insert({
    ...props,
    members: [user!.id],
    created_by: user!.id,
  });
  if (insertError) {
    return { ok: false, error: insertError };
  }

  // 유저 테이블 members 컬럼 update
  const { error: updateDBError } = await AddMemberAction({
    uid: user.id,
    groupId: props.id,
  });
  if (updateDBError) {
    return { ok: false, error: updateDBError };
  }

  return { ok: true };
}
