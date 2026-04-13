import LogoutButton from "@/components/navigation-bar/logout-button";
import ProfileButton from "@/components/navigation-bar/profile-button";
import SearchBar from "@/components/navigation-bar/search-bar";
import ThemeSwitcher from "@/components/theme-switcher";
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
      <div className="flex justify-between w-full bg-white dark:bg-black py-3 px-4 gap-8 shadow-lg">
        <div className="flex gap-6 flex-2 max-w-5xl w-full">
          <Link
            href="/"
            className="text-md font-bold whitespace-nowrap flex items-center rounded-2xl bg-teagreen hover:bg-teagreen/90 px-4 py-2 text-black"
          >
            BLOG-2
          </Link>
          <SearchBar></SearchBar>
        </div>
        <div className="flex gap-4">
          <div>
            {isGuest ? (
              <Button className="bg-teagreen hover:bg-teagreen/90 text-black font-bold transition h-10 px-4">
                <Link href="/profiles/guest">About Guest Mode</Link>
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button className="bg-teagreen hover:bg-teagreen/90 text-black font-bold transition h-10 px-4 text-xl">
                  <Link href="/posts/new">+</Link>
                </Button>
                <ProfileButton
                  displayName={user.user_metadata.display_name}
                  id={user.id}
                ></ProfileButton>
              </div>
            )}
          </div>
          <div>
            {isGuest ? (
              <div className="flex gap-4">
                <Button className="bg-teagreen hover:bg-teagreen/90 text-black font-bold transition h-10 px-4">
                  <Link href="/auth/signup">Create Account</Link>
                </Button>
                <Button className="bg-teagreen hover:bg-teagreen/90 text-black font-bold transition h-10 px-4">
                  <Link href="/auth/login">Sign in</Link>
                </Button>
              </div>
            ) : (
              <LogoutButton></LogoutButton>
            )}
          </div>
        </div>
        <ThemeSwitcher />
      </div>
      {children}
    </div>
  );
}
