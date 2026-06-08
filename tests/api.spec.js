import { test, expect } from '../fixtures/test.js'

// With Fixtures
// Real API test (Integration Test)
test ('Get post', async({ apiContext }) => {
    const res = await apiContext.get('posts/1')
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.userId).toBe(1)
    expect(body.id).toBe(1)
    expect(body.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
    expect(body.title).toEqual(expect.any(String))

    // Schema / Shape Validation
    expect(body).toMatchObject({
        id: 1,
        userId: 1
    })
    expect(body).toEqual(expect.objectContaining({           
        id: expect.any(Number),
        title: expect.any(String),
    }))
})

test ('Post new thread', async({ apiContext }) => {
    const res = await apiContext.post('/posts', {
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

test ('chained: list → item', async({ apiContext }) => {
    const listRes = await apiContext.get('/posts')
    const list = await listRes.json()

    const firstId = list[0].id

    const itemRes = await apiContext.get(`/posts/${firstId}`)
    expect(itemRes.status()).toBe(200)

    const item = await itemRes.json()
    expect(item.id).toBe(firstId)
})

test ('Put updates a post - full update', async({ apiContext }) => {
    const res = await apiContext.put('/posts/1', {
        data: {
            id: 1,
            title: 'updated',
            body: 'new body',
            userId: 2
        }
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.title).toBe('updated')
})

test ('Patch- Partial update', async({ apiContext }) => {
    const res = await apiContext.patch('posts/1', {
        data: {
            title: 'patch - updated'
        }
    })

    expect(res.status()).toBe(200)

    const body = await res.json()
    expect(body.title).toBe('patch - updated')
})

test ('Delete Post', async({ apiContext }) => {
    const res = await apiContext.delete('posts/1')
    expect(res.status()).toBe(200)
})

test ('Get nonexistent post - 404', async({ apiContext }) => {
    const res = await apiContext.get('posts/101')
    expect(res.status()).toBe(404)
    expect(res.ok()).toBeFalsy()
})
// Without Fixtures

// // Real API test (Integration Test)
// test ('Get post - w/o fixtures', async({ request }) => {
//     const res = await request.get('https://jsonplaceholder.typicode.com/posts/1')
//     expect(res.status()).toBe(200)
//     const body = await res.json()
//     expect(body.userId).toBe(1)
//     expect(body.id).toBe(1)
//     expect(body.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
//     expect(body.title).toEqual(expect.any(String))
// })

// test ('Post new thread - w/o fixtures', async({ request }) => {
//     const res = await request.post('https://jsonplaceholder.typicode.com/posts', {
//         data: {
//             title: 'prep',
//             body: 'hello, world',
//             userId: 11
//         }
//     })

//     expect(res.status()).toBe(201)
    
//     const body = await res.json()
//     expect(body.userId).toBe(11)
//     expect(body.title).toBe('prep')
// })

// test ('chained: list → item - w/o fixtures', async({ request }) => {
//     const listRes = await request.get('https://jsonplaceholder.typicode.com/posts')
//     const list = await listRes.json()

//     const firstId = list[0].id

//     const itemRes = await request.get(`https://jsonplaceholder.typicode.com/posts/${firstId}`)
//     expect(itemRes.status()).toBe(200)

//     const item = await itemRes.json()
//     expect(item.id).toBe(firstId)
// })