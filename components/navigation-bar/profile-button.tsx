import { Button } from "../ui/button";
import Link from "next/link";

export default async function ProfileButton({
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
