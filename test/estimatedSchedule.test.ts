import { expect, test } from "vitest";
import app from "../src/server";

const padZero = (num: number) => (num < 10 ? `0${num}` : num.toString());

const d = new Date();
const date = `${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(
  d.getDate()
)}`;

// npx vitest run estimatedSchedule.test.ts
test(`GET /api/v2/hianime/schedule?date=${date}`, async () => {
  const response = await app.request(`/api/v2/hianime/schedule?date=${date}`);
  const data = (await response.json()).data;

  expect(data.scheduledAnimes).not.toEqual([]);
});
