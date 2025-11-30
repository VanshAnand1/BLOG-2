import LogoutButton from "@/components/navigation-bar/logout-button";
import ProfileButton from "@/components/navigation-bar/profile-button";
import SearchBar from "@/components/navigation-bar/search-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex justify-between w-full bg-red-400 py-3 px-4">
        <div className="flex gap-12 flex-2">
          <Button className="bg-transparent border-none shadow-none hover:bg-transparent hover:bg-red-300 hover:shadow-lg">
            <Link href="/" className="text-lg">
              BLOG-2
            </Link>
          </Button>
          <SearchBar></SearchBar>
        </div>
        <div className="flex gap-6">
          <ProfileButton></ProfileButton>
          <LogoutButton></LogoutButton>
        </div>
      </div>
      {children}
    </div>
  );
}
