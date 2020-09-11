"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("lis_versions", {
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
      openldr: Sequelize.STRING,
      disaxlreports: Sequelize.STRING,
      disacomms: Sequelize.STRING,
      wxdict: Sequelize.STRING,
      wxdisa: Sequelize.STRING,
      wxinstrument: Sequelize.STRING,
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
    return queryInterface.dropTable("lis_versions");
  },
};
