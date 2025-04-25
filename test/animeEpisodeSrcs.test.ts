import { expect, test } from "vitest"
import app from "../src/server";

const animeEpisodeId = "steinsgate-3?ep=230";
const server = "hd-1";
const category = "sub";

// npx vitest run animeEpisodeSrcs.test.ts
test(`GET /api/v2/hianime/episode/sources?animeEpisodeId=${animeEpisodeId}&server=${server}&category=${category}`, async () => {
  const response = await app.request(`/api/v2/hianime/episode/sources?animeEpisodeId=${animeEpisodeId}&server=${server}&category=${category}`);
  const data = (await response.json()).data;

  expect(data.sources).not.toEqual([]);
});
