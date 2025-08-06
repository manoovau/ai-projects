// tests/navbar.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Navbar component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test('should display the "MovieMood" title', async ({ page }) => {
    const title = await page.getByRole("heading", { name: /moviemood/i });
    await expect(title).toBeVisible();
  });

  test('should have a link to "Movie Recommendation (Solo)"', async ({
    page,
  }) => {
    const soloLink = page.getByRole("link", {
      name: /movie recommendation \(solo\)/i,
    });
    await expect(soloLink).toHaveAttribute("href", "/solo");
  });

  test('should have a link to "Movie Recommendation (Group)"', async ({
    page,
  }) => {
    const groupLink = page.getByRole("link", {
      name: /movie recommendation \(group\)/i,
    });
    await expect(groupLink).toHaveAttribute("href", "/group");
  });

  test('should have an "Admin" link pointing to /admin', async ({ page }) => {
    const adminLink = page.getByRole("link", { name: /admin/i });
    await expect(adminLink).toHaveAttribute("href", "/admin");
  });
});
