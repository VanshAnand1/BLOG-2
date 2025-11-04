export type supabaseProfile = {
  id: string;
  avatar_url: string;
  display_name: string;
  badges: string[];
  blurb: string;
  posts_count: number;
  likes_count: number;
  followers_count: number;
  following_count: number;
  created_at: string;
};
