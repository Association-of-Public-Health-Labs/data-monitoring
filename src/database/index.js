const Sequelize = require("sequelize");
const db = require("../config/database");

const Server = require("../models/Server");
const Data = require("../models/Data");

const connection = new Sequelize(db);

Server.init(connection);
Data.init(connection);

Server.associate(connection.models);
Data.associate(connection.models);

module.exports = connection;
