"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("data", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      server_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "servers",
          foreignKey: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      report_date: Sequelize.DATE,
      disalab_total_records: Sequelize.INTEGER,
      openldr_total_records: Sequelize.INTEGER,
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
    return queryInterface.dropTable("data");
  },
};
