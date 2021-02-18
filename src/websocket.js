const socketio = require("socket.io");
const fs = require("fs");
const jsonfile = require("jsonfile");
const moment = require("moment");

const file = "hosts.json";

module.exports = {
  createWebSocketConnection(server) {
    const io = socketio(server, {
      cors: {
        origin: true,
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
    });

    io.on("connection", async function (socket) {
      const { server_id } = await socket.handshake.query
      const connectedServers = [];
      const osinfo = [];

      // fs.writeFile("hosts.json", JSON.stringify([{server_id: server_id}], null, 2), error => {
      //   if(error) throw new Error('something went wrong!')
      // })

      console.log(socket.id, server_id)

      if (server_id) {
        connectedServers[server_id] = socket.id;
        // io.emit("connectedServers", {
        //   connectedServers,
        //   osinfo
        // }) 
        socket.on("connectedServer", srv => {
          io.emit("connectedServers", {
            connectedServers,
            osinfo
          }) 
        })
      }

      socket.on("disconnect", async function(socket) {
        const servers = await jsonfile.readFileSync(file);
        servers[server_id] = null
        jsonfile.writeFile(file, servers, function (err) {
          if (err) console.error(err)
        })
      })

      socket.on("osinfo", async function (server) {
        const servers = await jsonfile.readFileSync(file);
        var updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
        servers[server.server_id] = {
          server_id: server.server_id,
          cpu: server.cpu,
          ram: server.ram,
          sqlagent: server.sqlagent,
          updatedAt: updatedAt
        }
        console.log(servers);
        jsonfile.writeFile(file, servers, function (err) {
          if (err) console.error(err)
        })
      });

      var interval = 1000;

      setInterval(async function () {
        const servers = await jsonfile.readFileSync(file);
        io.emit("servers", {
          servers,
        })
      }, interval);


    });
  },
};
