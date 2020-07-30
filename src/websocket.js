const socketio = require("socket.io");

module.exports = {
  createWebSocketConnection(server) {
    const io = socketio(server);

    io.on("connection", function (socket) {
      console.log(socket.id);
    });
  },
};
