const express = require('express')
const Server = require("./server");
const app = express()
const port = process.env.SERVER_PORT || 3000
const logger = require('morgan');

let server = new Server();
app.use(logger('tiny'));
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.get('/list', (req, res) => {
    res.json(server.list);
})

app.put('/current', (req, res) => {
    server.setCurrentServerHash(req.body.hash);
    res.json(server.currentServer)
})

app.get('/current', (req, res) => {
    res.json(server.currentServer)
})

let s = app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`)
    await server.open();
})

module.exports = {server: s, app};
