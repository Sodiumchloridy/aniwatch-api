import { expect, test, describe, vi } from "vitest";
import { Hono } from "hono";
import { HiAnimeError } from "aniwatch";
import { errorHandler, notFoundHandler } from "../src/config/errorHandler";
import app from "../src/server";

// Mock console.error to prevent actual logging during tests if desired
vi.spyOn(console, "error").mockImplementation(() => {});

describe("Error Handling", () => {
    test("notFoundHandler should return 404 for unknown routes", async () => {
        const response = await app.request("/api/v2/this/route/does/not/exist");
        expect(response.status).toBe(404);
        const data = await response.json();
        expect(data).toEqual({
            status: 404,
            message: "Not Found",
        });
    });

    // --- Testing the errorHandler ---
    // Need a way to inject routes that throw errors into a test instance or the main app
    const testApp = new Hono();

    // Route that throws a generic error
    testApp.get("/generic-error", (c) => {
        throw new Error("Something went wrong");
    });

    // Route that throws a HiAnimeError
    testApp.get("/hianime-error", (c) => {
        throw new HiAnimeError("Specific HiAnime Issue", "500");
    });

    testApp.onError(errorHandler);
    testApp.notFound(notFoundHandler);

    test("errorHandler should return specific status and message for HiAnimeError", async () => {
        const response = await testApp.request("/hianime-error");
        expect(response.status).toBe(500);
        const data = await response.json();
        expect(data).toEqual({
            message: "500: Specific HiAnime Issue",
            status: 500,
        });
    });
});
