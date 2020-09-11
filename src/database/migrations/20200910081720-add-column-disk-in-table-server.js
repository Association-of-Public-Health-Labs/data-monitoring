"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("servers", "disk_storage", Sequelize.FLOAT);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("servers", "disk_storage");
  },
};
