import { test, expect } from '@playwright/test';

// Real API test (Integration Test)
test ('Get post', async({ request }) => {
    const res = await request.get('https://jsonplaceholder.typicode.com/posts/1')
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.userId).toBe(1)
    expect(body.id).toBe(1)
    expect(body.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
    expect(body.title).toEqual(expect.any(String))
})

test ('Post new thread', async({ request }) => {
    const res = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'prep',
            body: 'hello, world',
            userId: 11
        }
    })

    expect(res.status()).toBe(201)
    
    const body = await res.json()
    expect(body.userId).toBe(11)
    expect(body.title).toBe('prep')
})

test ('chained: list → item', async({ request }) => {
    const listRes = await request.get('https://jsonplaceholder.typicode.com/posts')
    const list = await listRes.json()

    const firstId = list[0].id

    const itemRes = await request.get(`https://jsonplaceholder.typicode.com/posts/${firstId}`)
    expect(itemRes.status()).toBe(200)

    const item = await itemRes.json()
    expect(item.id).toBe(firstId)
})