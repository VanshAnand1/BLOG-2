"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
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

type InputField =
  | "email"
  | "confirmEmail"
  | "displayName"
  | "password"
  | "confirmPassword";

export default function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [currentField, setCurrentField] = useState<InputField | null>();

  const passwordsMatch = () => {
    return password === confirmPassword;
  };

  const usernameIsUnique = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("display_name", displayName);

    if (error) return false;
    return data?.length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (!passwordsMatch()) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!(await usernameIsUnique())) {
      setError("Username is already taken");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName },
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;

      // toast
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "An Unknown error has occured"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
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
                <Label htmlFor="confirmEmail">Confirm Email</Label>
                <Input
                  type="email"
                  id="confirmEmail"
                  name="confirmEmail"
                  placeholder="name@email.com"
                  className="rounded-xl"
                  value={confirmEmail}
                  onChange={(e) => {
                    setConfirmEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  type="text"
                  id="displayName"
                  name="displayName"
                  placeholder="VanshAnand1"
                  className="rounded-xl"
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="password">Password</Label>
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
              <div className="flex flex-col gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="*********"
                  className="rounded-xl"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
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
                  {isLoading ? "Signing up..." : "Sign up"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full mt-4 text-center text-sm flex flex-col gap-2">
            <div>Already have an account? </div>
            <Link
              href="/auth/login"
              className="rounded-2xl bg-red-300 hover:bg-red-200 px-4 py-2 underline-offset-4 hover:underline"
            >
              Login Instead
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
