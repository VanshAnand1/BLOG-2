import SignUpForm from "@/components/auth/sign-up-form";
import SignUp from "@/components/auth/signup/sign-up";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      {/* <SignUpForm className="w-full" /> */}
      <SignUp></SignUp>
    </div>
  );
}
