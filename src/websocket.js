const socketio = require("socket.io");

module.exports = {
  createWebSocketConnection(server) {
    const io = socketio(server);

    io.on("connection", function (socket) {
      const {server_id} = socket;
      const connectedServers = [];
      const osinfo = [];

      if(server_id){
        connectedServers[server_id] = socket.id;
        io.emit("connectedServers", {
          connectedServers,
          osinfo
        })
      }

      socket.on("disconnect", socket => {
        connectedServers[server_id] = null;
        osinfo[server.server_id] = null
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

      setInterval(async function () {
        io.emit("servers", {
          connectedServers,
          osinfo
        })
      }, interval);
    });
  },
};
