import { supabaseBrowserClient } from "@/lib/supabase/supabseClient";
import { UserModel } from "@/types/auth";

interface Props {
  name: string;
  profileImage: File;
  country: string;
}

export default async function OnBoardingAction({
  name,
  profileImage,
  country,
}: Props) {
  try {
    // 현재 로그인한 유저 정보 가져오기
    const {
      data: { user },
    } = await supabaseBrowserClient.auth.getUser();
    if (!user) {
      throw Error("user is not logined");
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
      throw storageError;
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
      throw DBError;
    }
  } catch (error) {
    console.error(error);
  }
}
