'use server'

import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
import { ActionData } from "@/types/action";

interface Props {
  uid: string;
  groupId: string;
}

export default async function AddMemberAction({
  uid,
  groupId,
}: Props): Promise<ActionData<void>> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("add_group", {
    uid,
    groupid: groupId,
  });
  return error ? { ok: false, error } : { ok: true };
}
