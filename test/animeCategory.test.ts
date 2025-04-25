import { expect, test } from "vitest";
import app from "../src/server";

const category = "subbed-anime";

// npx vitest run animeCategory.test.ts
test(`GET /api/v2/hianime/category/${category}`, async () => {
  const response = await app.request(`/api/v2/hianime/category/${category}`);
  const data = (await response.json()).data;

  expect(response.status).toEqual(200);
  expect(data.animes).not.toEqual([]);
  expect(data.genres).not.toEqual([]);
  expect(data.top10Animes.today).not.toEqual([]);
  expect(data.top10Animes.week).not.toEqual([]);
  expect(data.top10Animes.month).not.toEqual([]);
});
