import {test, expect} from '@playwright/test';

test.describe('Tricky Selectors', () => {
    test.beforeEach(async({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/tables', { waitUntil: 'domcontentloaded' })
    })

    // Count row of table
    test('table1 has 4 rows', async({ page }) => {
        await expect(page.locator('#table1 tbody tr')).toHaveCount(4)
    })

    // Select correct text (filter)
    test('find row by lastname', async({ page }) => {
        const row = page.locator('#table1 tbody tr').filter({ hasText: 'Bach'})
        await expect(row).toHaveCount(1)
        await expect(row).toBeVisible()
    })

    // Check lastname of nth row
    test('find last name of nth row', async({ page }) => {
        const firstRow = page.locator('#table1 tbody tr').nth(0)
        await expect(firstRow).toContainText('Smith')
    })

    test('validate url', async({ page }) => {
        const row = page.locator('#table1 tbody tr').filter({ hasText: 'Bach'})
        await row.getByRole('link', {name: 'edit'}).click()
        await expect(page).toHaveURL(/#edit/)
    })
})