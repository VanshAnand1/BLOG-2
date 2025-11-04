import Test from "@/components/is-mobile-test";
import ThemeSwitcher from "@/components/theme-switcher";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-aquablue dark:bg-lightgray">
      <ThemeSwitcher />
      <Test />
      <div className="mt-8 space-y-4 flex flex-col dark:gap-12 gap-6">
        <div className="bg-aquablue p-4">Words for color to show</div>
        <div className="bg-lightgray p-4">Words for color to show</div>
        <div className="bg-zomp p-4">Words for color to show</div>
        <div className="bg-teagreen p-4">Words for color to show</div>
        <div className="bg-sunset p-4">Words for color to show</div>
        <div className="bg-periwinkle p-4">Words for color to show</div>
        <div className="bg-navy p-4">Words for color to show</div>
        <div className="bg-white dark:bg-black text-black dark:text-white text-3xl dark:text-lg">
          this element changes with theme
        </div>
      </div>
    </div>
  );
}
