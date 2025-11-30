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
import { X, Check, QuestionMark } from "../ui/lucide-icons";
import { toast } from "sonner";
import { IsProfanitySafe } from "@/lib/helpers/profanity";
import {
  isPasswordSecure,
  inputsMatch,
  passwordLength,
  passwordContainsLowerCase,
  passwordContainsNumber,
  passwordContainsUpperCase,
  emailIsValid,
  displayNameMaxLength,
  displayNameLength,
  displayNameDoesNotContainSpaces,
} from "@/lib/helpers/sign-up-requirements";

export type InputField =
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
  const [debounce, setDebounce] = useState("");
  const router = useRouter();

  const [usernameIsUnique, setUsernameIsUnique] = useState(false);
  const [usernameIsValid, setUsernameIsValid] = useState(false);

  const [currentField, setCurrentField] = useState<InputField | null>();
  const isActive = (field: string) => field === currentField;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(displayName);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [displayName]);

  useEffect(() => {
    if (debounce) {
      const isUsernameUnique = async () => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("display_name", displayName);

        if (error) {
          setUsernameIsUnique(false);
          toast.error(
            error instanceof Error ? error.message : "Unknown error occurred"
          );
          return;
        }
        setUsernameIsUnique(data?.length === 0);
      };

      isUsernameUnique();
    }
  }, [debounce, displayName]);

  useEffect(() => {
    if (displayName) {
      setUsernameIsValid(IsProfanitySafe(displayName));
    }
  }, [displayName]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (!displayNameLength(displayName)) {
      setError("Display Name is too long");
      toast.error("Display Name is too long");
      setIsLoading(false);
      return;
    }

    if (!displayNameDoesNotContainSpaces(displayName)) {
      setError("Display Name must not contain spaces");
      toast.error("Display Name must not contain spaces");
      setIsLoading(false);
      return;
    }

    if (!IsProfanitySafe(displayName)) {
      setError("Display Name contains inappropriate language");
      toast.error("Display Name contains inappropriate language");
      setIsLoading(false);
      return;
    }

    if (!usernameIsUnique) {
      setError("Display Name is already taken");
      toast.error("Display Name is already taken");
      setIsLoading(false);
      return;
    }

    if (!isPasswordSecure(password)) {
      setError("Password does not meet requirements");
      toast.error("Password does not meet requirements");
      setIsLoading(false);
      return;
    }

    if (!inputsMatch(password, confirmPassword)) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!inputsMatch(email, confirmEmail)) {
      setError("Emails do not match");
      toast.error("Emails do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName },
          emailRedirectTo: `${window.location.origin}/auth/login`,
        },
      });
      if (error) throw error;

      toast.success("Signup was successful! Verify your email to log in.");
      router.push("/auth/signup-success");
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "An Unknown error has occured"
      );
      toast.error(
        `Signup failed: ${
          error instanceof Error
            ? error.message
            : "An Unknown error has occured"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentField === undefined) {
      setCurrentField(null);
    }
    const handleClick = () => {
      setCurrentField(null);
    };
    console.log(currentField);

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [currentField]);

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col gap-8 lg:max-w-5xl lg:flex-row",
        className
      )}
      {...props}
    >
      <div className="flex w-full flex-1 flex-col gap-6">
        <Card className="h-full w-full">
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
                    onClick={(e) => {
                      setCurrentField("email");
                      e.stopPropagation();
                    }}
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
                    onClick={(e) => {
                      setCurrentField("confirmEmail");
                      e.stopPropagation();
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    type="text"
                    id="displayName"
                    name="displayName"
                    placeholder="JohnnyAppleseed12"
                    className="rounded-xl"
                    value={displayName}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                    }}
                    required
                    onClick={(e) => {
                      setCurrentField("displayName");
                      e.stopPropagation();
                    }}
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
                    onClick={(e) => {
                      setCurrentField("password");
                      e.stopPropagation();
                    }}
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
                    onClick={(e) => {
                      setCurrentField("confirmPassword");
                      e.stopPropagation();
                    }}
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
              <div>Already have an account?</div>
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
      <div className="hidden w-full flex-1 lg:flex">
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div>BLOG-2</div>
              {/* <Button onClick={() => setCurrentField(null)}>
                Remove Focus
              </Button> */}
            </CardTitle>
            <CardDescription>
              The following are required to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5">
              <div
                className={cn(
                  "flex flex-col gap-3 py-2 px-4 rounded-2xl",
                  isActive("email")
                    ? "bg-blue-200 dark:bg-blue-700 scale-[1.02] shadow-md"
                    : "bg-neutral-100 dark:bg-neutral-600 opacity-80 "
                )}
              >
                <div className="flex gap-5">
                  {emailIsValid(email) ? <Check></Check> : <X></X>}
                  <p>Email is a valid email</p>
                </div>
              </div>
              <div
                className={cn(
                  "flex flex-col gap-3 py-2 px-4 rounded-2xl",
                  isActive("confirmEmail")
                    ? "bg-blue-200 dark:bg-blue-700 scale-[1.02] shadow-md"
                    : "bg-neutral-100 dark:bg-neutral-600 opacity-80 "
                )}
              >
                <div className="flex gap-5">
                  {inputsMatch(email, confirmEmail) ? <Check></Check> : <X></X>}
                  <p>Confirm Email matches email</p>
                </div>
              </div>
              <div
                className={cn(
                  "flex flex-col gap-3 py-2 px-4 rounded-2xl",
                  isActive("displayName")
                    ? "bg-blue-200 dark:bg-blue-700 scale-[1.02] shadow-md"
                    : "bg-neutral-100 dark:bg-neutral-600 opacity-80 "
                )}
              >
                <div className="flex gap-5">
                  {debounce ? (
                    usernameIsUnique ? (
                      <Check></Check>
                    ) : (
                      <X></X>
                    )
                  ) : (
                    <QuestionMark></QuestionMark>
                  )}
                  <p>Display Name is available</p>
                </div>

                <div className="flex gap-5">
                  {displayName ? (
                    usernameIsValid ? (
                      <Check></Check>
                    ) : (
                      <X></X>
                    )
                  ) : (
                    <QuestionMark></QuestionMark>
                  )}
                  <p>Display Name is profanity free</p>
                </div>
                <div className="flex gap-5">
                  {displayName ? (
                    displayNameLength(displayName) ? (
                      <Check></Check>
                    ) : (
                      <X></X>
                    )
                  ) : (
                    <QuestionMark></QuestionMark>
                  )}
                  <p>
                    Display Name is under {displayNameMaxLength} characters long
                  </p>
                </div>
                <div className="flex gap-5">
                  {displayName ? (
                    displayNameDoesNotContainSpaces(displayName) ? (
                      <Check></Check>
                    ) : (
                      <X></X>
                    )
                  ) : (
                    <QuestionMark></QuestionMark>
                  )}
                  <p>Display Name does not contain spaces</p>
                </div>
              </div>
              <div
                className={cn(
                  "flex flex-col gap-3 py-2 px-4 rounded-2xl",
                  isActive("password")
                    ? "bg-blue-200 dark:bg-blue-700 scale-[1.02] shadow-md"
                    : "bg-neutral-100 dark:bg-neutral-600 opacity-80 "
                )}
              >
                <div className="flex gap-5">
                  {passwordLength(password) ? <Check></Check> : <X></X>}
                  <p>Password is at least 8 characters long</p>
                </div>
                <div className="flex gap-5">
                  {passwordContainsUpperCase(password) ? (
                    <Check></Check>
                  ) : (
                    <X></X>
                  )}
                  <p>Password contains uppercase letter</p>
                </div>
                <div className="flex gap-5">
                  {passwordContainsLowerCase(password) ? (
                    <Check></Check>
                  ) : (
                    <X></X>
                  )}
                  <p>Password contains lowercase letter</p>
                </div>
                <div className="flex gap-5">
                  {passwordContainsNumber(password) ? <Check></Check> : <X></X>}
                  <p>Password contains number</p>
                </div>
              </div>
              <div
                className={cn(
                  "flex flex-col gap-3 py-2 px-4 rounded-2xl",
                  isActive("confirmPassword")
                    ? "bg-blue-200 dark:bg-blue-700 scale-[1.02] shadow-md"
                    : "bg-neutral-100 dark:bg-neutral-600 opacity-80 "
                )}
              >
                <div className="flex gap-5">
                  {inputsMatch(password, confirmPassword) ? (
                    <Check></Check>
                  ) : (
                    <X></X>
                  )}
                  <p>Confirm Password matches password</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
