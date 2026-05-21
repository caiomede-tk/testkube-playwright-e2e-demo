import { expect, test } from "@playwright/test";

test.describe("Filter Todos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    const input = page.getByPlaceholder("What needs to be done?");
    await input.fill("Active todo");
    await input.press("Enter");
    await input.fill("Completed todo");
    await input.press("Enter");
    // Mark second as completed
    await page.getByTestId("todo-item").nth(1).getByRole("checkbox").check();
  });

  test("should filter active todos", async ({ page }) => {
    await page.getByRole("link", { name: "Active" }).click();

    const todoItems = page.getByTestId("todo-item");
    await expect(todoItems).toHaveCount(1);
    await expect(todoItems.first()).toContainText("Active todo");
  });

  test("should filter completed todos", async ({ page }) => {
    await page.getByRole("link", { name: "Completed" }).click();

    const todoItems = page.getByTestId("todo-item");
    await expect(todoItems).toHaveCount(1);
    await expect(todoItems.first()).toContainText("Completed todo");
  });
});
