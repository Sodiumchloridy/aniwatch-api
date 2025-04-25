import { expect, test } from "vitest";
import app from "../src/server";

test("GET /api/v2/hianime/home", async () => {
  const response = await app.request("/api/v2/hianime/home");
  const data = (await response.json()).data;

  expect(data.spotlightAnimes).not.toEqual([]);
  expect(data.trendingAnimes).not.toEqual([]);
  expect(data.latestEpisodeAnimes).not.toEqual([]);
  expect(data.topUpcomingAnimes).not.toEqual([]);
  expect(data.topAiringAnimes).not.toEqual([]);
  expect(data.mostPopularAnimes).not.toEqual([]);
  expect(data.mostFavoriteAnimes).not.toEqual([]);
  expect(data.latestCompletedAnimes).not.toEqual([]);
  expect(data.genres).not.toEqual([]);

  expect(data.top10Animes.today).not.toEqual([]);
  expect(data.top10Animes.week).not.toEqual([]);
  expect(data.top10Animes.month).not.toEqual([]);
});
