import { test, expect } from '@playwright/test'

test('mock the fruits API', async({ request, page }) => {
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [{ name: "Mango", id: 99 }]
        await route.fulfill({ json})

    await page.goto()

    await page.goto('https://demo.playwright.dev/api-mocking');

    await expect(page.getByText('Mango')).toBeVisible();   
    })
})