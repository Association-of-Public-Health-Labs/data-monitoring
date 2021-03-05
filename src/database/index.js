const Sequelize = require("sequelize");
const db = require("../config/database");

const Server = require("../models/Server");
const Data = require("../models/Data");
const LISVersion = require("../models/LISVersion");
const Category = require("../models/Category")

const connection = new Sequelize(db);

Server.init(connection);
Data.init(connection);
LISVersion.init(connection);
Category.init(connection);

Server.associate(connection.models);
Data.associate(connection.models);
LISVersion.associate(connection.models);
Category.associate(connection.models);

module.exports = connection;
