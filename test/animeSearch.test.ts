import { expect, test } from "vitest";
import { HiAnime } from "aniwatch";
import app from "../src/server";

const query = "monster";
const page = 1;
const filter: HiAnime.SearchFilters = {
  genres: "seinen,psychological",
};

// npx vitest run animeSearch.test.ts
test(`GET /api/v2/hianime/search?q=${query}&page=${page}&genres=${filter.genres}`, async () => {
  const response = await app.request(
    `/api/v2/hianime/search?q=${query}&page=${page}&genres=${filter.genres}`
  );
  const data = (await response.json()).data;

  expect(data.animes).not.toEqual([]);
  expect(data.mostPopularAnimes).not.toEqual([]);
});
