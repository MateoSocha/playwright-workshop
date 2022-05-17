const { test, expect } = require('@playwright/test');
const productName = "Colored Parrot Cushion"

test.describe.only("Storefront", () => {
    test.use({ baseURL: 'https://demo.saleor.io/', });
    // test.describe.configure({ mode: 'parallel' });
    test("Should be able to search product", async({ page }) => {
        // test.fixme();
        await page.goto('default-channel/en-US/search');
        await expect(page).toHaveURL('default-channel/en-US/search');
        await page.locator('input').fill(productName);
        await expect(page.locator('text='+productName)).toBeVisible();
    });

    test("Should be able to open product cart", async({ page }) => {
        // test.fail();
        await page.goto('/');
        await page.locator('li > a').first().click();
        await expect(page).toHaveURL('/default-channel/en-US/products/colored-parrot-cushion');
        await expect(page.locator('h1')).toHaveText(productName);
    });

    test.skip("Visual comparisons", async({ page }) => {
        await page.goto('default-channel/en-US/search');
        await expect(page).toHaveScreenshot('homepage.png');
    });
});