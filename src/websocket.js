const socketio = require("socket.io");
const fs = require("fs");
const jsonfile = require("jsonfile");
const moment = require("moment");
const path = require("path")
const ServerController = require("./controllers/ServerController")

// const file = path.resolve(__dirname, "storage/hosts.json");

// console.log(file)

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
      
      await ServerController.update_usage(server_id, {
        is_connected: true,
      })

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
        await ServerController.update_usage(server_id, {
          is_connected: false,
        })

        io.emit("ondisconnect", {
          server_id: server_id,
          is_connected: false
        });
      })

      socket.on("osinfo", async function (server) {
        io.emit("osinfo", {...server, is_connected: true})
        console.log(server)
      });



    });
  },
};
