import { expect, test } from "vitest";
import app from "../src/server";

const sortOption = "all";
const page = 1;

//test
// npx vitest run animeAZList.test.ts
test(`GET /api/v2/hianime/azlist/${sortOption}?page=${page}`, async () => {
  const response = await app.request(`/api/v2/hianime/azlist/${sortOption}?page=${page}`);
  const data = (await response.json()).data;
  
  expect(data.animes).not.toEqual([]);
  expect(data.totalPages).toBeGreaterThan(0);
  expect(data.currentPage).toBe(page);
  expect(data.sortOption).toBe(sortOption);
});
