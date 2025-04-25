import app from "../src/server";
import { expect, test } from "vitest";

const animeId = "steinsgate-3";

// npx vitest run animeEpisodes.test.ts
test(`GET /api/v2/hianime/anime/${animeId}/episodes`, async () => {
  const response = await app.request(`/api/v2/hianime/anime/${animeId}/episodes`);
  const data = (await response.json()).data;

  expect(response.status).toEqual(200);
  expect(data.totalEpisodes).not.toEqual(0);
  expect(data.episodes).not.toEqual([]);
});
