const Sequelize = require("sequelize");

const viralload = new Sequelize(
  process.env.VL_DB,
  process.env.VL_USER,
  process.env.VL_PASSWORD,
  {
    host: process.env.VL_HOST,
    dialect: "mssql",
    dialectOptions: {
      options: { requestTimeout: 30000000 },
    },
  }
);

module.exports = {
  viralload: viralload,
};
