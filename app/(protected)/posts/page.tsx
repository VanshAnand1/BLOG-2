import { createClient } from "@/lib/supabase/client";
import { supabasePost } from "@/types/post";

export async function formatPost(post: supabasePost) {
  const supabase = createClient();
  const { data: authorProfile, error } = await supabase
    .from("profiles")
    .select("avatar_url, display_name")
    .eq("id", post.author_id)
    .maybeSingle();

  if (!authorProfile) {
    console.log("no author", error);
    return;
  }
  if (error) {
    console.log("___error", error);
  }

  return (
    <div>
      {post.title}
      {post.content}
      {authorProfile.display_name}
    </div>
  );
}

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isGuest = !user || user.is_anonymous;

  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "id, author_id, title, content, footer, created_at, updated_at, likes_count, comments_count, author:profiles!posts_author_id_fkey(display_name, avatar_url)",
    )
    .order("created_at", { ascending: false })
    .limit(40);
  if (error) {
    console.log("___error", error);
    return <div>Posts could not be loaded, please try again later</div>;
  }

  return (
    <div>
      {String(isGuest)}
      {formatPost(posts[0])}
    </div>
  );
}
