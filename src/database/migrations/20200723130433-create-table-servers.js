"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("servers", {
      id: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
      name: Sequelize.STRING,
      category: Sequelize.STRING,
      cpu: Sequelize.FLOAT,
      ram: Sequelize.FLOAT,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("servers");
  },
};
