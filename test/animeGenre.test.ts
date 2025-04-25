import { expect, test } from "vitest";
import app from "../src/server";

const genreName = "shounen";
const page = 2;

// npx vitest run animeGenre.test.ts
test(`GET /api/v2/hianime/genre/${genreName}?page=${page}`, async () => {
    const response = await app.request(
        `/api/v2/hianime/genre/${genreName}?page=${page}`
    );
    const data = (await response.json()).data;

    expect(data.animes).not.toEqual([]);
    expect(data.genres).not.toEqual([]);
    expect(data.topAiringAnimes).not.toEqual([]);
});
