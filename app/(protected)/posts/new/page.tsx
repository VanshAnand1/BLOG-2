import NewPost from "@/components/posts/new-post";

export default async function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <NewPost />
    </div>
  );
}
