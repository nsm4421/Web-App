"use server";

import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
import { ActionData } from "@/types/action";
import { UserModel } from "@/types/auth";

export default async function getUserData(): Promise<
  ActionData<UserModel | null>
> {
  const supabaseServerClient = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabaseServerClient.auth.getUser();
  if (authError || !user?.id) {
    return { ok: false, error: authError };
  }
  // DB에서 유저정보 조회
  const { data, error: selectError } = await supabaseServerClient
    .from("users")
    .select("*")
    .eq("id", user.id)
    .order("id") // limit을 사용하기 위해서는 order를 지정해주어야 함
    .limit(1);
  if (selectError || !data) {
    return { ok: false, error: selectError };
  }
  return { ok: true, data: { ...data[0], role: data[0].role ?? "user" } };
}
