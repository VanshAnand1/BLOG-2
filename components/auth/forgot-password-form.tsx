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
import { toast } from "sonner";

export default function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "An unknown error has occurred"
      );
      toast.error(
        `Error occured: ${
          error instanceof Error
            ? error.message
            : "An unknown error has occurred"
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
      {success ? (
        <Card className="flex w-full flex-1 flex-col gap-6">
          <CardHeader>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              Check your email for the password reset instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              If an account exists with the given email:{" "}
              <span className="font-bold">{email}</span>, password reset
              instructions have been sent.
            </div>
            <div className=" text-center p-6">
              <Link
                href="https://www.gmail.com"
                passHref={true}
                target="_blank"
                className="hover:underline bg-red-300 hover:bg-red-200 px-4 rounded-2xl py-3"
              >
                Click to open your mail
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/auth/forgot-password" className="hover:underline">
              <span className="font-bold">Entered the wrong email?</span> Click
              me to go back
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <Card className="flex w-full flex-1 flex-col gap-6">
          <CardHeader>
            <CardTitle>Forgot your password?</CardTitle>
            <CardDescription>
              Enter your email to receive password reset instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
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
            <div className="w-full text-center text-sm flex flex-col gap-2 px-6">
              <div>Remember your password?</div>
              <Link
                href="/auth/login"
                className="rounded-2xl bg-red-300 hover:bg-red-200 px-4 py-2 underline-offset-4 hover:underline"
              >
                Login Instead
              </Link>
            </div>
            <div className="w-full text-center text-sm flex flex-col gap-2 px-6">
              <div>Want to start fresh?</div>
              <Link
                href="/auth/login"
                className="rounded-2xl bg-red-300 hover:bg-red-200 px-4 py-2 underline-offset-4 hover:underline"
              >
                Make a new account
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
