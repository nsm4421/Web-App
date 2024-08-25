export type GroupModel = {
  id: string;
  name: string;
  introduce: string | null;
  hashtags: string[];
  thumbnail_url: string;
  host: string | null;
  members: string[] | null;
  created_at: string;
  created_by: string;
};
