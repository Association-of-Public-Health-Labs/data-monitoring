"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("servers", "cpu", Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("servers", "cpu", Sequelize.FLOAT);
  },
};
