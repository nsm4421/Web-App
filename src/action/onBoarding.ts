import { supabaseBrowserClient } from "@/lib/supabase/supabseClient";
import { ActionData } from "@/types/action";

interface Props {
  name: string;
  profileImage: File;
  country: string;
}

export default async function OnBoardingAction({
  name,
  profileImage,
  country,
}: Props): Promise<ActionData<void>> {
  // 현재 로그인한 유저 정보 가져오기
  const {
    data: { user },
    error: authError,
  } = await supabaseBrowserClient.auth.getUser();
  if (authError || !user) {
    return { ok: false, error: authError };
  }
  // 프로필 사진 저장하기
  const storageName = "avatar";
  const { data: storageData, error: storageError } =
    await supabaseBrowserClient.storage
      .from(storageName)
      .upload(user.id, profileImage, {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/jpeg",
      });
  if (storageError) {
    return { ok: false, error: storageError };
  }

  // Public URL 가져오기
  const {
    data: { publicUrl },
  } = supabaseBrowserClient.storage
    .from(storageName)
    .getPublicUrl(storageData.path);

  // 유저 정보 DB에 저장하기
  const { error: DBError } = await supabaseBrowserClient
    .from("users")
    .update({
      name,
      avatar_url: publicUrl,
      country,
      status: "active",
    })
    .eq("id", user.id);
  if (DBError) {
    return { ok: false, error: DBError };
  }

  return { ok: true };
}
