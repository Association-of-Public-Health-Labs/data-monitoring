require("dotenv/config");

const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const http = require("http");
const { createWebSocketConnection } = require("./websocket");

require("./database");

const app = express();
const server = http.Server(app);
createWebSocketConnection(server);

app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(5555);
