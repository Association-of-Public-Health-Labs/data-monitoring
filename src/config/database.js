require("dotenv/config");

module.exports = {
  host: process.env.HOST,
  username: process.env.USER,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: 1433,
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: false,
    },
    bigNumberStrings: true,
  },
};
