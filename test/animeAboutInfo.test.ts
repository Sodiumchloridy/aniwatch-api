import app from "../src/server";
import { expect, test } from "vitest";

const animeId = "steinsgate-3";

// npx vitest run animeAboutInfo.test.ts
test(`GET /api/v2/hianime/anime/${animeId}`, async () => {
    const response = await app.request(`/api/v2/hianime/anime/${animeId}`);
    const data = (await response.json()).data;

    process.stdout.write(`Response data: ${JSON.stringify(data)}\n`);

    expect(response.status).toEqual(200);
    expect(data.anime.info.name).not.toEqual(null);
    expect(data.recommendedAnimes).not.toEqual([]);
    expect(data.mostPopularAnimes).not.toEqual([]);
    expect(Object.keys(data.anime.moreInfo)).not.toEqual([]);
});
