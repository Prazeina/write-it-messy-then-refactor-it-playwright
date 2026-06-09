import {test, expect} from '@playwright/test';

const authFile = 'playwright/.auth/saucedemo.json'

test.describe.serial('storagestate demo', () => {
    test('1. Login and save state', async({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        await page.locator('.form_group #user-name').fill('standard_user')
        await page.locator('.form_group #password').fill('secret_sauce')
        await page.locator('[data-test="login-button"]').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

        await page.context().storageState({ path: authFile })
    })

    test('2. REUSE state - login skip', async({ browser }) => {
        const context = await browser.newContext({ storageState: authFile })
        const page = await context.newPage()

        await page.goto('https://www.saucedemo.com/inventory.html');   //w/o login you are straight to the inventory page
        await expect(page.locator('.title')).toHaveText('Products');   
        await context.close();
    })
})
