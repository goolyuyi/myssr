test('open/close', async () => {
    const Server = require('./server');
    let server = new Server();
    expect(async () => {
        await server.open();
        await server.close();
    }).not.toThrow();
})
test('get server', async () => {
    const Server = require('./server');
    let server = new Server();
    await server.open();
    console.log(server.currentServer);
    await server.close();
})

test('set server', async () => {
    const Server = require('./server');
    let server = new Server();
    await server.open();
    let l = server.list;
    server.currentServer = Object.keys(l)[0];
    await new Promise(resolve => setTimeout(resolve, 2000))
    await server.close();
})
