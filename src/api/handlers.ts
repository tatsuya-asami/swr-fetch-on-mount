import { http, HttpResponse, delay } from "msw";

export const handlers = [
  http.get("https://example.com/user", async () => {
    await delay(1000);
    return HttpResponse.json({
      id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      postId: 1,
      firstName: "John",
      lastName: "Maverick",
    });
  }),
  http.get("https://example.com/post/*", async () => {
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