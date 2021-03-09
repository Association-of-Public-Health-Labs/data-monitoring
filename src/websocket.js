const socketio = require("socket.io");
const fs = require("fs");
const jsonfile = require("jsonfile");
const moment = require("moment");
const path = require("path")
const ServerController = require("./controllers/ServerController")

const file = path.resolve(__dirname, "storage/hosts.json");

console.log(file)

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
        await ServerController.update_usage(server_id, {
          is_connected: false,
        })
        // console.log("server disconnected")
        // var servers = {};

        // jsonfile.readFile(file, function (err, obj) {
        //   if (err) console.error(err)
        //   servers = obj;
        // });

        // var updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");

        // servers[server_id] = {
        //   ...servers[server_id],
        //   isConnected: false,
        //   updatedAt: updatedAt
        // }

        // await fs.writeFileSync(file, JSON.stringify(servers, null, 2), function (err) {
        //   if (err) console.error(err)
        // })
      })

      socket.on("osinfo", async function (server) {
        // var servers = {};

        // jsonfile.readFile(file, function (err, obj) {
        //   if (err) console.error(err)
        //   servers = obj;
        // })
        // var updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
        // servers[server.server_id] = {
          // server_id: server.server_id,
          // server_name:  server.server_name,
          // server_category: server.server_category,
          // cpu: server.cpu,
          // ram: server.ram,
          // sqlagent: server.sqlagent == "Running." ? true : false,
          // isConnected: true,
          // isDisacommsOn: server.isDisacommsOn,
          // diskFree: server.diskFree,
        //   updatedAt: updatedAt
        // }
        // await fs.writeFileSync(file, JSON.stringify(servers, null, 2), function (err) {
        //   if (err) console.error(err)
        // })

        await ServerController.update_usage(server_id, {
          cpu_usage: server.cpu,
          ram_usage: server.ram,
          sqlagent: server.sqlagent == "Running." ? true : false,
          is_connected: true,
          is_disacomms_on: server.isDisacommsOn,
        })

      });



    });
  },
};
