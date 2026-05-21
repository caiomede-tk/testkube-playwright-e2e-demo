import { expect, test } from "@playwright/test";

test.describe("Edit Todos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    const input = page.getByPlaceholder("What needs to be done?");
    await input.fill("Original todo");
    await input.press("Enter");
  });

  test("should edit a todo via double-click", async ({ page }) => {
    const todoItem = page.getByTestId("todo-item").first();
    await todoItem.getByText("Original todo").dblclick();

    const editInput = todoItem.getByRole("textbox");
    await editInput.fill("Edited todo");
    await editInput.press("Enter");

    await expect(todoItem).toContainText("Edited todo");
  });

  test("should show item count in footer", async ({ page }) => {
    await expect(page.getByText("1 item left!")).toBeVisible();

    const input = page.getByPlaceholder("What needs to be done?");
    await input.fill("Second todo");
    await input.press("Enter");

    await expect(page.getByText("2 items left!")).toBeVisible();
  });
});
