import { test, expect } from "@playwright/test";

const fillMovieForm = async (page: any) => {
  await page.fill('textarea[name="favoriteMovie"]', "The Matrix");
  await page.fill('input[name="moodType"]', "New");
  await page.fill('input[name="tonePreference"]', "Fun");
};

test.describe("GroupPage end‑to‑end", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/group");
  });

  test("submits group limits and uses mock flow", async ({ page }) => {
    await page.fill('input[name="howManyPeople"]', "1");
    await page.fill('input[name="time"]', "2h");
    await page.getByRole("button", { name: /start/i }).click();

    await fillMovieForm(page);
    await page
      .getByRole("button", { name: /choose recommendation engine/i })
      .click();
    await page.getByRole("button", { name: /use mock data/i }).click();

    await expect(page.locator("h3")).toContainText(/\w+ \(\d{4}\)/);

    const next = page.getByRole("button", { name: /next movie/i });
    const prev = page.getByRole("button", { name: /previous movie/i });

    if (await next.isVisible()) {
      await next.click();
      await expect(prev).toBeVisible();
      await prev.click();
    }

    await page.getByRole("button", { name: /reset/i }).click();
    // Back to limits form
    await expect(page.getByLabel(/how many people/i)).toHaveValue("0");
    await expect(page.getByLabel(/how much time/i)).toHaveValue("");
  });

  test("ask GPT flow works and displays result", async ({ page }) => {
    await page.fill('input[name="howManyPeople"]', "1");
    await page.fill('input[name="time"]', "2h");
    await page.getByRole("button", { name: /start/i }).click();

    await page.route("**/api/ask", (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          result: JSON.stringify([
            {
              title: "Inception",
              releaseYear: 2010,
              content: "Mind‑bending thriller.",
            },
          ]),
        }),
        headers: { "Content-Type": "application/json" },
      })
    );

    await fillMovieForm(page);

    await page
      .getByRole("button", { name: /choose recommendation engine/i })
      .click();
    await page.getByRole("button", { name: /ask gpt/i }).click();

    await expect(page.locator("h3")).toContainText("Inception");
  });

  test("database flow works and displays result", async ({ page }) => {
    await page.fill('input[name="howManyPeople"]', "1");
    await page.fill('input[name="time"]', "2h");
    await page.getByRole("button", { name: /start/i }).click();

    await page.route("**/api/embedding-search", (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          results: [
            {
              title: "Arrival",
              releaseYear: 2016,
              content: "Communication with aliens.",
            },
          ],
        }),
        headers: { "Content-Type": "application/json" },
      })
    );

    await fillMovieForm(page);
    await page
      .getByRole("button", { name: /choose recommendation engine/i })
      .click();
    await page.getByRole("button", { name: /check your database/i }).click();

    await expect(page.locator("h3")).toContainText("Arrival");
  });
});
