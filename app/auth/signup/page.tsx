import SignUpForm from "@/components/auth/sign-up-form";
import ThemeSwitcher from "@/components/theme-switcher";

export default function Page() {
  return (
    <div>
      <ThemeSwitcher />
      <SignUpForm />
    </div>
  );
}
