import { test, expect } from "playwright/test";

const baseURL = process.env.BASE_URL;
test.use({ baseURL });

test("seller application form renders its fields", async ({ page }) => {
  await page.goto("/create-store");

  await expect(page.getByRole("heading", { name: "Add Your Store" })).toBeVisible();
  await expect(page.getByPlaceholder("Enter your store username")).toBeVisible();
  await expect(page.getByPlaceholder("Enter your store name")).toBeVisible();
  await expect(page.getByPlaceholder("Enter your store description")).toBeVisible();
  await expect(page.getByPlaceholder("Enter your store email")).toBeVisible();
  await expect(page.getByPlaceholder("Enter your store contact number")).toBeVisible();
  await expect(page.getByPlaceholder("Enter your store address")).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
});

test("seller application email rejects a malformed address natively", async ({ page }) => {
  await page.goto("/create-store");

  const email = page.getByPlaceholder("Enter your store email");
  await expect(email).toHaveAttribute("type", "email");
  await email.fill("not-an-email");

  const validity = await email.evaluate((element) => ({
    typeMismatch: element.validity.typeMismatch,
    valid: element.checkValidity(),
  }));
  expect(validity).toEqual({ typeMismatch: true, valid: false });
});
