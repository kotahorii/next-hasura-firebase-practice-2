export type News = {
  id: string;
  content: string;
  created_at: string;
};
export type EditNews = {
  id: string;
  content: string;
};
export type Task = {
  id: string;
  title: string;
  created_at: string;
  user_id: string;
};
export type EditTask = {
  id: string;
  title: string;
};
