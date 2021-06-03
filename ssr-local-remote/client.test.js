const got = require('got');
const createClient = require('./client');

test('list', async () => {
    let {app, server} = createClient();
    let res = got.get("http://localhost:3000/list");
    let lst = await res.json()
    console.log(lst);
    expect(Object.keys(lst).length).toBeGreaterThanOrEqual(1);
    server.close();
})

test('get', async () => {
    let {app, server} = createClient();
    let res = got.get("http://localhost:3000/list");
    let lst = await res.json()

    let res2 = got.put("http://localhost:3000/current", {json: {a: 1}});
    await expect(() => res2.json()).rejects.toThrow();

    let key = Object.keys(lst)[0];
    res2 = got.put("http://localhost:3000/current", {json: {hash: key}});
    let cur = await res2.json();
    expect(cur.server === lst[key].server).toBeTruthy();
    server.close();
})

test('error', async () => {
    let {app, server} = createClient();
    let res = got.get("http://localhost:3000/404");

    await expect(async () => {
        await res
    }).rejects.toThrowError('Response code 404 (Not Found)')
    server.close();
})
