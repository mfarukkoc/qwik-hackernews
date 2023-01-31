export function fetchUser(id: string) {
  const url = `https://hacker-news.firebaseio.com/v0/user/${id}.json`;

  return fetch(url).then((r) => r.json());
}

export type StoryCategory = "news" | "newest" | "show" | "ask" | "jobs";

interface fetchStoryListProps {
  category: StoryCategory;
  page?: number;
}

export function fetchStoryList({ category, page }: fetchStoryListProps) {
  const url = `https://node-hnapi.herokuapp.com/${category}?page=${page}`;

  const response: Promise<StoryType[]> = fetch(url).then((r) => r.json());
  return response;
}

interface fetchStoryProps {
  id: string;
}

export function fetchStory({ id }: fetchStoryProps) {
  const url = `https://node-hnapi.herokuapp.com/item/${id}`;

  const response: Promise<StoryWithComments> = fetch(url).then((r) => r.json());
  return response;
}

export interface StoryType {
  id: number;
  title: string;
  points?: any;
  user?: any;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain?: string;
}

export interface StoryWithComments extends StoryType {
  comments: Comment[];
}

export interface Comment {
  id: number;
  level: number;
  user: string;
  time: number;
  time_ago: string;
  content: string;
  comments: Comment[];
}
