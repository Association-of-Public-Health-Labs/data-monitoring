const express = require("express");

const routes = express.Router();

const ServerController = require("./controllers/ServerController");
const DataController = require("./controllers/DataController");
const LISVersionController = require("./controllers/LISVersionController");

// Servers routes
routes.post("/servers", ServerController.store);
routes.get("/servers/:id", ServerController.index);
routes.get("/server/category/:category", ServerController.showByCategory);
routes.get("/servers", ServerController.showAll);
routes.put("/servers/:server_id", ServerController.update);
routes.delete("/servers/:server_id", ServerController.delete);
routes.post("/servers/:server_id", ServerController.upsert);
routes.put("/server/usage/:server_id", ServerController.update_usage);
routes.get("/status", ServerController.showAllServers)

// Data routes
routes.post("/servers/:server_id/data", DataController.store);
routes.get("/servers/:server_id/data", DataController.showAllByLab);
routes.put("/servers/:server_id/data", DataController.update);
routes.get("/servers/viralload/:page/:paginate", DataController.showVLReportByMonth);
routes.get("/servers/vl_by_lab/:lab_code/:page/:paginate", DataController.showVLReportByLab);

// LIS Versions routes
routes.post("/versions", LISVersionController.store);
routes.get("/versions/:server_id", LISVersionController.index);
routes.get("/version/disalab", LISVersionController.showAllDisalabs);
routes.put("/versions/:server_id", LISVersionController.update);

module.exports = routes;
