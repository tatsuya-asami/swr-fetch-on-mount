import { http, HttpResponse, delay } from "msw";

export const ENDPOINTS = {
  USERS: "https://example.com/users",
  POSTS: "https://example.com/posts",
  LINKS: "https://example.com/links",
} as const;

export const handlers = [
  http.get(ENDPOINTS.USERS, async ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    await delay(100);
    return HttpResponse.json(
      USERS.find((user) => user.id === parseInt(userId ?? ""))
    );
  }),
  http.get(ENDPOINTS.POSTS, async ({ request }) => {
    const url = new URL(request.url);
    const postIds = url.searchParams.getAll("postIds");
    await delay(100);

    return HttpResponse.json(
      POSTS.filter((post) =>
        postIds.map((post) => parseInt(post)).includes(post.id)
      )
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
  postIds: number[];
};

export const USERS = [
  {
    id: 1,
    firstName: "Susumu",
    lastName: "Kurose",
    postIds: [2],
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Maverick",
    postIds: [1, 3],
  },
] as const satisfies User[];

export type Post = {
  id: number;
  body: string;
};
const POSTS = [
  {
    id: 1,
    body: "userId 2 John",
  },
  {
    id: 2,
    body: "userId 1 Susumu",
  },
  {
    id: 3,
    body: "userId 2 John2",
  },
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
