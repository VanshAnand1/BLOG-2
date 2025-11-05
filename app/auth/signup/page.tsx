import SignUpForm from "@/components/auth/sign-up-form";
import ThemeSwitcher from "@/components/theme-switcher";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="fixed top-3 right-3 ">
        <ThemeSwitcher />
      </div>
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
