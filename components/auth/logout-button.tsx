"use client";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LogoutButton() {
  async function handleLogout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      console.log("User signed out successfully");
    }
  }

  return (
    <Link href="/auth/login" onClick={handleLogout}>
      Logout
    </Link>
  );
}
