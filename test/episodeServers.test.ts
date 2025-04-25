import { expect, test } from "vitest";
import app from "../src/server";

const animeEpisodeId = "steinsgate-0-92?ep=2055";

// npx vitest run episodeServers.test.ts
test(`GET /api/v2/hianime/episode/servers?animeEpisodeId=${animeEpisodeId}`, async () => {
    const response = await app.request(
        `/api/v2/hianime/episode/servers?animeEpisodeId=${animeEpisodeId}`
    );
    const data = (await response.json()).data;

    expect(data.episodeId).not.toEqual(null);
    expect(data.episodeNo).not.toEqual(0);
    expect(data.sub).not.toEqual([]);
    expect(data.dub).not.toEqual([]);
});
