import { test, expect } from "@playwright/test";

// Shared form input values
const fillForm = async (page) => {
  await page.fill("textarea[name='favoriteMovie']", "The Matrix");
  await page.fill("input[name='moodType']", "New");
  await page.fill("input[name='tonePreference']", "Fun");
};

test.describe("SoloPage Form & Result Testing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/solo");
  });

  test("should use MOCK data and display results", async ({ page }) => {
    await fillForm(page);
    await page.getByRole("button", { name: /use mock data/i }).click();

    // Result shows
    await expect(page.locator("h3")).toContainText(/\w+ \(\d{4}\)/);

    // Test navigation
    const next = page.getByRole("button", { name: /next movie/i });
    const prev = page.getByRole("button", { name: /previous movie/i });

    if (await next.isVisible()) {
      await next.click();
      await expect(prev).toBeVisible();
      await prev.click(); // back
    }

    // Reset to MovieForm
    await page.getByRole("button", { name: /reset/i }).click();
    await expect(page.locator("textarea[name='favoriteMovie']")).toBeVisible();
  });

  test("should call Ask GPT and display results", async ({ page }) => {
    // Intercept GPT response with mock
    await page.route("**/api/ask", async (route) => {
      const fakeGPT = [
        {
          title: "Inception",
          releaseYear: 2010,
          content: "Inception (2h 28min): A mind-bending thriller.",
        },
        {
          title: "The Prestige",
          releaseYear: 2006,
          content:
            "The Prestige (2h 10min): Rival magicians duel in Victorian London.",
        },
      ];
      route.fulfill({
        status: 200,
        body: JSON.stringify({ result: JSON.stringify(fakeGPT) }),
        headers: { "Content-Type": "application/json" },
      });
    });

    await fillForm(page);
    await page.getByRole("button", { name: /ask gpt/i }).click();

    await expect(page.locator("h3")).toContainText("Inception");
  });

  test("should call embedding search and show results", async ({ page }) => {
    // Intercept embedding search
    await page.route("**/api/embedding-search", async (route) => {
      const result = {
        results: [
          {
            title: "Arrival",
            releaseYear: 2016,
            content:
              "Arrival (1h 56min): A linguist attempts to communicate with aliens.",
          },
          {
            title: "Blade Runner 2049",
            releaseYear: 2017,
            content:
              "Blade Runner 2049 (2h 44min): A sequel to the classic sci-fi.",
          },
        ],
      };
      route.fulfill({
        status: 200,
        body: JSON.stringify(result),
        headers: { "Content-Type": "application/json" },
      });
    });

    await fillForm(page);
    await page.getByRole("button", { name: /check your database/i }).click();

    await expect(page.locator("h3")).toContainText("Arrival");
  });
});
