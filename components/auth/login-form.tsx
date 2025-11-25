"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success("Login was successful!");
      router.push("/");
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "An unknown error has occured"
      );
      toast.error(
        `Login failed: ${
          error instanceof Error
            ? error.message
            : "An unknown error has occured"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col gap-8 lg:max-w-5xl lg:flex-row",
        className
      )}
      {...props}
    >
      <Card className="flex w-full flex-1 flex-col gap-6">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>Log in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@email.com"
                  className="rounded-xl"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>

                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="*********"
                  className="rounded-xl"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <div
                  className={`text-sm text-red-500 ${
                    error ? `opacity-100 visible` : `opacity-0 invisible`
                  }`}
                >
                  {error ? error : "An unexpected error occured"}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log in"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full mt-4 text-center text-sm flex flex-col gap-2">
            <div>Dont have an account yet?</div>
            <Link
              href="/auth/signup"
              className="rounded-2xl bg-red-300 hover:bg-red-200 px-4 py-2 underline-offset-4 hover:underline"
            >
              Signup Instead
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
