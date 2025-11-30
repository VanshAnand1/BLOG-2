import { createClient } from "@/lib/supabase/server";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function ProfileButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();
  const isGuest = !user || user.user_metadata?.is_anonymous;

  if (isGuest) {
    return (
      <Button>
        <Link href="/profiles/guest">Guest Mode</Link>
      </Button>
    );
  } else {
    return (
      <Button>
        <Link href={`/profiles/${user.id}`}>
          Profile: {user.user_metadata.display_name}
        </Link>
      </Button>
    );
  }
}
