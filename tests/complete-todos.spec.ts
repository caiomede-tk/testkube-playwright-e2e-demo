import { expect, test } from "@playwright/test";

test.describe("Complete Todos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    // Seed two todos
    const input = page.getByPlaceholder("What needs to be done?");
    await input.fill("First todo");
    await input.press("Enter");
    await input.fill("Second todo");
    await input.press("Enter");
  });

  test("should mark a todo as completed", async ({ page }) => {
    const firstTodo = page.getByTestId("todo-item").first();
    await firstTodo.getByRole("checkbox").check();

    await expect(firstTodo).toHaveClass(/completed/);
  });

  test("should toggle all todos complete", async ({ page }) => {
    await page.getByLabel("Toggle All Input").check();

    const todoItems = page.getByTestId("todo-item");
    for (const item of await todoItems.all()) {
      await expect(item).toHaveClass(/completed/);
    }
  });
});
