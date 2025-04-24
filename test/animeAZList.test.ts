import { expect, test } from "vitest";
import { HiAnime } from "aniwatch";

const sortOption = "all";
const page = 1;

//test
// npx vitest run animeAZList.test.ts
test(`GET /api/v2/hianime/azlist/${sortOption}?page=${page}`, async () => {
  const hianime = new HiAnime.Scraper();
  const data = await hianime.getAZList(sortOption, page);

  expect(data.animes).not.toEqual([]);
  expect(data.totalPages).toBeGreaterThan(0);
  expect(data.currentPage).toBe(page);
  expect(data.sortOption).toBe(sortOption);
});
