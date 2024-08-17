import { createSupabaseServerClient } from "@/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabaseServerClient = await createSupabaseServerClient();
    const { error } = await supabaseServerClient.auth.exchangeCodeForSession(
      code
    );
    if (!error) {
      return NextResponse.redirect(`${origin}`);
    } else {
      console.error(error);
    }
  }
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
