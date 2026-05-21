import { expect, test } from "@playwright/test";

test.describe("Delete Todos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    const input = page.getByPlaceholder("What needs to be done?");
    await input.fill("Todo to delete");
    await input.press("Enter");
    await input.fill("Todo to keep");
    await input.press("Enter");
  });

  test("should delete a todo with the X button", async ({ page }) => {
    const firstTodo = page.getByTestId("todo-item").first();
    await firstTodo.hover();
    await firstTodo.getByTestId("todo-item-button").click();

    const todoItems = page.getByTestId("todo-item");
    await expect(todoItems).toHaveCount(1);
    await expect(todoItems.first()).toContainText("Todo to keep");
  });

  test("should clear all completed todos", async ({ page }) => {
    // Complete both
    for (const item of await page.getByTestId("todo-item").all()) {
      await item.getByRole("checkbox").check();
    }

    await page.getByRole("button", { name: "Clear completed" }).click();

    await expect(page.getByTestId("todo-item")).toHaveCount(0);
  });
});
