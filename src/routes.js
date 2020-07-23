const express = require("express");

const routes = express.Router();

const ServerController = require("./controllers/ServerController");

routes.post("/servers", ServerController.store);
routes.get("/servers/:id", ServerController.index);
routes.get("/servers", ServerController.showAll);

module.exports = routes;
