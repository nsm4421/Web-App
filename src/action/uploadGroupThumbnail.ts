import { supabaseBrowserClient } from "@/lib/supabase/supabseClient";

interface Props {
  groupId: string;
  thumbnail: File;
}

export default async function UploadGroupThumbnailAction({
  groupId,
  thumbnail,
}: Props) {
  try {
    const {
      data: { user },
    } = await supabaseBrowserClient.auth.getUser();
    if (!user) {
      throw Error("user is not logined");
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
      throw storageError;
    }
    
    const {
      data: { publicUrl },
    } = supabaseBrowserClient.storage
      .from(storageName)
      .getPublicUrl(storageData.path);

    return publicUrl;
  } catch (error) {
    console.error(error);
  }
}
