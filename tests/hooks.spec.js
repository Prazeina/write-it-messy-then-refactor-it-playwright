import { LoginPage } from '../pages/LoginPage.js'
import { test, expect } from '../fixtures/test.js'
import users from '../test-data/users.json'

test.describe('Login with hooks', () => {
    let loginPage;

    test.beforeEach(async({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto()
    })
    // Data Driven Testing
    for (const user of users){
        test(`Login - ${user.name}`, async({ page }) => {
            await loginPage.login(user.username, user.password)

            if (user.expected === 'success'){
                await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/')
                await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible()
                await expect(page.getByText('Logged In Successfully')).toBeVisible()
                await expect(page.getByRole('link', {name: 'Log out'})).toBeVisible()
            } else{
                await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/')
                await expect(loginPage.errorMessage).toContainText(user.error);
            }
        })
    }

    test.afterEach(async ({}, testInfo) => {     // har test PACHI
      console.log(`${testInfo.title} → ${testInfo.status}`);
    });
})