import { type supabaseProfile } from "./profile";

export type supabasePost = {
  id: string;
  author_id: string;
  author_profile: supabaseProfile;
  title: string;
  content: string;
  footer?: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
};

export type supabaseComment = {
  id: string;
  post_id: string;
  commenter_id: string;
  commenter_profile: supabaseProfile;
  comment: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
};

export type supabaseReply = {
  id: string;
  comment_id: string;
  replier_id: string;
  replier_profile: supabaseProfile;
  reply: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
};
