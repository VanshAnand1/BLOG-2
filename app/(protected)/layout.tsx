import LogoutButton from "@/components/navigation-bar/logout-button";
import ProfileButton from "@/components/navigation-bar/profile-button";
import SearchBar from "@/components/navigation-bar/search-bar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export type isGuest = {
  isGuest: boolean;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();
  const isGuest = !user || user.user_metadata?.is_anonymous;

  return (
    <div>
      <div className="flex justify-between w-full bg-red-400 py-3 px-4 gap-12">
        <div className="flex gap-6 flex-2 max-w-5xl w-full">
          {/* <Button className=""> */}
          <Link href="/" className="text-lg font-bold">
            BLOG-2
          </Link>
          {/* </Button> */}
          <SearchBar></SearchBar>
        </div>
        <div className="flex gap-6">
          {isGuest ? (
            <Button>
              <Link href="/profiles/guest">About Guest Mode</Link>
            </Button>
          ) : (
            <ProfileButton
              displayName={user.user_metadata.display_name}
              id={user.id}
            ></ProfileButton>
          )}
          {isGuest ? (
            <div className="flex gap-4">
              <Button>
                <Link href="/auth/signup">Create Account</Link>
              </Button>
              <Button>
                <Link href="/auth/login">Sign in</Link>
              </Button>
            </div>
          ) : (
            <LogoutButton></LogoutButton>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
