const _ = require('lodash');
const hash = require('object-hash');

class ServerConfig {
    constructor(configs, template) {
        this._rawJson = configs
        this._template = template
        this._servers = {}
        configs.configs.forEach(i => {
            let v = _.omit(i, ['hash', 'enable']);
            let key = hash(v)
            this._servers[key] = v;
        })
    }

    config(hash) {
        if (!(hash in this._servers)) throw new ReferenceError();
        return Object.assign({}, this._template, this._servers[hash]);
    }

    get list() {
        if (!this._list) {
            this._list = Object.assign(this._servers);
            for (let k in this._list) {
                this._list[k] = _.omit(this._list[k], ["password"])
            }
        }
        return this._list;
    }
}

module.exports = ServerConfig;
