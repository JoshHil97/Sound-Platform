import { test, expect } from "@playwright/test";

const routes: { path: string; heading: string | RegExp }[] = [
  { path: "/", heading: /Up Next.*Sound Lab/i },
  { path: "/academy", heading: "Sound Academy Pathways" },
  { path: "/sound-lab", heading: "Listen first" },
  { path: "/service-mode", heading: "I am serving today" },
  { path: "/certifications", heading: "Service Experience" },
  { path: "/digital-twin", heading: /./ },
  { path: "/troubleshooting", heading: /./ },
  { path: "/x32-console", heading: /./ },
  { path: "/dante", heading: /./ },
  { path: "/logic-stream", heading: /./ },
  { path: "/equipment", heading: /./ },
  { path: "/sops", heading: /./ },
  { path: "/visuals", heading: /./ },
  { path: "/signal-flow", heading: /./ },
  { path: "/practical-training", heading: /./ },
  { path: "/service-logs", heading: /./ },
  { path: "/admin", heading: /./ }
];

for (const route of routes) {
  test(`${route.path} renders without console errors`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });
    page.on("pageerror", (err) => {
      consoleErrors.push(err.message);
    });

    const response = await page.goto(route.path);
    expect(response?.status(), `${route.path} should return a successful status`).toBeLessThan(400);

    await expect(page.locator("main").getByText(route.heading).first()).toBeVisible();

    expect(consoleErrors, `${route.path} should not log console errors`).toEqual([]);
  });
}

test("primary navigation lets a user reach the Academy from the dashboard", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: /academy/i }).first().click();
  await expect(page).toHaveURL(/\/academy/);
  await expect(page.getByRole("heading", { name: "Sound Academy Pathways" })).toBeVisible();
});
