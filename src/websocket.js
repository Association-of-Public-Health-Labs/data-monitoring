const socketio = require("socket.io");

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

      socket.on("disconnect", socket => {
        connectedServers[server_id] = null;
        osinfo[server_id] = null
        io.emit("connectedServers", {
          connectedServers,
          osinfo
        })
      })

      socket.on("osinfo", function (server) {
        osinfo[server.server_id] = {
          server_id: server.server_id,
          cpu: server.cpu,
          ram: server.ram,
          sqlagent: server.sqlagent,
        }
      });

      var interval = 1000;

      // setInterval(async function () {
      //   io.emit("servers", {
      //     connectedServers,
      //     osinfo
      //   })
      // }, interval);

      io.emit("servers", {
        connectedServers,
        osinfo
      })

    });
  },
};
