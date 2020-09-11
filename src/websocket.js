const socketio = require("socket.io");

module.exports = {
  createWebSocketConnection(server) {
    const io = socketio(server);

    io.on("connection", function (socket) {
      console.log(socket.id);
      socket.on("osinfo", function (socket) {
        console.log(socket);
      });
    });

    // io.on("cpu_usage", function (socket) {
    //   console.log(socket);
    // });
  },
};
