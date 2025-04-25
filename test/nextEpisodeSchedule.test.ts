import { expect, test } from "vitest";
import app from "../src/server";

const animeId = "one-piece-100";

// npx vitest run nextEpisodeSchedule.test.ts
test("returns anime next episode schedule", async () => {
    const response = await app.request(`/api/v2/hianime/anime/${animeId}/next-episode-schedule`);
    const data = (await response.json()).data;

    expect(data.airingISOTimestamp).not.toEqual(null);
    expect(data.airingTimestamp).not.toEqual(null);
    expect(data.secondsUntilAiring).not.toEqual(null);
});
