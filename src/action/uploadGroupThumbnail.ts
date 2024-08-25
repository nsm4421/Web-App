import { supabaseBrowserClient } from "@/lib/supabase/supabseClient";
import { ActionData } from "@/types/action";

interface Props {
  groupId: string;
  thumbnail: File;
}

export default async function UploadGroupThumbnailAction({
  groupId,
  thumbnail,
}: Props): Promise<ActionData<string>> {
  const {
    data: { user },
    error: authError,
  } = await supabaseBrowserClient.auth.getUser();
  if (authError || !user) {
    return { ok: false, error: authError };
  }
  // 프로필 사진 저장하기
  const storageName = "thumbnail";
  const { data: storageData, error: storageError } =
    await supabaseBrowserClient.storage
      .from(storageName)
      .upload(groupId, thumbnail, {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/jpeg",
      });
  if (storageError) {
    return { ok: false, error: storageError };
  }

  const {
    data: { publicUrl },
  } = supabaseBrowserClient.storage
    .from(storageName)
    .getPublicUrl(storageData.path);

  return { ok: true, data: publicUrl };
}
