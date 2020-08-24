const express = require("express");

const routes = express.Router();

const ServerController = require("./controllers/ServerController");
const DataController = require("./controllers/DataController");

// Servers routes
routes.post("/servers", ServerController.store);
routes.get("/servers/:id", ServerController.index);
routes.get("/servers", ServerController.showAll);
routes.put("/servers/:server_id", ServerController.update);
routes.delete("/servers/:server_id", ServerController.delete);
routes.post("/servers/:server_id", ServerController.upsert);

// Data routes
routes.post("/servers/:server_id/data", DataController.store);
routes.get("/servers/:server_id/data", DataController.showAllByLab);
routes.put("/servers/:server_id/data", DataController.update);

module.exports = routes;
