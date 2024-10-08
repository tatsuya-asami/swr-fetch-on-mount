const BASE_URL = "http://localhost:3000";

export const ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  POSTS: `${BASE_URL}/posts`,
} as const;

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  postId: number;
};

export type Post = {
  id: number;
  body: string;
};
