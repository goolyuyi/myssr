const ServerConfig = require("./server-config");
const fs = require('fs-extra');
const controller = require('./controller');
const path = require("path");
const json5 = require('json5');

class Server {
    constructor(option) {
        this.option = option || {};
        this.option.tempConfigPath = path.resolve('./private/__current_config.json');
    }

    async open() {
        let config = await fs.readJson('./private/export.json')
        let template = json5.parse(await fs.readFile('./private/config.json', {encoding: 'utf8'}));

        this.serverConfigs = new ServerConfig(config, template);

        this._currentServerHash = Object.keys(this.serverConfigs._servers)[0];

        this.restart();
    }

    async close() {
        this.ac.abort();
    }

    get list() {
        return this.serverConfigs.list;
    }

    restart() {
        this.ac && this.ac.abort();
        this.ac = new AbortController();

        let p = this.option.tempConfigPath;
        fs.writeJsonSync(p, this.currentServer);
        controller.runner(this.ac.signal, p)
    }

    get currentServer() {
        return this.serverConfigs.config(this._currentServerHash);
    }

    setCurrentServerHash(hash) {
        if (!this.serverConfigs.list[hash]) throw new ReferenceError();
        this._currentServerHash = hash;
        this.restart();
    }
}

module.exports = Server;
