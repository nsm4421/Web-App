import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
import { UserModel } from "@/types/auth";

export default async function getUserData(): Promise<UserModel | null> {
  try {
    // 현재 로그인한 유저 인증정ㅂ 조회
    const supabaseServerClient = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabaseServerClient.auth.getUser();
    if (!user) {
      throw Error("user is not logined");
    }
    // DB에서 유저정보 조회
    const { data, error } = await supabaseServerClient
      .from("users")
      .select("*")
      .eq("id", user.id)
      .order('id')  // limit을 사용하기 위해서는 order를 지정해주어야 함
      .limit(1);
    if (error) {
      throw error;
    } else if (!data) {
      throw Error("user not fetched");
    }
    const fetched = data[0];
    return { ...fetched, role: fetched.role ?? "user" };
  } catch (error) {
    console.error(error);
    return null;
  }
}
