import Link from "next/link";

export default function SignUpSuccess() {
  return (
    <div>
      <Link href="https://www.gmail.com" passHref={true} target="_blank">
        Open your mail
      </Link>
    </div>
  );
}
