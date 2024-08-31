import { http, HttpResponse, delay } from "msw";

export const ENDPOINTS = {
  USER: "https://example.com/user",
  POST: "https://example.com/post",
} as const

export const handlers = [
  http.get(ENDPOINTS.USER, async () => {
    await delay(1000);
    return HttpResponse.json({
      id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      postId: 1,
      firstName: "John",
      lastName: "Maverick",
    });
  }),
  http.get(ENDPOINTS.POST, async () => {
    await delay(1000);

    return HttpResponse.json({
      user: {
        id: 1,
        firstName: "John",
        lastName: "Maverick",
      },
    });
  }),
];