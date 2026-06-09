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
    {scope: 'worker'}],

    seededPosts:  async({ apiContext }, use) => {
        const res = await apiContext.post('/posts', {
            data: {
                title: 'seeded',
                body: 'hybrid',
                userId: 1
            }
        })
        const post = await res.json()

        await use(post)

        await apiContext.delete(`/posts/${post.id}`)
    }
})

export const expect = test.expect;