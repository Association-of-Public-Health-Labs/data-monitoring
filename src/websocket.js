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

      console.log(socket.id, server_id)

      if (server_id) {
        connectedServers[server_id] = socket.id;
        socket.on("connectedServer", srv => {
          io.emit("connectedServers", {
            connectedServers,
            osinfo
          }) 
        })
      }

      socket.on("disconnect", async function(socket) {
        const servers = await jsonfile.readFileSync(file);
        servers[server.server_id] = {
          server_id: server.server_id,
          server_name:  server.server_name,
          server_category: server.server_category,
          cpu: server.cpu,
          ram: server.ram,
          sqlagent: server.sqlagent,
          isConnected: false,
          isDisacommsOn: server.isDisacommsOn,
          updatedAt: updatedAt
        }
        jsonfile.writeFile(file, servers, function (err) {
          if (err) console.error(err)
        })
      })

      socket.on("osinfo", async function (server) {
        const servers = await jsonfile.readFileSync(file);
        var updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
        servers[server.server_id] = {
          server_id: server.server_id,
          server_name:  server.server_name,
          server_category: server.server_category,
          cpu: server.cpu,
          ram: server.ram,
          sqlagent: server.sqlagent,
          isConnected: true,
          isDisacommsOn: server.isDisacommsOn,
          updatedAt: updatedAt
        }
        await jsonfile.writeFile(file, JSON.stringify(servers), function (err) {
          if (err) console.error(err)
        })
        console.log("Servers: ", servers);
      });



    });
  },
};
