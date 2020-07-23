const Sequelize = require("sequelize");
const db = require("../config/database");

const Server = require("../models/Server");

const connection = new Sequelize(db);

Server.init(connection);

Server.associate(connection.models);

module.exports = connection;
