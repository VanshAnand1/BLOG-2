import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();
  const isGuest = !user || user.user_metadata?.is_anonymous;

  return <div>{String(isGuest)}</div>;
}
