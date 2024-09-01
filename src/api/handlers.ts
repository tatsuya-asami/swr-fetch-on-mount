import { http, HttpResponse, delay } from "msw";

export const ENDPOINTS = {
  USERS: "https://example.com/users",
  POSTS: "https://example.com/posts",
  LINKS: "https://example.com/links",
} as const;

export const handlers = [
  http.get(ENDPOINTS.USERS, async () => {
    await delay(1000);
    return HttpResponse.json(USERS);
  }),
  http.get(ENDPOINTS.POSTS, async ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    await delay(1000);
    if (!userId) {
      return HttpResponse.json(POSTS);
    }
    return HttpResponse.json(
      POSTS.filter((post) => post.userId === parseInt(userId))
    );
  }),
  http.get(ENDPOINTS.LINKS, async () => {
    await delay(1000);
    return HttpResponse.json(LINKS);
  }),
];

export type User = {
  id: number;
  firstName: string;
  lastName: string;
};

export const USERS = [
  {
    id: 1,
    firstName: "Susumu",
    lastName: "Kurose",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Maverick",
  },
] as const satisfies User[];

export type Post = {
  id: number;
  userId: number;
  body: string;
};
const POSTS = [
  {
    id: 1,
    userId: 2,
    body: "userId 2 John",
  },
  {
    id: 2,
    userId: 1,
    body: "userId 1 Susumu",
  },
  {
    id: 3,
    userId: 2,
    body: "userId 2 John2",
  },
  { id: 4, userId: 3, body: "userId 3 unknown" },
] as const satisfies Post[];

export type Link = {
  id: number;
  postId: number;
  url: string;
};
const LINKS = [
  {
    id: 1,
    postId: 1,
    url: "https://example.com/posts/1",
  },
  {
    id: 2,
    postId: 2,
    url: "https://example.com/posts/2",
  },
] as const satisfies Link[];
