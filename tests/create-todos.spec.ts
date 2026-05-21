import { expect, test } from "@playwright/test";

test.describe("Create Todos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("should add a new todo", async ({ page }) => {
    await page.getByPlaceholder("What needs to be done?").fill("Buy groceries");
    await page.getByPlaceholder("What needs to be done?").press("Enter");

    const todoItem = page.getByTestId("todo-item");
    await expect(todoItem).toHaveCount(1);
    await expect(todoItem).toContainText("Buy groceries");
  });

  test("should add multiple todos", async ({ page }) => {
    const input = page.getByPlaceholder("What needs to be done?");

    await input.fill("Buy groceries");
    await input.press("Enter");
    await input.fill("Clean the house");
    await input.press("Enter");
    await input.fill("Walk the dog");
    await input.press("Enter");

    const todoItems = page.getByTestId("todo-item");
    await expect(todoItems).toHaveCount(3);
  });

  test("should trim text input", async ({ page }) => {
    await page.getByPlaceholder("What needs to be done?").fill("   Trimmed todo   ");
    await page.getByPlaceholder("What needs to be done?").press("Enter");

    const todoItem = page.getByTestId("todo-item");
    await expect(todoItem).toContainText("Trimmed todo");
  });
});
