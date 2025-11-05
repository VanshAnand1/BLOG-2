import ThemeSwitcher from "@/components/theme-switcher";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative z-10">
      <div className="fixed top-3 right-3">
        <ThemeSwitcher />
      </div>
      <div>{children}</div>
    </div>
  );
}
