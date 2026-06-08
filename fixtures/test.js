import { test as base, request } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage.js'

export const test = base.extend({
    loginPage: async({ page }, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await use(loginPage)
    },

    apiContext: [async({ }, use) => {
        const ctx = await request.newContext({  
            baseURL: 'https://jsonplaceholder.typicode.com',
            extraHTTPHeaders: { 'Content-Type': 'application/json' },
        })
        await use(ctx);
        await ctx.dispose();
    },
    {scope: 'worker'}]
})

export const expect = test.expect;