'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn("servers", "cpu_usage", {
        type: Sequelize.FLOAT,
        allowNull: true
      }),
      queryInterface.addColumn("servers", "ram_usage", {
        type: Sequelize.FLOAT,
        allowNull: true
      }),
      queryInterface.addColumn("servers", "sqlagent", {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn("servers", "is_connected", {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn("servers", "is_disacomms_on", {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn("servers", "disk_usage", {
        type: Sequelize.FLOAT,
        allowNull: true
      })
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn("servers", "cpu_usage"),
      queryInterface.removeColumn("servers", "ram_usage"),
      queryInterface.removeColumn("servers", "sqlagent"),
      queryInterface.removeColumn("servers", "is_connected"),
      queryInterface.removeColumn("servers", "is_disacomms_on"),
      queryInterface.removeColumn("servers", "disk_usage"),
    ];
  },
};
