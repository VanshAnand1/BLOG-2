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
    <Button>
      <Link href={`/profiles/${id}`}>Profile: {displayName}</Link>
    </Button>
  );
}
