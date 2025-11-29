import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  let anonymous = false;
  if (user?.user_metadata?.is_anonymous) {
    anonymous = true;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <div className="w-full bg-red-400 py-3 px-2">
        <div>
          <Link href="/">BLOG-2</Link>
        </div>
        <div></div>
        <div>
          <Button>Hello</Button>
        </div>
      </div>
      <body>{children}</body>
    </html>
  );
}
