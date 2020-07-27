"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("data", "report_date", {
      type: Sequelize.DATE,
      after: "server_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("data", "report_date");
  },
};
