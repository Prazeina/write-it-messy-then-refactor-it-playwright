import { test, expect } from '../fixtures/test.js'
import { LoginPage } from '../pages/LoginPage.js'
import users from '../test-data/users.json'

// Data Driven Testing
for (const user of users){
    test(`Login - ${user.name}`, async({ page, loginPage }) => {
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

// Without using fixtures
test('Valid login credential - w/o fixtures', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto()

    await loginPage.login('student', 'Password123')

    // Assertions
    await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/')
    await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible()
    await expect(page.getByText('Logged In Successfully')).toBeVisible()
    await expect(page.getByRole('link', {name: 'Log out'})).toBeVisible()
})

test('Invalid login credential - w/o fixtures', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto()

    await loginPage.login('incorrectUser', 'Password123')

    // Assertions
    await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/')
    await expect(loginPage.errorMessage).toContainText('Your username is invalid!')
})

// Using Fixtures
test('Valid login credential', async({page, loginPage}) => {
    await loginPage.login('student', 'Password123')

    // Assertions
    await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/')
    await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible()
    await expect(page.getByText('Logged In Successfully')).toBeVisible()
    await expect(page.getByRole('link', {name: 'Log out'})).toBeVisible()
})

test('Invalid login credential', async({page, loginPage}) => {
    await loginPage.login('incorrectUser', 'Password123')

    // Assertions
    await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/')
    await expect(loginPage.errorMessage).toContainText('Your username is invalid!')
})