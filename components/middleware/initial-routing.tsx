"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function InitialRouting() {
  const [user, setUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const supabase = createClient();
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (data.user.id) {
          setUser(true);
        } else {
          setUser(false);
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "error");
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (user) {
      router.push("/posts");
    } else {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  return (
    <div className="h-screen items-center flex justify-center text-2xl font-bold">
      {isLoading ? <div>Session Loading</div> : <div>Session Loaded</div>}
    </div>
  );
}
