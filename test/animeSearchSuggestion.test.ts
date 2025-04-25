import { expect, test } from "vitest";
import app from "../src/server";

const query = "one piece";

// npx vitest run animeSearchSuggestion.test.ts
test(`GET /api/v2/hianime/search/suggestion?q=${query}`, async () => {
  const response = await app.request(`/api/v2/hianime/search/suggestion?q=${query}`);
  const data = (await response.json()).data;

  expect(data.suggestions).not.toEqual([]);
});
