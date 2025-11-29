import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  let anonymous = false;
  if (user?.user_metadata?.is_anonymous) {
    anonymous = true;
  }

  return <div>{String(anonymous)}</div>;
}
