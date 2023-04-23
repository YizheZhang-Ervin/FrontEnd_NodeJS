const utf8 = require("utf8");
const SSHClient = require("ssh2").Client;
const Server = require("ws").Server;
const wss = new Server({
    port: 2000
});

const serverInfo = {
    host: '192.168.137.10',
    port: 22,
    username: 'ervin',
    password: 'xxx'
};

function createSocket(ws) {
    const ssh = new SSHClient();
    ssh
        .on("ready", function () {
            ws.send("\r\n*** SSH CONNECTION ESTABLISHED ***\r\n");
            ssh.shell(function (err, stream) {
                if (err) {
                    return ws.emit("\r\n*** SSH SHELL ERROR: " + err.message + " ***\r\n");
                }
                ws.on("message", function (data) {
                    stream.write(data);
                });
                ws.on("close", function () {
                    console.log("close websocket。");
                    ssh.end();
                });
                stream
                    .on("data", function (d) {
                        let data = utf8.decode(d.toString("binary"));
                        ws.send(data);
                    })
                    .on("close", function () {
                        ssh.end();
                    });
            });
        })
        .on("close", function () {
            ws.close();
        })
        .on("error", function (err) {
            console.log("\r\n*** SSH CONNECTION ERROR: " + err.message + " ***\r\n");
            ws.close();
        })
        .connect(serverInfo);
}

wss.on("connection", function (ws) {
    createSocket(ws);
});