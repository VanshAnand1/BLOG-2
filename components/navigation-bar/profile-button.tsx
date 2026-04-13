import { Button } from "../ui/button";
import Link from "next/link";

export default function ProfileButton({
  displayName,
  id,
}: {
  displayName: string;
  id: string;
}) {
  return (
    <Button className="bg-teagreen hover:bg-teagreen/90 text-black font-bold transition h-10 px-4">
      <Link href={`/profiles/${id}`}>Profile: {displayName}</Link>
    </Button>
  );
}
