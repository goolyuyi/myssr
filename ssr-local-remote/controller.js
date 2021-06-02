const child_process = require('child_process');
const path = require('path');

function runner(signal, configPath) {
    let shadowsocksrPath = path.resolve(path.join("../", "shadowsocksr"));
    let params = configPath ? ['-c', configPath] : [];

    let ssr = child_process.spawn("python3", [
            path.join(shadowsocksrPath, "shadowsocks/local.py"),
            ...params
        ],
        {
            signal,
            cwd: shadowsocksrPath
        })
    ssr.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ssr.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    ssr.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    ssr.on('error', (err) => {
        if (err.name !== 'AbortError')
            console.trace(err)
        else
            console.log(err.message)
    })
}

module.exports = {runner}
