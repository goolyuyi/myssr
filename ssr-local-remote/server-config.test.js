test('list', async () => {
    const ServerConfigs = require('./server-config');
    const fs = require('fs-extra');
    let c = new ServerConfigs(fs.readJsonSync('./export.json'));
    let res = c.list;

    console.log(res);
    expect(Object.values(res).length).toBeGreaterThanOrEqual(1);
})

test('genConfig', async () => {
    const ServerConfigs = require('./server-config');
    const fs = require('fs-extra');
    let c = new ServerConfigs(fs.readJsonSync('./export.json'), {a: 1});
    let res = c.list;

    expect(() => c.config('aaaaa')).toThrow();
    expect(c.config(Object.keys(res)[0]).a).toBe(1);
})

