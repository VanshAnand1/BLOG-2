import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Card>
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            Your signup was successful. Verify your email through the link we
            sent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="hover:underline">
            <Link href="https://www.gmail.com" passHref={true} target="_blank">
              Click to open your mail
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
